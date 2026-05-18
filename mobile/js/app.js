// ── Strucode Mobile App ───────────────────────────────────────────────────────
// No Ollama, no desktop-specific code.
// AI via Gemini API. Code execution via Piston API (sandbox.js).

'use strict';

// ── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'strucode_progress';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function getProgress() {
  let p = loadProgress();
  if (!p.completedTasks) p.completedTasks = {};
  if (!p.completedLessons) p.completedLessons = {};
  if (!p.xp) p.xp = 0;
  if (!p.streak) p.streak = 0;
  if (!p.lastDay) p.lastDay = null;
  if (!p.userName) p.userName = 'Студент';
  if (!p.theme) p.theme = 'dark';
  if (!p.geminiKey) p.geminiKey = '';
  return p;
}

function saveField(key, val) {
  const p = getProgress();
  p[key] = val;
  saveProgress(p);
}

// ── Streak ───────────────────────────────────────────────────────────────────

function updateStreak() {
  const p = getProgress();
  const today = new Date().toDateString();
  if (p.lastDay !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (p.lastDay === yesterday) {
      p.streak = (p.streak || 0) + 1;
    } else if (!p.lastDay) {
      p.streak = 1;
    } else {
      p.streak = 1; // streak broken
    }
    p.lastDay = today;
    saveProgress(p);
  }
  return p.streak;
}

// ── App state ─────────────────────────────────────────────────────────────────

let currentScreen = 'home';
let courseDetailId = null;
let activeLessonData = null;
let activeChallengeData = null;
let cmEditor = null;  // CodeMirror instance
let sandboxCmEditor = null;  // Sandbox CodeMirror

// ── Navigation ────────────────────────────────────────────────────────────────

function showScreen(id, pushState = true) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (el) el.classList.add('active');

  // Update bottom nav
  document.querySelectorAll('.bn-item').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === id);
  });

  currentScreen = id;

  // Update active state for nested screens
  const mainTabs = ['home', 'courses', 'sandbox', 'ai', 'settings'];
  mainTabs.forEach(t => {
    const btn = document.querySelector(`.bn-item[data-screen="${t}"]`);
    if (btn) btn.classList.toggle('active', id === t || id.startsWith(t + '-'));
  });
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function toast(msg, ms = 2500) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), ms);
}

// ── Theme ─────────────────────────────────────────────────────────────────────

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme || 'dark';
}

// ── CodeMirror loader ─────────────────────────────────────────────────────────

let _cmLoaded = false;
let _cmLoading = false;
const _cmCallbacks = [];

function loadCodeMirror(cb) {
  if (_cmLoaded) { cb(); return; }
  _cmCallbacks.push(cb);
  if (_cmLoading) return;
  _cmLoading = true;

  // Use esm.sh for CodeMirror 6
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import { EditorView, basicSetup } from 'https://esm.sh/codemirror@6.0.1';
    import { python } from 'https://esm.sh/@codemirror/lang-python@6.1.4';
    import { javascript } from 'https://esm.sh/@codemirror/lang-javascript@6.2.1';
    import { java } from 'https://esm.sh/@codemirror/lang-java@6.1.1';
    import { sql } from 'https://esm.sh/@codemirror/lang-sql@6.5.3';
    import { cpp } from 'https://esm.sh/@codemirror/lang-cpp@6.0.2';
    import { rust } from 'https://esm.sh/@codemirror/lang-rust@6.0.1';
    import { go } from 'https://esm.sh/@codemirror/lang-go@6.0.2';
    import { php } from 'https://esm.sh/@codemirror/lang-php@6.0.1';
    import { oneDark } from 'https://esm.sh/@codemirror/theme-one-dark@6.1.2';

    window._CM = { EditorView, basicSetup, langs: { python, javascript, java, sql, cpp, rust, go, php }, oneDark };
    window.dispatchEvent(new Event('cm-ready'));
  `;
  document.head.appendChild(script);
}

window.addEventListener('cm-ready', () => {
  _cmLoaded = true;
  _cmLoading = false;
  _cmCallbacks.forEach(cb => cb());
  _cmCallbacks.length = 0;
});

function createCmEditor(container, lang, initialCode) {
  if (!window._CM) return null;
  const { EditorView, basicSetup, langs, oneDark } = window._CM;

  const langExt = langs[lang] ? langs[lang]() : langs.javascript();

  const theme = document.documentElement.dataset.theme;
  const extensions = [basicSetup, langExt];
  if (theme !== 'light') extensions.push(oneDark);

  return new EditorView({
    doc: initialCode || STARTER_CODE[lang] || '',
    extensions,
    parent: container,
  });
}

function getEditorCode(editor, fallbackId) {
  if (editor && editor.state) return editor.state.doc.toString();
  const ta = document.querySelector(`#${fallbackId} textarea`);
  return ta ? ta.value : '';
}

function showEditorFallback(container, initialCode) {
  container.innerHTML = '';
  const ta = document.createElement('textarea');
  ta.className = 'editor-fallback';
  ta.value = initialCode || '';
  ta.placeholder = '// Введіть код тут...';
  container.appendChild(ta);
}

// ── COURSES data ──────────────────────────────────────────────────────────────

function getCoursesData() {
  // Try to use desktop COURSES if loaded on same domain; otherwise use embedded minimal set
  if (typeof COURSES !== 'undefined') return COURSES;
  return EMBEDDED_COURSES;
}

// Minimal embedded course data for offline use
const EMBEDDED_COURSES = {
  javascript: {
    id: 'javascript', name: 'JavaScript', icon: '🟨', color: '#f7df1e',
    desc: 'Основа веб-розробки. Від змінних до async/await.',
    language: 'javascript', locked: false,
    modules: [
      {
        id: 'js-basics', title: 'Основи', icon: '🔤',
        lessons: [
          {
            id: 'js-l01', title: 'Змінні: let і const',
            theory: '<h2>Змінні в JavaScript</h2><p>Використовуй <code>const</code> для незмінних значень, <code>let</code> для змінних.</p><pre><code>const name = "Alice";\nlet score = 0;\nscore = 10;</code></pre>',
            challenges: [
              { id: 'js-l01-c1', title: 'Оголоси змінну', prompt: 'Оголоси <code>const name</code> зі своїм іменем та виведи його за допомогою <code>console.log</code>.', starterCode: '// Оголоси const name\n', xp: 10, language: 'javascript', tests: [{ desc: 'Вивід не порожній', expected: '' }] },
            ]
          },
          {
            id: 'js-l02', title: 'Умови: if / else',
            theory: '<h2>Умовні оператори</h2><pre><code>const age = 20;\nif (age >= 18) {\n  console.log("Дорослий");\n} else {\n  console.log("Неповнолітній");\n}</code></pre>',
            challenges: [
              { id: 'js-l02-c1', title: 'Перевірка числа', prompt: 'Напиши код, який виводить "парне" або "непарне" для числа 7.', starterCode: 'const n = 7;\n// твій код\n', xp: 15, language: 'javascript', tests: [{ desc: 'Вивід містить слово', expected: '' }] },
            ]
          },
        ]
      }
    ]
  },
  python: {
    id: 'python', name: 'Python', icon: '🐍', color: '#3572A5',
    desc: 'Найпопулярніша мова для AI, Data Science та автоматизації.',
    language: 'python', locked: false,
    modules: [
      {
        id: 'py-basics', title: 'Основи', icon: '🔤',
        lessons: [
          {
            id: 'py-l01', title: 'print та змінні',
            theory: '<h2>Python — перші кроки</h2><pre><code>name = "Alice"\nprint("Hello", name)\n\nage = 25\nprint(f"Вік: {age}")</code></pre>',
            challenges: [
              { id: 'py-l01-c1', title: 'Hello World', prompt: 'Виведи "Hello, World!" за допомогою <code>print()</code>.', starterCode: '# Твій Python код\n', xp: 10, language: 'python', tests: [{ desc: 'Виводить Hello', expected: 'Hello' }] },
            ]
          },
        ]
      }
    ]
  },
};

// ── HOME Screen ───────────────────────────────────────────────────────────────

function renderHome() {
  const p = getProgress();
  updateStreak();

  // User card
  const avatarEl = document.getElementById('home-avatar');
  const nameEl = document.getElementById('home-name');
  if (avatarEl) avatarEl.textContent = (p.userName || 'С')[0].toUpperCase();
  if (nameEl) nameEl.textContent = p.userName || 'Студент';

  // Stats
  const xpEl = document.getElementById('stat-xp');
  const streakEl = document.getElementById('stat-streak');
  const lessonsEl = document.getElementById('stat-lessons');
  if (xpEl) xpEl.textContent = p.xp || 0;
  if (streakEl) streakEl.textContent = p.streak || 0;
  if (lessonsEl) lessonsEl.textContent = Object.keys(p.completedLessons || {}).length;

  // Featured course
  const featuredWrap = document.getElementById('home-featured');
  if (featuredWrap) {
    const courses = getCoursesData();
    const courseList = Object.values(courses).filter(c => !c.locked);
    const firstCourse = courseList[0];
    if (firstCourse) {
      featuredWrap.innerHTML = `
        <div class="section-title">Продовжи навчання</div>
        <div class="featured-course" data-course="${firstCourse.id}">
          <span class="featured-icon">${firstCourse.icon}</span>
          <div>
            <div class="featured-name">${firstCourse.name}</div>
            <div class="featured-meta">${firstCourse.desc}</div>
          </div>
          <span class="featured-arrow">›</span>
        </div>`;
      featuredWrap.querySelector('.featured-course')?.addEventListener('click', () => {
        openCourseDetail(firstCourse.id);
      });
    }
  }
}

// ── COURSES Screen ────────────────────────────────────────────────────────────

function renderCourses() {
  const list = document.getElementById('course-list');
  if (!list) return;

  const courses = getCoursesData();
  const p = getProgress();
  list.innerHTML = '';

  Object.values(courses).forEach(course => {
    const totalLessons = (course.modules || []).reduce((a, m) => a + (m.lessons || []).length, 0);
    const doneLessons = (course.modules || []).reduce((a, m) =>
      a + (m.lessons || []).filter(l => p.completedLessons?.[l.id]).length, 0);
    const pct = totalLessons ? Math.round(doneLessons / totalLessons * 100) : 0;

    const card = document.createElement('div');
    card.className = 'course-card' + (course.locked ? ' locked' : '');
    card.innerHTML = `
      <div class="course-logo" style="background:${course.color || '#6366f1'}22">
        <span style="font-size:1.5rem">${course.icon || '📚'}</span>
      </div>
      <div class="course-info">
        <div class="course-name">${course.name}</div>
        <div class="course-desc">${course.desc || ''}</div>
        <div class="course-progress-bar"><div class="course-progress-fill" style="width:${pct}%"></div></div>
      </div>
      <span class="course-arrow">›</span>`;

    if (!course.locked) {
      card.addEventListener('click', () => openCourseDetail(course.id));
    }
    list.appendChild(card);
  });
}

function openCourseDetail(courseId) {
  courseDetailId = courseId;
  const courses = getCoursesData();
  const course = courses[courseId];
  if (!course) return;

  const header = document.getElementById('course-detail-title');
  if (header) header.textContent = `${course.icon || '📚'} ${course.name}`;

  renderCourseModules(course);
  showScreen('course-detail');
}

function renderCourseModules(course) {
  const body = document.getElementById('course-detail-body');
  if (!body) return;

  const p = getProgress();
  body.innerHTML = '';

  (course.modules || []).forEach(mod => {
    const card = document.createElement('div');
    card.className = 'module-card';
    card.innerHTML = `<div class="module-header"><span>${mod.icon || '📁'}</span> ${mod.title}</div>`;

    const lessonList = document.createElement('div');
    (mod.lessons || []).forEach(les => {
      const done = !!p.completedLessons?.[les.id];
      const item = document.createElement('div');
      item.className = 'lesson-item';
      const totalXp = (les.challenges || []).reduce((a, c) => a + (c.xp || 0), 0);
      item.innerHTML = `
        <div class="lesson-check ${done ? 'done' : ''}">
          ${done ? '✓' : '○'}
        </div>
        <div class="lesson-title">${les.title}</div>
        <div class="lesson-xp">${totalXp ? '+' + totalXp + ' XP' : ''}</div>
        <span style="color:var(--text3);margin-left:4px">›</span>`;
      item.addEventListener('click', () => openLesson(course.id, mod.id, les.id));
      lessonList.appendChild(item);
    });
    card.appendChild(lessonList);
    body.appendChild(card);
  });
}

// ── LESSON Screen ─────────────────────────────────────────────────────────────

function openLesson(courseId, modId, lesId) {
  const courses = getCoursesData();
  const course = courses[courseId];
  const mod = course?.modules?.find(m => m.id === modId);
  const les = mod?.lessons?.find(l => l.id === lesId);
  if (!les) return;

  activeLessonData = { courseId, modId, les };

  const titleEl = document.getElementById('lesson-title');
  if (titleEl) titleEl.textContent = les.title;

  const theoryEl = document.getElementById('lesson-theory');
  if (theoryEl) theoryEl.innerHTML = les.theory || '<p>Теорія незабаром...</p>';

  renderLessonChallenges(les);
  showScreen('lesson');
}

function renderLessonChallenges(les) {
  const section = document.getElementById('lesson-challenges');
  if (!section) return;

  const p = getProgress();
  const challenges = les.challenges || [];

  if (!challenges.length) {
    section.innerHTML = '';
    return;
  }

  section.innerHTML = `<div class="challenge-section">
    <div class="challenge-section-title">Задачі (${challenges.length})</div>
    ${challenges.map(ch => {
      const done = !!p.completedTasks?.[ch.id];
      return `<div class="challenge-item ${done ? 'done' : ''}" data-id="${ch.id}">
        <div class="challenge-item-info">
          <div class="challenge-item-title">${ch.title}</div>
          <div class="challenge-item-xp">+${ch.xp || 10} XP${done ? ' ✓' : ''}</div>
        </div>
        <span class="challenge-item-arrow">›</span>
      </div>`;
    }).join('')}
  </div>`;

  challenges.forEach(ch => {
    section.querySelector(`[data-id="${ch.id}"]`)?.addEventListener('click', () => {
      openChallenge(les, ch);
    });
  });
}

// ── CHALLENGE Screen ──────────────────────────────────────────────────────────

function openChallenge(les, challenge) {
  activeChallengeData = { les, challenge };

  const titleEl = document.getElementById('challenge-title');
  if (titleEl) titleEl.textContent = challenge.title;

  const xpEl = document.getElementById('challenge-xp');
  if (xpEl) xpEl.textContent = `+${challenge.xp || 10} XP`;

  const descEl = document.getElementById('challenge-desc');
  if (descEl) descEl.innerHTML = challenge.prompt || '';

  const lang = challenge.language || 'javascript';
  const langSel = document.getElementById('challenge-lang-select');
  if (langSel) langSel.value = lang;

  const outputEl = document.getElementById('challenge-output');
  if (outputEl) outputEl.innerHTML = '<span class="output-placeholder">// Натисни ▶ Run</span>';

  const testEl = document.getElementById('challenge-tests');
  if (testEl) testEl.innerHTML = '';

  // Setup editor
  const container = document.getElementById('challenge-editor-wrap');
  if (container) {
    container.innerHTML = '';
    if (cmEditor) { try { cmEditor.destroy(); } catch {} cmEditor = null; }

    loadCodeMirror(() => {
      if (window._CM && container) {
        cmEditor = createCmEditor(container, lang, challenge.starterCode || STARTER_CODE[lang]);
      } else {
        showEditorFallback(container, challenge.starterCode || STARTER_CODE[lang]);
      }
    });
  }

  showScreen('challenge');
}

// ── SANDBOX Screen ────────────────────────────────────────────────────────────

function initSandbox() {
  const container = document.getElementById('sandbox-editor-wrap');
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = '1';

  const lang = document.getElementById('sandbox-lang-select')?.value || 'python';

  loadCodeMirror(() => {
    if (window._CM && container) {
      container.innerHTML = '';
      sandboxCmEditor = createCmEditor(container, lang, STARTER_CODE[lang]);
    } else {
      showEditorFallback(container, STARTER_CODE[lang]);
    }
  });
}

function setupSandboxHandlers() {
  const langSel = document.getElementById('sandbox-lang-select');
  langSel?.addEventListener('change', e => {
    const lang = e.target.value;
    if (sandboxCmEditor && window._CM) {
      // Replace editor with new language
      const container = document.getElementById('sandbox-editor-wrap');
      if (container) {
        try { sandboxCmEditor.destroy(); } catch {}
        sandboxCmEditor = createCmEditor(container, lang, STARTER_CODE[lang]);
      }
    } else {
      const ta = document.querySelector('#sandbox-editor-wrap textarea');
      if (ta) ta.value = STARTER_CODE[lang] || '';
    }
  });

  document.getElementById('btn-sandbox-run')?.addEventListener('click', async () => {
    const lang = document.getElementById('sandbox-lang-select')?.value || 'python';
    const code = getEditorCode(sandboxCmEditor, 'sandbox-editor-wrap');
    const outputEl = document.getElementById('sandbox-output');
    const runtimeEl = document.getElementById('sandbox-runtime');
    if (outputEl) await executeCode(code, lang, outputEl, runtimeEl);
  });

  document.getElementById('btn-sandbox-clear')?.addEventListener('click', () => {
    const lang = document.getElementById('sandbox-lang-select')?.value || 'python';
    if (sandboxCmEditor && window._CM) {
      sandboxCmEditor.dispatch({ changes: { from: 0, to: sandboxCmEditor.state.doc.length, insert: STARTER_CODE[lang] || '' } });
    } else {
      const ta = document.querySelector('#sandbox-editor-wrap textarea');
      if (ta) ta.value = STARTER_CODE[lang] || '';
    }
    const outputEl = document.getElementById('sandbox-output');
    if (outputEl) outputEl.innerHTML = '<span class="output-placeholder">// Натисни ▶ Run</span>';
  });
}

// ── AI Screen (Gemini) ────────────────────────────────────────────────────────

let aiChatHistory = [];

function getGeminiKey() {
  return getProgress().geminiKey || '';
}

async function geminiChat(message) {
  const key = getGeminiKey();
  if (!key) throw new Error('Gemini API key не вказано. Додай у Налаштування.');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

  aiChatHistory.push({ role: 'user', parts: [{ text: message }] });

  const body = {
    contents: aiChatHistory,
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    systemInstruction: {
      parts: [{ text: 'Ти AI-ментор для навчання програмування. Відповідай коротко, з прикладами коду. Мова — українська або та, якою говорить студент.' }]
    }
  };

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${resp.status}`);
  }

  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '(немає відповіді)';
  aiChatHistory.push({ role: 'model', parts: [{ text }] });
  return text;
}

function appendChatMsg(text, type) {
  const msgs = document.getElementById('ai-messages');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function setupAiScreen() {
  const sendBtn = document.getElementById('btn-ai-send');
  const inputEl = document.getElementById('ai-input');

  const doSend = async () => {
    const text = inputEl?.value?.trim();
    if (!text) return;
    if (inputEl) inputEl.value = '';

    appendChatMsg(text, 'user');

    const loadEl = appendChatMsg('🤖 Думаю...', 'ai loading');

    try {
      const answer = await geminiChat(text);
      if (loadEl) { loadEl.textContent = answer; loadEl.classList.remove('loading'); }
    } catch (e) {
      if (loadEl) { loadEl.textContent = '❌ ' + e.message; loadEl.classList.remove('loading'); }
    }
  };

  sendBtn?.addEventListener('click', doSend);
  inputEl?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
  });

  // Scenario buttons
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt || btn.textContent;
      if (inputEl) { inputEl.value = prompt; inputEl.focus(); }
    });
  });
}

function renderAiScreen() {
  const keyBanner = document.getElementById('ai-key-banner');
  const key = getGeminiKey();
  if (keyBanner) keyBanner.style.display = key ? 'none' : 'block';
}

// ── SETTINGS Screen ───────────────────────────────────────────────────────────

function renderSettings() {
  const p = getProgress();
  const nameInput = document.getElementById('settings-name');
  if (nameInput) nameInput.value = p.userName || '';
  const keyInput = document.getElementById('settings-gemini-key');
  if (keyInput) keyInput.value = p.geminiKey || '';

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === (p.theme || 'dark'));
  });
}

function setupSettingsHandlers() {
  const nameInput = document.getElementById('settings-name');
  nameInput?.addEventListener('input', () => {
    saveField('userName', nameInput.value);
    const homeNameEl = document.getElementById('home-name');
    if (homeNameEl) homeNameEl.textContent = nameInput.value || 'Студент';
    const homeAvEl = document.getElementById('home-avatar');
    if (homeAvEl) homeAvEl.textContent = (nameInput.value || 'С')[0].toUpperCase();
  });

  const keyInput = document.getElementById('settings-gemini-key');
  keyInput?.addEventListener('input', () => {
    saveField('geminiKey', keyInput.value.trim());
  });

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      saveField('theme', theme);
      renderSettings();
    });
  });

  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    if (confirm('Скинути весь прогрес?')) {
      const p = getProgress();
      p.completedTasks = {};
      p.completedLessons = {};
      p.xp = 0;
      p.streak = 0;
      p.lastDay = null;
      saveProgress(p);
      toast('Прогрес скинуто');
      renderHome();
    }
  });
}

// ── Challenge Run/Check handlers ───────────────────────────────────────────────

function setupChallengeHandlers() {
  document.getElementById('btn-challenge-run')?.addEventListener('click', async () => {
    if (!activeChallengeData) return;
    const lang = document.getElementById('challenge-lang-select')?.value ||
      activeChallengeData.challenge.language || 'javascript';
    const code = getEditorCode(cmEditor, 'challenge-editor-wrap');
    const outputEl = document.getElementById('challenge-output');
    if (outputEl) await executeCode(code, lang, outputEl);
  });

  document.getElementById('btn-challenge-check')?.addEventListener('click', async () => {
    if (!activeChallengeData) return;
    const { les, challenge } = activeChallengeData;
    const lang = challenge.language || 'javascript';
    const code = getEditorCode(cmEditor, 'challenge-editor-wrap');
    const outputEl = document.getElementById('challenge-output');
    const testEl = document.getElementById('challenge-tests');

    if (!outputEl || !testEl) return;

    const passed = await checkTask(code, lang, challenge.tests || [], outputEl, testEl);

    if (passed) {
      const p = getProgress();
      const alreadyDone = !!p.completedTasks?.[challenge.id];
      if (!alreadyDone) {
        p.completedTasks[challenge.id] = true;
        p.xp = (p.xp || 0) + (challenge.xp || 10);
        // Check if all challenges in lesson are done
        const allDone = (les.challenges || []).every(c => p.completedTasks?.[c.id]);
        if (allDone) {
          p.completedLessons[les.id] = true;
          toast(`🎉 Урок пройдено! +${challenge.xp || 10} XP`);
        } else {
          toast(`✅ +${challenge.xp || 10} XP`);
        }
        updateStreak();
        saveProgress(p);
        renderHome();
        if (activeLessonData) renderLessonChallenges(les);
      } else {
        toast('✅ Задача вже виконана');
      }
    }
  });

  document.getElementById('challenge-lang-select')?.addEventListener('change', e => {
    const lang = e.target.value;
    if (cmEditor && window._CM) {
      const container = document.getElementById('challenge-editor-wrap');
      if (container) {
        const currentCode = getEditorCode(cmEditor, 'challenge-editor-wrap');
        try { cmEditor.destroy(); } catch {}
        cmEditor = createCmEditor(container, lang, currentCode || STARTER_CODE[lang]);
      }
    }
  });
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────

function setupBottomNav() {
  document.querySelectorAll('.bn-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.screen;
      if (!target) return;
      if (target === 'home') renderHome();
      if (target === 'courses') renderCourses();
      if (target === 'sandbox') initSandbox();
      if (target === 'ai') renderAiScreen();
      if (target === 'settings') renderSettings();
      showScreen(target);
    });
  });
}

// ── Back buttons ──────────────────────────────────────────────────────────────

function setupBackButtons() {
  document.getElementById('btn-back-course-detail')?.addEventListener('click', () => {
    showScreen('courses');
    renderCourses();
  });
  document.getElementById('btn-back-lesson')?.addEventListener('click', () => {
    if (courseDetailId) {
      showScreen('course-detail');
    } else {
      showScreen('courses');
    }
  });
  document.getElementById('btn-back-challenge')?.addEventListener('click', () => {
    showScreen('lesson');
  });
}

// ── Key input in AI settings ──────────────────────────────────────────────────

function setupAiKeyBanner() {
  const saveBtn = document.getElementById('btn-save-ai-key');
  const keyInput = document.getElementById('ai-key-input');
  saveBtn?.addEventListener('click', () => {
    const key = keyInput?.value?.trim();
    if (key) {
      saveField('geminiKey', key);
      document.getElementById('ai-key-banner').style.display = 'none';
      toast('API ключ збережено');
    }
  });
}

// ── Splash ────────────────────────────────────────────────────────────────────

function hideSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  setTimeout(() => {
    splash.classList.add('hidden');
    setTimeout(() => splash.remove(), 600);
  }, 1200);
}

// ── Init ──────────────────────────────────────────────────────────────────────

function init() {
  const p = getProgress();
  applyTheme(p.theme || 'dark');
  updateStreak();

  setupBottomNav();
  setupBackButtons();
  setupChallengeHandlers();
  setupSandboxHandlers();
  setupAiScreen();
  setupSettingsHandlers();
  setupAiKeyBanner();

  renderHome();
  showScreen('home');

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/mobile/service-worker.js').catch(() => {});
  }

  hideSplash();
}

document.addEventListener('DOMContentLoaded', init);
