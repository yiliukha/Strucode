#!/usr/bin/env python3
"""
Strucode — локальний сервер
  * Роздає статичні файли
  * Ollama proxy (AI Mentor)
  * /api/run-code — виконання коду (JS, Python)
  * /api/check-task — перевірка задачі з тестами

Запуск: python3 server.py
"""
import http.server
import json
import logging
import logging.handlers
import os
import shutil
import subprocess
import sys
import tempfile
import threading
import time
import base64
import urllib.request
import uuid
import webbrowser
from pathlib import Path

# Expand PATH in frozen macOS .app
if getattr(sys, 'frozen', False) and sys.platform == 'darwin':
    _extra = ['/opt/homebrew/bin', '/opt/homebrew/sbin', '/usr/local/bin', '/usr/bin', '/bin', '/usr/sbin', '/sbin']
    _cur = os.environ.get('PATH', '').split(os.pathsep)
    os.environ['PATH'] = os.pathsep.join(_extra + [p for p in _cur if p not in _extra])

if getattr(sys, 'frozen', False) and sys.stdout is None:
    sys.stdout = open(os.devnull, 'w', encoding='utf-8')
    sys.stderr = open(os.devnull, 'w', encoding='utf-8')
elif sys.stdout and sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')


def _get_log_path() -> Path:
    if sys.platform == 'win32':
        base = Path(os.environ.get('APPDATA', Path.home()))
    elif sys.platform == 'darwin':
        base = Path.home() / 'Library' / 'Logs'
    else:
        base = Path.home() / '.local' / 'share'
    log_dir = base / 'Strucode' / 'logs'
    log_dir.mkdir(parents=True, exist_ok=True)
    return log_dir / 'strucode.log'


def _setup_logger() -> logging.Logger:
    logger = logging.getLogger('strucode')
    logger.setLevel(logging.ERROR)
    if not logger.handlers:
        handler = logging.handlers.RotatingFileHandler(
            _get_log_path(), maxBytes=1_000_000, backupCount=3, encoding='utf-8'
        )
        handler.setFormatter(logging.Formatter(
            '%(asctime)s [%(levelname)s] %(message)s', datefmt='%Y-%m-%d %H:%M:%S'
        ))
        logger.addHandler(handler)
    return logger


log = _setup_logger()

_W = {'creationflags': 0x08000000} if sys.platform == 'win32' else {}

# ── Ollama helpers (reused from LinguaLeap) ──────────────────────────────────

def _ollama_running():
    try:
        urllib.request.urlopen('http://localhost:11434/api/tags', timeout=2)
        return True
    except Exception:
        return False


def _ollama_installed():
    if shutil.which('ollama'):
        return True
    for p in ['/usr/local/bin/ollama', '/opt/homebrew/bin/ollama']:
        if os.path.isfile(p) and os.access(p, os.X_OK):
            return True
    return False


def _start_ollama():
    if _ollama_running():
        return None
    if not _ollama_installed():
        print('  ⚠️  Ollama не встановлена — AI-ментор недоступний')
        return None
    print('  🤖  Запускаю Ollama...')
    try:
        proc = subprocess.Popen(['ollama', 'serve'],
                                stdout=subprocess.DEVNULL,
                                stderr=subprocess.DEVNULL, **_W)
    except FileNotFoundError:
        print('  ⚠️  Ollama не знайдена')
        return None
    for _ in range(20):
        time.sleep(0.5)
        if _ollama_running():
            print('  🤖  Ollama ✅')
            return proc
    return proc


def _download_file(url, dest):
    ctx = None
    try:
        import ssl, certifi
        ctx = ssl.create_default_context(cafile=certifi.where())
    except Exception:
        pass
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    kw = {'context': ctx} if ctx else {}
    with urllib.request.urlopen(req, **kw) as r:
        with open(dest, 'wb') as f:
            import io
            shutil.copyfileobj(r, f)


_ollama_install_progress = None
_ollama_pull_progress = None


def _install_ollama_thread(progress_list):
    import zipfile
    plat = sys.platform
    try:
        if plat == 'darwin':
            brew = shutil.which('brew')
            if brew:
                progress_list.append('installing')
                proc = subprocess.Popen([brew, 'install', 'ollama'],
                                        stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
                for line in proc.stdout:
                    line = line.rstrip()
                    if line:
                        progress_list.append(f'log:{line}')
                proc.wait()
                if proc.returncode != 0:
                    raise Exception(f'brew install ollama failed ({proc.returncode})')
            else:
                url = 'https://ollama.com/download/Ollama-darwin.zip'
                progress_list.append('downloading')
                tmp = tempfile.mktemp(suffix='.zip')
                _download_file(url, tmp)
                progress_list.append('installing')
                with zipfile.ZipFile(tmp, 'r') as z:
                    z.extractall('/Applications')
                os.unlink(tmp)
                subprocess.Popen(['open', '/Applications/Ollama.app'])
                for _ in range(60):
                    time.sleep(1)
                    if _ollama_installed() and _ollama_running():
                        break
        elif plat == 'win32':
            winget = shutil.which('winget')
            if winget:
                progress_list.append('installing')
                proc = subprocess.Popen(
                    [winget, 'install', '--id', 'Ollama.Ollama',
                     '--accept-package-agreements', '--accept-source-agreements'],
                    stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
                for line in proc.stdout:
                    line = line.rstrip()
                    if line:
                        progress_list.append(f'log:{line}')
                proc.wait()
            else:
                url = 'https://ollama.com/download/OllamaSetup.exe'
                progress_list.append('downloading')
                tmp = tempfile.mktemp(suffix='.exe')
                _download_file(url, tmp)
                progress_list.append('installing')
                proc = subprocess.Popen([tmp, '/S'], stdout=subprocess.PIPE,
                                        stderr=subprocess.STDOUT, text=True)
                proc.wait()
        else:
            progress_list.append('downloading')
            script = tempfile.mktemp(suffix='.sh')
            _download_file('https://ollama.com/install.sh', script)
            progress_list.append('installing')
            subprocess.run(['sh', script], check=True)
            os.unlink(script)
        if not _ollama_running():
            ollama_bin = shutil.which('ollama')
            if ollama_bin:
                subprocess.Popen([ollama_bin, 'serve'],
                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(40):
            time.sleep(1)
            if _ollama_running():
                break
        progress_list.append('done')
    except Exception as e:
        progress_list.append(f'error:{e}')


def _pull_model_thread(model, progress_list):
    try:
        ollama_bin = shutil.which('ollama')
        if not ollama_bin:
            raise Exception('ollama not found in PATH')
        if not _ollama_running():
            subprocess.Popen([ollama_bin, 'serve'],
                              stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            for _ in range(20):
                time.sleep(1)
                if _ollama_running():
                    break
        proc = subprocess.Popen([ollama_bin, 'pull', model],
                                 stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        for line in proc.stdout:
            line = line.rstrip()
            if line:
                progress_list.append(f'log:{line}')
        proc.wait()
        if proc.returncode != 0:
            raise Exception(f'ollama pull failed ({proc.returncode})')
        progress_list.append('done')
    except Exception as e:
        progress_list.append(f'error:{e}')


def _get_system_info():
    info = {'ram_gb': None, 'vram_gb': None, 'gpu': None}
    try:
        if sys.platform == 'darwin':
            out = subprocess.check_output(['sysctl', '-n', 'hw.memsize'], text=True, **_W).strip()
            info['ram_gb'] = round(int(out) / (1024 ** 3))
            chip = subprocess.check_output(['sysctl', '-n', 'machdep.cpu.brand_string'],
                                           text=True, stderr=subprocess.DEVNULL, **_W).strip()
            if 'Apple' in chip:
                info['vram_gb'] = info['ram_gb']
                info['gpu'] = chip
        elif sys.platform == 'linux':
            with open('/proc/meminfo') as f:
                for line in f:
                    if line.startswith('MemTotal:'):
                        info['ram_gb'] = round(int(line.split()[1]) / (1024 ** 2))
        elif sys.platform == 'win32':
            out = subprocess.check_output(
                ['wmic', 'computersystem', 'get', 'TotalPhysicalMemory', '/value'],
                text=True, stderr=subprocess.DEVNULL, **_W)
            for line in out.splitlines():
                if '=' in line:
                    info['ram_gb'] = round(int(line.split('=')[1].strip()) / (1024 ** 3))
    except Exception:
        pass
    if info['vram_gb'] is None:
        try:
            out = subprocess.check_output(
                ['nvidia-smi', '--query-gpu=name,memory.total', '--format=csv,noheader,nounits'],
                text=True, stderr=subprocess.DEVNULL, **_W).strip().splitlines()
            if out:
                parts = out[0].split(',')
                info['gpu'] = parts[0].strip()
                info['vram_gb'] = round(int(parts[1].strip()) / 1024)
        except Exception:
            pass
    if info['vram_gb'] is None:
        try:
            out = subprocess.check_output(['rocm-smi', '--showmeminfo', 'vram', '--csv'],
                                          text=True, stderr=subprocess.DEVNULL, **_W)
            for line in out.splitlines():
                if 'Total' in line:
                    mb = int(line.split(',')[-1].strip())
                    info['vram_gb'] = round(mb / 1024)
                    info['gpu'] = 'AMD GPU'
        except Exception:
            pass
    return info


# ── Code execution helpers ────────────────────────────────────────────────────

CODE_TIMEOUT = 5  # seconds

_JS_RUNNER_TEMPLATE = r"""
const __logs__ = [];
const __origLog = console.log;
const __origError = console.error;
const __origWarn = console.warn;
console.log = (...a) => __logs__.push(a.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' '));
console.error = (...a) => __logs__.push('Error: ' + a.map(String).join(' '));
console.warn = (...a) => __logs__.push('Warn: ' + a.map(String).join(' '));
try {
%(code)s
} catch(e) {
  __logs__.push('RuntimeError: ' + e.message);
}
process.stdout.write(__logs__.join('\n'));
"""

_JS_TEST_TEMPLATE = r"""
const __testOutput__ = [];
const __testResults__ = [];
const __tests__ = %(tests)s;
console.log = (...a) => __testOutput__.push(a.map(v => typeof v === 'object' ? JSON.stringify(v) : String(v)).join(' '));
console.error = (...a) => __testOutput__.push('Error: ' + a.map(String).join(' '));
console.warn = (...a) => __testOutput__.push('Warn: ' + a.map(String).join(' '));

// Run user code + tests in one function scope so eval() can see const/let
const __runner__ = new Function('__tests__', '__testResults__', `
%(code)s

for (const __t__ of __tests__) {
  try {
    const __val__ = eval(__t__.expression);
    __testResults__.push({
      desc: __t__.desc,
      passed: String(__val__) === String(__t__.expected),
      got: String(__val__),
      expected: String(__t__.expected)
    });
  } catch(__e__) {
    __testResults__.push({ desc: __t__.desc, passed: false, error: __e__.message });
  }
}
`);

try {
  __runner__(__tests__, __testResults__);
} catch(__e__) {
  __testResults__.push({ desc: 'Code Error', passed: false, error: __e__.message });
}
process.stdout.write(JSON.stringify({ output: __testOutput__.join('\n'), results: __testResults__ }));
"""

_PY_RUNNER_TEMPLATE = r"""
import sys as _sys, io as _io
_buf = _io.StringIO()
_sys.stdout = _buf
_sys.stderr = _buf
try:
%(code)s
except Exception as _e:
  print(f'RuntimeError: {_e}')
_sys.stdout = _sys.__stdout__
print(_buf.getvalue(), end='')
"""

_PY_TEST_TEMPLATE = r"""
import sys as _sys, io as _io, json as _json
_buf = _io.StringIO()
_sys.stdout = _buf
_sys.stderr = _buf
_tests = %(tests)s
_results = []
try:
%(code)s
except Exception as _e:
  _sys.stdout = _sys.__stdout__
  _results.append({'desc': 'Code Error', 'passed': False, 'error': str(_e)})
  print(_json.dumps({'output': _buf.getvalue(), 'results': _results}))
  _sys.exit(0)
_sys.stdout = _sys.__stdout__
for t in _tests:
  try:
    _val = eval(t['expression'])
    _results.append({
      'desc': t['desc'],
      'passed': str(_val) == str(t['expected']),
      'got': str(_val),
      'expected': str(t['expected'])
    })
  except Exception as _e:
    _results.append({'desc': t['desc'], 'passed': False, 'error': str(_e)})
print(_json.dumps({'output': _buf.getvalue(), 'results': _results}))
"""


def _indent_code(code: str, spaces: int = 2) -> str:
    pad = ' ' * spaces
    return '\n'.join(pad + line for line in code.splitlines())


def _run_js(code: str) -> dict:
    node = shutil.which('node') or shutil.which('nodejs')
    if not node:
        return {'output': '', 'error': 'Node.js не знайдено. Встановіть Node.js для запуску JS.', 'runtime_ms': 0}
    script = _JS_RUNNER_TEMPLATE % {'code': _indent_code(code, 0)}
    t0 = time.time()
    try:
        r = subprocess.run(
            [node, '--eval', script],
            capture_output=True, text=True, timeout=CODE_TIMEOUT, **_W
        )
        ms = int((time.time() - t0) * 1000)
        output = r.stdout
        err = r.stderr.strip() if r.stderr.strip() else None
        return {'output': output, 'error': err, 'runtime_ms': ms}
    except subprocess.TimeoutExpired:
        return {'output': '', 'error': f'Timeout: код виконується довше {CODE_TIMEOUT}с', 'runtime_ms': CODE_TIMEOUT * 1000}
    except Exception as e:
        return {'output': '', 'error': str(e), 'runtime_ms': 0}


def _run_python(code: str) -> dict:
    python = sys.executable
    script = _PY_RUNNER_TEMPLATE % {'code': _indent_code(code, 2)}
    t0 = time.time()
    try:
        r = subprocess.run(
            [python, '-c', script],
            capture_output=True, text=True, timeout=CODE_TIMEOUT, **_W
        )
        ms = int((time.time() - t0) * 1000)
        output = r.stdout
        err = r.stderr.strip() if r.stderr.strip() else None
        return {'output': output, 'error': err, 'runtime_ms': ms}
    except subprocess.TimeoutExpired:
        return {'output': '', 'error': f'Timeout: код виконується довше {CODE_TIMEOUT}с', 'runtime_ms': CODE_TIMEOUT * 1000}
    except Exception as e:
        return {'output': '', 'error': str(e), 'runtime_ms': 0}


def _check_js(code: str, tests: list) -> dict:
    node = shutil.which('node') or shutil.which('nodejs')
    if not node:
        return {'output': '', 'results': [], 'passed': False, 'error': 'Node.js не знайдено'}
    script = _JS_TEST_TEMPLATE % {
        'code': _indent_code(code, 0),
        'tests': json.dumps(tests)
    }
    try:
        r = subprocess.run(
            [node, '--eval', script],
            capture_output=True, text=True, timeout=CODE_TIMEOUT, **_W
        )
        data = json.loads(r.stdout)
        results = data.get('results', [])
        passed = bool(results) and all(res.get('passed') for res in results)
        return {'output': data.get('output', ''), 'results': results, 'passed': passed}
    except subprocess.TimeoutExpired:
        return {'output': '', 'results': [], 'passed': False, 'error': f'Timeout: {CODE_TIMEOUT}с'}
    except Exception as e:
        return {'output': '', 'results': [], 'passed': False, 'error': str(e)}


def _check_java_task(code: str, tests: list) -> dict:
    result = _run_java(code)
    if result.get('jdk_missing'):
        return result
    output = result.get('output', '')
    err = result.get('error')
    if err and not output:
        return {'output': output, 'results': [{'desc': 'Compilation/Runtime', 'passed': False, 'error': err}],
                'passed': False, 'error': err}
    results = []
    for t in tests:
        if t.get('type') == 'output_contains':
            passed = t['expected'] in output
            results.append({
                'desc': t['desc'],
                'passed': passed,
                'got': output[:80] if not passed else None,
                'expected': t['expected'],
            })
        else:
            results.append({'desc': t.get('desc', ''), 'passed': False, 'error': 'Java підтримує лише output_contains тести'})
    passed = bool(results) and all(r.get('passed') for r in results)
    return {'output': output, 'results': results, 'passed': passed, 'runtime_ms': result.get('runtime_ms', 0)}


def _check_python(code: str, tests: list) -> dict:
    python = sys.executable
    script = _PY_TEST_TEMPLATE % {
        'code': _indent_code(code, 2),
        'tests': json.dumps(tests)
    }
    try:
        r = subprocess.run(
            [python, '-c', script],
            capture_output=True, text=True, timeout=CODE_TIMEOUT, **_W
        )
        data = json.loads(r.stdout)
        results = data.get('results', [])
        passed = bool(results) and all(res.get('passed') for res in results)
        return {'output': data.get('output', ''), 'results': results, 'passed': passed}
    except subprocess.TimeoutExpired:
        return {'output': '', 'results': [], 'passed': False, 'error': f'Timeout: {CODE_TIMEOUT}с'}
    except Exception as e:
        return {'output': '', 'results': [], 'passed': False, 'error': str(e)}


# ── Java execution ───────────────────────────────────────────────────────────

def _check_java() -> dict:
    javac = shutil.which('javac')
    java = shutil.which('java')
    version = None
    if java:
        try:
            r = subprocess.run([java, '-version'], capture_output=True, text=True, **_W)
            version = (r.stderr or r.stdout).splitlines()[0] if (r.stderr or r.stdout) else None
        except Exception:
            pass
    return {'javac': bool(javac), 'java': bool(java), 'version': version}


def _run_java(code: str) -> dict:
    info = _check_java()
    if not info['javac'] or not info['java']:
        plat = sys.platform
        if plat == 'darwin':
            guide = 'brew install openjdk  (macOS)'
        elif plat == 'win32':
            guide = 'winget install -e --id EclipseAdoptium.Temurin.21.JDK  (Windows)'
        else:
            guide = 'sudo apt install default-jdk  (Ubuntu/Debian)\nsudo dnf install java-21-openjdk-devel  (Fedora)'
        return {'output': '', 'error': 'JDK не встановлено.',
                'runtime_ms': 0, 'jdk_missing': True, 'install_guide': guide}
    tmpdir = tempfile.mkdtemp()
    try:
        # Extract public class name from code (default Main)
        import re
        m = re.search(r'public\s+class\s+(\w+)', code)
        class_name = m.group(1) if m else 'Main'
        src = os.path.join(tmpdir, f'{class_name}.java')
        with open(src, 'w', encoding='utf-8') as f:
            f.write(code)
        t0 = time.time()
        compile_r = subprocess.run(
            [shutil.which('javac'), src],
            capture_output=True, text=True, timeout=15, cwd=tmpdir, **_W
        )
        if compile_r.returncode != 0:
            return {'output': '', 'error': compile_r.stderr or compile_r.stdout, 'runtime_ms': 0}
        run_r = subprocess.run(
            [shutil.which('java'), '-cp', tmpdir, class_name],
            capture_output=True, text=True, timeout=CODE_TIMEOUT, cwd=tmpdir, **_W
        )
        ms = int((time.time() - t0) * 1000)
        return {'output': run_r.stdout, 'error': run_r.stderr.strip() or None, 'runtime_ms': ms}
    except subprocess.TimeoutExpired:
        return {'output': '', 'error': f'Timeout: {CODE_TIMEOUT}с', 'runtime_ms': CODE_TIMEOUT * 1000}
    except Exception as e:
        return {'output': '', 'error': str(e), 'runtime_ms': 0}
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


# ── AI News ───────────────────────────────────────────────────────────────────

# ── Lesson screenshot verification ───────────────────────────────────────────

_verify_jobs: dict = {}                    # job_id -> {status, message, ts}
_verify_lock = threading.Lock()
_verify_config = {'model': 'moondream2'}   # dedicated vision model for AI courses

# Per-lesson prompts: what "completion" looks like on a screenshot
_LESSON_VERIFY_PROMPTS = {

    # ── Topic 1: Google Gemini & AI Infrastructure ────────────────────────────
    'gemini-academy': (
        'Look at this screenshot. Does it show a completed Google Cloud Skills Boost '
        'course or learning path about Gemini or Generative AI? '
        'Valid evidence: an earned digital badge, "Completed" or "Earned" label, '
        '"Learning path complete" banner, or 100% progress on Google Cloud branding. '
        'Answer only YES or NO.'
    ),
    'generative-ai-developers': (
        'Look at this screenshot. Does it show a completed Google Cloud Skills Boost '
        'course for "Generative AI for Developers" or a similar Generative AI path? '
        'Valid evidence: earned badge, "Course complete" or "Path complete" banner, '
        '100% progress bar, on Google Cloud or Google Developers branding. '
        'Answer only YES or NO.'
    ),
    'google-ai-essentials': (
        'Look at this screenshot. Does it show a Coursera certificate or completion page '
        'for "Google AI Essentials" or a similar Google AI course? '
        'Valid evidence: a Coursera certificate with a name on it, "Congratulations" message, '
        'a green checkmark on the course card, or 100% course progress. '
        'Answer only YES or NO.'
    ),

    # ── Topic 2: Coding & AI Editors ─────────────────────────────────────────
    'cursor-docs': (
        'Look at this screenshot. Does it show the Cursor IDE with an active AI feature? '
        'Valid evidence: the Composer panel open (right panel with AI chat), '
        'an "Applied" status on a code block, an inline Tab autocomplete suggestion, '
        'or a Cursor AI code diff/edit applied in the editor. '
        'Answer only YES or NO.'
    ),
    'github-copilot-skills': (
        'Look at this screenshot. Does it show GitHub Skills or GitHub Learning Lab '
        'with a completed exercise or step? '
        'Valid evidence: a green checkmark on a step, "Pull request merged" success page, '
        '"You completed this course!" banner, or a finished GitHub Actions workflow on Skills. '
        'Answer only YES or NO.'
    ),
    'copilot-microsoft-learn': (
        'Look at this screenshot. Does it show Microsoft Learn with a completed module '
        'or achievement about GitHub Copilot? '
        'Valid evidence: a "Module complete" or "Unit complete" banner, XP awarded badge, '
        'a trophy icon, or 100% progress bar on Microsoft Learn branding. '
        'Answer only YES or NO.'
    ),
    'windsurf-guide': (
        'Look at this screenshot. Does it show the Windsurf IDE (by Codeium) with an active '
        'AI feature in use? '
        'Valid evidence: the Cascade panel open with an AI response, an AI-generated code diff '
        'highlighted in the editor, Windsurf or Codeium logo visible, or an "Accept" button '
        'on an AI suggestion. '
        'Answer only YES or NO.'
    ),

    # ── Topic 3: Video Generation ─────────────────────────────────────────────
    'runway-academy': (
        'Look at this screenshot. Does it show Runway Academy or RunwayML with a completed '
        'lesson or module? '
        'Valid evidence: a blue checkmark or "Completed" label next to a lesson, '
        '"Lesson complete" banner, a finished video in the Runway Gen-3 editor, '
        'or a Download button on a generated video. '
        'Answer only YES or NO.'
    ),
    'luma-dream-machine': (
        'Look at this screenshot. Does it show Luma AI Dream Machine with a finished '
        'video generation? '
        'Valid evidence: a generated video thumbnail with a "Download" or "Extend" button, '
        '100% generation progress, Luma AI branding visible, or a completed video in the gallery. '
        'Answer only YES or NO.'
    ),
    'sora-prep-course': (
        'Look at this screenshot. Does it show a completed course or certificate about Sora '
        'or AI video generation on any learning platform (Great Learning, Coursera, Udemy, etc.)? '
        'Valid evidence: a certificate with a name, "Course complete" banner, badge, '
        'or 100% progress on a Sora/AI video course. '
        'Answer only YES or NO.'
    ),
    'heygen-learning': (
        'Look at this screenshot. Does it show HeyGen with a completed AI avatar video '
        'or a finished tutorial? '
        'Valid evidence: a generated avatar video ready to download, HeyGen branding, '
        '"Export" or "Download" button on a finished video, or a "Video ready" notification. '
        'Answer only YES or NO.'
    ),

    # ── Topic 4: Design & Images ─────────────────────────────────────────────
    'midjourney-guide': (
        'Look at this screenshot. Does it show Midjourney with a successfully generated image? '
        'Valid evidence: a 2x2 grid of 4 images with U1 U2 U3 U4 and V1 V2 V3 V4 buttons below, '
        'or a single upscaled image on midjourney.com or in Discord with Midjourney bot branding. '
        'Answer only YES or NO.'
    ),
    'adobe-firefly': (
        'Look at this screenshot. Does it show Adobe Firefly or Adobe Photoshop Generative Fill '
        'with a successfully generated image or a completed Adobe tutorial? '
        'Valid evidence: a Firefly-generated image in the interface, Adobe branding, '
        'a "Generate" result, Generative Fill layers panel, or a completed Adobe Learn tutorial. '
        'Answer only YES or NO.'
    ),
    'canva-design-school': (
        'Look at this screenshot. Does it show Canva with an AI-generated design or a completed '
        'Canva Design School lesson? '
        'Valid evidence: Magic Studio panel with a generated result, Canva branding, '
        '"Text to Image" or "Magic Media" result, or a completed lesson checkmark in Canva Design School. '
        'Answer only YES or NO.'
    ),
    'stable-diffusion': (
        'Look at this screenshot. Does it show a Stable Diffusion interface (AUTOMATIC1111, ComfyUI, '
        'or Civitai) with a successfully generated image? '
        'Valid evidence: a generated image in txt2img or img2img result area, '
        'a ComfyUI node graph with completed output, or a Civitai tutorial page at the end. '
        'Answer only YES or NO.'
    ),

    # ── Topic 5: AI Agents & Bots ─────────────────────────────────────────────
    'deeplearning-ai': (
        'Look at this screenshot. Does it show a DeepLearning.AI course certificate '
        'or completion page on Coursera? '
        'Valid evidence: a Coursera certificate with "DeepLearning.AI" and a name, '
        '"Congratulations" message, a green checkmark on a course card, '
        'or 100% progress on a DeepLearning.AI short course. '
        'Answer only YES or NO.'
    ),
    'langchain-academy': (
        'Look at this screenshot. Does it show LangChain Academy with a completed module '
        'or course? '
        'Valid evidence: a "Module complete" indicator, LangChain Academy branding with progress, '
        'a certificate page, or a completed lesson list with checkmarks. '
        'Answer only YES or NO.'
    ),
    'crewai-examples': (
        'Look at this screenshot. Does it show a terminal or code editor with CrewAI '
        'agent execution output? '
        'Valid evidence: terminal output showing "Crew execution complete", agent task results, '
        'Python code with crewai import running successfully, or a CrewAI workflow result in terminal. '
        'Answer only YES or NO.'
    ),

    # ── Topic 6: Search & Research ────────────────────────────────────────────
    'anthropic-cookbooks': (
        'Look at this screenshot. Does it show a Jupyter Notebook or Google Colab with '
        'an Anthropic Claude API response? '
        'Valid evidence: a notebook output cell containing Claude API JSON response, '
        'an "anthropic" import at the top, a completed code cell with AI-generated text output, '
        'or a Colab/Jupyter interface with Claude response visible. '
        'Answer only YES or NO.'
    ),
    'perplexity-guides': (
        'Look at this screenshot. Does it show Perplexity AI with a completed Pro Search result? '
        'Valid evidence: a Perplexity answer page with multiple cited sources listed, '
        'a "Pro Search" indicator, an in-depth research answer with numbered references, '
        'or Perplexity branding with a detailed multi-paragraph AI response. '
        'Answer only YES or NO.'
    ),

    # ── Topic 7: Automation ───────────────────────────────────────────────────
    'make-academy': (
        'Look at this screenshot. Does it show a Make (formerly Integromat) Academy '
        'certificate or course completion? '
        'Valid evidence: a Make Academy Foundation or Expert certificate with a name, '
        '"Level 1", "Level 2", or "Level 3" completion badge, Make branding with a '
        '"Congratulations" or "Certificate" message, or 100% progress on a Make Academy course. '
        'Answer only YES or NO.'
    ),
    'zapier-university': (
        'Look at this screenshot. Does it show a Zapier University course completion or badge? '
        'Valid evidence: a Zapier badge for "101", "201", or "301" course, '
        '"Zapier University" branding with a completion indicator, a certificate or badge '
        'page on Zapier, or 100% progress on a Zapier course module. '
        'Answer only YES or NO.'
    ),
    'n8n-courses': (
        'Look at this screenshot. Does it show n8n with a completed workflow or course lesson? '
        'Valid evidence: a working n8n workflow canvas with connected nodes and successful '
        'execution (green checkmarks on nodes), a course completion page on n8n.io, '
        'n8n branding with "Execution succeeded" status, or a finished workflow run log. '
        'Answer only YES or NO.'
    ),
    'hubspot-automation': (
        'Look at this screenshot. Does it show a HubSpot Academy certificate or course completion? '
        'Valid evidence: a HubSpot certificate with a name and "Marketing Automation" or similar title, '
        '"HubSpot Academy" branding with "Congratulations", a digital badge, '
        'or 100% progress on a HubSpot course. '
        'Answer only YES or NO.'
    ),
    'activecampaign-automation': (
        'Look at this screenshot. Does it show an ActiveCampaign certification or course completion? '
        'Valid evidence: an ActiveCampaign certificate with a name, "Certified Specialist" '
        'or "Automation" title, ActiveCampaign branding with a completion badge, '
        'or a passed exam result page on ActiveCampaign. '
        'Answer only YES or NO.'
    ),
    'uipath-rpa': (
        'Look at this screenshot. Does it show a UiPath Academy certificate or course completion? '
        'Valid evidence: a UiPath diploma or certificate with a name, "RPA Developer" or '
        '"Automation Developer" title, UiPath Academy branding with "Passed" or "Completed", '
        'a digital badge, or 100% progress on a UiPath Academy course. '
        'Answer only YES or NO.'
    ),

    # ── Fallback ──────────────────────────────────────────────────────────────
    '_default': (
        'Look at this screenshot. Does it show that the user completed an online AI course, '
        'tutorial, or successfully used an AI tool? '
        'Valid evidence: a certificate, badge, "Completed" or "Congratulations" message, '
        '100% progress bar, a generated AI result, or a "Course complete" indicator. '
        'Answer only YES or NO.'
    ),
}


def _run_vision_verify(job_id: str, image_bytes: bytes, lesson_id: str):
    prompt = _LESSON_VERIFY_PROMPTS.get(lesson_id, _LESSON_VERIFY_PROMPTS['_default'])
    model = _verify_config['model']
    try:
        img_b64 = base64.b64encode(image_bytes).decode('utf-8')
        payload = json.dumps({
            'model': model,
            'messages': [{'role': 'user', 'content': prompt, 'images': [img_b64]}],
            'stream': False,
        }).encode()
        req = urllib.request.Request(
            'http://localhost:11434/api/chat',
            data=payload,
            headers={'Content-Type': 'application/json'},
            method='POST',
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
        reply = data.get('message', {}).get('content', '').upper()
        confirmed = 'YES' in reply
        result = {
            'status': 'confirmed' if confirmed else 'rejected',
            'message': 'Урок підтверджено! +XP нараховано.' if confirmed
                       else 'Скріншот не підтверджує завершення. Завантаж інший і спробуй ще раз.',
            'ts': time.time(),
        }
    except Exception as e:
        log.error('verify job %s failed: %s', job_id, e)
        result = {'status': 'error', 'message': f'Помилка перевірки: {e}', 'ts': time.time()}
    with _verify_lock:
        _verify_jobs[job_id] = result


# ── AI News ───────────────────────────────────────────────────────────────────

_NEWS_CACHE_TTL = 300          # 5 minutes
_NEWS_MAX_AGE   = 2 * 86400    # drop articles older than 2 days
_news_cache: dict = {'data': [], 'fetched_at': 0.0, 'fetching': False}

_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; Strucode/1.0)',
    'Accept': 'application/json, text/html, */*',
}
_REDDIT_HEADERS = {
    'User-Agent': 'Strucode/1.0 (AI news aggregator; contact strucode@example.com)',
    'Accept': 'application/json',
}


def _ssl_ctx():
    import ssl
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx


def _http_get(url, timeout=12):
    req = urllib.request.Request(url, headers=_HEADERS)
    with urllib.request.urlopen(req, context=_ssl_ctx(), timeout=timeout) as r:
        return r.read()


def _parse_date_ts(date_str):
    if not date_str:
        return 0
    try:
        from email.utils import parsedate_to_datetime
        return parsedate_to_datetime(date_str).timestamp()
    except Exception:
        pass
    try:
        from datetime import datetime
        return datetime.fromisoformat(date_str.replace('Z', '+00:00')).timestamp()
    except Exception:
        return 0


def _fetch_hn():
    """Hacker News Algolia search — JSON, very reliable."""
    import re as _re
    url = ('https://hn.algolia.com/api/v1/search'
           '?tags=story&query=AI+LLM+machine+learning+OpenAI+Anthropic'
           '&hitsPerPage=20&numericFilters=points%3E5')
    data = json.loads(_http_get(url))
    items = []
    for h in data.get('hits', []):
        title = (h.get('title') or '').strip()
        link = h.get('url') or f"https://news.ycombinator.com/item?id={h.get('objectID','')}"
        desc = _re.sub(r'<[^>]+>', '', h.get('story_text') or '')[:250].strip()
        ts = h.get('created_at_i', 0)
        if title and link:
            items.append({'title': title, 'link': link, 'desc': desc,
                          'source': 'Hacker News', 'timestamp': ts})
    return items


def _fetch_techcrunch():
    return _fetch_rss('https://techcrunch.com/category/artificial-intelligence/feed/', 'TechCrunch AI')


def _fetch_reddit(subreddit):
    """Fetch hot posts from a subreddit via JSON API."""
    import re as _re
    url = f'https://www.reddit.com/r/{subreddit}/hot.json?limit=30'
    req = urllib.request.Request(url, headers=_REDDIT_HEADERS)
    data = json.loads(urllib.request.urlopen(req, context=_ssl_ctx(), timeout=12).read())
    items = []
    for post in data.get('data', {}).get('children', []):
        d = post.get('data', {})
        if d.get('is_self') or not d.get('url'):
            continue
        title = (d.get('title') or '').strip()
        link  = (d.get('url') or '').strip()
        score = d.get('score', 0)
        ts    = d.get('created_utc', 0)
        if score < 20 or not title or not link:
            continue
        items.append({'title': title, 'link': link, 'desc': '',
                      'source': f'r/{subreddit}', 'timestamp': ts})
    return items


def _et_text(el, tag):
    child = el.find(tag)
    return child.text if child is not None else None


def _fetch_rss(url, source_name):
    """Generic RSS/Atom fallback."""
    import xml.etree.ElementTree as ET
    import re as _re
    data = _http_get(url)
    items = []
    try:
        root = ET.fromstring(data)
        channel = root.find('channel')
        if channel is not None:
            for item in channel.findall('item'):
                title = (_et_text(item, 'title') or '').strip()
                link  = (_et_text(item, 'link') or '').strip()
                desc  = _re.sub(r'<[^>]+>', '', _et_text(item, 'description') or '')[:250].strip()
                ts    = _parse_date_ts(_et_text(item, 'pubDate') or '')
                if title and link:
                    items.append({'title': title, 'link': link, 'desc': desc,
                                  'source': source_name, 'timestamp': ts})
        else:
            ns = 'http://www.w3.org/2005/Atom'
            for entry in root.findall(f'{{{ns}}}entry') or root.findall('entry'):
                t_el = entry.find(f'{{{ns}}}title') or entry.find('title')
                l_el = entry.find(f'{{{ns}}}link')  or entry.find('link')
                s_el = entry.find(f'{{{ns}}}summary') or entry.find('summary')
                u_el = entry.find(f'{{{ns}}}updated') or entry.find('updated')
                title = (t_el.text or '').strip() if t_el is not None else ''
                link  = (l_el.get('href', '') if l_el is not None else '').strip()
                desc  = _re.sub(r'<[^>]+>', '', (s_el.text or '') if s_el is not None else '')[:250].strip()
                ts    = _parse_date_ts((u_el.text or '') if u_el is not None else '')
                if title and link:
                    items.append({'title': title, 'link': link, 'desc': desc,
                                  'source': source_name, 'timestamp': ts})
    except Exception as exc:
        log.error('RSS parse %s: %s', source_name, exc)
    return items


def _fetch_news_bg():
    global _news_cache
    all_items = []
    sources = [
        ('hn',      _fetch_hn,       None),
        ('tc',      _fetch_techcrunch, None),
        ('rss', _fetch_rss, ('VentureBeat AI',  'https://venturebeat.com/category/ai/feed/')),
        ('rss', _fetch_rss, ('The Verge AI',    'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml')),
        ('rss', _fetch_rss, ('Wired AI',        'https://www.wired.com/feed/tag/ai/latest/rss')),
        ('rss', _fetch_rss, ('Google AI Blog',  'https://blog.google/technology/ai/rss/')),
        ('rss', _fetch_rss, ('MIT Tech Review', 'https://www.technologyreview.com/topic/artificial-intelligence/feed')),
        ('rss', _fetch_rss, ('Ars Technica',    'https://feeds.arstechnica.com/arstechnica/technology-lab')),
        ('rss', _fetch_rss, ('Dev.to AI',       'https://dev.to/feed/tag/ai')),
        ('reddit', _fetch_reddit, ('MachineLearning',)),
        ('reddit', _fetch_reddit, ('artificial',)),
    ]
    for kind, fn, args in sources:
        try:
            items = fn(*args) if args else fn()
            all_items.extend(items)
            log.error('News OK %s: %d items', kind, len(items))
        except Exception as exc:
            log.error('News fetch %s: %s', kind, exc)

    cutoff = time.time() - _NEWS_MAX_AGE
    fresh = [a for a in all_items if not a.get('timestamp') or a['timestamp'] > cutoff]
    fresh.sort(key=lambda x: x.get('timestamp', 0), reverse=True)
    seen = set()
    deduped = []
    for item in fresh:
        key = item['link']
        if key not in seen:
            seen.add(key)
            deduped.append(item)
    _news_cache['data'] = deduped[:100]
    _news_cache['fetched_at'] = time.time()
    _news_cache['fetching'] = False


# ── HTTP server ───────────────────────────────────────────────────────────────

PORT = 8767


def _find_free_port(preferred):
    import socket
    for port in range(preferred, preferred + 20):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('localhost', port))
                return port
        except OSError:
            continue
    raise OSError('No free port found')


class Handler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/api/ollama-models':
            self._ollama_models()
        elif path == '/api/ollama-status':
            self._ollama_status()
        elif path == '/api/start-ollama':
            self._start_ollama_api()
        elif path == '/api/ollama-install-progress':
            self._ollama_install_progress_ep()
        elif path == '/api/ollama-pull-progress':
            self._ollama_pull_progress_ep()
        elif path == '/api/system-info':
            self._system_info()
        elif path == '/api/check-java':
            self._json(_check_java())
        elif path == '/api/ai-news':
            self._ai_news()
        elif path == '/api/verify-status':
            self._verify_status()
        elif path == '/api/verify-model':
            self._verify_model_get()
        else:
            super().do_GET()

    def do_POST(self):
        path = self.path.split('?')[0]
        if path == '/api/chat':
            self._chat()
        elif path == '/api/run-code':
            self._run_code()
        elif path == '/api/check-task':
            self._check_task()
        elif path == '/api/install-ollama':
            self._install_ollama()
        elif path == '/api/pull-model':
            self._pull_model()
        elif path == '/api/delete-model':
            self._delete_model()
        elif path == '/api/uninstall-ollama':
            self._uninstall_ollama()
        elif path == '/api/uninstall-app':
            self._uninstall_app()
        elif path == '/api/verify-lesson':
            self._verify_lesson()
        elif path == '/api/verify-model':
            self._verify_model_set()
        else:
            self.send_error(404)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def _read_body(self):
        length = int(self.headers.get('Content-Length', 0))
        return json.loads(self.rfile.read(length)) if length else {}

    # ── /api/run-code  POST ──────────────────────────────────────────────────
    def _run_code(self):
        try:
            body = self._read_body()
            lang = body.get('language', 'javascript').lower()
            code = body.get('code', '')
            if lang in ('javascript', 'js'):
                result = _run_js(code)
            elif lang in ('python', 'py'):
                result = _run_python(code)
            elif lang in ('java',):
                result = _run_java(code)
            else:
                result = {'output': '', 'error': f'Мова "{lang}" поки не підтримується.', 'runtime_ms': 0}
            self._json(result)
        except Exception as e:
            self._json({'output': '', 'error': str(e), 'runtime_ms': 0})

    # ── /api/check-task  POST ────────────────────────────────────────────────
    def _check_task(self):
        try:
            body = self._read_body()
            lang = body.get('language', 'javascript').lower()
            code = body.get('code', '')
            tests = body.get('tests', [])
            xp = body.get('xp', 10)
            if lang in ('javascript', 'js'):
                result = _check_js(code, tests)
            elif lang in ('python', 'py'):
                result = _check_python(code, tests)
            elif lang in ('java',):
                result = _check_java_task(code, tests)
            else:
                result = {'output': '', 'results': [], 'passed': False, 'error': f'Мова "{lang}" не підтримується'}
            if result.get('passed'):
                result['xp'] = xp
            self._json(result)
        except Exception as e:
            self._json({'output': '', 'results': [], 'passed': False, 'error': str(e)})

    # ── /api/verify-lesson  POST {image_base64, lesson_id} ───────────────────
    def _verify_lesson(self):
        try:
            body = self._read_body()
            img_b64 = body.get('image_base64', '')
            lesson_id = body.get('lesson_id', '_default')
            if not img_b64:
                return self._json({'error': 'image_base64 required'})
            try:
                image_bytes = base64.b64decode(img_b64)
            except Exception:
                return self._json({'error': 'invalid base64'})

            # clean up jobs older than 30 min
            now = time.time()
            with _verify_lock:
                stale = [k for k, v in _verify_jobs.items() if now - v.get('ts', 0) > 1800]
                for k in stale:
                    del _verify_jobs[k]

            job_id = str(uuid.uuid4())
            with _verify_lock:
                _verify_jobs[job_id] = {'status': 'pending', 'message': 'Аналізую скріншот…', 'ts': now}

            threading.Thread(
                target=_run_vision_verify,
                args=(job_id, image_bytes, lesson_id),
                daemon=True,
            ).start()
            self._json({'job_id': job_id, 'status': 'pending'})
        except Exception as e:
            self._json({'error': str(e)})

    # ── /api/verify-status  GET ?job_id=xxx ──────────────────────────────────
    def _verify_status(self):
        qs = self.path.split('?', 1)[1] if '?' in self.path else ''
        job_id = ''
        for part in qs.split('&'):
            if part.startswith('job_id='):
                job_id = part[7:]
                break
        if not job_id:
            return self._json({'error': 'job_id required'})
        with _verify_lock:
            job = _verify_jobs.get(job_id)
        if not job:
            return self._json({'error': 'job not found'})
        self._json(job)

    # ── /api/verify-model  GET / POST {model} ────────────────────────────────
    def _verify_model_get(self):
        self._json({'model': _verify_config['model']})

    def _verify_model_set(self):
        try:
            body = self._read_body()
            model = body.get('model', '').strip()
            if not model:
                return self._json({'ok': False, 'error': 'model required'})
            _verify_config['model'] = model
            self._json({'ok': True, 'model': model})
        except Exception as e:
            self._json({'ok': False, 'error': str(e)})

    # ── Ollama endpoints ─────────────────────────────────────────────────────

    def _ollama_models(self):
        try:
            req = urllib.request.Request('http://localhost:11434/api/tags')
            with urllib.request.urlopen(req, timeout=5) as resp:
                data = json.loads(resp.read())
            models = [m['name'] for m in data.get('models', [])]
            self._json({'models': models})
        except Exception as e:
            self._json({'models': [], 'error': str(e)})

    def _ollama_status(self):
        self._json({'installed': _ollama_installed(), 'running': _ollama_running()})

    def _start_ollama_api(self):
        if _ollama_running():
            return self._json({'ok': True, 'status': 'already_running'})
        if not _ollama_installed():
            return self._json({'ok': False, 'error': 'not_installed'})
        try:
            subprocess.Popen(['ollama', 'serve'],
                             stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            for _ in range(20):
                time.sleep(0.5)
                if _ollama_running():
                    return self._json({'ok': True, 'status': 'started'})
            self._json({'ok': False, 'error': 'timeout'})
        except Exception as e:
            self._json({'ok': False, 'error': str(e)})

    def _system_info(self):
        self._json(_get_system_info())

    def _install_ollama(self):
        global _ollama_install_progress
        if _ollama_install_progress is not None:
            return self._json({'started': False, 'reason': 'already_running'})
        _ollama_install_progress = []
        threading.Thread(target=_install_ollama_thread, args=(_ollama_install_progress,), daemon=True).start()
        self._json({'started': True})

    def _ollama_install_progress_ep(self):
        global _ollama_install_progress
        if _ollama_install_progress is None:
            return self._json({'status': 'idle', 'logs': []})
        if not _ollama_install_progress:
            return self._json({'status': 'pending', 'logs': []})
        logs = [e[4:] for e in _ollama_install_progress if e.startswith('log:')]
        statuses = [e for e in _ollama_install_progress if not e.startswith('log:')]
        last = statuses[-1] if statuses else 'pending'
        if last == 'done':
            _ollama_install_progress = None
            return self._json({'status': 'done', 'logs': logs})
        if last.startswith('error:'):
            msg = last[6:]
            _ollama_install_progress = None
            return self._json({'status': 'error', 'message': msg, 'logs': logs})
        return self._json({'status': last, 'logs': logs})

    def _pull_model(self):
        global _ollama_pull_progress
        if _ollama_pull_progress is not None:
            return self._json({'started': False, 'reason': 'already_running'})
        body = self._read_body()
        model = body.get('model', 'llama3.2:3b')
        _ollama_pull_progress = []
        threading.Thread(target=_pull_model_thread, args=(model, _ollama_pull_progress), daemon=True).start()
        self._json({'started': True})

    def _ollama_pull_progress_ep(self):
        global _ollama_pull_progress
        if _ollama_pull_progress is None:
            return self._json({'status': 'idle', 'logs': []})
        if not _ollama_pull_progress:
            return self._json({'status': 'pending', 'logs': []})
        logs = [e[4:] for e in _ollama_pull_progress if e.startswith('log:')]
        statuses = [e for e in _ollama_pull_progress if not e.startswith('log:')]
        last = statuses[-1] if statuses else 'pending'
        if last == 'done':
            _ollama_pull_progress = None
            return self._json({'status': 'done', 'logs': logs})
        if last.startswith('error:'):
            msg = last[6:]
            _ollama_pull_progress = None
            return self._json({'status': 'error', 'message': msg, 'logs': logs})
        return self._json({'status': last, 'logs': logs})

    # ── /api/delete-model  POST {model} ─────────────────────────────────────
    def _delete_model(self):
        try:
            body = self._read_body()
            model = body.get('model', '')
            if not model:
                return self._json({'ok': False, 'error': 'no model specified'})
            ollama_bin = shutil.which('ollama')
            if not ollama_bin:
                return self._json({'ok': False, 'error': 'ollama not found'})
            r = subprocess.run([ollama_bin, 'rm', model],
                               capture_output=True, text=True, timeout=30, **_W)
            self._json({'ok': r.returncode == 0,
                        'error': r.stderr.strip() if r.returncode != 0 else None})
        except Exception as e:
            self._json({'ok': False, 'error': str(e)})

    # ── /api/uninstall-app  POST ─────────────────────────────────────────────
    def _uninstall_app(self):
        try:
            if getattr(sys, 'frozen', False):
                if sys.platform == 'darwin':
                    p = Path(sys.executable)
                    app_dir = p
                    for parent in p.parents:
                        if parent.suffix == '.app':
                            app_dir = parent
                            break
                else:
                    app_dir = Path(sys.executable).parent
            else:
                app_dir = Path(__file__).parent
            log_path = _get_log_path().parent

            self._json({'ok': True})

            def _do_uninstall():
                time.sleep(0.5)
                try:
                    shutil.rmtree(log_path, ignore_errors=True)
                except Exception:
                    pass
                if sys.platform == 'win32':
                    script = (
                        f'@echo off\r\n'
                        f'timeout /t 2 /nobreak >nul\r\n'
                        f'rmdir /s /q "{app_dir}"\r\n'
                    )
                    bat = Path(os.environ.get('TEMP', app_dir.parent)) / '_sc_uninstall.bat'
                    bat.write_text(script, encoding='utf-8')
                    subprocess.Popen(['cmd.exe', '/c', str(bat)],
                                     creationflags=0x00000008,
                                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                else:
                    sh = Path('/tmp/_sc_uninstall.sh')
                    sh.write_text(f'#!/bin/sh\nsleep 2\nrm -rf "{app_dir}"\nrm -f "{sh}"\n')
                    sh.chmod(0o755)
                    subprocess.Popen(['/bin/sh', str(sh)],
                                     stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                os._exit(0)

            threading.Thread(target=_do_uninstall, daemon=True).start()
        except Exception as e:
            self._json({'ok': False, 'error': str(e)})

    def _uninstall_ollama(self):
        try:
            plat = sys.platform
            if plat == 'darwin':
                brew = shutil.which('brew')
                if brew:
                    subprocess.run([brew, 'services', 'stop', 'ollama'], capture_output=True)
                subprocess.run(['pkill', '-x', 'ollama'], capture_output=True)
                if brew:
                    subprocess.run([brew, 'uninstall', '--force', 'ollama'], capture_output=True)
                shutil.rmtree(Path.home() / '.ollama', ignore_errors=True)
            elif plat == 'linux':
                subprocess.run(['pkill', '-x', 'ollama'], capture_output=True)
                for p in ['/usr/local/bin/ollama', '/usr/bin/ollama']:
                    try:
                        os.unlink(p)
                    except FileNotFoundError:
                        pass
                shutil.rmtree(Path.home() / '.ollama', ignore_errors=True)
            self._json({'ok': True})
        except Exception as e:
            self._json({'ok': False, 'error': str(e)})

    def _ai_news(self):
        global _news_cache
        now = time.time()
        stale = now - _news_cache['fetched_at'] > _NEWS_CACHE_TTL
        if stale and not _news_cache['fetching']:
            _news_cache['fetching'] = True
            threading.Thread(target=_fetch_news_bg, daemon=True).start()
        self._json({
            'articles': _news_cache['data'],
            'fetching': _news_cache['fetching'],
            'age': int(now - _news_cache['fetched_at']) if _news_cache['fetched_at'] else -1,
        })

    def _chat(self):
        try:
            body = self._read_body()
            model = body.get('model', 'llama3.2:3b')
            messages = body.get('messages', [])
            payload = json.dumps({'model': model, 'messages': messages, 'stream': False}).encode()
            req = urllib.request.Request(
                'http://localhost:11434/api/chat',
                data=payload,
                headers={'Content-Type': 'application/json'},
                method='POST',
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = json.loads(resp.read())
            reply = data.get('message', {}).get('content', '…')
            self._json({'reply': reply})
        except Exception as e:
            self._json({'error': str(e)})

    def _json(self, obj):
        data = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        code = args[1] if len(args) > 1 else '?'
        if str(code) not in ('200', '304'):
            super().log_message(fmt, *args)


# ── Desktop window ────────────────────────────────────────────────────────────

def _run_webview_or_fallback(srv, ollama_proc, port):
    try:
        import webview
        gui = 'edgechromium' if sys.platform == 'win32' else ('cocoa' if sys.platform == 'darwin' else 'gtk')
        window = webview.create_window('Strucode', f'http://localhost:{port}',
                                       width=1200, height=820, min_size=(900, 600))

        def _on_closed():
            srv.shutdown()
            if ollama_proc:
                ollama_proc.terminate()

        window.events.closed += _on_closed
        webview.start(gui=gui, http_server=False)
    except Exception:
        log.exception('pywebview failed, falling back to browser+tray')
        _run_browser_with_tray(srv, ollama_proc, port)


def _run_browser_with_tray(srv, ollama_proc, port):
    try:
        subprocess.Popen(['cmd.exe', '/c', f'start http://localhost:{port}'],
                         stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        webbrowser.open(f'http://localhost:{port}')

    def _quit(icon, item):
        icon.stop()
        srv.shutdown()
        if ollama_proc:
            ollama_proc.terminate()

    try:
        import pystray
        from PIL import Image as PILImage
        _base = Path(sys.executable).parent if getattr(sys, 'frozen', False) else Path(__file__).parent
        icon_path = _base / 'icons' / 'icon-192.png'
        img = PILImage.open(icon_path)
        menu = pystray.Menu(
            pystray.MenuItem('Strucode', None, enabled=False),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem(f'Відкрити (localhost:{port})', lambda i, m: webbrowser.open(f'http://localhost:{port}')),
            pystray.MenuItem('Зупинити', _quit),
        )
        icon = pystray.Icon('Strucode', img, 'Strucode', menu)
        icon.run()
    except Exception:
        print(f'\n  🚀  Strucode →  http://localhost:{port}')
        print('      Ctrl+C — зупинити\n')
        try:
            srv.serve_forever()
        except KeyboardInterrupt:
            pass
        finally:
            if ollama_proc:
                ollama_proc.terminate()


if __name__ == '__main__':
    if getattr(sys, 'frozen', False):
        os.chdir(Path(sys.executable).parent)
    else:
        os.chdir(Path(__file__).parent)
    ollama_proc = _start_ollama()
    PORT_actual = _find_free_port(PORT)
    srv = http.server.ThreadingHTTPServer(('localhost', PORT_actual), Handler)
    srv_thread = threading.Thread(target=srv.serve_forever, daemon=True)
    srv_thread.start()
    print(f'  🚀  Strucode →  http://localhost:{PORT_actual}')
    _run_webview_or_fallback(srv, ollama_proc, PORT_actual)
    sys.exit(0)
