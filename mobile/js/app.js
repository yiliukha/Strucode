// ── Strucode — Main App ───────────────────────────────────────────────────────

// ── Mobile: override aiChat to use Gemini API instead of Ollama ───────────────
// ai.js declares aiChat as a named function (global scope). We override it here
// since app.js loads after ai.js.
async function aiChat(userMessage, systemOverride) {
  const key = localStorage.getItem('gemini_api_key') || '';
  if (!key) {
    throw new Error('Введіть Gemini API key у Налаштуваннях → AI');
  }
  const systemPrompt = systemOverride || (typeof AI_SYSTEM_PROMPT !== 'undefined' ? AI_SYSTEM_PROMPT : '');
  const prompt = systemPrompt ? systemPrompt + '\n\n' + userMessage : userMessage;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || 'Gemini API error');
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return reply;
}

// Mobile: override isAiAvailable to return true when Gemini key is set
function isAiAvailable() {
  return !!(localStorage.getItem('gemini_api_key') || '').trim();
}

// Mobile: override checkOllamaStatus to return stubs
async function checkOllamaStatus() {
  return { installed: false, running: false };
}

// Mobile: override getOllamaModels to return empty
async function getOllamaModels() {
  return [];
}

// Mobile: override initAiChatScreen to show Gemini-based chat directly
function initAiChatScreen() {
  const setupEl = document.getElementById('ai-setup');
  const chatWrapEl = document.getElementById('ai-chat-wrap');
  const modelBarEl = document.getElementById('model-select-bar');
  const statusBadge = document.getElementById('ai-status-badge');
  const checkOverlay = document.getElementById('ai-ollama-checking');
  const voiceRow = document.getElementById('ai-voice-row');

  if (checkOverlay) { checkOverlay.style.display = 'none'; }

  const hasKey = !!(localStorage.getItem('gemini_api_key') || '').trim();
  if (hasKey) {
    if (setupEl) setupEl.style.display = 'none';
    if (chatWrapEl) { chatWrapEl.style.display = 'flex'; }
    if (modelBarEl) { modelBarEl.style.display = 'none'; }
    if (voiceRow) voiceRow.style.display = 'flex';
    if (statusBadge) { statusBadge.className = 'ai-status online'; }
  } else {
    if (setupEl) {
      setupEl.style.display = 'flex';
      setupEl.innerHTML = `<div class="ai-setup-icon">🤖</div>
        <h2>AI Ментор (Gemini)</h2>
        <p>Для AI-ментора в мобільній версії потрібен <strong>Gemini API key</strong>.</p>
        <p style="font-size:.85rem;color:var(--text2);">Отримайте безкоштовний ключ на <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style="color:var(--primary);">aistudio.google.com</a></p>
        <p style="font-size:.85rem;color:var(--text2);">Введіть ключ у <strong>Налаштування → AI</strong></p>`;
    }
    if (chatWrapEl) chatWrapEl.style.display = 'none';
    if (modelBarEl) modelBarEl.style.display = 'none';
    if (statusBadge) { statusBadge.className = 'ai-status offline'; }
    return;
  }

  document.getElementById('btn-chat-send')?.addEventListener('click', sendChatMessage);
  document.getElementById('chat-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });

  document.getElementById('btn-chat-voice')?.addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    if (typeof startVoiceDictationToInput === 'function') startVoiceDictationToInput(input);
  });

  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.dataset.scenario;
      const input = document.getElementById('chat-input');
      const scenarios = {
        explain: t('ai_sc_prompt_explain'),
        review: t('ai_sc_prompt_review'),
        interview: t('ai_sc_prompt_interview'),
        debug: t('ai_sc_prompt_debug'),
      };
      if (input && scenarios[scenario]) {
        input.value = scenarios[scenario];
        input.focus();
      }
    });
  });
}


const STORAGE_KEY = 'strucode_v1';

let _state = {
  xp: 0,
  streak: 0,
  lastActivity: null,
  completedChallenges: [],
  verifiedLessons: [],
  theme: 'dark',
  aiModel: 'llama3.2:3b',
  lastCourse: null,
  lastLesson: null,
  starredCourse: null,
  userName: '',
  customPaletteId: null,
  customColors: null,
};

let _backStack = [];
let _activeScreen = 'home';
let _newsAutoRefreshTimer = null;
/** Для оновлення перекладів без зміни історії навігації */
let _lastCoursePageCourse = null;
let _lastLessonOpen = null;
/** Інтервал опитування /api/ollama-pull-progress для UI налаштувань Ollama. */
let _ollamaPullPollIv = null;

// ── Persistence ───────────────────────────────────────────────────────────────

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) _state = { ..._state, ...JSON.parse(raw) };
  } catch {}
  if (_state.lang) setLang(_state.lang);
  else applyI18n();
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

const _SB_MAP = {
  'home': 'sb-home', 'courses': 'sb-courses', 'sandbox': 'sb-sandbox',
  'ai-chat': 'sb-ai-chat', 'settings': 'sb-settings'
};

const _BN_MAP = {
  'home': 'bn-home', 'courses': 'bn-courses', 'sandbox': 'bn-sandbox',
  'ai-chat': 'bn-ai-chat', 'settings': 'bn-settings'
};

// ── Custom theme ───────────────────────────────────────────────────────────
const PALETTES = [
  {id:'sakura', name:'Sakura',     bg:'#120810',bg2:'#1e0f18',bg3:'#2a1220',card:'#180d14',border:'rgba(255,255,255,.06)',border2:'#3a1a2a',primary:'#f472b6','primary_d':'#c84b92',text:'#fce7f3',text2:'#c08fac'},
  {id:'forest', name:'Forest',     bg:'#091410',bg2:'#0f1e1a',bg3:'#162820',card:'#0c1916',border:'rgba(255,255,255,.06)',border2:'#1a3a30',primary:'#34d399','primary_d':'#1aaa6e',text:'#d1fae5',text2:'#7ab89a'},
  {id:'amber',  name:'Amber Dawn', bg:'#120e00',bg2:'#1e1800',bg3:'#2a2200',card:'#181200',border:'rgba(255,255,255,.06)',border2:'#3a2c00',primary:'#fbbf24','primary_d':'#c08800',text:'#fef3c7',text2:'#c0a050'},
  {id:'ocean',  name:'Ocean Deep', bg:'#040e18',bg2:'#081828',bg3:'#0e2438',card:'#061420',border:'rgba(255,255,255,.06)',border2:'#0a2840',primary:'#38bdf8','primary_d':'#0090cc',text:'#e0f2fe',text2:'#6aabcc'},
];
const COLOR_FIELDS = [
  { key: 'bg', labelKey: 'sett_color_bg' },
  { key: 'bg2', labelKey: 'sett_color_bg2' },
  { key: 'card', labelKey: 'sett_color_card' },
  { key: 'border2', labelKey: 'sett_color_border2' },
  { key: 'primary', labelKey: 'sett_color_primary' },
  { key: 'text', labelKey: 'sett_color_text' },
];
const _CUSTOM_DEFAULTS = {bg:'#0c1019',bg2:'#11162a',bg3:'#1a2040',card:'#131830',border:'rgba(255,255,255,.06)',border2:'rgba(255,255,255,.1)',primary:'#1CB0F6','primary-d':'#1490c4',text:'#e8eaf6',text2:'#9ba3c7'};

function _restoreCustomVars() {
  if (_state.theme !== 'custom') return;
  Object.entries(_CUSTOM_DEFAULTS).forEach(([k,v]) => document.documentElement.style.setProperty(`--cust-${k}`, v));
  const p = _state.customPaletteId ? PALETTES.find(x => x.id === _state.customPaletteId) : null;
  if (p) {
    Object.entries({bg:p.bg,bg2:p.bg2,bg3:p.bg3,card:p.card,border:p.border,border2:p.border2,primary:p.primary,'primary-d':p.primary_d,text:p.text,text2:p.text2})
      .forEach(([k,v]) => document.documentElement.style.setProperty(`--cust-${k}`, v));
  } else if (_state.customColors) {
    Object.entries(_state.customColors).forEach(([k,v]) => document.documentElement.style.setProperty(`--cust-${k}`, v));
  }
}

function _applyCustomPalette(p) {
  Object.entries(_CUSTOM_DEFAULTS).forEach(([k,v]) => document.documentElement.style.setProperty(`--cust-${k}`, v));
  Object.entries({bg:p.bg,bg2:p.bg2,bg3:p.bg3,card:p.card,border:p.border,border2:p.border2,primary:p.primary,'primary-d':p.primary_d,text:p.text,text2:p.text2})
    .forEach(([k,v]) => document.documentElement.style.setProperty(`--cust-${k}`, v));
  _state.theme = 'custom'; _state.customPaletteId = p.id;
  _state.customColors = {bg:p.bg,bg2:p.bg2,card:p.card,border2:p.border2,primary:p.primary,text:p.text};
  saveState();
  applyTheme('custom');
  document.querySelectorAll('.theme-preset-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === 'custom'));
  document.querySelectorAll('.palette-btn').forEach(b => b.classList.toggle('active', b.dataset.palette === p.id));
  document.getElementById('custom-theme-editor')?.classList.add('visible');
}

function _initCustomEditor() {
  const pg = document.getElementById('palette-grid'); if (!pg) return;
  pg.innerHTML = PALETTES.map(p => `
    <button class="palette-btn${_state.customPaletteId === p.id ? ' active' : ''}" data-palette="${p.id}"
      style="background:${p.bg};border-color:${p.border2}">
      <div class="palette-swatches">
        ${[p.bg, p.bg2, p.primary, p.text].map(c => `<div class="palette-swatch" style="background:${c}"></div>`).join('')}
      </div>
      <div class="palette-name" style="color:${p.text}">${p.name}</div>
    </button>`).join('');
  pg.querySelectorAll('.palette-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PALETTES.find(x => x.id === btn.dataset.palette); if (!p) return;
      _applyCustomPalette(p);
    });
  });
  const cg = document.getElementById('color-picker-grid'); if (!cg) return;
  const cc = _state.customColors || {};
  cg.innerHTML = COLOR_FIELDS.map(f => `
    <div class="color-pick-item">
      <input type="color" id="cp-${f.key}" value="${cc[f.key] || _CUSTOM_DEFAULTS[f.key] || '#000000'}">
      <span class="color-pick-label">${t(f.labelKey)}</span>
    </div>`).join('');
  COLOR_FIELDS.forEach(f => {
    const inp = document.getElementById(`cp-${f.key}`); if (!inp) return;
    inp.addEventListener('input', () => { document.documentElement.style.setProperty(`--cust-${f.key}`, inp.value); applyTheme('custom'); });
    inp.addEventListener('change', () => {
      _state.customColors = _state.customColors || {}; _state.customColors[f.key] = inp.value;
      _state.customPaletteId = null; saveState();
    });
  });
}

function show(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screenId);
  if (el) el.classList.add('active');
  _activeScreen = screenId;

  // Sidebar active state
  document.querySelectorAll('.sb-item').forEach(b => b.classList.remove('active'));
  const sbId = _SB_MAP[screenId];
  if (sbId) document.getElementById(sbId)?.classList.add('active');

  // Bottom nav active state (mobile)
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const bnId = _BN_MAP[screenId];
  if (bnId) document.getElementById(bnId)?.classList.add('active');

  // Sync sidebar XP/streak
  _sbSyncUser();

  if (screenId === 'home') { renderHome(); _startNewsAutoRefresh(); }
  else _stopNewsAutoRefresh();
  if (screenId === 'courses') renderCourses();
  if (screenId === 'course-page') { /* rendered by openCoursePage */ }
  if (screenId === 'sandbox') initSandboxScreen();
  if (screenId === 'ai-chat') initAiChatScreen();
  if (screenId === 'settings') renderSettings();
  if (screenId === 'news') renderNewsScreen();
}

function _sbSyncUser() {
  const name = _state.userName || '';
  const disp = name || t('home_user_default');
  const avatarEl = document.getElementById('sb-avatar');
  const nameEl = document.getElementById('sb-user-name');
  if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase() || 'S';
  if (nameEl) nameEl.textContent = disp;
  const homeAvatar = document.getElementById('home-user-avatar');
  const homeName = document.getElementById('home-user-name-lbl');
  if (homeAvatar) homeAvatar.textContent = name.charAt(0).toUpperCase() || 'S';
  if (homeName) homeName.textContent = disp;
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

// ── Continue popup ────────────────────────────────────────────────────────────

function _showContinuePopup(course, onYes, onNo) {
  // Find last lesson the user was working on in this course
  const lastLessonId = _state.lastLesson;
  let lastLesson = null;
  let lastCourseMatch = _state.lastCourse === course.id;
  if (lastCourseMatch && lastLessonId) {
    for (const mod of course.modules) {
      lastLesson = mod.lessons.find(l => l.id === lastLessonId);
      if (lastLesson) break;
    }
  }
  // Fallback: find first incomplete lesson
  if (!lastLesson) {
    for (const mod of course.modules) {
      for (const l of mod.lessons) {
        if (l.screenshotVerify) {
          if (!_state.verifiedLessons.includes(l.id)) { lastLesson = l; break; }
        } else {
          const total = l.challenges ? l.challenges.length : 0;
          const done  = l.challenges ? l.challenges.filter(c => _state.completedChallenges.includes(c.id)).length : 0;
          if (total > 0 && done < total) { lastLesson = l; break; }
        }
      }
      if (lastLesson) break;
    }
  }
  if (!lastLesson) { onNo(); return; } // no progress yet — just open

  const popup = document.getElementById('continue-popup');
  const lessonEl = document.getElementById('continue-popup-lesson');
  const iconEl   = document.getElementById('continue-popup-icon');
  const yesBtn   = document.getElementById('btn-continue-yes');
  const noBtn    = document.getElementById('btn-continue-no');
  if (!popup) { onNo(); return; }

  iconEl.textContent = course.logo ? '' : course.icon;
  if (course.logo) iconEl.innerHTML = `<img src="${course.logo}" width="36" height="36" alt="${course.name}">`;
  lessonEl.textContent = `${course.name} · ${lastLesson.title}`;
  popup.style.display = 'flex';

  const close = () => { popup.style.display = 'none'; yesBtn.onclick = null; noBtn.onclick = null; };
  yesBtn.onclick = () => { close(); onYes(lastLesson); };
  noBtn.onclick  = () => { close(); onNo(); };
  popup.onclick  = e => { if (e.target === popup) { close(); onNo(); } };
}

// ── Course Page screen ────────────────────────────────────────────────────────

function openCoursePage(course, skipPopup = false) {
  const hasProgress = countCompleted(course) > 0 || _state.lastCourse === course.id;

  if (!skipPopup && hasProgress) {
    _showContinuePopup(
      course,
      (lesson) => { // yes — jump to lesson
        _state.lastCourse = course.id;
        saveState();
        _backStack.push(_activeScreen);
        openLesson(course, lesson);
      },
      () => _renderCoursePage(course) // no — show full course
    );
    return;
  }
  _renderCoursePage(course);
}

function _renderCoursePage(course, opts = {}) {
  const reLang = !!opts.reLangOnly;
  _state.lastCourse = course.id;
  saveState();
  if (!reLang) _backStack.push(_activeScreen);
  _lastCoursePageCourse = course;

  // Header
  const headerInfo = document.getElementById('course-page-header-info');
  if (headerInfo) {
    const icon = course.logo
      ? `<img class="lang-logo cph-head-logo" src="${course.logo}" width="28" height="28" alt="${course.name}">`
      : `<span class="cph-head-emoji">${course.icon}</span>`;
    headerInfo.innerHTML = `<div class="cph-head-brand">${icon}<div class="cph-head-text"><div class="cph-head-name">${course.name}</div></div></div>`;
  }

  // Star button
  const starBtn = document.getElementById('btn-course-star');
  if (starBtn) {
    const isStarred = _state.starredCourse === course.id;
    starBtn.textContent = isStarred ? '★' : '☆';
    starBtn.className = 'btn-star' + (isStarred ? ' starred' : '');
    starBtn.title = isStarred ? t('course_star_remove') : t('course_star_add');
    starBtn.onclick = () => {
      _state.starredCourse = _state.starredCourse === course.id ? null : course.id;
      saveState();
      const nowStarred = _state.starredCourse === course.id;
      starBtn.textContent = nowStarred ? '★' : '☆';
      starBtn.className = 'btn-star' + (nowStarred ? ' starred' : '');
      starBtn.title = nowStarred ? t('course_star_remove') : t('course_star_add');
      toast(nowStarred ? t('toast_star_course', course.name) : t('toast_unstar_course'));
    };
  }

  // Body
  const body = document.getElementById('course-page-body');
  if (!body) return;
  body.innerHTML = '';

  // Hero
  const completed   = countCompleted(course);
  const total       = countTotal(course);
  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const cxp         = getCourseXp(course.id);
  const pct         = total > 0 ? Math.round(completed / total * 100) : 0;

  const hero = document.createElement('div');
  hero.className = 'course-page-hero';
  const logoHtml = course.logo
    ? `<div class="cph-hero-logo-wrap"><img src="${course.logo}" class="cph-hero-logo" alt="${course.name}"></div>`
    : `<div class="cph-hero-logo-wrap cph-hero-logo-wrap--emoji"><span class="cph-hero-emoji">${course.icon}</span></div>`;
  hero.innerHTML = `
    <div class="cph-hero-top">
      ${logoHtml}
      <h1 class="cph-hero-title">${course.name}</h1>
      <p class="cph-hero-desc">${course.desc}</p>
    </div>
    <div class="cph-hero-meta">
      <div class="cph-stats">
        <div class="cph-stat-item"><span class="cph-stat-num">${course.modules.length}</span><span class="cph-stat-lbl">${t('course_stat_modules')}</span></div>
        <div class="cph-stat-item"><span class="cph-stat-num">${totalLessons}</span><span class="cph-stat-lbl">${t('course_stat_lessons')}</span></div>
        <div class="cph-stat-item"><span class="cph-stat-num">${completed}/${total}</span><span class="cph-stat-lbl">${t('course_stat_tasks')}</span></div>
        <div class="cph-stat-item"><span class="cph-stat-num">${cxp}</span><span class="cph-stat-lbl">${t('course_stat_xp')}</span></div>
      </div>
      <div class="cph-progress-block">
        <div class="cph-bar-track">
          <div class="cph-bar-fill" style="width:${pct}%;background:${course.color||'var(--primary)'}"></div>
        </div>
        <div class="cph-progress-caption">${pct}% ${t('course_progress_lbl')}</div>
      </div>
    </div>`;
  body.appendChild(hero);

  // Modules
  const modList = document.createElement('div');
  modList.className = 'module-list open';
  renderModules(course, modList);
  body.appendChild(modList);

  document.getElementById('btn-course-page-back').onclick = goBack;

  if (!reLang) show('course-page');
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

  const dailyTitleEl = document.getElementById('daily-title');
  const dailyMetaEl = document.getElementById('daily-meta');
  const homeDailyTitle = document.getElementById('home-daily-title');
  if (homeDailyTitle) homeDailyTitle.textContent = t('home_daily');
  const dcourse = _resolveDailyCourse();
  if (dailyTitleEl) dailyTitleEl.textContent = t('home_daily_practice');
  if (dailyMetaEl) {
    dailyMetaEl.textContent = dcourse
      ? `${dcourse.name} · ${t('home_daily_sub')}`
      : t('home_daily_pick_course');
  }

  const onDaily = async () => { await startDailyChallenge(); };
  const btnDaily = document.getElementById('btn-daily-start');
  if (btnDaily) btnDaily.onclick = onDaily;
  const cardDaily = document.getElementById('daily-card');
  if (cardDaily) {
    cardDaily.onclick = e => {
      if (e.target.closest('button')) return;
      onDaily();
    };
  }

  // Featured course
  _renderFeaturedCourse();

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
  const courseId = _state.lastCourse;
  const newCourseXp = getCourseXp(courseId);
  const oldLevel = getLevel(newCourseXp - amount);
  const newLevel = getLevel(newCourseXp);

  _state.xp += amount;
  _state.lastActivity = new Date().toISOString().slice(0, 10);
  saveState();

  updateXpDisplay();
  if (courseId) _updateCourseXpStrip(courseId);

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

// ── Featured Course (Home) ────────────────────────────────────────────────────

function _renderFeaturedCourse() {
  const wrap = document.getElementById('home-featured-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';

  const starredId = _state.starredCourse;
  const course    = starredId ? (typeof getCourseForUi === 'function' ? getCourseForUi(starredId) : COURSES[starredId]) : null;

  if (!course) {
    const prompt = document.createElement('div');
    prompt.className = 'featured-pick-prompt';
    prompt.innerHTML = `
      <div class="fpp-icon">🎯</div>
      <div class="fpp-title">${t('home_pick_course_title')}</div>
      <div class="fpp-sub">${t('home_pick_course_sub')}</div>`;
    prompt.onclick = () => navigate('courses');
    wrap.appendChild(prompt);
    return;
  }

  const completed = countCompleted(course);
  const total     = countTotal(course);
  const cxp       = getCourseXp(course.id);
  const level     = getLevel(cxp);
  const pct       = total > 0 ? Math.round(completed / total * 100) : 0;
  const levelName = t('level_' + level.name) || level.name;

  const label = document.createElement('div');
  label.className = 'section-title';
  label.style.marginBottom = '8px';
  label.textContent = t('home_training_now');
  wrap.appendChild(label);

  const card = document.createElement('div');
  card.className = 'featured-course-card';
  card.style.cssText += `;border-top:3px solid ${course.color || 'var(--primary)'}`;

  const logoHtml = course.logo
    ? `<img src="${course.logo}" class="fcc-logo" alt="${course.name}">`
    : `<span style="font-size:44px;line-height:1">${course.icon}</span>`;

  card.innerHTML = `
    <div class="fcc-top">
      ${logoHtml}
      <div class="fcc-info">
        <div class="fcc-name">${course.name}</div>
        <div class="fcc-desc">${course.desc}</div>
        <span class="fcc-badge level-badge-sm">${level.icon} ${levelName}</span>
      </div>
    </div>
    <div class="fcc-progress">
      <div class="fcc-bar-wrap">
        <div class="fcc-bar" style="width:${pct}%;background:${course.color||'var(--primary)'}"></div>
      </div>
    </div>
    <div class="fcc-bottom">
      <div class="fcc-stats">
        <span class="fcc-stat"><strong>${cxp}</strong> XP</span>
        <span class="fcc-stat"><strong>${completed}/${total}</strong> ${t('home_continue_tasks')}</span>
        <span class="fcc-stat"><strong>${pct}%</strong></span>
      </div>
      <button class="fcc-continue-btn">${t('continue_popup_yes')}</button>
    </div>`;

  card.querySelector('.fcc-continue-btn').addEventListener('click', e => {
    e.stopPropagation();
    openCoursePage(course);
  });
  card.addEventListener('click', () => openCoursePage(course));
  wrap.appendChild(card);
}

// ── Courses screen ────────────────────────────────────────────────────────────

function renderCourses() {
  const list = document.getElementById('course-list');
  if (!list) return;
  list.innerHTML = '';

  // Grid wrapper
  const grid = document.createElement('div');
  grid.className = 'course-cards-grid';

  (typeof getCoursesForUi === 'function' ? getCoursesForUi() : Object.values(COURSES)).forEach(course => {
    const completed = countCompleted(course);
    const total     = countTotal(course);
    const pct       = total > 0 ? Math.round(completed / total * 100) : 0;
    const isStarred = _state.starredCourse === course.id;

    const card = document.createElement('div');
    card.className = 'cc-card fade-in';

    const iconHtml = course.logo
      ? `<img src="${course.logo}" class="cc-icon" style="width:36px;height:36px;margin-top:4px" alt="${course.name}">`
      : `<span class="cc-icon">${course.icon}</span>`;

    card.innerHTML = `
      <div class="cc-card-top-bar" style="background:${course.color || 'var(--primary)'}"></div>
      ${iconHtml}
      <div class="cc-name">${course.name}</div>
      <div class="cc-stat">${completed}/${total} ${t('home_continue_tasks')}</div>
      <div class="cc-bar-wrap"><div class="cc-bar" style="width:${pct}%;background:${course.color || 'var(--primary)'}"></div></div>
      ${isStarred ? '<span class="cc-starred-dot">★</span>' : ''}`;

    card.addEventListener('click', () => openCoursePage(course));
    grid.appendChild(card);
  });

  list.appendChild(grid);
}

function renderModules(course, container) {
  course.modules.forEach(mod => {
    const modEl = document.createElement('div');
    modEl.className = 'module-item';
    modEl.innerHTML = `
      <div class="module-header">
        <span>${mod.icon || '📌'}</span>
        <span>${mod.title}</span>
        <span style="margin-left:auto;color:var(--text2);font-size:12px">${mod.lessons.length} ${t('course_stat_lessons')}</span>
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
    let isDone, xpTotal, progressLabel;
    if (lesson.screenshotVerify) {
      isDone = _state.verifiedLessons.includes(lesson.id);
      xpTotal = lesson.screenshotVerify.xp || 0;
      progressLabel = isDone ? '✅' : '📸';
    } else {
      const totalChallenges = lesson.challenges ? lesson.challenges.length : 0;
      const doneChallenges = lesson.challenges
        ? lesson.challenges.filter(c => _state.completedChallenges.includes(c.id)).length
        : 0;
      isDone = totalChallenges > 0 && doneChallenges === totalChallenges;
      xpTotal = lesson.challenges ? lesson.challenges.reduce((s, c) => s + (c.xp || 0), 0) : 0;
      progressLabel = isDone ? '✅' : '📖';
    }

    const item = document.createElement('div');
    item.className = 'lesson-item' + (isDone ? ' completed' : '');
    item.innerHTML = `
      <span class="lesson-status">${progressLabel}</span>
      <span class="lesson-name">${lesson.title}</span>
      <span class="lesson-xp">+${xpTotal} XP</span>`;
    item.addEventListener('click', () => openLesson(course, lesson));
    container.appendChild(item);
  });
}

// ── Lesson screen ─────────────────────────────────────────────────────────────

function openLesson(course, lesson, opts = {}) {
  const reLang = !!opts.reLangOnly;
  _state.lastCourse = course.id;
  _state.lastLesson = lesson.id;
  saveState();
  if (!reLang) _backStack.push(_activeScreen);
  _lastLessonOpen = { course, lesson };

  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-theory').innerHTML = lesson.theory || '';
  _updateCourseXpStrip(course.id);

  const challengesBlock = document.getElementById('lesson-challenges-block');
  const screenshotSection = document.getElementById('screenshot-verify-section');

  if (lesson.screenshotVerify) {
    challengesBlock.style.display = 'none';
    screenshotSection.style.display = 'block';
    _renderScreenshotVerify(lesson, document.getElementById('screenshot-verify-body'));
  } else {
    challengesBlock.style.display = '';
    screenshotSection.style.display = 'none';
    const challengeList = document.getElementById('challenge-list');
    challengeList.innerHTML = '';
    (lesson.challenges || []).forEach(challenge => {
      const done = _state.completedChallenges.includes(challenge.id);
      const item = document.createElement('div');
      item.className = 'challenge-list-item' + (done ? ' done' : '');
      const nTests = challenge.tests ? challenge.tests.length : 0;
      const testLbl = nTests ? `${challenge.language || course.language} · ${t('lesson_tests_n', nTests)}` : (challenge.language || course.language || '');
      item.innerHTML = `
        <span class="cli-icon">${done ? '✅' : '💻'}</span>
        <div class="cli-info">
          <div class="cli-name">${challenge.title}</div>
          <div class="cli-meta">${testLbl}</div>
        </div>
        <span class="cli-xp">+${challenge.xp} XP</span>`;
      item.addEventListener('click', () => openChallenge(challenge));
      challengeList.appendChild(item);
    });
  }

  if (!reLang) show('lesson');
}

function _renderScreenshotVerify(lesson, container) {
  const sv = lesson.screenshotVerify;
  const alreadyDone = _state.verifiedLessons.includes(lesson.id);

  if (alreadyDone) {
    container.innerHTML = `<div style="background:var(--green,#22c55e)1a;border:1px solid var(--green,#22c55e);border-radius:10px;padding:14px 16px;color:var(--green,#22c55e);font-size:14px">
      ${t('verify_done_msg', sv.xp)}
    </div>`;
    return;
  }

  container.innerHTML = `
    <p style="font-size:13px;color:var(--text2);margin-bottom:12px">
      ${t('verify_intro')}
    </p>
    <div style="display:flex;flex-direction:column;gap:10px">
      <input type="file" id="verify-file-input" accept="image/*"
        style="font-size:13px;color:var(--text);background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:8px">
      <button class="btn btn-primary" id="verify-submit-btn">${t('verify_submit')}</button>
      <div id="verify-status-msg" style="display:none;font-size:13px;color:var(--text2);padding:8px 0"></div>
    </div>`;

  document.getElementById('verify-submit-btn').addEventListener('click', async () => {
    const file = document.getElementById('verify-file-input').files[0];
    if (!file) { toast(t('verify_pick_file')); return; }

    const btn = document.getElementById('verify-submit-btn');
    const statusEl = document.getElementById('verify-status-msg');
    btn.disabled = true;
    btn.textContent = t('verify_sending');
    statusEl.style.display = 'block';
    statusEl.textContent = t('verify_analyzing');

    try {
      const b64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target.result.split(',')[1]);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      // stub: /api/verify-lesson and /api/verify-status not available in mobile PWA
      statusEl.textContent = 'Screenshot verification requires the desktop version of Strucode.';
      btn.disabled = false;
      btn.textContent = t('verify_try_again');
    } catch (e) {
      statusEl.textContent = t('error_prefix') + e.message;
      btn.disabled = false;
      btn.textContent = t('verify_try_again');
    }
  });
}


function _updateCourseXpStrip(courseId) {
  const strip = document.getElementById('course-xp-strip');
  if (!strip) return;
  const course = typeof getCourseForUi === 'function' ? getCourseForUi(courseId) : COURSES[courseId];
  if (!course) { strip.style.display = 'none'; return; }

  const cxp = getCourseXp(courseId);
  const level = getLevel(cxp);
  const next = getNextLevel(cxp);
  const progress = getXpProgress(cxp);
  const levelName = t('level_' + level.name) || level.name;
  const nextLabel = next ? `${cxp} / ${next.min} XP` : `${cxp} ${t('xp_max')}`;

  strip.style.display = 'block';
  strip.innerHTML = `
    <span class="cxs-course">${course.logo ? `<img class="lang-logo" src="${course.logo}" width="18" height="18" alt="${course.name}">` : course.icon} ${course.name}</span>
    <div class="cxs-right">
      <span class="level-badge-sm">${level.icon} ${levelName}</span>
      <span class="cxs-xp">${nextLabel}</span>
    </div>
    <div class="cxs-bar-wrap">
      <div class="cxs-bar" style="width:${progress}%"></div>
    </div>`;
}

// ── Daily challenge (Ollama JSON → challenge screen; інакше задача з курсу) ───

function _resolveDailyCourse() {
  const id = _state.starredCourse || _state.lastCourse;
  if (id && typeof COURSES !== 'undefined' && COURSES[id]) {
    return typeof getCourseForUi === 'function' ? getCourseForUi(id) : COURSES[id];
  }
  return null;
}

function _pickFallbackDailyChallenge(course) {
  const pool = [];
  for (const mod of course.modules || []) {
    for (const lesson of mod.lessons || []) {
      const chs = lesson.challenges || [];
      if (!chs.length) continue;
      const done = chs.filter(c => _state.completedChallenges.includes(c.id)).length;
      if (done === chs.length) chs.forEach(c => pool.push(c));
    }
  }
  if (pool.length) return pool[Math.floor(Math.random() * pool.length)];
  for (const mod of course.modules || []) {
    for (const lesson of mod.lessons || []) {
      const chs = lesson.challenges || [];
      if (chs.length) return chs[Math.floor(Math.random() * chs.length)];
    }
  }
  return null;
}

function _buildDailyUserPrompt(course) {
  const en = typeof getLang === 'function' && getLang() === 'en';
  const taskWord = t('home_continue_tasks');
  const lines = [];
  const doneTopics = [];
  for (const mod of course.modules || []) {
    for (const lesson of mod.lessons || []) {
      const chs = lesson.challenges || [];
      if (!chs.length) continue;
      const done = chs.filter(c => _state.completedChallenges.includes(c.id)).length;
      lines.push(`- ${mod.title} / ${lesson.title}: ${done}/${chs.length} ${taskWord}`);
      if (done === chs.length) doneTopics.push(`${mod.title} — ${lesson.title}`);
    }
  }
  if (en) {
    return (
      `Course: ${course.name} (language for the coding task: ${course.language})\n\n` +
      `Lesson progress:\n${lines.join('\n')}\n\n` +
      `Fully completed topics (use concepts from these only; do not copy lesson titles):\n` +
      (doneTopics.length ? doneTopics.join('\n') : '(none yet — generate the simplest task at the level of the first lesson in the course)')
    );
  }
  return (
    `Курс: ${course.name} (мова курсу для задачі: ${course.language})\n\n` +
    `Прогрес уроків:\n${lines.join('\n')}\n\n` +
    `Повністю пройдені теми (концепти тільки звідси; не копіюй назви уроків):\n` +
    (doneTopics.length ? doneTopics.join('\n') : '(поки немає — згенеруй найпростішу задачу рівня першого уроку курсу)')
  );
}

function _normalizeGenLang(lang) {
  const l = String(lang || 'javascript').toLowerCase();
  if (l === 'js' || l === 'javascript') return 'javascript';
  if (l === 'py' || l === 'python') return 'python';
  if (l === 'java') return 'java';
  if (l === 'sql') return 'sql';
  return 'javascript';
}

function _parseDailyChallengeJson(rawText, forcedId, defaultLang) {
  const m = String(rawText || '').match(/\{[\s\S]*\}/);
  if (!m) return null;
  let o;
  try { o = JSON.parse(m[0]); } catch { return null; }
  if (!o.title || !o.prompt || !o.starterCode) return null;
  const lang = _normalizeGenLang(o.language || defaultLang);
  if (lang !== 'javascript' && lang !== 'python') return null;
  const tests = Array.isArray(o.tests) ? o.tests : [];
  const clean = tests.filter(t => t && t.expression != null && t.expected !== undefined && t.desc);
  if (clean.length < 2) return null;
  const xp = Math.min(50, Math.max(5, parseInt(o.xp, 10) || 15));
  return {
    id: forcedId,
    title: String(o.title).slice(0, 140),
    prompt: String(o.prompt),
    starterCode: String(o.starterCode),
    language: lang,
    tests: clean.map(t => ({
      expression: String(t.expression),
      expected: typeof t.expected === 'string' ? t.expected : JSON.stringify(t.expected),
      desc: String(t.desc || ''),
    })),
    xp,
  };
}

function _setDailyPreparingOverlay(show) {
  const el = document.getElementById('daily-preparing-overlay');
  if (!el) return;
  el.style.display = show ? 'flex' : 'none';
  document.body.classList.toggle('daily-preparing-lock', !!show);
}

async function startDailyChallenge() {
  const course = _resolveDailyCourse();
  if (!course) {
    toast(t('toast_pick_star_course'));
    navigate('courses');
    return;
  }
  const dayKey = new Date().toISOString().slice(0, 10);
  const dailyId = `daily-${dayKey}`;
  _setDailyPreparingOverlay(true);
  try {
    toast(t('daily_preparing_toast'));
    await checkOllamaStatus();

    let ch = null;
    const canOllama = typeof isAiAvailable === 'function' && isAiAvailable() &&
      (course.language === 'javascript' || course.language === 'python');
    if (canOllama && typeof aiChat === 'function' && typeof AI_DAILY_TASK_SYSTEM !== 'undefined') {
      try {
        const raw = await aiChat(_buildDailyUserPrompt(course), AI_DAILY_TASK_SYSTEM);
        ch = _parseDailyChallengeJson(raw, dailyId, course.language);
      } catch (e) {
        console.warn('daily ollama', e);
      }
    }

    if (!ch) {
      const fb = _pickFallbackDailyChallenge(course);
      if (!fb) {
        toast(t('toast_no_fallback_tasks'));
        return;
      }
      ch = { ...fb, id: `${dailyId}-fb`, title: `📅 Daily: ${fb.title}` };
    }

    openChallenge(ch);
  } finally {
    _setDailyPreparingOverlay(false);
  }
}

// ── Challenge screen ──────────────────────────────────────────────────────────

function openChallenge(challenge) {
  _backStack.push(_activeScreen);
  initChallengeScreen(challenge);
  show('challenge');
}

// ── Settings screen ───────────────────────────────────────────────────────────

function renderSettings() {
  const activeTheme = _state.theme || 'dark';
  document.querySelectorAll('.theme-preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === activeTheme);
  });
  const editor = document.getElementById('custom-theme-editor');
  if (editor) editor.classList.toggle('visible', activeTheme === 'custom');
  if (activeTheme === 'custom') _initCustomEditor();

  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === getLang());
  });

  const progressInfo = document.getElementById('settings-progress-info');
  if (progressInfo) {
    progressInfo.textContent = t('settings_progress_line', _state.completedChallenges.length, _state.verifiedLessons.length);
  }

  const nameInp = document.getElementById('profile-name');
  const avatarEl = document.getElementById('profile-avatar');
  const metaEl = document.getElementById('profile-meta');
  const name = _state.userName || '';
  if (nameInp) nameInp.value = name;
  if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase() || 'S';
  if (metaEl) {
    metaEl.textContent = _state.completedChallenges.length
      ? t('profile_meta_done', _state.completedChallenges.length)
      : t('profile_meta_hint');
  }

  const aiSec = document.getElementById('sett-ai');
  if (aiSec && aiSec.classList.contains('active')) _renderOllamaSettings();
}

function _stopOllamaPullPoll() {
  if (_ollamaPullPollIv) {
    clearInterval(_ollamaPullPollIv);
    _ollamaPullPollIv = null;
  }
}

/** Людськочитабельний рядок з stdout `ollama pull` (часто JSON з completed/total). */
function _formatOllamaPullLogLine(line) {
  const s = String(line || '').trim();
  if (!s) return '';
  try {
    const j = JSON.parse(s);
    if (typeof j.completed === 'number' && typeof j.total === 'number' && j.total > 0) {
      return `${Math.min(100, Math.round((100 * j.completed) / j.total))}%`;
    }
    if (typeof j.percent === 'number') return `${j.percent}%`;
    if (j.status && typeof j.status === 'string') return j.status;
  } catch {
    /* not JSON */
  }
  if (/^\s*\{/.test(s)) return '';
  return s.length > 52 ? `${s.slice(0, 49)}…` : s;
}

function _catalogModelBase(id) {
  const s = String(id || '').trim().toLowerCase();
  const i = s.indexOf(':');
  return i === -1 ? s : s.slice(0, i);
}

/** Чи модель з картки каталогу вже є в Ollama (точний збіг або ім’я без тега в API; moondream — за підрядком). */
function _installedMatchesCatalog(models, cardId) {
  const cid = String(cardId || '').trim().toLowerCase();
  if (!cid) return false;
  return models.some(n => {
    const nl = String(n).trim().toLowerCase();
    if (nl === cid) return true;
    if (cid.startsWith('moondream') && nl.includes('moondream')) return true;
    if (!nl.includes(':') && _catalogModelBase(cid) === nl) return true;
    if (!cid.includes(':') && _catalogModelBase(nl) === cid) return true;
    return false;
  });
}

function _syncCatalogFootnote(grid, foot, i18nKey) {
  if (!grid || !foot) return;
  const cards = [...grid.querySelectorAll('.model-popular-card')];
  if (!cards.length) {
    foot.style.display = 'none';
    foot.textContent = '';
    return;
  }
  const anyNeedDl = cards.some(c => c.dataset.catalogInstalled !== '1');
  if (!anyNeedDl) {
    foot.style.display = 'block';
    foot.textContent = t(i18nKey);
  } else {
    foot.style.display = 'none';
    foot.textContent = '';
  }
}

function _setOllamaPullControlsLocked(locked) {
  const ctrl = document.getElementById('settings-ollama-controls');
  if (!ctrl) return;
  const inp = document.getElementById('settings-model-custom-id');
  if (inp) inp.disabled = !!locked;
  ctrl.querySelectorAll('.mpcard-btn').forEach(b => {
    const card = b.closest('.model-popular-card');
    const installed = card && card.dataset.catalogInstalled === '1';
    b.disabled = !!locked || !!installed;
  });
  const cbtn = ctrl.querySelector('.settings-model-custom-pull');
  if (cbtn) cbtn.disabled = !!locked;
}

function _findPullButtonForResume(pullModel) {
  if (!pullModel) return null;
  const ctrl = document.getElementById('settings-ollama-controls');
  if (!ctrl) return null;
  const want = String(pullModel).trim();
  const wantL = want.toLowerCase();
  for (const card of ctrl.querySelectorAll('.model-popular-card')) {
    const mid = card.dataset.modelId || '';
    if (mid === want || mid.toLowerCase() === wantL) {
      const b = card.querySelector('.mpcard-btn');
      if (b) return b;
    }
  }
  const inp = document.getElementById('settings-model-custom-id');
  const cbtn = ctrl.querySelector('.settings-model-custom-pull');
  if (inp && cbtn && inp.value.trim() === want) return cbtn;
  if (cbtn && (cbtn.dataset.activePull || '') === want) return cbtn;
  return null;
}

function _startOllamaPullPoll(modelId, btn) {
  _stopOllamaPullPoll();
  const mid = String(modelId || '').trim();
  const tick = async () => {
    const b = btn && document.contains(btn) ? btn : _findPullButtonForResume(mid);
    try {
      // stub: Ollama not available in mobile PWA
      console.warn('Ollama not available in mobile version');
      const data = { status: 'idle', pulling: false };
      if (data.status === 'done') {
        _stopOllamaPullPoll();
        _setOllamaPullControlsLocked(false);
        const cbtn = document.getElementById('settings-ollama-controls')?.querySelector('.settings-model-custom-pull');
        if (cbtn) delete cbtn.dataset.activePull;
        toast(t('settings_model_pulled', mid));
        _renderOllamaSettings();
        return;
      }
      if (data.status === 'error') {
        _stopOllamaPullPoll();
        _setOllamaPullControlsLocked(false);
        const cbtn = document.getElementById('settings-ollama-controls')?.querySelector('.settings-model-custom-pull');
        if (cbtn) delete cbtn.dataset.activePull;
        toast(`${t('settings_pull_fail')}: ${data.message || t('settings_error_unknown')}`);
        _renderOllamaSettings();
        return;
      }
      if (data.status === 'idle' && !data.pulling) {
        _stopOllamaPullPoll();
        _setOllamaPullControlsLocked(false);
        const cbtn = document.getElementById('settings-ollama-controls')?.querySelector('.settings-model-custom-pull');
        if (cbtn) delete cbtn.dataset.activePull;
        _renderOllamaSettings();
        return;
      }
      let sub = '';
      if (data.logs && data.logs.length) {
        for (let i = data.logs.length - 1; i >= 0 && !sub; i--) sub = _formatOllamaPullLogLine(data.logs[i]);
      }
      const line = sub ? `${t('settings_model_dling')} ${sub}` : t('settings_model_dling');
      if (b) b.textContent = line;
    } catch {
      /* keep polling */
    }
  };
  tick();
  _ollamaPullPollIv = setInterval(tick, 1000);
}

async function _resumeOllamaPullPollIfNeeded() {
  // stub: Ollama not available in mobile PWA
  console.warn('Ollama not available in mobile version');
  return;
  let btn = _findPullButtonForResume(data.pullModel);
  if (!btn) {
    const inp = document.getElementById('settings-model-custom-id');
    const cbtn = document.getElementById('settings-ollama-controls')?.querySelector('.settings-model-custom-pull');
    if (inp && cbtn) {
      inp.value = data.pullModel;
      cbtn.dataset.activePull = data.pullModel;
      btn = cbtn;
    }
  }
  if (!btn) return;
  _setOllamaPullControlsLocked(true);
  btn.textContent = t('settings_model_dling');
  _startOllamaPullPoll(data.pullModel, btn);
}

async function _renderOllamaSettings() {
  // stub: Ollama not available in mobile PWA — Gemini API is used instead
  console.warn('Ollama not available in mobile version');
  // Sync the Gemini API key input with localStorage
  const keyInput = document.getElementById('gemini-api-key-input');
  if (keyInput) {
    keyInput.value = localStorage.getItem('gemini_api_key') || '';
    keyInput.addEventListener('input', () => {
      localStorage.setItem('gemini_api_key', keyInput.value.trim());
    });
  }
  return;

  // dead code below kept for structure only
  const info = document.getElementById('settings-ollama-info');
  const ctrl = document.getElementById('settings-ollama-controls');
  if (!info || !ctrl) return;

  _stopOllamaPullPoll();

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
      // stub: Ollama not available in mobile PWA
      console.warn('Ollama not available in mobile version');
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
  modelList.className = 'settings-model-list';
  modelList.innerHTML = `<span class="settings-models-loading">${t('settings_models_loading')}</span>`;
  ctrl.appendChild(modelList);

  const customWrap = document.createElement('div');
  customWrap.className = 'settings-catalog-block settings-model-custom-wrap';
  const customLbl = document.createElement('div');
  customLbl.className = 'settings-label';
  customLbl.style.marginTop = '18px';
  customLbl.textContent = t('settings_model_custom_lbl');
  customWrap.appendChild(customLbl);
  const customRow = document.createElement('div');
  customRow.className = 'settings-model-custom-row';
  const customInp = document.createElement('input');
  customInp.type = 'text';
  customInp.className = 'settings-model-custom-input';
  customInp.id = 'settings-model-custom-id';
  customInp.setAttribute('placeholder', t('settings_model_custom_placeholder'));
  customInp.setAttribute('spellcheck', 'false');
  const customBtn = document.createElement('button');
  customBtn.type = 'button';
  customBtn.className = 'btn btn-primary settings-model-custom-pull';
  customBtn.textContent = t('settings_model_custom_pull');
  customBtn.addEventListener('click', () => {
    const mid = customInp.value.trim();
    if (!mid) {
      toast(t('settings_model_custom_empty'));
      return;
    }
    _settingsPullModel(mid, null, customBtn);
  });
  customRow.appendChild(customInp);
  customRow.appendChild(customBtn);
  customWrap.appendChild(customRow);
  ctrl.appendChild(customWrap);

  const popularWrap = document.createElement('div');
  popularWrap.className = 'settings-catalog-block';

  const popLabel = document.createElement('div');
  popLabel.className = 'settings-label';
  popLabel.style.marginTop = '14px';
  popLabel.textContent = t('settings_models_popular');
  popularWrap.appendChild(popLabel);

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
  popularWrap.appendChild(popGrid);
  const popFoot = document.createElement('div');
  popFoot.className = 'settings-catalog-foot';
  popFoot.style.display = 'none';
  popularWrap.appendChild(popFoot);
  ctrl.appendChild(popularWrap);

  const extraWrap = document.createElement('div');
  extraWrap.className = 'settings-catalog-block';
  const extraLabel = document.createElement('div');
  extraLabel.className = 'settings-label';
  extraLabel.style.marginTop = '18px';
  extraLabel.textContent = t('settings_models_recommended_extra');
  extraWrap.appendChild(extraLabel);
  const EXTRA_MODELS = [
    { id: 'qwen2.5:14b', name: 'Qwen 2.5 14B', size: '~9GB', desc: 'Потужніша Qwen' },
    { id: 'qwen2.5:7b', name: 'Qwen 2.5 7B', size: '~4.7GB', desc: 'Універсальна' },
    { id: 'devstral:latest', name: 'Devstral', size: '~14GB', desc: 'Код / агенти (перевір тег у ollama.com)' },
    { id: 'phi3:latest', name: 'Phi-3', size: '~2.3GB', desc: 'Microsoft, компактна' },
    { id: 'mistral:7b', name: 'Mistral 7B', size: '~4.1GB', desc: 'Швидка загальна' },
    { id: 'gemma2:9b', name: 'Gemma 2 9B', size: '~5.5GB', desc: 'Google' },
    { id: 'llama3.1:8b', name: 'Llama 3.1 8B', size: '~4.7GB', desc: 'Meta' },
    { id: 'starcoder2:3b', name: 'StarCoder2 3B', size: '~1.7GB', desc: 'Код, легка' },
    { id: 'nomic-embed-text:latest', name: 'nomic-embed-text', size: '~274MB', desc: 'Ембеддинги' },
  ];
  const extraGrid = document.createElement('div');
  extraGrid.className = 'model-popular-grid';
  EXTRA_MODELS.forEach(m => {
    const card = document.createElement('div');
    card.className = 'model-popular-card';
    card.dataset.modelId = m.id;
    card.innerHTML = `<div class="mpcard-name">${m.name}</div><div class="mpcard-size">${m.size}</div><div class="mpcard-desc">${m.desc}</div>`;
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary mpcard-btn';
    btn.textContent = t('settings_model_dl');
    btn.onclick = () => _settingsPullModel(m.id, card, btn);
    card.appendChild(btn);
    extraGrid.appendChild(card);
  });
  extraWrap.appendChild(extraGrid);
  const extraFoot = document.createElement('div');
  extraFoot.className = 'settings-catalog-foot';
  extraFoot.style.display = 'none';
  extraWrap.appendChild(extraFoot);
  ctrl.appendChild(extraWrap);

  const verifyWrap = document.createElement('div');
  verifyWrap.className = 'settings-catalog-block';

  const verifyLabel = document.createElement('div');
  verifyLabel.className = 'settings-label';
  verifyLabel.style.marginTop = '20px';
  verifyLabel.textContent = t('settings_verify_section');
  verifyWrap.appendChild(verifyLabel);

  const verifyHint = document.createElement('div');
  verifyHint.className = 'settings-verify-hint';
  verifyHint.textContent = t('settings_verify_hint');
  verifyWrap.appendChild(verifyHint);

  const VERIFY_MODELS = [
    { id: 'moondream2', name: 'Moondream 2', size: '829MB', desc: t('settings_verify_installed_card') },
  ];

  const verifyGrid = document.createElement('div');
  verifyGrid.className = 'model-popular-grid';
  VERIFY_MODELS.forEach(m => {
    const card = document.createElement('div');
    card.className = 'model-popular-card';
    card.dataset.modelId = m.id;
    card.innerHTML = `<div class="mpcard-name">${m.name}</div><div class="mpcard-size">${m.size}</div><div class="mpcard-desc">${m.desc}</div>`;
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary mpcard-btn';
    btn.textContent = t('settings_model_dl');
    btn.onclick = () => _settingsPullModel(m.id, card, btn);
    card.appendChild(btn);
    verifyGrid.appendChild(card);
  });
  verifyWrap.appendChild(verifyGrid);
  const verifyFoot = document.createElement('div');
  verifyFoot.className = 'settings-catalog-foot';
  verifyFoot.style.display = 'none';
  verifyWrap.appendChild(verifyFoot);
  ctrl.appendChild(verifyWrap);

  _loadInstalledModels(modelList, models => {
    [popGrid, extraGrid, verifyGrid].forEach(grid => {
      if (!grid) return;
      grid.querySelectorAll('.model-popular-card').forEach(card => {
        const id = card.dataset.modelId;
        const installed = _installedMatchesCatalog(models, id);
        card.hidden = false;
        card.dataset.catalogInstalled = installed ? '1' : '0';
        const btn = card.querySelector('.mpcard-btn');
        if (btn) {
          if (installed) {
            btn.disabled = true;
            btn.textContent = t('settings_model_ok');
            btn.classList.add('mpcard-btn--installed');
          } else {
            btn.disabled = false;
            btn.textContent = t('settings_model_dl');
            btn.classList.remove('mpcard-btn--installed');
          }
        }
      });
    });
    _syncCatalogFootnote(popGrid, popFoot, 'settings_popular_all_done');
    _syncCatalogFootnote(extraGrid, extraFoot, 'settings_popular_all_done');
    _syncCatalogFootnote(verifyGrid, verifyFoot, 'settings_verify_all_done');
    _resumeOllamaPullPollIfNeeded();
  });
}

async function _loadInstalledModels(container, onModels) {
  try {
    // stub: Ollama not available in mobile PWA
    console.warn('Ollama not available in mobile version');
    const { models = [] } = { models: [] };
    if (container) {
      container.innerHTML = '';
      if (!models.length) {
        container.innerHTML = `<span style="color:var(--text2);font-size:13px">${t('settings_models_none')}</span>`;
      } else {
        models.forEach(name => {
          const row = document.createElement('div');
          row.className = 'model-row';
          row.innerHTML = `<span class="model-row-name">${name}</span>`;
          const del = document.createElement('button');
          del.className = 'btn btn-danger model-row-del';
          del.textContent = '🗑';
          del.title = t('settings_model_delete_title');
          del.onclick = () => _settingsDeleteModel(name, row);
          row.appendChild(del);
          container.appendChild(row);
        });
      }
    }
    if (typeof onModels === 'function') onModels(models);
  } catch {
    if (container) container.innerHTML = `<span style="color:var(--red);font-size:13px">${t('settings_models_none')}</span>`;
    if (typeof onModels === 'function') onModels([]);
  }
}

async function _settingsDeleteModel(modelName, rowEl) {
  // stub: Ollama not available in mobile PWA
  console.warn('Ollama not available in mobile version');
}

async function _settingsPullModel(modelId, cardEl, btn) {
  // stub: Ollama not available in mobile PWA
  console.warn('Ollama not available in mobile version');
}

async function _settingsInstallOllama() {
  // stub: Ollama not available in mobile PWA
  console.warn('Ollama not available in mobile version');
}

async function _settingsUninstallOllama() {
  // stub: Ollama not available in mobile PWA
  console.warn('Ollama not available in mobile version');
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

// ── Per-course XP ─────────────────────────────────────────────────────────────

function getCourseXp(courseId) {
  const course = COURSES[courseId];
  if (!course) return 0;
  let xp = 0;
  for (const mod of course.modules)
    for (const lesson of mod.lessons) {
      if (lesson.screenshotVerify && _state.verifiedLessons.includes(lesson.id))
        xp += (lesson.screenshotVerify.xp || 0);
      for (const ch of (lesson.challenges || []))
        if (_state.completedChallenges.includes(ch.id)) xp += (ch.xp || 0);
    }
  return xp;
}

function getCourseTotalXp(courseId) {
  const course = COURSES[courseId];
  if (!course) return 0;
  let xp = 0;
  for (const mod of course.modules)
    for (const lesson of mod.lessons) {
      if (lesson.screenshotVerify) xp += (lesson.screenshotVerify.xp || 0);
      for (const ch of (lesson.challenges || [])) xp += (ch.xp || 0);
    }
  return xp;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function countCompleted(course) {
  let n = 0;
  for (const mod of course.modules)
    for (const lesson of mod.lessons) {
      if (lesson.screenshotVerify) {
        if (_state.verifiedLessons.includes(lesson.id)) n++;
      } else {
        for (const ch of (lesson.challenges || []))
          if (_state.completedChallenges.includes(ch.id)) n++;
      }
    }
  return n;
}

function countTotal(course) {
  let n = 0;
  for (const mod of course.modules)
    for (const lesson of mod.lessons) {
      if (lesson.screenshotVerify) n++;
      else n += (lesson.challenges || []).length;
    }
  return n;
}

function applyTheme(theme) {
  if (theme === 'custom') _restoreCustomVars();
  document.documentElement.dataset.theme = theme;
  _state.theme = theme;
  saveState();
  updateEditorTheme();
  document.querySelectorAll('.theme-preset-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

// ── News ──────────────────────────────────────────────────────────────────────

const _NEWS_STORAGE_KEY  = 'strucode_news_v3';
const _NEWS_PAGE_SIZE    = 15;
const _NEWS_MAX_AGE_SECS = 2 * 86400;

let _newsCache = null;
let _newsPage  = 0;

function _newsStorageSave(articles) {
  try { localStorage.setItem(_NEWS_STORAGE_KEY, JSON.stringify({ articles, savedAt: Date.now() })); } catch {}
}

function _newsStorageLoad() {
  try {
    const raw = localStorage.getItem(_NEWS_STORAGE_KEY);
    if (!raw) return null;
    const { articles, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > 5 * 60 * 1000) return null; // старіше 5хв — ігноруємо
    const cutoff = Date.now() / 1000 - _NEWS_MAX_AGE_SECS;
    return articles.filter(a => !a.timestamp || a.timestamp > cutoff);
  } catch { return null; }
}

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
  if (!forceRefresh) {
    if (_newsCache) return _newsCache;
    const stored = _newsStorageLoad();
    if (stored?.length) { _newsCache = stored; return _newsCache; }
  }
  try {
    // stub: /api/ai-news not available in mobile PWA
    const data = { articles: [], fetching: false };
    if (data.articles?.length) {
      const cutoff = Date.now() / 1000 - _NEWS_MAX_AGE_SECS;
      _newsCache = data.articles.filter(a => !a.timestamp || a.timestamp > cutoff);
      _newsStorageSave(_newsCache);
      return _newsCache;
    }
    if (data.fetching) return null;
    return [];
  } catch {
    return _newsCache || [];
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
      if (articles !== null) { clearInterval(iv); _renderHomeNews(container, articles); }
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
  }, 300_000); // 5 хвилин
}

function _stopNewsAutoRefresh() {
  if (_newsAutoRefreshTimer) { clearInterval(_newsAutoRefreshTimer); _newsAutoRefreshTimer = null; }
}

async function renderNewsScreen() {
  _newsPage = 0;
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
  const pagination = document.getElementById('news-pagination');
  if (!articles.length) {
    container.innerHTML = `<div class="news-loading">${t('news_error')}</div>`;
    if (pagination) pagination.style.display = 'none';
    return;
  }

  const totalPages = Math.ceil(articles.length / _NEWS_PAGE_SIZE);
  if (_newsPage >= totalPages) _newsPage = totalPages - 1;
  const start = _newsPage * _NEWS_PAGE_SIZE;
  articles.slice(start, start + _NEWS_PAGE_SIZE).forEach(a => container.appendChild(_buildNewsCard(a, false)));

  if (pagination) {
    pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    const info = document.getElementById('news-page-info');
    const prev = document.getElementById('btn-news-prev');
    const next = document.getElementById('btn-news-next');
    if (info) info.textContent = `${_newsPage + 1} / ${totalPages}`;
    if (prev) prev.disabled = _newsPage === 0;
    if (next) next.disabled = _newsPage >= totalPages - 1;
  }
  container.scrollTop = 0;
}

function _strucodeOnLangChange() {
  if (typeof invalidateCourseL10nCache === 'function') invalidateCourseL10nCache();
  _sbSyncUser();
  if (_activeScreen === 'home') renderHome();
  if (_activeScreen === 'courses') renderCourses();
  if (_activeScreen === 'settings') renderSettings();
  if (_activeScreen === 'news' && _newsCache && _newsCache.length) {
    _renderFullNews(document.getElementById('news-full-list'), _newsCache);
  }
  if (_activeScreen === 'course-page' && _lastCoursePageCourse) {
    const cid = _lastCoursePageCourse.id;
    const c = typeof getCourseForUi === 'function' ? getCourseForUi(cid) : COURSES[cid];
    if (c) _renderCoursePage(c, { reLangOnly: true });
  }
  if (_activeScreen === 'lesson' && _lastLessonOpen) {
    const { course, lesson } = _lastLessonOpen;
    const fresh = typeof getCourseForUi === 'function' ? getCourseForUi(course.id) : COURSES[course.id];
    let freshLesson = null;
    if (fresh) {
      for (const m of fresh.modules || []) {
        for (const l of m.lessons || []) {
          if (l.id === lesson.id) { freshLesson = l; break; }
        }
        if (freshLesson) break;
      }
    }
    if (fresh && freshLesson) openLesson(fresh, freshLesson, { reLangOnly: true });
  }
  if (typeof refreshStrucodeUiChrome === 'function') refreshStrucodeUiChrome();
}

// ── Event listeners ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  window.__strucodeOnLangChange = _strucodeOnLangChange;
  loadState();
  if (typeof setAiModel === 'function' && _state.aiModel) setAiModel(_state.aiModel);
  if (_state.theme === 'custom') _restoreCustomVars();
  applyTheme(_state.theme || 'dark');

  document.getElementById('btn-lesson-back')?.addEventListener('click', goBack);
  document.getElementById('btn-sandbox-back')?.addEventListener('click', goBack);

  document.getElementById('btn-uninstall-app')?.addEventListener('click', async () => {
    if (!confirm(t('settings_uninstall_confirm'))) return;
    const btn = document.getElementById('btn-uninstall-app');
    if (btn) { btn.disabled = true; btn.textContent = t('settings_uninstall_btn_busy'); }

    try {
      // stub: uninstall-app not available in mobile PWA
      // Just clear all local data
      localStorage.clear();
      toast('Дані видалено. Для видалення PWA використайте браузер.');
      if (btn) { btn.disabled = false; btn.textContent = t('settings_uninstall'); }
    } catch (e) {
      toast(t('error_prefix') + e.message);
      if (btn) { btn.disabled = false; btn.textContent = t('settings_uninstall'); }
    }
  });

  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    if (confirm(t('settings_reset_confirm'))) {
      _state = { xp: 0, streak: 0, lastActivity: null, completedChallenges: [], verifiedLessons: [],
        theme: _state.theme, aiModel: _state.aiModel, lang: _state.lang,
        userName: _state.userName, customPaletteId: _state.customPaletteId, customColors: _state.customColors };
      saveState();
      renderSettings();
      toast(t('settings_reset_done'));
    }
  });

  document.querySelectorAll('.theme-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      if (theme === 'custom') {
        document.getElementById('custom-theme-editor')?.classList.add('visible');
        _initCustomEditor();
      } else {
        document.getElementById('custom-theme-editor')?.classList.remove('visible');
      }
      applyTheme(theme);
    });
  });

  // Settings section tabs
  document.querySelectorAll('.sett-tab,.sett-nav-item').forEach(tab => {
    tab.addEventListener('click', () => {
      const sid = tab.dataset.section;
      document.querySelectorAll('.sett-tab,.sett-nav-item').forEach(t => t.classList.toggle('active', t.dataset.section === sid));
      document.querySelectorAll('.sett-section').forEach(s => s.classList.toggle('active', s.id === 'sett-' + sid));
      if (sid === 'ai') _renderOllamaSettings();
    });
  });

  // Profile name input
  document.getElementById('profile-name')?.addEventListener('input', e => {
    _state.userName = e.target.value;
    saveState();
    _sbSyncUser();
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
    });
  });

  document.getElementById('btn-news-back')?.addEventListener('click', goBack);
  document.getElementById('btn-news-refresh')?.addEventListener('click', () => { _newsPage = 0; fetchNewsScreen(true); });
  document.getElementById('btn-news-prev')?.addEventListener('click', () => {
    if (_newsPage > 0) { _newsPage--; _renderFullNews(document.getElementById('news-full-list'), _newsCache || []); }
  });
  document.getElementById('btn-news-next')?.addEventListener('click', () => {
    const total = Math.ceil((_newsCache || []).length / _NEWS_PAGE_SIZE);
    if (_newsPage < total - 1) { _newsPage++; _renderFullNews(document.getElementById('news-full-list'), _newsCache || []); }
  });

  // Sidebar navigation
  ['home','courses','sandbox','ai-chat','settings'].forEach(screen => {
    document.getElementById('sb-' + screen)?.addEventListener('click', () => navigate(screen, false));
  });

  // Sidebar collapse toggle with localStorage persistence
  const _sbEl = document.getElementById('sidebar');
  const _sbColBtn = document.getElementById('sb-collapse-btn');
  if (_sbColBtn && _sbEl) {
    if (localStorage.getItem('sb-collapsed') === '1') _sbEl.classList.add('collapsed');
    _sbColBtn.addEventListener('click', () => {
      _sbEl.classList.toggle('collapsed');
      localStorage.setItem('sb-collapsed', _sbEl.classList.contains('collapsed') ? '1' : '0');
    });
  }

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

  window._app = { goBack, onTaskPassed, toast, navigate, saveLang, startDailyChallenge };

  // stub: Ollama not available in mobile PWA — skip checkOllamaStatus()
  // checkOllamaStatus();

  // Wire Gemini API key input in settings
  const geminiKeyInput = document.getElementById('gemini-api-key-input');
  if (geminiKeyInput) {
    geminiKeyInput.value = localStorage.getItem('gemini_api_key') || '';
    geminiKeyInput.addEventListener('input', () => {
      localStorage.setItem('gemini_api_key', geminiKeyInput.value.trim());
    });
  }
});
