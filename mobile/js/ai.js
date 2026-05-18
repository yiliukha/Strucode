// ── AI Mentor module ─────────────────────────────────────────────────────────

let _aiModel = 'llama3.2:3b';
let _aiAvailable = false;

let _activeRecognition = null;
let _ollamaModelsCache = { at: 0, models: [] };

function _apiOriginPrefix() {
  try {
    const o = window.location.origin;
    if (o && o !== 'null' && /^https?:/i.test(window.location.protocol || '')) return o;
  } catch { /* ignore */ }
  return '';
}

function apiUrl(path) {
  const p = path.startsWith('/') ? path : '/' + path;
  return _apiOriginPrefix() + p;
}

async function getInstalledModelNamesForChat() {
  const now = Date.now();
  if (now - _ollamaModelsCache.at < 8000 && _ollamaModelsCache.models.length) {
    return _ollamaModelsCache.models;
  }
  const models = await getOllamaModels();
  _ollamaModelsCache = { at: now, models };
  return models;
}

async function _ensureChatModelExists() {
  const models = await getInstalledModelNamesForChat();
  if (!models.length) return;
  if (!models.includes(_aiModel)) setAiModel(models[0]);
}

function setAiVoiceMascotState(state) {
  const el = document.getElementById('ai-voice-mascot');
  if (el) el.dataset.state = state || 'idle';
}

function stopActiveRecognition() {
  if (_activeRecognition) {
    try { _activeRecognition.stop(); } catch { /* ignore */ }
    _activeRecognition = null;
  }
}

function speakTextForInterview(text) {
  return new Promise(resolve => {
    try {
      window.speechSynthesis.cancel();
    } catch { /* ignore */ }
    const chunk = String(text || '').replace(/\s+/g, ' ').trim().slice(0, 6000);
    if (!chunk) {
      resolve();
      return;
    }
    const lang = typeof getLang === 'function' && getLang() === 'en' ? 'en-US' : 'uk-UA';
    const u = new SpeechSynthesisUtterance(chunk);
    u.lang = lang;
    u.rate = 1;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    try {
      window.speechSynthesis.speak(u);
    } catch {
      resolve();
    }
  });
}

function startVoiceDictationToInput(inputEl) {
  if (!inputEl) return;
  stopActiveRecognition();
  const C = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!C) {
    window._app?.toast?.('Розпізнавання мови не підтримується в цьому браузері');
    return;
  }
  const lang = typeof getLang === 'function' && getLang() === 'en' ? 'en-US' : 'uk-UA';
  const R = new C();
  R.lang = lang;
  R.interimResults = false;
  R.maxAlternatives = 1;
  _activeRecognition = R;
  R.onresult = e => {
    const t = (e.results[0] && e.results[0][0] && e.results[0][0].transcript || '').trim();
    if (t) {
      const cur = inputEl.value || '';
      inputEl.value = cur ? `${cur} ${t}` : t;
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
    _activeRecognition = null;
    setAiVoiceMascotState('idle');
  };
  R.onerror = () => {
    _activeRecognition = null;
    setAiVoiceMascotState('idle');
  };
  R.onend = () => {
    if (_activeRecognition === R) _activeRecognition = null;
    setAiVoiceMascotState('idle');
  };
  try {
    setAiVoiceMascotState('listen');
    R.start();
  } catch {
    _activeRecognition = null;
    setAiVoiceMascotState('idle');
  }
}

function startInterviewListen() {
  if (!window._aiVoiceInterview) return;
  const input = document.getElementById('chat-input');
  if (!input) return;
  stopActiveRecognition();
  const C = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!C) return;
  const lang = typeof getLang === 'function' && getLang() === 'en' ? 'en-US' : 'uk-UA';
  const R = new C();
  R.lang = lang;
  R.interimResults = false;
  R.maxAlternatives = 1;
  _activeRecognition = R;
  setAiVoiceMascotState('listen');
  R.onresult = e => {
    const t = (e.results[0] && e.results[0][0] && e.results[0][0].transcript || '').trim();
    _activeRecognition = null;
    if (!window._aiVoiceInterview) {
      setAiVoiceMascotState('idle');
      return;
    }
    if (!t) {
      startInterviewListen();
      return;
    }
    input.value = t;
    sendChatMessage();
  };
  R.onerror = () => {
    _activeRecognition = null;
    if (window._aiVoiceInterview) startInterviewListen();
    else setAiVoiceMascotState('idle');
  };
  R.onend = () => {
    if (_activeRecognition === R) _activeRecognition = null;
  };
  try {
    R.start();
  } catch {
    if (window._aiVoiceInterview) startInterviewListen();
  }
}

window.startVoiceDictation = startVoiceDictationToInput;

const AI_SYSTEM_PROMPT = `Ти AI-ментор для навчання програмування на платформі Strucode.
Твоя роль: допомагати студентам ДУМАТИ, а не давати готові відповіді.

Правила:
1. На запит підказки (hint): дай 1-2 речення напрямку, НЕ рішення.
2. На запит пояснення: поясни концепцію просто, з коротким прикладом.
3. На запит перевірки коду: вкажи 1-3 конкретних покращення, не переписуй весь код.
4. Завжди відповідай мовою запиту (якщо по-українськи — по-українськи).
5. Будь конкретним і стислим.`;

const AI_PROMPTS = {
  hint: (task, code) => `Студент застряг на задачі. Дай ТІЛЬКИ підказку (не рішення).
Задача: ${task}
Код студента:
\`\`\`
${code || '(порожньо)'}
\`\`\`
Дай 1-2 речення підказки:`,

  explain: (concept) => `Поясни концепцію "${concept}" для початківця за 3-5 речень. Додай 1 короткий приклад коду.`,

  review: (code) => `Переглянь цей код і вкажи максимум 3 конкретних покращення. Будь конкретним.
\`\`\`
${code}
\`\`\``,

  interview: (topic) => `Ти технічний інтерв'юер. Постав одне технічне питання з теми "${topic || 'JavaScript'}". Жди відповіді студента.`,

  debug: (code, error) => `Допоможи знайти баг. Дай підказку куди дивитись (НЕ готове рішення).
Код:
\`\`\`
${code}
\`\`\`
Помилка: ${error || '(невідома)'}`,
};

/** Системний промпт: щоденна задача (відповідь лише JSON для парсингу в app.js). */
const AI_DAILY_TASK_SYSTEM = `Ти генератор навчальних задач для Strucode. Відповідь — СТРОГО один JSON-об'єкт (UTF-8), без markdown, без тексту до/після JSON.

Схема:
{"title":"короткий заголовок","prompt":"HTML-опис умови (дозволено: code, strong, em, ul, li, p)","starterCode":"стартовий код у редакторі","language":"javascript або python","tests":[{"expression":"...","expected":"...","desc":"..."}],"xp":15}

Правила:
- Задача нова, не копія з курсу дослівно. Тематика — лише з концептів тем, які студент УЖЕ повністю пройшов (список у повідомленні користувача). Якщо таких тем немає — дуже проста вправа рівня першого модуля курсу.
- language має збігатися з мовою курсу в повідомленні (javascript або python).
- tests: 2–4 тести; expression — валідний вираз у глобальній області після об'єднання starterCode і коду студента; expected — значення для порівняння (рядки в JSON у лапках); desc — коротко українською.
- xp: ціле 10–25.
- title, prompt, desc — українською.`;

/** Системний промпт: задача для пісочниці за описом студента (лише JSON). */
const AI_SANDBOX_TASK_GEN_SYSTEM = `Ти генератор задач для пісочниці Strucode. Студент описав, яку задачу згенерувати. Відповідь — СТРОГО один JSON, без markdown, без тексту поза JSON.

Схема:
{"title":"...","prompt":"HTML...","starterCode":"...","language":"javascript|python|java|sql","tests":[...],"xp":15}

Правила:
- language обери за змістом запиту (наприклад streaming API — javascript або python).
- Java: кожен тест {"type":"output_contains","expected":"фрагмент виводу","desc":"..."} (2–3 тести).
- SQL: тести type output_contains на очікуваний фрагмент результату (1–3).
- JavaScript/Python: тести {"expression","expected","desc"} як у курсі (2–4 тести).
- xp 10–25. Українською title/prompt/desc.`;

async function aiChat(userMessage, systemOverride) {
  await _ensureChatModelExists();
  const messages = [
    { role: 'system', content: systemOverride || AI_SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ];
  const resp = await fetch(apiUrl('/api/chat'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: _aiModel, messages }),
  });
  let data = {};
  try {
    data = await resp.json();
  } catch {
    throw new Error(
      resp.status === 404
        ? 'Сервер повернув 404. Переконайся, що Strucode запущено (python server.py).'
        : `Некоректна відповідь сервера (HTTP ${resp.status}).`,
    );
  }
  if (!resp.ok) {
    const err = data.error || data.message || `HTTP ${resp.status}`;
    throw new Error(String(err));
  }
  if (data.error) throw new Error(String(data.error));
  return data.reply;
}

async function aiHint(task, code) {
  return aiChat(AI_PROMPTS.hint(task, code));
}

async function aiExplain(concept) {
  return aiChat(AI_PROMPTS.explain(concept));
}

async function aiReview(code) {
  return aiChat(AI_PROMPTS.review(code));
}

async function checkOllamaStatus() {
  try {
    const resp = await fetch('/api/ollama-status');
    const { installed, running } = await resp.json();
    _aiAvailable = running;
    return { installed, running };
  } catch {
    _aiAvailable = false;
    return { installed: false, running: false };
  }
}

async function getOllamaModels() {
  try {
    const resp = await fetch('/api/ollama-models');
    const { models } = await resp.json();
    return models || [];
  } catch {
    return [];
  }
}

function setAiModel(model) {
  _aiModel = model;
}

function isAiAvailable() {
  return _aiAvailable;
}

// ── AI Chat UI (for #screen-ai-chat) ─────────────────────────────────────────

let _chatHistory = [];

function initAiChatScreen() {
  const setupEl = document.getElementById('ai-setup');
  const chatWrapEl = document.getElementById('ai-chat-wrap');
  const modelBarEl = document.getElementById('model-select-bar');
  const statusBadge = document.getElementById('ai-status-badge');
  const systemInfoEl = document.getElementById('ai-system-info');
  const ollamaSection = document.getElementById('ai-ollama-section');
  const modelSection = document.getElementById('ai-model-section');
  const checkOverlay = document.getElementById('ai-ollama-checking');
  const voiceRow = document.getElementById('ai-voice-row');

  async function refresh() {
    if (checkOverlay) {
      checkOverlay.style.display = 'flex';
      checkOverlay.setAttribute('aria-busy', 'true');
    }
    try {
      const { installed, running } = await checkOllamaStatus();
      statusBadge.className = 'ai-status ' + (running ? 'online' : 'offline');

      if (running) {
        const models = await getOllamaModels();
        if (models.length > 0) {
          setupEl.style.display = 'none';
          chatWrapEl.style.display = 'flex';
          modelBarEl.style.display = 'flex';
          if (voiceRow) voiceRow.style.display = 'flex';
          renderModelSelect(models);
          return;
        }
      }

      setupEl.style.display = 'flex';
      chatWrapEl.style.display = 'none';
      modelBarEl.style.display = 'none';
      if (voiceRow) voiceRow.style.display = 'none';

    if (!installed) {
      ollamaSection.style.display = 'block';
      modelSection.style.display = 'none';
      document.getElementById('btn-install-ollama').style.display = 'inline-flex';
      document.getElementById('install-progress').style.display = 'none';
    } else {
      ollamaSection.style.display = 'none';
      modelSection.style.display = 'block';
    }

    loadSystemInfo(systemInfoEl);
    } finally {
      if (checkOverlay) {
        checkOverlay.style.display = 'none';
        checkOverlay.setAttribute('aria-busy', 'false');
      }
    }
  }

  refresh();

  document.getElementById('btn-install-ollama')?.addEventListener('click', () => {
    startOllamaInstall(refresh);
  });

  document.getElementById('btn-pull-model')?.addEventListener('click', () => {
    startModelPull('llama3.2:3b', refresh);
  });

  document.getElementById('btn-chat-send')?.addEventListener('click', sendChatMessage);
  document.getElementById('chat-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });

  document.getElementById('btn-chat-voice')?.addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    startVoiceDictationToInput(input);
  });

  document.getElementById('btn-chat-voice-interview')?.addEventListener('click', () => {
    window._aiVoiceInterview = !window._aiVoiceInterview;
    const btn = document.getElementById('btn-chat-voice-interview');
    if (window._aiVoiceInterview) {
      btn?.classList.add('active');
      window.speechSynthesis?.cancel();
      startInterviewListen();
    } else {
      btn?.classList.remove('active');
      stopActiveRecognition();
      window.speechSynthesis?.cancel();
      setAiVoiceMascotState('idle');
    }
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

function renderModelSelect(models) {
  const sel = document.getElementById('chat-model-select');
  if (!sel) return;
  _ollamaModelsCache = { at: Date.now(), models: models.slice() };
  sel.innerHTML = '';
  if (!models.length) return;
  const pick = models.includes(_aiModel) ? _aiModel : models[0];
  setAiModel(pick);
  models.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    if (m === pick) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.onchange = () => setAiModel(sel.value);
}

async function loadSystemInfo(el) {
  if (!el) return;
  try {
    const resp = await fetch('/api/system-info');
    const info = await resp.json();
    const lines = [];
    if (info.ram_gb) lines.push(`RAM: ${info.ram_gb} GB`);
    if (info.gpu) lines.push(`GPU: ${info.gpu}`);
    if (info.vram_gb) lines.push(`VRAM: ${info.vram_gb} GB`);
    if (!lines.length) lines.push(t('ai_sysinfo_na'));
    el.textContent = lines.join(' · ');
  } catch {
    el.textContent = t('ai_sysinfo_na');
  }
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  if (!input || !messages) return;
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  appendMsg(messages, text, 'user');
  const loadingEl = appendMsg(messages, '...', 'ai loading');
  if (window._aiVoiceInterview) setAiVoiceMascotState('think');

  try {
    const reply = await aiChat(text);
    loadingEl.textContent = reply;
    loadingEl.className = 'chat-msg ai';
    if (window._aiVoiceInterview) {
      if (reply) {
        setAiVoiceMascotState('speak');
        await speakTextForInterview(reply);
      }
      setAiVoiceMascotState('idle');
      if (window._aiVoiceInterview) startInterviewListen();
    } else {
      setAiVoiceMascotState('idle');
    }
  } catch (e) {
    const msg = e && e.message ? String(e.message) : t('ai_err_unknown');
    loadingEl.textContent = '❌ ' + msg;
    loadingEl.className = 'chat-msg ai';
    setAiVoiceMascotState('idle');
    if (window._aiVoiceInterview) startInterviewListen();
  }
  messages.scrollTop = messages.scrollHeight;
}

function appendMsg(container, text, cls) {
  const div = document.createElement('div');
  div.className = 'chat-msg ' + cls;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

async function startOllamaInstall(onDone) {
  const btn = document.getElementById('btn-install-ollama');
  const progress = document.getElementById('install-progress');
  const progressText = document.getElementById('install-progress-text');
  if (!btn || !progress) return;

  btn.style.display = 'none';
  progress.style.display = 'block';

  try {
    await fetch('/api/install-ollama', { method: 'POST' });
  } catch {}

  const interval = setInterval(async () => {
    try {
      const resp = await fetch('/api/ollama-install-progress');
      const data = await resp.json();
      if (progressText) progressText.textContent = getStatusText(data.status);
      if (data.status === 'done') {
        clearInterval(interval);
        progress.style.display = 'none';
        onDone();
      } else if (data.status === 'error') {
        clearInterval(interval);
        if (progressText) progressText.textContent = t('ai_install_err', data.message || t('settings_error_unknown'));
      }
    } catch {}
  }, 1500);
}

async function startModelPull(model, onDone) {
  const btn = document.getElementById('btn-pull-model');
  const progress = document.getElementById('pull-progress');
  const progressText = document.getElementById('pull-progress-text');
  if (!btn || !progress) return;

  btn.style.display = 'none';
  progress.style.display = 'block';

  try {
    await fetch('/api/pull-model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model }),
    });
  } catch {}

  const interval = setInterval(async () => {
    try {
      const resp = await fetch('/api/ollama-pull-progress');
      const data = await resp.json();
      const lastLog = data.logs && data.logs.length ? data.logs[data.logs.length - 1] : '';
      if (progressText) progressText.textContent = lastLog || getStatusText(data.status);
      if (data.status === 'done') {
        clearInterval(interval);
        progress.style.display = 'none';
        onDone();
      } else if (data.status === 'error') {
        clearInterval(interval);
        if (progressText) progressText.textContent = t('ai_pull_err', data.message || t('settings_pull_fail'));
      }
    } catch {}
  }, 1500);
}

function getStatusText(status) {
  const m = {
    idle: 'ai_status_idle',
    pending: 'ai_status_pending',
    downloading: 'ai_status_downloading',
    installing: 'ai_status_installing',
    done: 'ai_status_done',
  };
  const k = m[status];
  return k ? t(k) : status;
}
