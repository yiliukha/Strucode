// ── i18n / Localization ───────────────────────────────────────────────────────
let _lang = 'uk';

const I18N = {
  uk: {
    nav_home: 'Головна', nav_courses: 'Курси', nav_sandbox: 'Sandbox',
    nav_ai: 'AI', nav_menu: 'Меню',

    home_greeting_morning: 'Доброго ранку! 🌅',
    home_greeting_day: 'Привіт! Готовий кодити? 💻',
    home_greeting_evening: 'Добрий вечір! 🌙',
    home_continue_title: 'Продовжити',
    home_continue_sub: 'Продовж з того місця',
    home_daily: 'Daily задача',
    home_daily_start: 'Почати',
    home_news: 'AI Новини',
    home_news_all: 'Всі новини →',
    home_news_loading: 'Завантаження новин...',
    home_news_error: 'Не вдалося завантажити новини',
    home_news_read: 'Читати →',
    home_news_ago_min: 'хв тому', home_news_ago_h: 'г тому', home_news_ago_d: 'д тому',

    courses_title: '📚 Курси',
    courses_completed: 'задач',

    lesson_tasks: 'Задачі',
    lesson_back: '← Назад',

    challenge_run: '▶ Run', challenge_check: '✓ Check', challenge_hint: '🤖 Hint',
    challenge_no_output: '(немає виводу)',
    challenge_checking: 'Перевірка тестів...',
    challenge_placeholder: '// Натисни ▶ Run або ✓ Check',

    sandbox_placeholder: '// Натисни ▶ Run щоб виконати код',
    sandbox_back: '← Головна',
    sandbox_run: '▶ Run', sandbox_ask_ai: '🤖 Ask AI',

    ai_mentor_title: '🤖 AI Ментор',
    ai_setup_desc: 'Для AI-ментора потрібен <strong>Ollama</strong> — локальний AI на твоїй машині.',
    ai_install_btn: 'Встановити Ollama',
    ai_pull_btn: 'Завантажити llama3.2:3b (2GB)',
    ai_placeholder: 'Запитай AI-ментора...',
    ai_send: 'Надіслати',
    ai_model: 'Модель:',
    ai_scenario_explain: 'Поясни концепцію',
    ai_scenario_review: 'Перевір мій код',
    ai_scenario_interview: 'Режим співбесіди',
    ai_scenario_debug: 'Допоможи з багом',
    ai_unavailable: 'AI-ментор недоступний. Встанови Ollama у вкладці "AI".',
    ai_hint_header: '🤖 AI Підказка', ai_answer_header: '🤖 AI Відповідь',
    ai_thinking: '🤖 Думаю...', ai_analyzing: '🤖 Аналізую...',

    settings_title: '⚙️ Налаштування',
    settings_theme: 'Тема',
    settings_theme_dark: '🌙 Темна', settings_theme_light: '☀️ Світла', settings_theme_aurora: '🌌 Aurora',
    settings_progress: 'Прогрес',
    settings_reset: 'Скинути прогрес',
    settings_reset_confirm: 'Скинути весь прогрес? Цю дію не можна відмінити.',
    settings_reset_done: 'Прогрес скинуто',
    settings_lang: 'Мова / Language',
    settings_ollama: 'AI Mentor (Ollama)',
    settings_ollama_checking: '⟳ Перевірка...',
    settings_ollama_running: '✅ Ollama запущена і готова',
    settings_ollama_stopped: '⚠️ Встановлена, але не запущена',
    settings_ollama_missing: '❌ Ollama не встановлена',
    settings_ollama_install: '⬇ Встановити Ollama',
    settings_ollama_uninstall: '🗑 Видалити Ollama',
    settings_ollama_start: '▶ Запустити',
    settings_ollama_installing: 'Встановлення Ollama...',
    settings_ollama_uninstall_confirm: 'Видалити Ollama? AI-ментор буде недоступний до повторного встановлення.',
    settings_models_installed: 'Встановлені моделі',
    settings_models_popular: 'Популярні моделі для коду',
    settings_models_none: 'Немає встановлених моделей',
    settings_model_dl: '⬇ Завантажити', settings_model_ok: '✅ Встановлена',
    settings_model_dling: '⟳ Завантаження...',
    settings_model_del_confirm: 'Видалити модель %s?',
    settings_model_deleted: 'Модель %s видалена',
    settings_model_pulled: 'Модель %s завантажена! 🎉',
    settings_app: 'Додаток',
    settings_uninstall: '🗑 Видалити Strucode',
    settings_uninstall_confirm: 'Видалити Strucode? Всі файли програми будуть видалені. Прогрес у браузері збережеться.',
    settings_uninstall_done: 'Видалення... Додаток закриється',
    settings_footer_v: 'Strucode v1.0',
    settings_footer_sub: 'AI Coding School · Python + HTML/JS',

    news_title: '📰 AI Новини',
    news_loading: 'Завантаження...', news_error: 'Не вдалося отримати новини. Перевір підключення.',
    news_read: 'Читати →', news_refresh: '↻ Оновити', news_empty: 'Новин не знайдено',
    news_back: '←',

    modal_xp_done: 'Задачу виконано! 🎉', modal_next: 'Далі',
    already_done: 'Ти вже виконав цю задачу! ✅',
    streak_days: 'днів', xp_max: 'XP (Макс!)',
    completed_of: 'задач',
    streak_label: 'Streak:',
    completed_label: 'Виконано:',

    level_Новачок: 'Новачок',
    installing: 'Встановлення...', loading: 'Завантаження...', error_prefix: '❌ ',
    server_error: 'Помилка сервера: ',
  },
  en: {
    nav_home: 'Home', nav_courses: 'Courses', nav_sandbox: 'Sandbox',
    nav_ai: 'AI', nav_menu: 'Menu',

    home_greeting_morning: 'Good morning! 🌅',
    home_greeting_day: 'Hello! Ready to code? 💻',
    home_greeting_evening: 'Good evening! 🌙',
    home_continue_title: 'Continue',
    home_continue_sub: 'Pick up where you left off',
    home_daily: 'Daily Challenge',
    home_daily_start: 'Start',
    home_news: 'AI News',
    home_news_all: 'All news →',
    home_news_loading: 'Loading news...',
    home_news_error: 'Failed to load news',
    home_news_read: 'Read →',
    home_news_ago_min: 'min ago', home_news_ago_h: 'h ago', home_news_ago_d: 'd ago',

    courses_title: '📚 Courses',
    courses_completed: 'tasks',

    lesson_tasks: 'Tasks',
    lesson_back: '← Back',

    challenge_run: '▶ Run', challenge_check: '✓ Check', challenge_hint: '🤖 Hint',
    challenge_no_output: '(no output)',
    challenge_checking: 'Running tests...',
    challenge_placeholder: '// Press ▶ Run or ✓ Check',

    sandbox_placeholder: '// Press ▶ Run to execute code',
    sandbox_back: '← Home',
    sandbox_run: '▶ Run', sandbox_ask_ai: '🤖 Ask AI',

    ai_mentor_title: '🤖 AI Mentor',
    ai_setup_desc: 'AI Mentor requires <strong>Ollama</strong> — local AI on your machine.',
    ai_install_btn: 'Install Ollama',
    ai_pull_btn: 'Download llama3.2:3b (2GB)',
    ai_placeholder: 'Ask your AI mentor...',
    ai_send: 'Send',
    ai_model: 'Model:',
    ai_scenario_explain: 'Explain concept',
    ai_scenario_review: 'Review my code',
    ai_scenario_interview: 'Interview mode',
    ai_scenario_debug: 'Help with a bug',
    ai_unavailable: 'AI mentor unavailable. Install Ollama in the "AI" tab.',
    ai_hint_header: '🤖 AI Hint', ai_answer_header: '🤖 AI Answer',
    ai_thinking: '🤖 Thinking...', ai_analyzing: '🤖 Analyzing...',

    settings_title: '⚙️ Settings',
    settings_theme: 'Theme',
    settings_theme_dark: '🌙 Dark', settings_theme_light: '☀️ Light', settings_theme_aurora: '🌌 Aurora',
    settings_progress: 'Progress',
    settings_reset: 'Reset progress',
    settings_reset_confirm: 'Reset all progress? This cannot be undone.',
    settings_reset_done: 'Progress reset',
    settings_lang: 'Мова / Language',
    settings_ollama: 'AI Mentor (Ollama)',
    settings_ollama_checking: '⟳ Checking...',
    settings_ollama_running: '✅ Ollama running and ready',
    settings_ollama_stopped: '⚠️ Installed but not running',
    settings_ollama_missing: '❌ Ollama not installed',
    settings_ollama_install: '⬇ Install Ollama',
    settings_ollama_uninstall: '🗑 Uninstall Ollama',
    settings_ollama_start: '▶ Start',
    settings_ollama_installing: 'Installing Ollama...',
    settings_ollama_uninstall_confirm: 'Uninstall Ollama? AI mentor will be unavailable until reinstalled.',
    settings_models_installed: 'Installed models',
    settings_models_popular: 'Popular coding models',
    settings_models_none: 'No installed models',
    settings_model_dl: '⬇ Download', settings_model_ok: '✅ Installed',
    settings_model_dling: '⟳ Downloading...',
    settings_model_del_confirm: 'Delete model %s?',
    settings_model_deleted: 'Model %s deleted',
    settings_model_pulled: 'Model %s downloaded! 🎉',
    settings_app: 'Application',
    settings_uninstall: '🗑 Uninstall Strucode',
    settings_uninstall_confirm: 'Uninstall Strucode? All app files will be deleted. Your browser progress is safe.',
    settings_uninstall_done: 'Uninstalling... App will close',
    settings_footer_v: 'Strucode v1.0',
    settings_footer_sub: 'AI Coding School · Python + HTML/JS',

    news_title: '📰 AI News',
    news_loading: 'Loading...', news_error: 'Failed to fetch news. Check your connection.',
    news_read: 'Read →', news_refresh: '↻ Refresh', news_empty: 'No news found',
    news_back: '←',

    modal_xp_done: 'Task completed! 🎉', modal_next: 'Next',
    already_done: 'Already completed! ✅',
    streak_days: 'days', xp_max: 'XP (Max!)',
    completed_of: 'tasks',
    streak_label: 'Streak:',
    completed_label: 'Completed:',

    level_Новачок: 'Beginner',
    installing: 'Installing...', loading: 'Loading...', error_prefix: '❌ ',
    server_error: 'Server error: ',
  },
};

function t(key, ...args) {
  let s = (I18N[_lang] || I18N.uk)[key];
  if (s === undefined) s = I18N.uk[key] || key;
  args.forEach(a => { s = s.replace('%s', String(a)); });
  return s;
}

function getLang() { return _lang; }

function setLang(lang) {
  if (!I18N[lang]) return;
  _lang = lang;
  applyI18n();
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
}
