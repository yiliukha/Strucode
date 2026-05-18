// ── Mobile Sandbox — uses Piston API instead of local /api/run-code ───────────

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

// Piston language slugs mapping
const PISTON_LANG = {
  python:     { language: 'python',     version: '3.10' },
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

const STARTER_CODE = {
  python:     '# Python\nprint("Hello, World!")\n',
  javascript: '// JavaScript\nconsole.log("Hello, World!");\n',
  java:       'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n',
  sql:        '-- SQL\nSELECT "Hello, World!" AS greeting;\n',
  cpp:        '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n',
  rust:       'fn main() {\n    println!("Hello, World!");\n}\n',
  go:         'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n',
  php:        '<?php\necho "Hello, World!";\n',
  kotlin:     'fun main() {\n    println("Hello, World!")\n}\n',
  swift:      'print("Hello, World!")\n',
};

/**
 * Run code via Piston API.
 * @param {string} code
 * @param {string} lang - one of PISTON_LANG keys
 * @returns {Promise<{stdout, stderr, code, error}>}
 */
async function pistonRun(code, lang) {
  const pLang = PISTON_LANG[lang] || PISTON_LANG.python;
  const body = {
    language: pLang.language,
    version: pLang.version || '*',
    files: [{ content: code }],
  };

  const resp = await fetch(PISTON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw new Error(`Piston API error: ${resp.status} ${resp.statusText}`);
  }

  const data = await resp.json();
  // Piston response: { run: { stdout, stderr, code } }
  const run = data.run || {};
  return {
    stdout: run.stdout || '',
    stderr: run.stderr || '',
    exitCode: run.code ?? 0,
  };
}

/**
 * Execute code and display output in the given output element.
 * @param {string} code
 * @param {string} lang
 * @param {HTMLElement} outputEl
 * @param {HTMLElement} [runtimeEl]
 */
async function executeCode(code, lang, outputEl, runtimeEl) {
  if (!code.trim()) {
    outputEl.innerHTML = '<span style="color:var(--text3)">// Редактор порожній</span>';
    return;
  }

  outputEl.innerHTML = '<span class="spin">⟳</span> Виконую...';
  if (runtimeEl) runtimeEl.textContent = '';

  const t0 = Date.now();
  try {
    const { stdout, stderr, exitCode } = await pistonRun(code, lang);
    const ms = Date.now() - t0;
    if (runtimeEl) runtimeEl.textContent = `${ms}ms`;

    if (stderr && !stdout) {
      outputEl.innerHTML = `<span class="output-error">${escHtml(stderr)}</span>`;
    } else if (stderr) {
      outputEl.innerHTML =
        `<pre style="white-space:pre-wrap">${escHtml(stdout)}</pre>` +
        `<pre class="output-error" style="white-space:pre-wrap">${escHtml(stderr)}</pre>`;
    } else if (stdout) {
      outputEl.innerHTML = `<pre style="white-space:pre-wrap">${escHtml(stdout)}</pre>`;
    } else {
      outputEl.innerHTML = '<span style="color:var(--text3)">(немає виводу)</span>';
    }
  } catch (e) {
    outputEl.innerHTML = `<span class="output-error">❌ ${escHtml(e.message)}</span>`;
  }
}

/**
 * Check task: run code via Piston, compare output against expected strings.
 * @param {string} code
 * @param {string} lang
 * @param {Array<{desc, expected}>} tests - simple output_contains checks
 * @param {HTMLElement} outputEl
 * @param {HTMLElement} testResultsEl
 * @returns {Promise<boolean>} allPassed
 */
async function checkTask(code, lang, tests, outputEl, testResultsEl) {
  if (!code.trim()) {
    outputEl.innerHTML = '<span class="output-error">Код порожній</span>';
    return false;
  }

  outputEl.innerHTML = '<span class="spin">⟳</span> Перевіряю...';
  testResultsEl.innerHTML = '';

  try {
    const { stdout, stderr } = await pistonRun(code, lang);
    const combined = (stdout + '\n' + stderr).toLowerCase();

    let allPassed = true;
    const resultItems = [];

    for (const test of tests) {
      const expected = String(test.expected || '').trim();
      const passed = expected ? combined.includes(expected.toLowerCase()) : true;
      if (!passed) allPassed = false;
      resultItems.push({ passed, desc: test.desc || '', expected });
    }

    // Display output
    if (stderr && !stdout) {
      outputEl.innerHTML = `<span class="output-error">${escHtml(stderr)}</span>`;
    } else {
      outputEl.innerHTML = stdout
        ? `<pre style="white-space:pre-wrap">${escHtml(stdout)}</pre>`
        : '<span style="color:var(--text3)">(немає виводу)</span>';
    }

    // Display test results
    testResultsEl.innerHTML = resultItems.map(r =>
      `<div class="test-item ${r.passed ? 'pass' : 'fail'}">
        <span>${r.passed ? '✅' : '❌'}</span>
        <span>${escHtml(r.desc)}${!r.passed ? ` (очікується: ${escHtml(r.expected)})` : ''}</span>
      </div>`
    ).join('');

    return allPassed;
  } catch (e) {
    outputEl.innerHTML = `<span class="output-error">❌ ${escHtml(e.message)}</span>`;
    return false;
  }
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
