// ── Strucode — Main App ───────────────────────────────────────────────────────

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
  if (screenId === 'course-page') { /* rendered by openCoursePage */ }
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
  const hasProgress = countCompleted(course) > 0;

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

function _renderCoursePage(course) {
  _state.lastCourse = course.id;
  saveState();
  _backStack.push(_activeScreen);

  // Header
  const headerInfo = document.getElementById('course-page-header-info');
  if (headerInfo) {
    const icon = course.logo
      ? `<img class="lang-logo" src="${course.logo}" width="22" height="22" alt="${course.name}">`
      : `<span style="font-size:20px">${course.icon}</span>`;
    headerInfo.innerHTML = `${icon}<div><div class="cph-name">${course.name}</div></div>`;
  }

  // Star button
  const starBtn = document.getElementById('btn-course-star');
  if (starBtn) {
    const isStarred = _state.starredCourse === course.id;
    starBtn.textContent = isStarred ? '★' : '☆';
    starBtn.className = 'btn-star' + (isStarred ? ' starred' : '');
    starBtn.title = isStarred ? 'Прибрати з вибраного' : 'Обрати для навчання';
    starBtn.onclick = () => {
      _state.starredCourse = _state.starredCourse === course.id ? null : course.id;
      saveState();
      const nowStarred = _state.starredCourse === course.id;
      starBtn.textContent = nowStarred ? '★' : '☆';
      starBtn.className = 'btn-star' + (nowStarred ? ' starred' : '');
      starBtn.title = nowStarred ? 'Прибрати з вибраного' : 'Обрати для навчання';
      toast(nowStarred ? `★ ${course.name} — обрано для навчання` : `☆ Прибрано з вибраного`);
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
    ? `<img src="${course.logo}" class="cph-logo" alt="${course.name}">`
    : `<span style="font-size:48px;line-height:1">${course.icon}</span>`;
  hero.innerHTML = `
    ${logoHtml}
    <div class="cph-details">
      <div class="cph-title">${course.name}</div>
      <div class="cph-desc">${course.desc}</div>
      <div class="cph-stats">
        <div class="cph-stat-item"><span class="cph-stat-num">${course.modules.length}</span><span class="cph-stat-lbl">Модулів</span></div>
        <div class="cph-stat-item"><span class="cph-stat-num">${totalLessons}</span><span class="cph-stat-lbl">Уроків</span></div>
        <div class="cph-stat-item"><span class="cph-stat-num">${completed}/${total}</span><span class="cph-stat-lbl">Задач</span></div>
        <div class="cph-stat-item"><span class="cph-stat-num">${cxp}</span><span class="cph-stat-lbl">XP</span></div>
      </div>
      <div style="margin-top:10px">
        <div style="height:4px;background:var(--bg3);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${course.color||'var(--primary)'};border-radius:2px;transition:width .5s ease"></div>
        </div>
        <div style="font-size:11px;color:var(--text2);margin-top:4px">${pct}% пройдено</div>
      </div>
    </div>`;
  body.appendChild(hero);

  // Modules
  const modList = document.createElement('div');
  modList.className = 'module-list open';
  renderModules(course, modList);
  body.appendChild(modList);

  document.getElementById('btn-course-page-back').onclick = goBack;

  show('course-page');
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
  const course    = starredId ? COURSES[starredId] : null;

  if (!course) {
    const prompt = document.createElement('div');
    prompt.className = 'featured-pick-prompt';
    prompt.innerHTML = `
      <div class="fpp-icon">🎯</div>
      <div class="fpp-title">Обери курс для навчання</div>
      <div class="fpp-sub">Натисни ★ на будь-якому курсі щоб додати його сюди</div>`;
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
  label.textContent = '⭐ Навчаюсь зараз';
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
        <span class="fcc-stat"><strong>${completed}/${total}</strong> задач</span>
        <span class="fcc-stat"><strong>${pct}%</strong></span>
      </div>
      <button class="fcc-continue-btn">▶ Продовжити</button>
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

  Object.values(COURSES).forEach(course => {
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
      <div class="cc-stat">${completed}/${total} задач</div>
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

function openLesson(course, lesson) {
  _state.lastCourse = course.id;
  _state.lastLesson = lesson.id;
  saveState();
  _backStack.push(_activeScreen);

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
  }

  show('lesson');
}

function _renderScreenshotVerify(lesson, container) {
  const sv = lesson.screenshotVerify;
  const alreadyDone = _state.verifiedLessons.includes(lesson.id);

  if (alreadyDone) {
    container.innerHTML = `<div style="background:var(--green,#22c55e)1a;border:1px solid var(--green,#22c55e);border-radius:10px;padding:14px 16px;color:var(--green,#22c55e);font-size:14px">
      ✅ Урок підтверджено! +${sv.xp} XP нараховано.
    </div>`;
    return;
  }

  container.innerHTML = `
    <p style="font-size:13px;color:var(--text2);margin-bottom:12px">
      Пройди курс на зовнішній платформі, зроби скріншот підтвердження (сертифікат, бейдж, або 100% прогрес) і завантаж його нижче. AI перевірить у фоні — можеш перейти на іншу сторінку.
    </p>
    <div style="display:flex;flex-direction:column;gap:10px">
      <input type="file" id="verify-file-input" accept="image/*"
        style="font-size:13px;color:var(--text);background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:8px">
      <button class="btn btn-primary" id="verify-submit-btn">Надіслати скріншот</button>
      <div id="verify-status-msg" style="display:none;font-size:13px;color:var(--text2);padding:8px 0"></div>
    </div>`;

  document.getElementById('verify-submit-btn').addEventListener('click', async () => {
    const file = document.getElementById('verify-file-input').files[0];
    if (!file) { toast('Спочатку обери файл скріншоту'); return; }

    const btn = document.getElementById('verify-submit-btn');
    const statusEl = document.getElementById('verify-status-msg');
    btn.disabled = true;
    btn.textContent = 'Відправляю…';
    statusEl.style.display = 'block';
    statusEl.textContent = '⟳ Аналізую скріншот…';

    try {
      const b64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target.result.split(',')[1]);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      const { job_id } = await fetch('/api/verify-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_base64: b64, lesson_id: sv.lessonId }),
      }).then(r => r.json());

      const poll = setInterval(async () => {
        try {
          const s = await fetch(`/api/verify-status?job_id=${job_id}`).then(r => r.json());
          statusEl.textContent = s.message || s.status;
          if (s.status === 'confirmed') {
            clearInterval(poll);
            if (!_state.verifiedLessons.includes(lesson.id)) {
              _state.verifiedLessons.push(lesson.id);
              _state.xp += sv.xp;
              saveState();
              showXpModal(sv.xp);
            }
            _renderScreenshotVerify(lesson, container);
          } else if (s.status === 'rejected' || s.status === 'error') {
            clearInterval(poll);
            btn.disabled = false;
            btn.textContent = 'Спробувати знову';
          }
        } catch {}
      }, 3000);
    } catch (e) {
      statusEl.textContent = '❌ Помилка: ' + e.message;
      btn.disabled = false;
      btn.textContent = 'Спробувати знову';
    }
  });
}


function _updateCourseXpStrip(courseId) {
  const strip = document.getElementById('course-xp-strip');
  if (!strip) return;
  const course = COURSES[courseId];
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

  // ── AI Course verify model ──────────────────────────────────────────────
  const verifyLabel = document.createElement('div');
  verifyLabel.className = 'settings-label';
  verifyLabel.style.marginTop = '20px';
  verifyLabel.textContent = t('settings_verify_model_label') || 'Модель для перевірки AI курсів';
  ctrl.appendChild(verifyLabel);

  const verifyHint = document.createElement('div');
  verifyHint.style.cssText = 'font-size:12px;color:var(--text2);margin-bottom:8px';
  verifyHint.textContent = t('settings_verify_model_hint') || 'Vision-модель для аналізу скріншотів при проходженні AI Foundation курсів.';
  ctrl.appendChild(verifyHint);

  const VERIFY_MODELS = [
    { id: 'moondream2', name: 'Moondream 2', size: '829MB', desc: 'Vision · перевірка скріншотів' },
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
    btn.textContent = t('settings_model_dl') || 'Завантажити';
    btn.onclick = () => _settingsPullModel(m.id, card, btn);
    card.appendChild(btn);
    verifyGrid.appendChild(card);
  });
  ctrl.appendChild(verifyGrid);

  _loadInstalledModels(modelList, popGrid, verifyGrid);
}

async function _loadInstalledModels(container, ...grids) {
  try {
    const resp = await fetch('/api/ollama-models');
    const { models = [] } = await resp.json();
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
          del.title = 'Видалити';
          del.onclick = () => _settingsDeleteModel(name, row);
          row.appendChild(del);
          container.appendChild(row);
        });
      }
    }
    grids.forEach(grid => {
      if (!grid) return;
      grid.querySelectorAll('.model-popular-card').forEach(card => {
        const baseId = card.dataset.modelId.split(':')[0];
        const installed = models.some(n => n === card.dataset.modelId || n.startsWith(baseId + ':'));
        const btn = card.querySelector('.mpcard-btn');
        if (installed) {
          btn.textContent = '✅ Встановлено';
          btn.disabled = true;
        }
      });
    });
  } catch {
    if (container) container.innerHTML = `<span style="color:var(--red);font-size:13px">${t('settings_models_none')}</span>`;
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
  document.documentElement.dataset.theme = theme;
  _state.theme = theme;
  saveState();
  updateEditorTheme();
  document.querySelectorAll('.theme-btn').forEach(btn => {
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
    const resp = await fetch('/api/ai-news');
    const data = await resp.json();
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

// ── Event listeners ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applyTheme(_state.theme || 'dark');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.screen, false));
  });

  document.getElementById('btn-lesson-back')?.addEventListener('click', goBack);
  document.getElementById('btn-sandbox-back')?.addEventListener('click', goBack);

  document.getElementById('btn-uninstall-app')?.addEventListener('click', async () => {
    if (!confirm(t('settings_uninstall_confirm'))) return;
    const btn = document.getElementById('btn-uninstall-app');
    if (btn) { btn.disabled = true; btn.textContent = '⟳ Видалення…'; }

    try {
      // Step 1 — delete all installed models
      const { models = [] } = await fetch('/api/ollama-models').then(r => r.json()).catch(() => ({ models: [] }));
      for (const model of models) {
        toast(`Видаляємо модель: ${model}…`);
        await fetch('/api/delete-model', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model }),
        }).catch(() => {});
      }

      // Step 2 — uninstall Ollama
      toast('Видаляємо Ollama…');
      await fetch('/api/uninstall-ollama', { method: 'POST' }).catch(() => {});

      // Step 3 — uninstall app (server exits after reply)
      toast('Видаляємо застосунок…');
      await fetch('/api/uninstall-app', { method: 'POST' }).catch(() => {});
    } catch (e) {
      toast('Помилка: ' + e.message);
      if (btn) { btn.disabled = false; btn.textContent = t('settings_uninstall') || 'Видалити застосунок'; }
    }
  });

  document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
    if (confirm(t('settings_reset_confirm'))) {
      _state = { xp: 0, streak: 0, lastActivity: null, completedChallenges: [], verifiedLessons: [], theme: _state.theme, aiModel: _state.aiModel, lang: _state.lang };
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
  document.getElementById('btn-news-refresh')?.addEventListener('click', () => { _newsPage = 0; fetchNewsScreen(true); });
  document.getElementById('btn-news-prev')?.addEventListener('click', () => {
    if (_newsPage > 0) { _newsPage--; _renderFullNews(document.getElementById('news-full-list'), _newsCache || []); }
  });
  document.getElementById('btn-news-next')?.addEventListener('click', () => {
    const total = Math.ceil((_newsCache || []).length / _NEWS_PAGE_SIZE);
    if (_newsPage < total - 1) { _newsPage++; _renderFullNews(document.getElementById('news-full-list'), _newsCache || []); }
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
  }, 3400);

  window._app = { goBack, onTaskPassed, toast, navigate, saveLang };

  checkOllamaStatus();
});
