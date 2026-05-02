// ── Strucode — Main App ───────────────────────────────────────────────────────

const STORAGE_KEY = 'strucode_v1';

let _state = {
  xp: 0,
  streak: 0,
  lastActivity: null,
  completedChallenges: [],
  hearts: 3,
  theme: 'dark',
  aiModel: 'llama3.2:3b',
  lastCourse: null,
  lastLesson: null,
};

let _backStack = [];
let _activeScreen = 'home';

// ── Persistence ───────────────────────────────────────────────────────────────

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) _state = { ..._state, ...JSON.parse(raw) };
  } catch {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  } catch {}
}

// ── Screen navigation ─────────────────────────────────────────────────────────

function show(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screenId);
  if (el) el.classList.add('active');
  _activeScreen = screenId;

  const noNav = ['challenge', 'sandbox', 'lesson'];
  const nav = document.getElementById('bottom-nav');
  if (nav) nav.style.display = noNav.includes(screenId) ? 'none' : 'flex';

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });

  if (screenId === 'home') renderHome();
  if (screenId === 'courses') renderCourses();
  if (screenId === 'sandbox') initSandboxScreen();
  if (screenId === 'ai-chat') initAiChatScreen();
  if (screenId === 'settings') renderSettings();
}

function goBack() {
  const prev = _backStack.pop();
  if (prev) show(prev);
  else show('home');
}

function navigate(to, push = true) {
  if (push && _activeScreen !== to) _backStack.push(_activeScreen);
  show(to);
}

// ── Home screen ───────────────────────────────────────────────────────────────

function renderHome() {
  updateXpDisplay();

  const greeting = document.getElementById('home-greeting');
  if (greeting) {
    const hour = new Date().getHours();
    const greetings = hour < 12 ? 'Доброго ранку! 🌅' : hour < 18 ? 'Привіт! Готовий кодити? 💻' : 'Добрий вечір! 🌙';
    greeting.textContent = greetings;
  }

  checkStreak();

  const daily = getDailyChallenge();
  const dailyTitle = document.getElementById('daily-title');
  const dailyMeta = document.getElementById('daily-meta');
  if (dailyTitle) dailyTitle.textContent = daily.title;
  if (dailyMeta) dailyMeta.textContent = `${daily.lang} · +${daily.xp} XP`;

  document.getElementById('btn-daily-start')?.addEventListener('click', () => {
    navigate('courses');
  });

  const continueWrap = document.getElementById('home-continue-wrap');
  const continueCard = document.getElementById('home-continue');
  if (_state.lastCourse && continueWrap && continueCard) {
    const course = COURSES[_state.lastCourse];
    if (course) {
      continueWrap.style.display = 'block';
      continueCard.innerHTML = `
        <span style="font-size:28px">${course.icon}</span>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600">${course.name}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">Продовж з того місця</div>
        </div>
        <span style="color:var(--primary);font-size:18px">→</span>`;
      continueCard.onclick = () => navigate('courses');
    }
  }

  const grid = document.getElementById('home-course-grid');
  if (grid) {
    grid.innerHTML = '';
    Object.values(COURSES).forEach(course => {
      const completed = countCompleted(course);
      const total = countTotal(course);
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      const card = document.createElement('div');
      card.className = 'course-card fade-in';
      card.innerHTML = `
        <div class="course-icon">${course.icon}</div>
        <div class="course-name">${course.name}</div>
        <div class="course-progress-bar">
          <div class="course-progress-fill" style="width:${progress}%;background:${course.color}"></div>
        </div>`;
      card.onclick = () => { navigate('courses'); };
      grid.appendChild(card);
    });
  }
}

// ── XP / Streak ───────────────────────────────────────────────────────────────

function updateXpDisplay() {
  const xp = _state.xp;
  const level = getLevel(xp);
  const next = getNextLevel(xp);
  const progress = getXpProgress(xp);

  const badge = document.getElementById('level-badge');
  if (badge) badge.textContent = level.icon + ' ' + level.name;

  const xpNum = document.getElementById('xp-number');
  if (xpNum) xpNum.textContent = next ? `${xp} / ${next.min} XP` : `${xp} XP (Макс!)`;

  const bar = document.getElementById('xp-bar');
  if (bar) bar.style.width = progress + '%';

  const homeXp = document.getElementById('home-xp');
  if (homeXp) homeXp.textContent = xp + ' XP';

  const streakCount = document.getElementById('streak-count');
  if (streakCount) streakCount.textContent = _state.streak;
}

function checkStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last = _state.lastActivity;
  if (last === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (last === yesterday) {
    _state.streak = (_state.streak || 0) + 1;
  } else if (last && last !== today) {
    _state.streak = 0;
  }

  _state.lastActivity = today;
  saveState();
}

function addXp(amount) {
  const oldLevel = getLevel(_state.xp);
  _state.xp += amount;
  _state.lastActivity = new Date().toISOString().slice(0, 10);
  saveState();
  const newLevel = getLevel(_state.xp);
  updateXpDisplay();

  showXpModal(amount, newLevel.name !== oldLevel.name ? `Рівень підвищено: ${newLevel.icon} ${newLevel.name}!` : null);
}

function onTaskPassed(challengeId, xp) {
  if (_state.completedChallenges.includes(challengeId)) {
    toast('Ти вже виконав цю задачу! ✅');
    return;
  }
  _state.completedChallenges.push(challengeId);
  addXp(xp);
  checkStreak();
  toast(`+${xp} XP 🎉`);
}

// ── Courses screen ────────────────────────────────────────────────────────────

function renderCourses() {
  const list = document.getElementById('course-list');
  if (!list) return;
  list.innerHTML = '';

  Object.values(COURSES).forEach(course => {
    const completed = countCompleted(course);
    const total = countTotal(course);
    const item = document.createElement('div');
    item.className = 'course-item fade-in';
    item.innerHTML = `
      <div class="course-item-header">
        <div class="course-item-icon">${course.icon}</div>
        <div class="course-item-info">
          <div class="course-item-name">${course.name}</div>
          <div class="course-item-desc">${course.desc}</div>
          <div class="course-item-meta">
            <span class="course-item-stat">✅ ${completed}/${total} задач</span>
            <span class="course-item-stat">🗣 ${course.language}</span>
          </div>
        </div>
        <div class="course-item-arrow">▾</div>
      </div>
      <div class="module-list" id="modules-${course.id}"></div>`;

    item.querySelector('.course-item-header').addEventListener('click', () => {
      const ml = item.querySelector('.module-list');
      const arrow = item.querySelector('.course-item-arrow');
      const isOpen = ml.classList.contains('open');
      ml.classList.toggle('open', !isOpen);
      arrow.textContent = isOpen ? '▾' : '▴';
      if (!ml.children.length) renderModules(course, ml);
      _state.lastCourse = course.id;
      saveState();
    });

    list.appendChild(item);
  });
}

function renderModules(course, container) {
  course.modules.forEach(mod => {
    const modEl = document.createElement('div');
    modEl.className = 'module-item';
    modEl.innerHTML = `
      <div class="module-header">
        <span>${mod.icon || '📌'}</span>
        <span>${mod.title}</span>
        <span style="margin-left:auto;color:var(--text2);font-size:12px">${mod.lessons.length} уроків</span>
        <span style="margin-left:8px">▾</span>
      </div>
      <div class="module-lessons" id="lessons-${mod.id}"></div>`;

    modEl.querySelector('.module-header').addEventListener('click', () => {
      const ll = modEl.querySelector('.module-lessons');
      const arrow = modEl.querySelector('.module-header span:last-child');
      const isOpen = ll.classList.contains('open');
      ll.classList.toggle('open', !isOpen);
      arrow.textContent = isOpen ? '▾' : '▴';
      if (!ll.children.length) renderLessons(course, mod, ll);
    });

    container.appendChild(modEl);
  });
}

function renderLessons(course, mod, container) {
  mod.lessons.forEach(lesson => {
    const totalChallenges = lesson.challenges ? lesson.challenges.length : 0;
    const doneChallenges = lesson.challenges
      ? lesson.challenges.filter(c => _state.completedChallenges.includes(c.id)).length
      : 0;
    const isDone = totalChallenges > 0 && doneChallenges === totalChallenges;
    const xpTotal = lesson.challenges ? lesson.challenges.reduce((s, c) => s + (c.xp || 0), 0) : 0;

    const item = document.createElement('div');
    item.className = 'lesson-item' + (isDone ? ' completed' : '');
    item.innerHTML = `
      <span class="lesson-status">${isDone ? '✅' : '📖'}</span>
      <span class="lesson-name">${lesson.title}</span>
      <span style="font-size:11px;color:var(--text2)">${doneChallenges}/${totalChallenges}</span>
      <span class="lesson-xp">+${xpTotal} XP</span>`;
    item.addEventListener('click', () => openLesson(course, lesson));
    container.appendChild(item);
  });
}

// ── Lesson screen ─────────────────────────────────────────────────────────────

function openLesson(course, lesson) {
  _state.lastCourse = course.id;
  _state.lastLesson = lesson.id;
  saveState();
  _backStack.push(_activeScreen);

  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-theory').innerHTML = lesson.theory || '';
  updateHeartsDisplay();

  const challengeList = document.getElementById('challenge-list');
  challengeList.innerHTML = '';
  (lesson.challenges || []).forEach(challenge => {
    const done = _state.completedChallenges.includes(challenge.id);
    const item = document.createElement('div');
    item.className = 'challenge-list-item' + (done ? ' done' : '');
    item.innerHTML = `
      <span class="cli-icon">${done ? '✅' : '💻'}</span>
      <div class="cli-info">
        <div class="cli-name">${challenge.title}</div>
        <div class="cli-meta">${challenge.language || course.language} · ${challenge.tests ? challenge.tests.length + ' тест(ів)' : ''}</div>
      </div>
      <span class="cli-xp">+${challenge.xp} XP</span>`;
    item.addEventListener('click', () => openChallenge(challenge));
    challengeList.appendChild(item);
  });

  show('lesson');
}

function updateHeartsDisplay() {
  const el = document.getElementById('hearts-display');
  if (!el) return;
  el.textContent = '❤️'.repeat(Math.max(0, _state.hearts)) + '🖤'.repeat(Math.max(0, 3 - _state.hearts));
}

// ── Challenge screen ──────────────────────────────────────────────────────────

function openChallenge(challenge) {
  _backStack.push(_activeScreen);
  initChallengeScreen(challenge);
  show('challenge');
}

// ── Settings screen ───────────────────────────────────────────────────────────

function renderSettings() {
  const progressInfo = document.getElementById('settings-progress-info');
  if (progressInfo) {
    const level = getLevel(_state.xp);
    progressInfo.textContent = `${level.icon} ${level.name} · ${_state.xp} XP · Streak: ${_state.streak} днів · Виконано: ${_state.completedChallenges.length} задач`;
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === _state.theme);
  });

  const ollamaInfo = document.getElementById('settings-ollama-info');
  const ollamaControls = document.getElementById('settings-ollama-controls');
  if (ollamaInfo) {
    checkOllamaStatus().then(({ installed, running }) => {
      ollamaInfo.textContent = running ? '✅ Ollama запущена і готова' : installed ? '⚠️ Встановлена, але не запущена' : '❌ Не встановлена';
      if (ollamaControls) {
        ollamaControls.innerHTML = '';
        if (installed && !running) {
          const btn = document.createElement('button');
          btn.className = 'btn btn-secondary';
          btn.textContent = '▶ Запустити Ollama';
          btn.onclick = async () => {
            btn.textContent = 'Запуск...';
            await fetch('/api/start-ollama');
            renderSettings();
          };
          ollamaControls.appendChild(btn);
        }
      }
    });
  }
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function toast(msg, duration = 2500) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  requestAnimationFrame(() => {
    el.classList.add('show');
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => { el.style.display = 'none'; }, 300);
    }, duration);
  });
}

// ── XP Modal ──────────────────────────────────────────────────────────────────

function showXpModal(xp, levelUpMsg) {
  const modal = document.getElementById('modal-xp-gain');
  const text = document.getElementById('xp-modal-text');
  const sub = document.getElementById('xp-modal-sub');
  if (!modal) return;
  text.textContent = `+${xp} XP`;
  sub.textContent = levelUpMsg || 'Задачу виконано! 🎉';
  modal.style.display = 'flex';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function countCompleted(course) {
  let n = 0;
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      for (const ch of (lesson.challenges || [])) {
        if (_state.completedChallenges.includes(ch.id)) n++;
      }
    }
  }
  return n;
}

function countTotal(course) {
  let n = 0;
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      n += (lesson.challenges || []).length;
    }
  }
  return n;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  _state.theme = theme;
  saveState();
  updateEditorTheme();
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

// ── Event listeners ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme(_state.theme || 'dark');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.screen, false));
  });

  document.getElementById('btn-lesson-back')?.addEventListener('click', goBack);

  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    if (confirm('Скинути весь прогрес? Цю дію не можна відмінити.')) {
      _state = { xp: 0, streak: 0, lastActivity: null, completedChallenges: [], hearts: 3, theme: _state.theme, aiModel: _state.aiModel };
      saveState();
      renderSettings();
      toast('Прогрес скинуто');
    }
  });

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });

  document.getElementById('btn-xp-modal-close')?.addEventListener('click', () => {
    document.getElementById('modal-xp-gain').style.display = 'none';
  });

  setupChallengeHandlers();
  setupSandboxHandlers();

  show('home');

  setTimeout(() => {
    const splash = document.getElementById('splash-overlay');
    if (splash) {
      splash.style.opacity = '0';
      splash.style.visibility = 'hidden';
      setTimeout(() => splash.remove(), 700);
    }
  }, 900);

  window._app = { goBack, onTaskPassed, toast, navigate };

  checkOllamaStatus();
});
