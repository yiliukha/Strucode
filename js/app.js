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
let _newsAutoRefreshTimer = null;

// ── Persistence ───────────────────────────────────────────────────────────────

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) _state = { ..._state, ...JSON.parse(raw) };
  } catch {}
  if (_state.lang) setLang(_state.lang);
}

function saveLang(lang) {
  _state.lang = lang;
  saveState();
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

  if (screenId === 'home') { renderHome(); _startNewsAutoRefresh(); }
  else _stopNewsAutoRefresh();
  if (screenId === 'courses') renderCourses();
  if (screenId === 'sandbox') initSandboxScreen();
  if (screenId === 'ai-chat') initAiChatScreen();
  if (screenId === 'settings') renderSettings();
  if (screenId === 'news') renderNewsScreen();
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
    greeting.textContent = hour < 12 ? t('home_greeting_morning') : hour < 18 ? t('home_greeting_day') : t('home_greeting_evening');
  }

  checkStreak();

  const daily = getDailyChallenge();
  const dailyTitleEl = document.getElementById('daily-title');
  const dailyMetaEl = document.getElementById('daily-meta');
  const homeDailyTitle = document.getElementById('home-daily-title');
  if (homeDailyTitle) homeDailyTitle.textContent = t('home_daily');
  if (dailyTitleEl) dailyTitleEl.textContent = daily.title;
  if (dailyMetaEl) dailyMetaEl.textContent = `${daily.lang} · +${daily.xp} XP`;

  document.getElementById('btn-daily-start')?.addEventListener('click', () => navigate('courses'));

  const continueWrap = document.getElementById('home-continue-wrap');
  const continueCard = document.getElementById('home-continue');
  const continueTitleEl = document.getElementById('home-continue-title');
  if (continueTitleEl) continueTitleEl.textContent = t('home_continue_title');
  if (_state.lastCourse && continueWrap && continueCard) {
    const course = COURSES[_state.lastCourse];
    if (course) {
      continueWrap.style.display = 'block';
      continueCard.innerHTML = `
        <span style="font-size:28px">${course.icon}</span>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:600">${course.name}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">${t('home_continue_sub')}</div>
        </div>
        <span style="color:var(--primary);font-size:18px">→</span>`;
      continueCard.onclick = () => navigate('courses');
    }
  }

  const newsTitleEl = document.getElementById('home-news-title');
  const newsAllBtn = document.getElementById('btn-home-news-all');
  const newsRefreshBtn = document.getElementById('btn-home-news-refresh');
  if (newsTitleEl) newsTitleEl.textContent = t('home_news');
  if (newsAllBtn) { newsAllBtn.textContent = t('home_news_all'); newsAllBtn.onclick = () => navigate('news'); }
  if (newsRefreshBtn) newsRefreshBtn.onclick = () => fetchHomeNews(true);

  fetchHomeNews(false);
}

// ── XP / Streak ───────────────────────────────────────────────────────────────

function updateXpDisplay() {
  const xp = _state.xp;
  const level = getLevel(xp);
  const next = getNextLevel(xp);
  const progress = getXpProgress(xp);

  const badge = document.getElementById('level-badge');
  if (badge) badge.textContent = level.icon + ' ' + (t('level_' + level.name) || level.name);

  const xpNum = document.getElementById('xp-number');
  if (xpNum) xpNum.textContent = next ? `${xp} / ${next.min} XP` : `${xp} ${t('xp_max')}`;

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

  showXpModal(amount, newLevel.name !== oldLevel.name ? `🎉 ${newLevel.icon} ${t('level_' + newLevel.name) || newLevel.name}!` : null);
}

function onTaskPassed(challengeId, xp) {
  if (_state.completedChallenges.includes(challengeId)) {
    toast(t('already_done'));
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
    const lvlName = t('level_' + level.name) || level.name;
    progressInfo.textContent = `${level.icon} ${lvlName} · ${_state.xp} XP · ${t('streak_label')} ${_state.streak} ${t('streak_days')} · ${t('completed_label')} ${_state.completedChallenges.length} ${t('completed_of')}`;
  }
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === _state.theme);
  });
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === getLang());
  });
  _renderOllamaSettings();
}

async function _renderOllamaSettings() {
  const info = document.getElementById('settings-ollama-info');
  const ctrl = document.getElementById('settings-ollama-controls');
  if (!info || !ctrl) return;

  info.textContent = t('settings_ollama_checking');
  ctrl.innerHTML = '';

  const { installed, running } = await checkOllamaStatus();

  if (!installed) {
    info.textContent = t('settings_ollama_missing');
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = t('settings_ollama_install');
    btn.onclick = _settingsInstallOllama;
    ctrl.appendChild(btn);
    return;
  }

  if (!running) {
    info.textContent = t('settings_ollama_stopped');
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';
    const startBtn = _makeBtn('btn-secondary', t('settings_ollama_start'), async () => {
      startBtn.textContent = t('loading');
      startBtn.disabled = true;
      await fetch('/api/start-ollama');
      _renderOllamaSettings();
    });
    const unBtn = _makeBtn('btn-danger', t('settings_ollama_uninstall'), _settingsUninstallOllama);
    row.append(startBtn, unBtn);
    ctrl.appendChild(row);
    return;
  }

  info.textContent = t('settings_ollama_running');

  const topRow = document.createElement('div');
  topRow.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap';
  topRow.appendChild(_makeBtn('btn-danger', t('settings_ollama_uninstall'), _settingsUninstallOllama));
  ctrl.appendChild(topRow);

  const modLabel = document.createElement('div');
  modLabel.className = 'settings-label';
  modLabel.style.marginTop = '14px';
  modLabel.textContent = t('settings_models_installed');
  ctrl.appendChild(modLabel);

  const modelList = document.createElement('div');
  modelList.id = 'settings-model-list';
  modelList.style.cssText = 'display:flex;flex-direction:column;gap:6px';
  modelList.innerHTML = '<span style="color:var(--text2);font-size:13px">⟳ Завантаження...</span>';
  ctrl.appendChild(modelList);

  const popLabel = document.createElement('div');
  popLabel.className = 'settings-label';
  popLabel.style.marginTop = '14px';
  popLabel.textContent = t('settings_models_popular');
  ctrl.appendChild(popLabel);

  const POPULAR_MODELS = [
    { id: 'deepseek-coder:6.7b', name: 'DeepSeek Coder 6.7B', size: '3.8GB', desc: 'Найкраща для коду' },
    { id: 'codellama:7b',        name: 'Code Llama 7B',       size: '3.8GB', desc: 'Meta, Python/JS' },
    { id: 'qwen2.5-coder:7b',    name: 'Qwen 2.5 Coder 7B',  size: '4.7GB', desc: 'Alibaba, сучасна' },
    { id: 'llama3.2:3b',         name: 'Llama 3.2 3B',        size: '2GB',   desc: 'Швидка, загальна' },
  ];

  const popGrid = document.createElement('div');
  popGrid.className = 'model-popular-grid';
  POPULAR_MODELS.forEach(m => {
    const card = document.createElement('div');
    card.className = 'model-popular-card';
    card.dataset.modelId = m.id;
    card.innerHTML = `<div class="mpcard-name">${m.name}</div><div class="mpcard-size">${m.size}</div><div class="mpcard-desc">${m.desc}</div>`;
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary mpcard-btn';
    btn.textContent = t('settings_model_dl');
    btn.onclick = () => _settingsPullModel(m.id, card, btn);
    card.appendChild(btn);
    popGrid.appendChild(card);
  });
  ctrl.appendChild(popGrid);

  _loadInstalledModels(modelList, popGrid);
}

async function _loadInstalledModels(container, popGrid) {
  try {
    const resp = await fetch('/api/ollama-models');
    const { models = [] } = await resp.json();
    container.innerHTML = '';
    if (!models.length) {
      container.innerHTML = `<span style="color:var(--text2);font-size:13px">${t('settings_models_none')}</span>`;
      return;
    }
    models.forEach(name => {
      const row = document.createElement('div');
      row.className = 'model-row';
      row.innerHTML = `<span class="model-row-name">${name}</span>`;
      const del = document.createElement('button');
      del.className = 'btn btn-danger model-row-del';
      del.textContent = '🗑';
      del.title = 'Видалити';
      del.onclick = () => _settingsDeleteModel(name, row);
      row.appendChild(del);
      container.appendChild(row);
      if (popGrid) {
        popGrid.querySelectorAll('.model-popular-card').forEach(card => {
          const baseId = card.dataset.modelId.split(':')[0];
          if (name === card.dataset.modelId || name.startsWith(baseId + ':')) {
            const btn = card.querySelector('.mpcard-btn');
            btn.textContent = t('settings_model_ok');
            btn.disabled = true;
          }
        });
      }
    });
  } catch {
    container.innerHTML = `<span style="color:var(--red);font-size:13px">${t('settings_models_none')}</span>`;
  }
}

async function _settingsDeleteModel(modelName, rowEl) {
  if (!confirm(t('settings_model_del_confirm', modelName))) return;
  rowEl.innerHTML = '<span style="color:var(--text2)">⟳ Видалення...</span>';
  try {
    const resp = await fetch('/api/delete-model', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: modelName }),
    });
    const { ok, error } = await resp.json();
    if (ok) { rowEl.remove(); toast(t('settings_model_deleted', modelName)); }
    else rowEl.innerHTML = `<span style="color:var(--red);font-size:13px">❌ ${error}</span>`;
  } catch (e) {
    rowEl.innerHTML = `<span style="color:var(--red);font-size:13px">❌ ${e.message}</span>`;
  }
}

async function _settingsPullModel(modelId, cardEl, btn) {
  btn.textContent = t('settings_model_dling');
  btn.disabled = true;
  try {
    await fetch('/api/pull-model', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: modelId }),
    });
    const iv = setInterval(async () => {
      try {
        const { status, logs, message } = await (await fetch('/api/ollama-pull-progress')).json();
        if (status === 'done') {
          clearInterval(iv);
          btn.textContent = t('settings_model_ok');
          toast(t('settings_model_pulled', modelId));
          _renderOllamaSettings();
        } else if (status === 'error') {
          clearInterval(iv);
          btn.textContent = '❌ Помилка';
          btn.disabled = false;
          toast('Помилка: ' + message);
        } else if (logs?.length) {
          btn.textContent = ('⟳ ' + logs[logs.length - 1]).slice(0, 28);
        }
      } catch {}
    }, 1500);
  } catch (e) {
    btn.textContent = '❌ ' + e.message.slice(0, 20);
    btn.disabled = false;
  }
}

async function _settingsInstallOllama() {
  const ctrl = document.getElementById('settings-ollama-controls');
  if (!ctrl) return;
  const textEl = document.createElement('div');
  textEl.className = 'progress-text';
  textEl.textContent = t('settings_ollama_installing');
  const barFill = document.createElement('div');
  barFill.className = 'progress-bar-fill';
  barFill.style.width = '5%';
  const barWrap = document.createElement('div');
  barWrap.className = 'progress-bar-wrap';
  barWrap.appendChild(barFill);
  const prog = document.createElement('div');
  prog.className = 'install-progress';
  prog.append(textEl, barWrap);
  ctrl.innerHTML = '';
  ctrl.appendChild(prog);

  try { await fetch('/api/install-ollama', { method: 'POST' }); } catch {}

  const iv = setInterval(async () => {
    try {
      const resp = await fetch('/api/ollama-install-progress');
      const data = await resp.json();
      const statusMap = { pending: t('loading'), downloading: t('loading'), installing: t('installing') };
      textEl.textContent = statusMap[data.status] || data.status;
      if (data.status === 'downloading') barFill.style.width = '40%';
      if (data.status === 'installing') barFill.style.width = '75%';
      if (data.status === 'done') {
        clearInterval(iv);
        barFill.style.width = '100%';
        toast('Ollama ✅');
        _renderOllamaSettings();
      } else if (data.status === 'error') {
        clearInterval(iv);
        textEl.textContent = t('error_prefix') + (data.message || '');
      }
    } catch {}
  }, 1500);
}

function _settingsUninstallOllama() {
  if (!confirm(t('settings_ollama_uninstall_confirm'))) return;
  fetch('/api/uninstall-ollama', { method: 'POST' })
    .then(() => { toast('Ollama видалена'); _renderOllamaSettings(); })
    .catch(e => toast('Помилка: ' + e.message));
}

function _makeBtn(cls, text, onClick) {
  const btn = document.createElement('button');
  btn.className = 'btn ' + cls;
  btn.textContent = text;
  btn.onclick = onClick;
  return btn;
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
  sub.textContent = levelUpMsg || t('modal_xp_done');
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

// ── News ──────────────────────────────────────────────────────────────────────

let _newsCache = null;

function _newsTimeAgo(ts) {
  if (!ts) return '';
  const mins = Math.round((Date.now() / 1000 - ts) / 60);
  if (mins < 60) return `${mins} ${t('home_news_ago_min')}`;
  if (mins < 1440) return `${Math.round(mins / 60)} ${t('home_news_ago_h')}`;
  return `${Math.round(mins / 1440)} ${t('home_news_ago_d')}`;
}

function _buildNewsCard(a, compact) {
  const card = document.createElement('div');
  card.className = 'news-card fade-in';
  card.innerHTML = `
    <div class="news-card-top">
      <span class="news-source">${a.source}</span>
      <span class="news-time">${_newsTimeAgo(a.timestamp)}</span>
    </div>
    <div class="news-title">${escHtml(a.title)}</div>
    ${!compact && a.desc ? `<div class="news-desc">${escHtml(a.desc)}</div>` : ''}
    <a class="news-read-link" href="${a.link}" target="_blank" rel="noopener">${t('home_news_read')}</a>`;
  return card;
}

async function _fetchNews(forceRefresh) {
  if (_newsCache && !forceRefresh) return _newsCache;
  try {
    const resp = await fetch('/api/ai-news');
    const data = await resp.json();
    if (data.articles?.length) {
      _newsCache = data.articles;
      return _newsCache;
    }
    if (data.fetching) return null;
    return [];
  } catch {
    return [];
  }
}

async function fetchHomeNews(forceRefresh) {
  const container = document.getElementById('home-news-list');
  if (!container) return;
  container.innerHTML = `<div class="news-loading">${t('home_news_loading')}</div>`;

  let articles = await _fetchNews(forceRefresh);
  if (!articles) {
    const iv = setInterval(async () => {
      articles = await _fetchNews(false);
      if (articles !== null) {
        clearInterval(iv);
        _renderHomeNews(container, articles);
      }
    }, 2000);
    return;
  }
  _renderHomeNews(container, articles);
}

function _renderHomeNews(container, articles) {
  container.innerHTML = '';
  if (!articles.length) {
    container.innerHTML = `<div class="news-loading">${t('home_news_error')}</div>`;
    return;
  }
  articles.slice(0, 4).forEach(a => container.appendChild(_buildNewsCard(a, true)));
}

function _startNewsAutoRefresh() {
  if (_newsAutoRefreshTimer) return;
  _newsAutoRefreshTimer = setInterval(() => {
    if (_activeScreen === 'home') fetchHomeNews(true);
    if (_activeScreen === 'news') fetchNewsScreen(true);
  }, 600_000);
}

function _stopNewsAutoRefresh() {
  if (_newsAutoRefreshTimer) { clearInterval(_newsAutoRefreshTimer); _newsAutoRefreshTimer = null; }
}

async function renderNewsScreen() {
  const container = document.getElementById('news-full-list');
  if (!container) return;
  container.innerHTML = `<div class="news-loading">${t('news_loading')}</div>`;
  await fetchNewsScreen(false);
}

async function fetchNewsScreen(forceRefresh) {
  const container = document.getElementById('news-full-list');
  if (!container) return;

  let articles = await _fetchNews(forceRefresh);
  if (!articles) {
    const iv = setInterval(async () => {
      articles = await _fetchNews(false);
      if (articles !== null) { clearInterval(iv); _renderFullNews(container, articles); }
    }, 2000);
    return;
  }
  _renderFullNews(container, articles);
}

function _renderFullNews(container, articles) {
  container.innerHTML = '';
  if (!articles.length) {
    container.innerHTML = `<div class="news-loading">${t('news_error')}</div>`;
    return;
  }
  articles.forEach(a => container.appendChild(_buildNewsCard(a, false)));
}

// ── Event listeners ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme(_state.theme || 'dark');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.screen, false));
  });

  document.getElementById('btn-lesson-back')?.addEventListener('click', goBack);
  document.getElementById('btn-sandbox-back')?.addEventListener('click', goBack);

  document.getElementById('btn-uninstall-app')?.addEventListener('click', () => {
    if (!confirm(t('settings_uninstall_confirm'))) return;
    fetch('/api/uninstall-app', { method: 'POST' })
      .then(() => toast(t('settings_uninstall_done')))
      .catch(e => toast('Помилка: ' + e.message));
  });

  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    if (confirm(t('settings_reset_confirm'))) {
      _state = { xp: 0, streak: 0, lastActivity: null, completedChallenges: [], hearts: 3, theme: _state.theme, aiModel: _state.aiModel, lang: _state.lang };
      saveState();
      renderSettings();
      toast(t('settings_reset_done'));
    }
  });

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });

  document.getElementById('btn-xp-modal-close')?.addEventListener('click', () => {
    document.getElementById('modal-xp-gain').style.display = 'none';
  });

  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLang(lang);
      saveLang(lang);
      document.querySelectorAll('.lang-toggle-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
      const cur = _activeScreen;
      show(cur);
    });
  });

  document.getElementById('btn-news-back')?.addEventListener('click', goBack);
  document.getElementById('btn-news-refresh')?.addEventListener('click', () => fetchNewsScreen(true));

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
  }, 3400);

  window._app = { goBack, onTaskPassed, toast, navigate, saveLang };

  checkOllamaStatus();
});
