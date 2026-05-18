// ── Monaco Editor + Code Execution ───────────────────────────────────────────

// ── Piston API (mobile: replaces /api/run-code and /api/check-task) ──────────

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';
const PISTON_LANG = {
  python:     { language: 'python',     version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
  java:       { language: 'java',       version: '15.0.2' },
  sql:        { language: 'sqlite3',    version: '3.36.0' },
  cpp:        { language: 'c++',        version: '10.2.0' },
  rust:       { language: 'rust',       version: '1.68.2' },
  go:         { language: 'go',         version: '1.16.2' },
  php:        { language: 'php',        version: '8.2.3' },
  kotlin:     { language: 'kotlin',     version: '1.8.20' },
  swift:      { language: 'swift',      version: '5.8' },
};

async function pistonRun(lang, code, tablesSql) {
  const cfg = PISTON_LANG[lang] || { language: lang, version: '*' };
  let finalCode = code;
  // For SQL, prepend table definitions if provided
  if (lang === 'sql' && tablesSql) {
    finalCode = tablesSql + '\n' + code;
  }
  const r = await fetch(PISTON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language: cfg.language, version: cfg.version, files: [{ content: finalCode }] })
  });
  const d = await r.json();
  return { output: d.run?.stdout || '', error: d.run?.stderr || '', exit_code: d.run?.code ?? 0 };
}

async function pistonCheckTask(lang, code, tests, xp) {
  const result = await pistonRun(lang, code);
  const output = result.output || '';
  const error = result.error || '';

  if (error && !output) {
    return { output: '', error, passed: false, results: [] };
  }

  // For expression-based tests: wrap code and eval each expression
  if (tests && tests.length && tests[0].expression) {
    // Build test runner code
    let testCode = code + '\n';
    const results = [];
    for (const test of tests) {
      let passed = false;
      try {
        // Run each expression test by appending console.log of expression
        const runCode = code + '\nconsole.log(JSON.stringify(' + test.expression + '));\n';
        const r = await pistonRun(lang, runCode);
        const got = (r.output || '').trim();
        const expected = String(test.expected);
        passed = got === expected;
        results.push({ desc: test.desc, passed, got, expected });
      } catch {
        results.push({ desc: test.desc, passed: false, error: 'Execution error' });
      }
    }
    const allPassed = results.every(r => r.passed);
    return { output, error, passed: allPassed, results };
  }

  // For output_contains tests
  if (tests && tests.length && tests[0].type === 'output_contains') {
    const results = tests.map(test => {
      const passed = output.includes(String(test.expected));
      return { desc: test.desc, passed };
    });
    const allPassed = results.every(r => r.passed);
    return { output, error, passed: allPassed, results };
  }

  return { output, error, passed: !error, results: [] };
}


let _challengeEditor = null;
let _sandboxEditor = null;
let _monacoLoaded = true; // CodeMirror is sync — always "loaded"
let _monacoLoading = false;
let _currentChallenge = null;

const STARTER_CODE = {
  javascript: '// JavaScript\nconsole.log("Hello, World!");\n',
  python: '# Python\nprint("Hello, World!")\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n',
  sql: '-- SQL\nSELECT "Hello, World!" AS greeting;\n',
  cpp: '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n',
  rust: 'fn main() {\n    println!("Hello, World!");\n}\n',
  go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n',
  php: '<?php\necho "Hello, World!";\n',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}\n',
  swift: 'print("Hello, World!")\n',
};

// CodeMirror 5 mode names
const LANG_MAP = {
  javascript: 'javascript',
  python: 'python',
  java: 'text/x-java',
  sql: 'sql',
  cpp: 'text/x-c++src',
  rust: 'rust',
  go: 'go',
  php: 'application/x-httpd-php',
  kotlin: 'text/x-kotlin',
  swift: 'text/x-swift',
};

const LANG_DD_UI = {
  labelByLang: { javascript: 'JavaScript', python: 'Python', java: 'Java', sql: 'SQL' },
  iconByLang: {
    javascript: 'icons/langs/javascript.svg',
    python: 'icons/langs/python.svg',
    java: 'icons/langs/java.svg',
    sql: 'icons/langs/sql.svg',
  },
};

function refreshLangDropdownVisual(selectId) {
  const sel = document.getElementById(selectId);
  const btnId = selectId === 'challenge-lang-select' ? 'challenge-lang-dd-btn' : 'sandbox-lang-dd-btn';
  const btn = document.getElementById(btnId);
  if (!sel || !btn) return;
  const lang = sel.value || 'javascript';
  const ic = LANG_DD_UI.iconByLang[lang] || LANG_DD_UI.iconByLang.javascript;
  const lb = LANG_DD_UI.labelByLang[lang] || 'JavaScript';
  btn.innerHTML = `<img src="${ic}" alt="" width="16" height="16"><span>${lb}</span>`;
}

// ── CodeMirror 5 (replaces Monaco — no unsafe-eval needed) ───────────────────

function loadMonaco(callback) {
  // CodeMirror is loaded synchronously via <script> tags — always ready
  callback();
}

function createEditor(containerId, language, initialCode) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  container.innerHTML = '';
  const cm = CodeMirror(container, {
    value: initialCode || STARTER_CODE[language] || '',
    mode: LANG_MAP[language] || 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    lineWrapping: true,
    extraKeys: { Tab: cm => cm.execCommand('insertSoftTab') },
  });
  // Force refresh after container becomes visible
  setTimeout(() => cm.refresh(), 50);
  return cm;
}

function getEditorCode(editorInstance, containerId) {
  if (editorInstance && editorInstance.getValue) return editorInstance.getValue();
  const fallback = document.querySelector(`#${containerId} textarea`);
  return fallback ? fallback.value : '';
}

// ── Challenge Screen ──────────────────────────────────────────────────────────

function getActiveLang(selectId) {
  const sel = document.getElementById(selectId);
  return sel ? sel.value : 'javascript';
}

function setActiveLang(selectId, lang) {
  const sel = document.getElementById(selectId);
  if (sel) {
    sel.value = lang;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }
  refreshLangDropdownVisual(selectId);
}

function initChallengeScreen(challenge) {
  _currentChallenge = challenge;

  document.getElementById('challenge-title').textContent = challenge.title;
  document.getElementById('challenge-xp-badge').textContent = `+${challenge.xp} XP`;
  document.getElementById('task-description').innerHTML = challenge.prompt;

  const lang = challenge.language || 'javascript';
  setActiveLang('challenge-lang-select', lang);

  document.getElementById('output-panel').innerHTML = `<span class="output-placeholder">${escHtml(t('challenge_placeholder'))}</span>`;
  document.getElementById('test-results').innerHTML = '';
  document.getElementById('runtime-badge').textContent = '';
  const challengeMsgs = document.getElementById('challenge-ai-msgs');
  if (challengeMsgs) challengeMsgs.innerHTML = '';
  const sqlBtn = document.getElementById('btn-challenge-sql-tables');
  if (sqlBtn) sqlBtn.style.display = (lang === 'sql') ? '' : 'none';

  loadMonaco(() => {
    if (_challengeEditor) {
      _challengeEditor.dispose();
      _challengeEditor = null;
    }
    _challengeEditor = createEditor('editor', lang, challenge.starterCode);
  });
}

function setupChallengeHandlers() {
  document.getElementById('btn-run')?.addEventListener('click', runChallengeCode);
  document.getElementById('btn-check')?.addEventListener('click', checkChallengeTask);
  document.getElementById('btn-challenge-sql-tables')?.addEventListener('click', () => openSqlTablesModal('challenge'));
  document.getElementById('btn-challenge-clear')?.addEventListener('click', () => {
    document.getElementById('output-panel').innerHTML = `<span class="output-placeholder">${escHtml(t('challenge_placeholder'))}</span>`;
    document.getElementById('test-results').innerHTML = '';
    const rb = document.getElementById('runtime-badge');
    if (rb) rb.textContent = '';
  });
  document.getElementById('challenge-lang-select')?.addEventListener('change', e => {
    const lang = e.target.value;
    refreshLangDropdownVisual('challenge-lang-select');
    if (_challengeEditor && _monacoLoaded) {
      CodeMirror.autoLoadMode(_challengeEditor, LANG_MAP[lang] || 'javascript');
      _challengeEditor.setOption('mode', LANG_MAP[lang] || 'javascript');
    }
    const sqlBtn = document.getElementById('btn-challenge-sql-tables');
    if (sqlBtn) sqlBtn.style.display = lang === 'sql' ? '' : 'none';
  });
  document.getElementById('btn-challenge-back')?.addEventListener('click', () => {
    if (window._app) window._app.goBack();
  });

  initLangDropdown('challenge-lang-dd', 'challenge-lang-select', 'challenge-lang-dd-btn', 'challenge-lang-dd-menu');
  setupResizableHandle('challenge-resize-handle', 'challenge-output-section', 'challenge-ai-chat');
  setupInlineChatPanel('challenge-ai-input', 'challenge-ai-send', 'challenge-ai-msgs', true);
}

async function runChallengeCode() {
  const code = getEditorCode(_challengeEditor, 'editor');
  const lang = getActiveLang('challenge-lang-select');
  await executeCode(code, lang, 'output-panel', 'runtime-badge');
}

async function checkChallengeTask() {
  if (!_currentChallenge) return;
  const code = getEditorCode(_challengeEditor, 'editor');
  const lang = _currentChallenge.language || 'javascript';
  const tests = _currentChallenge.tests || [];

  setOutputLoading('output-panel', t('challenge_checking'));
  document.getElementById('test-results').innerHTML = '';

  try {
    const data = await pistonCheckTask(lang, code, tests, _currentChallenge.xp);

    if (data.output) {
      document.getElementById('output-panel').textContent = data.output;
    }

    renderTestResults(data.results || []);

    if (data.passed) {
      if (window._app) window._app.onTaskPassed(_currentChallenge.id, _currentChallenge.xp);
    } else if (data.error) {
      document.getElementById('output-panel').innerHTML = `<span class="output-error">${escHtml(data.error)}</span>`;
    }
  } catch (e) {
    document.getElementById('output-panel').innerHTML = `<span class="output-error">${escHtml(t('server_error'))}${escHtml(e.message)}</span>`;
  }
}

// ── Sandbox Screen ────────────────────────────────────────────────────────────

function initSandboxScreen() {
  loadMonaco(() => {
    if (!_sandboxEditor) {
      const lang = getActiveLang('sandbox-lang-select');
      _sandboxEditor = createEditor('sandbox-editor', lang, STARTER_CODE[lang]);
    }
    const pending = window._pendingSandboxTask;
    if (pending) {
      applySandboxImportedTask(pending);
      window._pendingSandboxTask = null;
    }
  });
}

function setupSandboxHandlers() {
  document.getElementById('btn-sandbox-run')?.addEventListener('click', runSandboxCode);
  document.getElementById('btn-sandbox-clear')?.addEventListener('click', () => {
    const lang = getActiveLang('sandbox-lang-select');
    if (_sandboxEditor) _sandboxEditor.setValue(STARTER_CODE[lang] || '');
    document.getElementById('sandbox-output-panel').innerHTML = `<span class="output-placeholder">${escHtml(t('sandbox_placeholder'))}</span>`;
    const sb = document.getElementById('sandbox-task-banner');
    if (sb) { sb.style.display = 'none'; sb.innerHTML = ''; }
    window._sandboxTaskContextPlain = '';
  });
  document.getElementById('sandbox-lang-select')?.addEventListener('change', e => {
    const lang = e.target.value;
    refreshLangDropdownVisual('sandbox-lang-select');
    if (_sandboxEditor && _monacoLoaded) {
      _sandboxEditor.setOption('mode', LANG_MAP[lang] || 'javascript');
      if (!_sandboxEditor.getValue().trim()) {
        _sandboxEditor.setValue(STARTER_CODE[lang] || '');
      }
    }
    const sqlBtn = document.getElementById('btn-sandbox-sql-tables');
    if (sqlBtn) sqlBtn.style.display = lang === 'sql' ? '' : 'none';
  });
  document.getElementById('btn-sandbox-sql-tables')?.addEventListener('click', () => openSqlTablesModal('sandbox'));

  initLangDropdown('sandbox-lang-dd', 'sandbox-lang-select', 'sandbox-lang-dd-btn', 'sandbox-lang-dd-menu');
  setupResizableHandle('sandbox-resize-handle', 'sandbox-output-section', 'sandbox-ai-chat');
  setupInlineChatPanel('sandbox-ai-input', 'sandbox-ai-send', 'sandbox-ai-msgs', false);
  setupSqlTablesModal();
}

function initLangDropdown(rootId, selectId, btnId, menuId) {
  const root = document.getElementById(rootId);
  const sel = document.getElementById(selectId);
  const btn = document.getElementById(btnId);
  const menu = document.getElementById(menuId);
  if (!root || !sel || !btn || !menu) return;

  refreshLangDropdownVisual(selectId);

  btn.addEventListener('click', () => {
    root.classList.toggle('open');
  });

  menu.querySelectorAll('.lang-dd-item').forEach(it => {
    it.addEventListener('click', () => {
      const lang = it.dataset.lang;
      if (!lang) return;
      sel.value = lang;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      root.classList.remove('open');
      refreshLangDropdownVisual(selectId);
    });
  });

  document.addEventListener('click', e => {
    if (!root.classList.contains('open')) return;
    if (root.contains(e.target)) return;
    root.classList.remove('open');
  });
}

async function runSandboxCode() {
  const code = getEditorCode(_sandboxEditor, 'sandbox-editor');
  const lang = getActiveLang('sandbox-lang-select');
  await executeCode(code, lang, 'sandbox-output-panel', 'sandbox-runtime-badge');
}

// ── Core code execution ───────────────────────────────────────────────────────

async function executeCode(code, language, outputId, runtimeId) {
  setOutputLoading(outputId, t('code_executing'));
  if (runtimeId) document.getElementById(runtimeId).textContent = '';

  const body = { language, code };
  if (language === 'sql') {
    body.tables_sql = localStorage.getItem('sql-tables') || '';
  }

  try {
    const data = await pistonRun(language, code, body.tables_sql);

    const panel = document.getElementById(outputId);
    if (data.error && !data.output) {
      let extra = '';
      if (language === 'python' || language === 'py') {
        const blob = `${data.output || ''}\n${data.error || ''}`;
        if (/SyntaxError|IndentationError/.test(blob) && /\bfunction\s*\(|\bfunction\s+\w+\s*\(|=>|console\.(log|error)/.test(code)) {
          extra = `<div class="output-hint output-hint-warn">${escHtml(t('jdk_hint_js_in_python'))}</div>`;
        }
      }
      panel.innerHTML = (data.output ? `<pre class="output-pre">${escHtml(data.output)}</pre>` : '') +
        `<pre class="output-error output-error-block">${escHtml(data.error)}</pre>` + extra;
    } else {
      panel.textContent = (data.output || '') + (data.error ? '\n' + data.error : '') || t('challenge_no_output');
    }
  } catch (e) {
    document.getElementById(outputId).innerHTML =
      `<pre class="output-error output-error-block">${escHtml(t('code_server_unreachable', e.message))}</pre>`;
  }
}

function renderTestResults(results) {
  const container = document.getElementById('test-results');
  if (!container || !results.length) return;
  container.innerHTML = '';
  results.forEach(r => {
    const div = document.createElement('div');
    div.className = 'test-result-item ' + (r.passed ? 'pass' : 'fail');
    const icon = r.passed ? '✅' : '❌';
    let extra = '';
    if (!r.passed && r.error) extra = t('test_fail_err', r.error);
    else if (!r.passed && r.got !== undefined && r.expected !== undefined) {
      extra = ` (${t('test_expected_got', r.expected, r.got)})`;
    } else if (!r.passed && r.got !== undefined) {
      extra = t('test_fail_got_only', r.got);
    }
    div.innerHTML = `<span class="test-icon">${icon}</span><span class="test-desc">${escHtml(r.desc)}${escHtml(extra)}</span>`;
    container.appendChild(div);
  });
}

function _buildJdkGuideHtml(guide, mountEl) {
  const lines = guide ? guide.split('\n').filter(Boolean) : [];
  window._jdkGuideCopyCmds = lines.map(line => line.replace(/\s*\(.*\)\s*$/, '').trim());
  const allJoined = window._jdkGuideCopyCmds.filter(Boolean).join('\n\n');
  window._jdkGuideCopyAll = allJoined;

  const rows = lines.map((line, i) => {
    const cmd = window._jdkGuideCopyCmds[i] || '';
    const os = (line.match(/\(([^)]+)\)/) || [])[1] || '';
    return `<div class="jdk-guide-row">
      <span class="jdk-guide-os">${escHtml(os)}</span>
      <code class="jdk-guide-cmd">${escHtml(cmd)}</code>
      <button type="button" class="jdk-copy-btn" data-jdk-copy-idx="${i}">${escHtml(t('jdk_copy_row'))}</button>
    </div>`;
  }).join('');

  const topBlock = allJoined
    ? `<div class="jdk-guide-top">
        <div class="jdk-guide-top-lbl">${escHtml(t('jdk_guide_commands_title'))}</div>
        <pre class="jdk-guide-snippet">${escHtml(allJoined)}</pre>
        <button type="button" class="btn btn-secondary jdk-copy-all-btn">${escHtml(t('jdk_copy_all'))}</button>
      </div>`
    : '';

  const html = `<div class="jdk-guide">
    <div class="jdk-guide-title">${escHtml(t('jdk_not_installed_title'))}</div>
    <div class="jdk-guide-sub">${escHtml(t('jdk_not_installed_sub'))}</div>
    ${topBlock}
    <button type="button" class="btn btn-primary jdk-install-auto-btn">${escHtml(t('jdk_install_auto'))}</button>
    <div class="jdk-install-log-wrap" hidden></div>
    ${rows.length ? `<div class="jdk-guide-sub jdk-guide-manual">${escHtml(t('jdk_guide_manual'))}</div>${rows}` : ''}
    <div class="jdk-guide-sub jdk-guide-after">${escHtml(t('jdk_after_install'))}</div>
  </div>`;

  queueMicrotask(() => {
    const panel = mountEl && mountEl.querySelector ? mountEl.querySelector('.jdk-guide') : null;
    if (!panel) return;
    const resetLbl = (btn, label) => {
      btn.textContent = label;
    };
    panel.querySelectorAll('[data-jdk-copy-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.getAttribute('data-jdk-copy-idx'), 10);
        const text = (window._jdkGuideCopyCmds && window._jdkGuideCopyCmds[i]) || '';
        navigator.clipboard.writeText(text).then(() => {
          const prev = btn.textContent;
          btn.textContent = '✓';
          setTimeout(() => resetLbl(btn, prev), 1500);
        });
      });
    });
    const allBtn = panel.querySelector('.jdk-copy-all-btn');
    if (allBtn) {
      allBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window._jdkGuideCopyAll || '').then(() => {
          const prev = allBtn.textContent;
          allBtn.textContent = '✓';
          setTimeout(() => resetLbl(allBtn, prev), 1500);
        });
      });
    }
    const auto = panel.querySelector('.jdk-install-auto-btn');
    if (auto) auto.addEventListener('click', () => window._installJdkInApp(auto));
  });

  return html;
}

window._installJdkInApp = async function(btn) {
  // stub: JDK auto-install not available in mobile PWA
  // Java code runs via Piston API (no local JDK needed)
  btn.textContent = 'Java runs via Piston API in mobile version';
  btn.disabled = true;
};

function setOutputLoading(panelId, text) {
  const panel = document.getElementById(panelId);
  if (panel) panel.innerHTML = `<span class="loading-spin">⟳</span> ${escHtml(text)}`;
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function _normSandboxLang(l) {
  const x = String(l || 'javascript').toLowerCase();
  if (x === 'js') return 'javascript';
  if (x === 'py') return 'python';
  if (['javascript', 'python', 'java', 'sql'].includes(x)) return x;
  return 'javascript';
}

/** Розпізнає JSON задачі з відповіді AI (пісочниця). */
function tryParseStrucodeTaskJson(text) {
  const m = String(text || '').match(/\{[\s\S]*\}/);
  if (!m) return null;
  let o;
  try { o = JSON.parse(m[0]); } catch { return null; }
  if (!o.title || !o.prompt || !o.starterCode) return null;
  const language = _normSandboxLang(o.language);
  const tests = Array.isArray(o.tests) ? o.tests : [];
  if (language === 'java' || language === 'sql') {
    const clean = tests.filter(t => t && t.type === 'output_contains' && t.expected != null && t.desc);
    if (clean.length < 1) return null;
    return {
      title: String(o.title).slice(0, 160),
      prompt: String(o.prompt),
      starterCode: String(o.starterCode),
      language,
      tests: clean.map(t => ({
        type: 'output_contains',
        expected: String(t.expected),
        desc: String(t.desc || ''),
      })),
      xp: Math.min(50, Math.max(5, parseInt(o.xp, 10) || 15)),
    };
  }
  const clean = tests.filter(t => t && t.expression != null && t.expected !== undefined && t.desc);
  if (clean.length < 2) return null;
  return {
    title: String(o.title).slice(0, 160),
    prompt: String(o.prompt),
    starterCode: String(o.starterCode),
    language,
    tests: clean.map(t => ({
      expression: String(t.expression),
      expected: typeof t.expected === 'string' ? t.expected : JSON.stringify(t.expected),
      desc: String(t.desc || ''),
    })),
    xp: Math.min(50, Math.max(5, parseInt(o.xp, 10) || 15)),
  };
}

function applySandboxImportedTask(task) {
  const lang = _normSandboxLang(task.language);
  setActiveLang('sandbox-lang-select', lang);
  const run = () => {
    if (_sandboxEditor && _monacoLoaded) {
      _sandboxEditor.setOption('mode', LANG_MAP[lang] || 'javascript');
      _sandboxEditor.setValue(task.starterCode || STARTER_CODE[lang] || '');
    }
    const ban = document.getElementById('sandbox-task-banner');
    if (ban) {
      const plain = String(task.prompt).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400);
      ban.style.display = 'block';
      ban.innerHTML = `<div class="sandbox-task-banner-inner"><strong>${escHtml(task.title)}</strong><div class="sandbox-task-desc">${escHtml(plain)}</div></div>`;
    }
    const plainFull = String(task.prompt).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    window._sandboxTaskContextPlain = `[${String(task.title)}]\n${plainFull}`.slice(0, 4000);
    const sqlBtn = document.getElementById('btn-sandbox-sql-tables');
    if (sqlBtn) sqlBtn.style.display = lang === 'sql' ? '' : 'none';
    _updateSqlTablesBtns();
  };
  if (_sandboxEditor && _monacoLoaded) run();
  else loadMonaco(run);
}

function _appendSandboxTaskOffer(msgs, task) {
  const wrap = document.createElement('div');
  wrap.className = 'ai-chat-msg ai';
  const box = document.createElement('div');
  box.className = 'ai-task-offer';
  box.innerHTML = `<div>Згенерована задача: <strong>${escHtml(task.title)}</strong></div>` +
    `<div class="ai-task-offer-actions">` +
    `<button type="button" class="btn btn-primary" data-ok style="padding:8px 14px;font-size:.82rem">Додати в редактор</button>` +
    `<button type="button" class="btn btn-secondary" data-no style="padding:8px 14px;font-size:.82rem">Скасувати</button>` +
    `</div>`;
  wrap.appendChild(box);
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  box.querySelector('[data-ok]').addEventListener('click', () => {
    applySandboxImportedTask(task);
    wrap.remove();
    window._app?.toast?.('Задачу додано в редактор');
  });
  box.querySelector('[data-no]').addEventListener('click', () => wrap.remove());
}

window._applySandboxImportedTask = applySandboxImportedTask;

function updateEditorTheme() {
  // CodeMirror theme is set at creation time (dracula) — no runtime switch needed
}

// ── Resizable handle between output and AI chat ───────────────────────────────

function setupResizableHandle(handleId, topId, bottomId) {
  const handle = document.getElementById(handleId);
  const top = document.getElementById(topId);
  const bottom = document.getElementById(bottomId);
  if (!handle || !top || !bottom) return;

  let startY, startTopH, startBottomH;

  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    startY = e.clientY;
    startTopH = top.offsetHeight;
    startBottomH = bottom.offsetHeight;

    const onMove = e => {
      const dy = e.clientY - startY;
      const newTopH = Math.max(60, startTopH + dy);
      const newBottomH = Math.max(60, startBottomH - dy);
      top.style.flex = 'none';
      bottom.style.flex = 'none';
      top.style.height = newTopH + 'px';
      bottom.style.height = newBottomH + 'px';
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

// ── Inline AI chat panel ──────────────────────────────────────────────────────

function setupInlineChatPanel(inputId, sendId, msgsId, isChallenge) {
  const input = document.getElementById(inputId);
  const sendBtn = document.getElementById(sendId);
  const msgs = document.getElementById(msgsId);
  if (!input || !sendBtn || !msgs) return;

  const row = input.closest('.ai-chat-input-row');
  if (row && !row.querySelector('.btn-voice-dictate')) {
    const mic = document.createElement('button');
    mic.type = 'button';
    mic.className = 'btn btn-icon-sm btn-voice-dictate';
    mic.setAttribute('aria-label', 'Голосовий ввід');
    mic.textContent = '🎤';
    mic.title = 'Голосовий ввід';
    mic.addEventListener('click', () => window.startVoiceDictation?.(input));
    row.insertBefore(mic, input);
  }

  async function sendMsg() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    _appendAiChatMsg(msgs, text, 'user');

    if (!isAiAvailable()) {
      _appendAiChatMsg(msgs, 'AI-ментор недоступний. Встанови Ollama у вкладці "AI Ментор".', 'ai');
      return;
    }

    const loadingEl = _appendAiChatMsg(msgs, '🤖 Думаю...', 'ai loading');
    try {
      const code = isChallenge
        ? getEditorCode(_challengeEditor, 'editor')
        : getEditorCode(_sandboxEditor, 'sandbox-editor');
      const wantsTaskGen = !isChallenge && /(згенеруй|генеруй|створи|напиши|make|generate).{0,60}(задач|task|вправ|exercise|кодинг)/i.test(text);

      let answer;
      if (wantsTaskGen && typeof AI_SANDBOX_TASK_GEN_SYSTEM !== 'undefined') {
        const langPref = getActiveLang('sandbox-lang-select');
        const u = `Запит студента: ${text}\n\nПоточний код у редакторі (контекст, можна ігнорувати):\n\`\`\`\n${code || '(порожньо)'}\n\`\`\`\n\nБажана мова в JSON: ${langPref}`;
        answer = await aiChat(u, AI_SANDBOX_TASK_GEN_SYSTEM);
      } else {
        const taskCtx = isChallenge && _currentChallenge
          ? `Задача: ${_currentChallenge.prompt.replace(/<[^>]+>/g, '')}\n\n`
          : '';
        let sandboxTaskBlock = '';
        if (!isChallenge && window._sandboxTaskContextPlain &&
            /(цю\s+задач|цією\s+задач|цю\s+вправ|про\s+цю\s+задач|про\s+задач|умов|this\s+task|the\s+task)/i.test(text)) {
          sandboxTaskBlock = `Активна задача в пісочниці:\n${window._sandboxTaskContextPlain}\n\n`;
        }
        const prompt = `${taskCtx}${sandboxTaskBlock}Код:\n\`\`\`\n${code || '(порожньо)'}\n\`\`\`\n\nПитання: ${text}`;
        answer = await aiChat(prompt);
      }

      if (!isChallenge && wantsTaskGen) {
        loadingEl.remove();
        const parsed = tryParseStrucodeTaskJson(answer);
        if (parsed) {
          _appendAiChatMsg(msgs, 'Ось згенерована задача — натисни «Додати в редактор», якщо все ок.', 'ai');
          _appendSandboxTaskOffer(msgs, parsed);
        } else {
          _appendAiChatMsg(msgs, 'Не вдалося розпізнати JSON задачі. Спробуй коротший опис теми.\n\n' + String(answer).slice(0, 1200), 'ai');
        }
      } else {
        loadingEl.textContent = answer;
        loadingEl.classList.remove('loading');
        if (!isChallenge) {
          const parsed = tryParseStrucodeTaskJson(answer);
          if (parsed) _appendSandboxTaskOffer(msgs, parsed);
        }
      }
    } catch (e) {
      loadingEl.textContent = '❌ ' + e.message;
      loadingEl.classList.remove('loading');
    }
  }

  sendBtn.addEventListener('click', sendMsg);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
  });
}

function _appendAiChatMsg(container, text, type) {
  const div = document.createElement('div');
  div.className = 'ai-chat-msg ' + type;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

// ── SQL Tables Modal ──────────────────────────────────────────────────────────

let _sqlTablesContext = 'sandbox';

function _updateSqlTablesBtns() {
  const saved = (localStorage.getItem('sql-tables') || '').trim();
  const indicator = saved ? ' ●' : '';
  const ch = document.getElementById('btn-challenge-sql-tables');
  if (ch) {
    ch.textContent = `📋${indicator}`;
    ch.title = saved ? t('sql_tables_title_saved') : t('sql_tables_title_empty');
  }
  const sb = document.getElementById('btn-sandbox-sql-tables');
  if (sb) {
    sb.textContent = `${t('sql_tables_btn_label')}${indicator}`;
    sb.title = saved ? t('sql_tables_title_saved') : t('sql_tables_title_empty');
  }
}

function openSqlTablesModal(context) {
  _sqlTablesContext = context;
  const modal = document.getElementById('sql-tables-modal');
  const textarea = document.getElementById('sql-tables-textarea');
  if (!modal || !textarea) return;
  textarea.value = localStorage.getItem('sql-tables') || '';
  modal.style.display = 'flex';
  textarea.focus();
}

function setupSqlTablesModal() {
  _updateSqlTablesBtns();
  document.getElementById('btn-save-sql-tables')?.addEventListener('click', () => {
    const val = document.getElementById('sql-tables-textarea')?.value || '';
    localStorage.setItem('sql-tables', val);
    document.getElementById('sql-tables-modal').style.display = 'none';
    _updateSqlTablesBtns();
    if (window._app) window._app.toast(val.trim() ? t('sql_toast_saved') : t('sql_toast_cleared'));
  });
  document.getElementById('btn-close-sql-tables')?.addEventListener('click', () => {
    document.getElementById('sql-tables-modal').style.display = 'none';
  });
  document.getElementById('sql-tables-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('sql-tables-modal')) {
      document.getElementById('sql-tables-modal').style.display = 'none';
    }
  });
}

/** Оновлює статичні підписи challenge/sandbox після зміни мови (виклик з app.js). */
function refreshStrucodeUiChrome() {
  if (typeof t !== 'function') return;
  const setTxt = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  };
  setTxt('btn-run', 'challenge_run');
  setTxt('btn-check', 'challenge_check');
  setTxt('btn-sandbox-run', 'sandbox_run');
  const chOut = document.querySelector('#screen-challenge .output-header span');
  if (chOut) chOut.textContent = t('challenge_output');
  const sbOut = document.querySelector('#screen-sandbox .output-header span');
  if (sbOut) sbOut.textContent = t('challenge_output');
  const chHdr = document.querySelector('#challenge-ai-chat .ai-chat-hdr');
  if (chHdr) chHdr.textContent = t('challenge_ai_chat');
  const sbHdr = document.querySelector('#sandbox-ai-chat .ai-chat-hdr');
  if (sbHdr) sbHdr.textContent = t('sandbox_ai_chat');
  const chIn = document.getElementById('challenge-ai-input');
  if (chIn) chIn.placeholder = t('challenge_ai_placeholder');
  const sbIn = document.getElementById('sandbox-ai-input');
  if (sbIn) sbIn.placeholder = t('sandbox_ai_placeholder');
  const br = document.getElementById('btn-challenge-back');
  if (br) br.textContent = t('challenge_back_nav');
  const sbb = document.getElementById('btn-sandbox-back');
  if (sbb) sbb.textContent = t('sandbox_back');
  const sbl = document.querySelector('.sandbox-logo-label');
  if (sbl) sbl.textContent = t('sandbox_title');
  document.getElementById('btn-challenge-clear')?.setAttribute('title', t('challenge_clear_title'));
  document.getElementById('btn-sandbox-clear')?.setAttribute('title', t('sandbox_clear_title'));
  document.getElementById('challenge-lang-dd-btn')?.setAttribute('aria-label', t('lang_picker_aria'));
  document.getElementById('sandbox-lang-dd-btn')?.setAttribute('aria-label', t('lang_picker_aria'));
  _updateSqlTablesBtns();
  refreshLangDropdownVisual('challenge-lang-select');
  refreshLangDropdownVisual('sandbox-lang-select');
  document.querySelectorAll('#output-panel .output-placeholder, #sandbox-output-panel .output-placeholder').forEach(ph => {
    const sb = ph.closest('#sandbox-output-panel');
    ph.textContent = sb ? t('sandbox_placeholder') : t('challenge_placeholder');
  });
}
