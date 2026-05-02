// ── Monaco Editor + Code Execution ───────────────────────────────────────────

let _challengeEditor = null;
let _sandboxEditor = null;
let _monacoLoaded = false;
let _monacoLoading = false;
let _currentChallenge = null;

const MONACO_CDN = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs';

const STARTER_CODE = {
  javascript: '// Напишіть ваш JavaScript тут\nconsole.log("Hello, World!");\n',
  python: '# Напишіть ваш Python тут\nprint("Hello, World!")\n',
  java: '// Java sandbox - поки що теорія\n// Запуск Java потребує встановленого JDK\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n',
  sql: '-- SQL запит (теоретичний формат)\nSELECT * FROM users WHERE age > 18 ORDER BY name;\n',
};

const LANG_MAP = {
  javascript: 'javascript',
  python: 'python',
  java: 'java',
  sql: 'sql',
};

// ── Load Monaco ───────────────────────────────────────────────────────────────

function loadMonaco(callback) {
  if (_monacoLoaded) { callback(); return; }
  if (_monacoLoading) { const t = setInterval(() => { if (_monacoLoaded) { clearInterval(t); callback(); } }, 100); return; }
  _monacoLoading = true;

  const script = document.createElement('script');
  script.src = MONACO_CDN + '/loader.js';
  script.onload = () => {
    window.require.config({ paths: { vs: MONACO_CDN } });
    window.require(['vs/editor/editor.main'], () => {
      _monacoLoaded = true;
      _monacoLoading = false;
      callback();
    });
  };
  script.onerror = () => {
    _monacoLoading = false;
    console.error('Monaco CDN не завантажився. Перевірте підключення до інтернету.');
    showMonacoFallback('editor');
    showMonacoFallback('sandbox-editor');
  };
  document.head.appendChild(script);
}

function getMonacoTheme() {
  const t = document.documentElement.dataset.theme || 'dark';
  return t === 'light' ? 'vs' : 'vs-dark';
}

function createEditor(containerId, language, initialCode, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  container.innerHTML = '';
  return monaco.editor.create(container, {
    value: initialCode || STARTER_CODE[language] || '',
    language: LANG_MAP[language] || 'javascript',
    theme: getMonacoTheme(),
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: 'on',
    tabSize: 2,
    renderLineHighlight: 'line',
    cursorBlinking: 'smooth',
    formatOnPaste: true,
    ...options,
  });
}

function showMonacoFallback(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <textarea style="
      width:100%;height:100%;background:#0d1117;color:#e6edf3;
      border:none;padding:12px;font-family:monospace;font-size:14px;
      resize:none;outline:none;line-height:1.6;
    " placeholder="// Monaco Editor потребує підключення до інтернету&#10;// Введіть ваш код тут..."></textarea>`;
}

function getEditorCode(editorInstance, containerId) {
  if (editorInstance && editorInstance.getValue) return editorInstance.getValue();
  const fallback = document.querySelector(`#${containerId} textarea`);
  return fallback ? fallback.value : '';
}

// ── Challenge Screen ──────────────────────────────────────────────────────────

function initChallengeScreen(challenge) {
  _currentChallenge = challenge;

  document.getElementById('challenge-title').textContent = challenge.title;
  document.getElementById('challenge-xp-badge').textContent = `+${challenge.xp} XP`;
  document.getElementById('task-description').innerHTML = challenge.prompt;

  const langSelect = document.getElementById('challenge-lang-select');
  if (langSelect) {
    langSelect.value = challenge.language || 'javascript';
  }

  document.getElementById('output-panel').innerHTML = '<span class="output-placeholder">// Натисни ▶ Run або ✓ Check</span>';
  document.getElementById('test-results').innerHTML = '';
  document.getElementById('runtime-badge').textContent = '';
  document.getElementById('ai-hint-area').style.display = 'none';

  loadMonaco(() => {
    if (_challengeEditor) {
      _challengeEditor.dispose();
      _challengeEditor = null;
    }
    _challengeEditor = createEditor('editor', challenge.language || 'javascript', challenge.starterCode);
  });
}

function setupChallengeHandlers() {
  document.getElementById('btn-run')?.addEventListener('click', runChallengeCode);
  document.getElementById('btn-check')?.addEventListener('click', checkChallengeTask);
  document.getElementById('btn-ai-hint')?.addEventListener('click', showChallengeHint);
  document.getElementById('challenge-lang-select')?.addEventListener('change', e => {
    if (_challengeEditor) {
      monaco.editor.setModelLanguage(_challengeEditor.getModel(), LANG_MAP[e.target.value] || 'javascript');
    }
  });
  document.getElementById('btn-challenge-back')?.addEventListener('click', () => {
    if (window._app) window._app.goBack();
  });
}

async function runChallengeCode() {
  const code = getEditorCode(_challengeEditor, 'editor');
  const lang = document.getElementById('challenge-lang-select')?.value || 'javascript';
  await executeCode(code, lang, 'output-panel', 'runtime-badge');
}

async function checkChallengeTask() {
  if (!_currentChallenge) return;
  const code = getEditorCode(_challengeEditor, 'editor');
  const lang = _currentChallenge.language || 'javascript';
  const tests = _currentChallenge.tests || [];

  setOutputLoading('output-panel', 'Перевірка тестів...');
  document.getElementById('test-results').innerHTML = '';

  try {
    const resp = await fetch('/api/check-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: lang, code, tests, xp: _currentChallenge.xp }),
    });
    const data = await resp.json();

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
    document.getElementById('output-panel').innerHTML = `<span class="output-error">Помилка сервера: ${escHtml(e.message)}</span>`;
  }
}

async function showChallengeHint() {
  if (!_currentChallenge || !isAiAvailable()) {
    const area = document.getElementById('ai-hint-area');
    const bubble = document.getElementById('ai-hint-bubble');
    area.style.display = 'block';
    bubble.textContent = 'AI-ментор недоступний. Встанови Ollama у вкладці "AI".';
    return;
  }
  const code = getEditorCode(_challengeEditor, 'editor');
  const area = document.getElementById('ai-hint-area');
  const bubble = document.getElementById('ai-hint-bubble');
  area.style.display = 'block';
  bubble.textContent = '🤖 Думаю...';
  try {
    bubble.textContent = await aiHint(_currentChallenge.prompt.replace(/<[^>]+>/g, ''), code);
  } catch (e) {
    bubble.textContent = '❌ ' + e.message;
  }
}

// ── Sandbox Screen ────────────────────────────────────────────────────────────

function initSandboxScreen() {
  loadMonaco(() => {
    if (_sandboxEditor) return;
    const lang = document.getElementById('sandbox-lang-select')?.value || 'javascript';
    _sandboxEditor = createEditor('sandbox-editor', lang, STARTER_CODE[lang]);
  });
}

function setupSandboxHandlers() {
  document.getElementById('btn-sandbox-run')?.addEventListener('click', runSandboxCode);
  document.getElementById('btn-sandbox-clear')?.addEventListener('click', () => {
    const lang = document.getElementById('sandbox-lang-select')?.value || 'javascript';
    if (_sandboxEditor) _sandboxEditor.setValue(STARTER_CODE[lang] || '');
    document.getElementById('sandbox-output-panel').innerHTML = '<span class="output-placeholder">// Натисни ▶ Run щоб виконати код</span>';
    document.getElementById('sandbox-ai-area').style.display = 'none';
  });
  document.getElementById('sandbox-lang-select')?.addEventListener('change', e => {
    const lang = e.target.value;
    if (_sandboxEditor) {
      monaco.editor.setModelLanguage(_sandboxEditor.getModel(), LANG_MAP[lang] || 'javascript');
      if (!_sandboxEditor.getValue().trim()) {
        _sandboxEditor.setValue(STARTER_CODE[lang] || '');
      }
    }
  });
  document.getElementById('btn-sandbox-ai')?.addEventListener('click', sandboxAskAi);
}

async function runSandboxCode() {
  const code = getEditorCode(_sandboxEditor, 'sandbox-editor');
  const lang = document.getElementById('sandbox-lang-select')?.value || 'javascript';
  await executeCode(code, lang, 'sandbox-output-panel', 'sandbox-runtime-badge');
}

async function sandboxAskAi() {
  const code = getEditorCode(_sandboxEditor, 'sandbox-editor');
  const area = document.getElementById('sandbox-ai-area');
  const bubble = document.getElementById('sandbox-ai-bubble');
  if (!isAiAvailable()) {
    area.style.display = 'block';
    bubble.textContent = 'AI-ментор недоступний. Встанови Ollama у вкладці "AI".';
    return;
  }
  area.style.display = 'block';
  bubble.textContent = '🤖 Аналізую...';
  try {
    bubble.textContent = await aiReview(code);
  } catch (e) {
    bubble.textContent = '❌ ' + e.message;
  }
}

// ── Core code execution ───────────────────────────────────────────────────────

async function executeCode(code, language, outputId, runtimeId) {
  setOutputLoading(outputId, 'Виконую...');
  if (runtimeId) document.getElementById(runtimeId).textContent = '';

  if (language === 'java') {
    document.getElementById(outputId).innerHTML = '<span style="color:var(--gold)">Java sandbox: запуск потребує JDK. Поки що перевір логіку вручну або встанови JDK.</span>';
    return;
  }
  if (language === 'sql') {
    document.getElementById(outputId).innerHTML = '<span style="color:var(--gold)">SQL sandbox: запуск потребує бази даних. Перевір синтаксис та логіку запиту.</span>';
    return;
  }

  try {
    const resp = await fetch('/api/run-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code }),
    });
    const data = await resp.json();

    const panel = document.getElementById(outputId);
    if (data.error) {
      panel.innerHTML = (data.output ? escHtml(data.output) + '\n' : '') +
        `<span class="output-error">${escHtml(data.error)}</span>`;
    } else {
      panel.textContent = data.output || '(немає виводу)';
    }

    if (runtimeId && data.runtime_ms != null) {
      document.getElementById(runtimeId).textContent = `${data.runtime_ms}ms`;
    }
  } catch (e) {
    document.getElementById(outputId).innerHTML = `<span class="output-error">Сервер недоступний: ${escHtml(e.message)}</span>`;
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
    if (!r.passed && r.got !== undefined) extra = ` (отримали: ${r.got})`;
    if (!r.passed && r.error) extra = ` (помилка: ${r.error})`;
    div.innerHTML = `<span class="test-icon">${icon}</span><span class="test-desc">${escHtml(r.desc)}${escHtml(extra)}</span>`;
    container.appendChild(div);
  });
}

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

function updateEditorTheme() {
  if (!_monacoLoaded) return;
  const theme = getMonacoTheme();
  monaco.editor.setTheme(theme);
}
