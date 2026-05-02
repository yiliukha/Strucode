// ── AI Mentor module ─────────────────────────────────────────────────────────

let _aiModel = 'llama3.2:3b';
let _aiAvailable = false;

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

async function aiChat(userMessage, systemOverride) {
  const messages = [
    { role: 'system', content: systemOverride || AI_SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ];
  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: _aiModel, messages }),
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error);
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

  async function refresh() {
    const { installed, running } = await checkOllamaStatus();
    statusBadge.className = 'ai-status ' + (running ? 'online' : 'offline');

    if (running) {
      const models = await getOllamaModels();
      if (models.length > 0) {
        setupEl.style.display = 'none';
        chatWrapEl.style.display = 'flex';
        modelBarEl.style.display = 'flex';
        renderModelSelect(models);
        return;
      }
    }

    setupEl.style.display = 'flex';
    chatWrapEl.style.display = 'none';
    modelBarEl.style.display = 'none';

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

  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.dataset.scenario;
      const input = document.getElementById('chat-input');
      const scenarios = {
        explain: 'Поясни мені концепцію замикань (closures) в JavaScript',
        review: 'Переглянь мій код:\n\nfunction sum(a, b) {\n  var result = a + b;\n  return result;\n}',
        interview: 'Давай проведемо технічну співбесіду по JavaScript',
        debug: 'Допоможи знайти баг:\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Очікував 0,1,2 але отримую 3,3,3',
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
  sel.innerHTML = '';
  models.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    if (m === _aiModel) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => setAiModel(sel.value));
  if (models.length) setAiModel(models[0]);
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
    if (!lines.length) lines.push('Системна інформація недоступна');
    el.textContent = lines.join(' · ');
  } catch {
    el.textContent = 'Системна інформація недоступна';
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

  try {
    const reply = await aiChat(text);
    loadingEl.textContent = reply;
    loadingEl.className = 'chat-msg ai';
  } catch (e) {
    loadingEl.textContent = '❌ Ollama не відповідає. Перевір чи запущена.';
    loadingEl.className = 'chat-msg ai';
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
        if (progressText) progressText.textContent = '❌ Помилка: ' + (data.message || 'невідома');
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
        if (progressText) progressText.textContent = '❌ ' + (data.message || 'Помилка завантаження');
      }
    } catch {}
  }, 1500);
}

function getStatusText(status) {
  return {
    idle: 'Очікування...',
    pending: 'Підготовка...',
    downloading: 'Завантаження...',
    installing: 'Встановлення...',
    done: 'Готово!',
  }[status] || status;
}
