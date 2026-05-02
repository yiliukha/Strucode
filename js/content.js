// ── Course content data ──────────────────────────────────────────────────────

const COURSES = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    color: '#f7df1e',
    desc: 'Основа веб-розробки. З нуля до async/await.',
    language: 'javascript',
    locked: false,
    modules: [
      {
        id: 'js-basics',
        title: 'Основи',
        icon: '🔤',
        lessons: [
          {
            id: 'js-l01',
            title: 'Змінні: let і const',
            theory: `<h2>Змінні в JavaScript</h2>
<p>Змінна — це контейнер для зберігання даних. У сучасному JS використовують <code>let</code> і <code>const</code>.</p>
<h3>const — незмінне значення</h3>
<pre><code>const name = 'Alice';
const age = 25;
// name = 'Bob'; // ❌ помилка — const не можна перепризначити</code></pre>
<h3>let — змінне значення</h3>
<pre><code>let score = 0;
score = 10; // ✅ можна змінити
score += 5; // score тепер 15</code></pre>
<h3>Типи даних</h3>
<ul>
  <li><code>string</code> — рядок: <code>'hello'</code> або <code>"world"</code></li>
  <li><code>number</code> — число: <code>42</code>, <code>3.14</code></li>
  <li><code>boolean</code> — булевий: <code>true</code> / <code>false</code></li>
</ul>`,
            challenges: [
              {
                id: 'js-l01-c1',
                title: 'Оголоси змінну',
                prompt: 'Оголоси константу <strong>name</strong> зі своїм іменем (будь-який рядок).',
                starterCode: '// Оголоси константу name\n',
                tests: [{ expression: 'typeof name', expected: 'string', desc: 'name — рядок' }],
                xp: 10,
                language: 'javascript',
              },
              {
                id: 'js-l01-c2',
                title: 'Let і const',
                prompt: 'Оголоси <strong>const PI = 3.14</strong> і <strong>let radius = 5</strong>. Потім обчисли <strong>let area = PI * radius * radius</strong>.',
                starterCode: '// Оголоси PI, radius та обчисли area\n',
                tests: [
                  { expression: 'PI', expected: '3.14', desc: 'PI = 3.14' },
                  { expression: 'radius', expected: '5', desc: 'radius = 5' },
                  { expression: 'Math.abs(area - 78.5) < 0.01', expected: 'true', desc: 'area ≈ 78.5' },
                ],
                xp: 15,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l02',
            title: 'Умови: if / else',
            theory: `<h2>Умовні оператори</h2>
<p>Якщо потрібно виконати різний код залежно від умови — використовуй <code>if/else</code>.</p>
<pre><code>const age = 20;
if (age >= 18) {
  console.log('Дорослий');
} else {
  console.log('Неповнолітній');
}</code></pre>
<h3>Тернарний оператор</h3>
<pre><code>const msg = age >= 18 ? 'Дорослий' : 'Неповнолітній';
console.log(msg);</code></pre>
<h3>Оператори порівняння</h3>
<ul>
  <li><code>===</code> — строго рівно</li>
  <li><code>!==</code> — строго не рівно</li>
  <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
</ul>`,
            challenges: [
              {
                id: 'js-l02-c1',
                title: 'Парне чи непарне',
                prompt: 'Дано <code>const n = 7</code>. Оголоси <code>let result</code>. Якщо n парне — присвой <code>"парне"</code>, інакше — <code>"непарне"</code>.',
                starterCode: 'const n = 7;\nlet result;\n// твій код\n',
                tests: [{ expression: 'result', expected: 'непарне', desc: 'result = "непарне" для n=7' }],
                xp: 15,
                language: 'javascript',
              },
              {
                id: 'js-l02-c2',
                title: 'Оцінка',
                prompt: 'Дано <code>const score = 85</code>. Оголоси <code>let grade</code>: якщо score >= 90 — "A", >= 75 — "B", >= 60 — "C", інакше — "F".',
                starterCode: 'const score = 85;\nlet grade;\n// твій код\n',
                tests: [{ expression: 'grade', expected: 'B', desc: 'grade = "B" для score=85' }],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l03',
            title: 'Цикли: for і while',
            theory: `<h2>Цикли в JavaScript</h2>
<p>Цикл виконує код повторно, поки виконується умова.</p>
<h3>for — коли знаємо кількість ітерацій</h3>
<pre><code>for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}</code></pre>
<h3>while — поки умова true</h3>
<pre><code>let x = 10;
while (x > 0) {
  x -= 3;
}
console.log(x); // -2</code></pre>
<h3>for...of — по масиву</h3>
<pre><code>const fruits = ['apple', 'banana', 'cherry'];
for (const fruit of fruits) {
  console.log(fruit);
}</code></pre>`,
            challenges: [
              {
                id: 'js-l03-c1',
                title: 'Сума від 1 до N',
                prompt: 'Знайди суму чисел від 1 до 10 включно. Збережи результат у <code>let sum = 0</code>.',
                starterCode: 'let sum = 0;\n// Додай числа від 1 до 10\n',
                tests: [{ expression: 'sum', expected: '55', desc: 'sum = 55' }],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l03-c2',
                title: 'FizzBuzz',
                prompt: 'Збери в масив <code>let result = []</code> числа від 1 до 15. Але: якщо ділиться на 3 — додай "Fizz", на 5 — "Buzz", на 15 — "FizzBuzz".',
                starterCode: 'let result = [];\nfor (let i = 1; i <= 15; i++) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'result[0]', expected: '1', desc: 'result[0] = 1' },
                  { expression: 'result[2]', expected: 'Fizz', desc: 'result[2] = "Fizz" (3)' },
                  { expression: 'result[4]', expected: 'Buzz', desc: 'result[4] = "Buzz" (5)' },
                  { expression: 'result[14]', expected: 'FizzBuzz', desc: 'result[14] = "FizzBuzz" (15)' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l04',
            title: 'Функції',
            theory: `<h2>Функції</h2>
<p>Функція — блок коду, який можна викликати багато разів.</p>
<h3>Оголошення функції</h3>
<pre><code>function greet(name) {
  return 'Hello, ' + name + '!';
}
console.log(greet('Alice')); // Hello, Alice!</code></pre>
<h3>Arrow function</h3>
<pre><code>const add = (a, b) => a + b;
console.log(add(3, 4)); // 7</code></pre>
<h3>Параметри за замовчуванням</h3>
<pre><code>const greet = (name = 'World') => \`Hello, \${name}!\`;
console.log(greet());        // Hello, World!
console.log(greet('Bob'));   // Hello, Bob!</code></pre>`,
            challenges: [
              {
                id: 'js-l04-c1',
                title: 'Функція піднесення до степеня',
                prompt: 'Напиши функцію <code>power(base, exp)</code>, що повертає <code>base</code> піднесене до <code>exp</code>.',
                starterCode: 'function power(base, exp) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'power(2, 3)', expected: '8', desc: 'power(2,3) = 8' },
                  { expression: 'power(5, 2)', expected: '25', desc: 'power(5,2) = 25' },
                  { expression: 'power(3, 0)', expected: '1', desc: 'power(3,0) = 1' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l04-c2',
                title: 'isPalindrome',
                prompt: 'Напиши функцію <code>isPalindrome(str)</code>, яка повертає <code>true</code>, якщо рядок — паліндром (читається однаково з обох боків). Ігноруй регістр.',
                starterCode: 'function isPalindrome(str) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'isPalindrome("racecar")', expected: 'true', desc: '"racecar" — паліндром' },
                  { expression: 'isPalindrome("hello")', expected: 'false', desc: '"hello" — не паліндром' },
                  { expression: 'isPalindrome("Madam")', expected: 'true', desc: '"Madam" — паліндром (case-insensitive)' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l05',
            title: 'Масиви',
            theory: `<h2>Масиви (Arrays)</h2>
<p>Масив — упорядкована колекція значень.</p>
<pre><code>const nums = [1, 2, 3, 4, 5];
console.log(nums[0]); // 1
console.log(nums.length); // 5</code></pre>
<h3>Основні методи</h3>
<pre><code>nums.push(6);      // додати в кінець → [1,2,3,4,5,6]
nums.pop();         // видалити з кінця
nums.unshift(0);    // додати на початок
nums.shift();       // видалити з початку
nums.includes(3);   // true
nums.indexOf(3);    // 2</code></pre>
<h3>Функціональні методи</h3>
<pre><code>const doubled = nums.map(x => x * 2);
const evens = nums.filter(x => x % 2 === 0);
const sum = nums.reduce((acc, x) => acc + x, 0);</code></pre>`,
            challenges: [
              {
                id: 'js-l05-c1',
                title: 'filter + map',
                prompt: 'Дано <code>const nums = [1,2,3,4,5,6,7,8,9,10]</code>. Отримай масив <code>result</code> — квадрати тільки парних чисел.',
                starterCode: 'const nums = [1,2,3,4,5,6,7,8,9,10];\nconst result = // твій код\n',
                tests: [
                  { expression: 'JSON.stringify(result)', expected: '[4,16,36,64,100]', desc: 'result = [4,16,36,64,100]' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l05-c2',
                title: 'Унікальні елементи',
                prompt: 'Дано <code>const arr = [1,2,2,3,3,3,4]</code>. Отримай <code>const unique</code> — масив унікальних значень, відсортований за зростанням.',
                starterCode: 'const arr = [1,2,2,3,3,3,4];\nconst unique = // твій код\n',
                tests: [
                  { expression: 'JSON.stringify(unique)', expected: '[1,2,3,4]', desc: 'unique = [1,2,3,4]' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-objects',
        title: 'Об\'єкти та деструктуризація',
        icon: '📦',
        lessons: [
          {
            id: 'js-l06',
            title: 'Об\'єкти',
            theory: `<h2>Об'єкти (Objects)</h2>
<p>Об'єкт — колекція пар ключ-значення.</p>
<pre><code>const user = {
  name: 'Alice',
  age: 25,
  isAdmin: false,
};
console.log(user.name);    // Alice
console.log(user['age']);  // 25</code></pre>
<h3>Методи об'єкта</h3>
<pre><code>const user = {
  name: 'Bob',
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};
console.log(user.greet()); // Hi, I'm Bob</code></pre>
<h3>Object.keys / values / entries</h3>
<pre><code>Object.keys(user);    // ['name', 'age', 'isAdmin']
Object.values(user);  // ['Alice', 25, false]
Object.entries(user); // [['name','Alice'], ...]</code></pre>`,
            challenges: [
              {
                id: 'js-l06-c1',
                title: "Об'єкт person",
                prompt: "Створи об'єкт <code>const person</code> з полями: <code>name</code> (рядок), <code>age</code> (число), <code>city</code> (рядок). Будь-які значення.",
                starterCode: 'const person = {\n  // твій код\n};\n',
                tests: [
                  { expression: 'typeof person.name', expected: 'string', desc: 'person.name — рядок' },
                  { expression: 'typeof person.age', expected: 'number', desc: 'person.age — число' },
                  { expression: 'typeof person.city', expected: 'string', desc: 'person.city — рядок' },
                ],
                xp: 15,
                language: 'javascript',
              },
              {
                id: 'js-l06-c2',
                title: 'Метод fullName',
                prompt: 'Дано об\'єкт нижче. Додай метод <code>fullName()</code>, що повертає "firstName lastName".',
                starterCode: 'const person = {\n  firstName: \'John\',\n  lastName: \'Doe\',\n  // додай метод fullName\n};\n',
                tests: [{ expression: 'person.fullName()', expected: 'John Doe', desc: 'fullName() = "John Doe"' }],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l07',
            title: 'Деструктуризація',
            theory: `<h2>Деструктуризація</h2>
<p>Дозволяє витягувати значення з об'єктів і масивів у змінні.</p>
<h3>Об'єкти</h3>
<pre><code>const user = { name: 'Alice', age: 25, city: 'Kyiv' };
const { name, age } = user;
console.log(name); // Alice</code></pre>
<h3>Перейменування</h3>
<pre><code>const { name: userName, age: userAge } = user;
console.log(userName); // Alice</code></pre>
<h3>Масиви</h3>
<pre><code>const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(rest);   // [3, 4, 5]</code></pre>
<h3>Spread оператор</h3>
<pre><code>const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1,2,3,4,5]
const merged = { ...user, role: 'admin' };</code></pre>`,
            challenges: [
              {
                id: 'js-l07-c1',
                title: 'Деструктуризація об\'єкта',
                prompt: "З об'єкту <code>config</code> нижче деструктуризуй <code>host</code> і <code>port</code> у змінні.",
                starterCode: 'const config = { host: "localhost", port: 3000, debug: true };\n// деструктуризуй host і port\n',
                tests: [
                  { expression: 'host', expected: 'localhost', desc: 'host = "localhost"' },
                  { expression: 'port', expected: '3000', desc: 'port = 3000' },
                ],
                xp: 15,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-modern',
        title: 'Сучасний JS',
        icon: '⚡',
        lessons: [
          {
            id: 'js-l08',
            title: 'Promises і async/await',
            theory: `<h2>Promises та Async/Await</h2>
<p>Асинхронний код дозволяє не блокувати UI під час очікування операцій (fetch, читання файлу).</p>
<h3>Promise</h3>
<pre><code>const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Готово!'), 1000);
});
promise.then(result => console.log(result)); // Готово!</code></pre>
<h3>async/await</h3>
<pre><code>async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка:', error);
  }
}</code></pre>
<h3>Promise.all — паралельно</h3>
<pre><code>const [a, b] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
]);</code></pre>`,
            challenges: [
              {
                id: 'js-l08-c1',
                title: 'Async функція',
                prompt: 'Напиши async функцію <code>delay(ms)</code>, яка повертає Promise, що resolve через ms мілісекунд. Потім напиши async функцію <code>run()</code>, що чекає <code>await delay(0)</code> і повертає "done".',
                starterCode: 'function delay(ms) {\n  // Поверни Promise\n}\n\nasync function run() {\n  // await delay, return "done"\n}\n',
                tests: [
                  { expression: 'run() instanceof Promise', expected: 'true', desc: 'run() повертає Promise' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
        ],
      },
    ],
  },

  python: {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: '#3572A5',
    desc: 'Мова №1 для AI, data science і автоматизації.',
    language: 'python',
    locked: false,
    modules: [
      {
        id: 'py-basics',
        title: 'Основи',
        icon: '🔤',
        lessons: [
          {
            id: 'py-l01',
            title: 'Змінні і типи',
            theory: `<h2>Python: Змінні і типи</h2>
<p>Python — динамічна мова. Типи визначаються автоматично.</p>
<pre><code>name = "Alice"      # str
age = 25            # int
pi = 3.14           # float
is_active = True    # bool

print(type(name))   # &lt;class 'str'&gt;</code></pre>
<h3>f-strings</h3>
<pre><code>name = "Bob"
age = 30
print(f"Мене звуть {name}, мені {age} років")</code></pre>
<h3>Введення від користувача</h3>
<pre><code>name = input("Ваше ім'я: ")
age = int(input("Вік: "))</code></pre>`,
            challenges: [
              {
                id: 'py-l01-c1',
                title: 'Привітання',
                prompt: 'Оголоси змінну <code>name = "World"</code> і змінну <code>greeting</code> — f-string: "Hello, World!"',
                starterCode: 'name = "World"\ngreeting = # твій код\n',
                tests: [
                  { expression: 'greeting', expected: 'Hello, World!', desc: 'greeting = "Hello, World!"' },
                ],
                xp: 10,
                language: 'python',
              },
              {
                id: 'py-l01-c2',
                title: 'Обчислення',
                prompt: 'Оголоси <code>a = 15</code>, <code>b = 4</code>. Обчисли: <code>total = a + b</code>, <code>diff = a - b</code>, <code>product = a * b</code>, <code>quotient = a / b</code> (float), <code>remainder = a % b</code>.',
                starterCode: 'a = 15\nb = 4\n# обчисли total, diff, product, quotient, remainder\n',
                tests: [
                  { expression: 'total', expected: '19', desc: 'total = 19' },
                  { expression: 'product', expected: '60', desc: 'product = 60' },
                  { expression: 'remainder', expected: '3', desc: 'remainder = 3' },
                ],
                xp: 15,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l02',
            title: 'Списки і словники',
            theory: `<h2>Списки і словники</h2>
<h3>List (список)</h3>
<pre><code>fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.remove("banana")
print(fruits[0])   # apple
print(len(fruits)) # 3</code></pre>
<h3>List comprehension</h3>
<pre><code>squares = [x**2 for x in range(1, 6)]
# [1, 4, 9, 16, 25]
evens = [x for x in range(10) if x % 2 == 0]</code></pre>
<h3>Dict (словник)</h3>
<pre><code>user = {"name": "Alice", "age": 25}
user["email"] = "alice@example.com"
print(user.get("name"))    # Alice
print(user.keys())          # dict_keys([...])</code></pre>`,
            challenges: [
              {
                id: 'py-l02-c1',
                title: 'List comprehension',
                prompt: 'Використай list comprehension, щоб отримати <code>cubes</code> — куби чисел від 1 до 5.',
                starterCode: 'cubes = # твій список\n',
                tests: [
                  { expression: 'str(cubes)', expected: '[1, 8, 27, 64, 125]', desc: 'cubes = [1,8,27,64,125]' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l02-c2',
                title: 'Словник студента',
                prompt: 'Створи словник <code>student</code> з ключами: <code>name</code> (str), <code>grade</code> (int від 1 до 12), <code>gpa</code> (float). Будь-які значення.',
                starterCode: 'student = {\n    # твій код\n}\n',
                tests: [
                  { expression: 'type(student["name"]).__name__', expected: 'str', desc: 'name — рядок' },
                  { expression: 'type(student["grade"]).__name__', expected: 'int', desc: 'grade — int' },
                  { expression: 'type(student["gpa"]).__name__', expected: 'float', desc: 'gpa — float' },
                ],
                xp: 20,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l03',
            title: 'Функції і лямбди',
            theory: `<h2>Функції в Python</h2>
<pre><code>def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))         # Hello, Alice!
print(greet("Bob", "Hi"))     # Hi, Bob!</code></pre>
<h3>Lambda</h3>
<pre><code>square = lambda x: x ** 2
print(square(5))  # 25

# З sorted:
people = [{"name": "Bob", "age": 30}, {"name": "Alice", "age": 25}]
people.sort(key=lambda p: p["age"])</code></pre>
<h3>*args та **kwargs</h3>
<pre><code>def total(*numbers):
    return sum(numbers)
print(total(1, 2, 3, 4))  # 10</code></pre>`,
            challenges: [
              {
                id: 'py-l03-c1',
                title: 'Факторіал',
                prompt: 'Напиши функцію <code>factorial(n)</code>, що повертає n! (факторіал). factorial(0) = 1.',
                starterCode: 'def factorial(n):\n    # твій код\n',
                tests: [
                  { expression: 'factorial(0)', expected: '1', desc: 'factorial(0) = 1' },
                  { expression: 'factorial(5)', expected: '120', desc: 'factorial(5) = 120' },
                  { expression: 'factorial(10)', expected: '3628800', desc: 'factorial(10) = 3628800' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
        ],
      },
    ],
  },

  ai_basics: {
    id: 'ai_basics',
    name: 'AI Basics',
    icon: '🧠',
    color: '#a855f7',
    desc: 'Як працюють LLM, як писати промпти і перевіряти відповіді AI.',
    language: 'javascript',
    locked: false,
    modules: [
      {
        id: 'ai-intro',
        title: 'Розуміння AI',
        icon: '🤔',
        lessons: [
          {
            id: 'ai-l01',
            title: 'Як працює LLM',
            theory: `<h2>Що таке LLM (Large Language Model)?</h2>
<p><strong>LLM</strong> — це нейронна мережа, навчена на трильйонах токенів тексту. Вона не "розуміє" мову — вона передбачає наступний токен.</p>
<h3>Ключові концепції</h3>
<ul>
  <li><strong>Token</strong> — частина тексту (~4 символи). "Hello" = 1 токен, "Привіт" = 2-3 токени.</li>
  <li><strong>Context window</strong> — скільки токенів модель "бачить" за раз. GPT-4: 128k, Claude: 200k.</li>
  <li><strong>Temperature</strong> — "випадковість" відповіді. 0 = детермінований, 1+ = креативний.</li>
  <li><strong>Hallucination</strong> — коли AI впевнено видає неправдиву інформацію.</li>
</ul>
<h3>Що AI робить добре</h3>
<ul>
  <li>✅ Генерація тексту, коду, перекладів</li>
  <li>✅ Пояснення концепцій, резюмування</li>
  <li>✅ Написання тестів, документації</li>
  <li>❌ Точні числові розрахунки</li>
  <li>❌ Актуальні новини (якщо немає RAG/пошуку)</li>
  <li>❌ Конфіденційна інформація (ніколи не відправляй паролі!)</li>
</ul>
<h3>Галюцинації — головна проблема</h3>
<p>AI може вигадати бібліотеку, функцію, або факт, якого не існує. <strong>Завжди перевіряй важливу інформацію.</strong></p>`,
            challenges: [
              {
                id: 'ai-l01-c1',
                title: 'Що таке токен?',
                prompt: 'Оголоси <code>const tokenDef</code> = рядок з 1-2 реченнями, що пояснює що таке токен у LLM (своїми словами).',
                starterCode: '// Своїми словами: що таке токен у LLM?\nconst tokenDef = "";\n',
                tests: [
                  { expression: 'tokenDef.length > 10', expected: 'true', desc: 'Відповідь не пуста' },
                ],
                xp: 10,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'ai-l02',
            title: 'Prompt Engineering',
            theory: `<h2>Як писати ефективні промпти</h2>
<p><strong>Промпт-інжиніринг</strong> — мистецтво написання інструкцій для AI, щоб отримати кращі результати.</p>
<h3>6 правил хорошого промпту</h3>
<ol>
  <li><strong>Будь конкретним</strong> — "Напиши функцію JS, яка сортує масив об'єктів по полю age" краще ніж "Допоможи з кодом"</li>
  <li><strong>Дай контекст</strong> — "Я використовую React 18, TypeScript, і TailwindCSS..."</li>
  <li><strong>Визнач формат</strong> — "Відповідь у форматі JSON", "Поясни за 3 кроки"</li>
  <li><strong>Роль AI</strong> — "Ти досвідчений QA інженер..."</li>
  <li><strong>Приклад (few-shot)</strong> — покажи приклад input → output</li>
  <li><strong>Обмеження</strong> — "Без зовнішніх бібліотек", "Максимум 20 рядків"</li>
</ol>
<h3>Chain of Thought (CoT)</h3>
<pre><code>// Поганий промпт:
"Яка відповідь: 17 * 23?"

// Хороший промпт:
"Вирахуй 17 * 23. Думай крок за кроком:
1. Розбий на частини..."</code></pre>
<h3>Структура промпту</h3>
<pre><code>[Роль] + [Контекст] + [Задача] + [Формат] + [Обмеження]</code></pre>`,
            challenges: [
              {
                id: 'ai-l02-c1',
                title: 'Покращ промпт',
                prompt: 'Поганий промпт: "Допоможи з кодом". Оголоси <code>const betterPrompt</code> — покращена версія для задачі: "написати функцію Python, що парсить CSV файл і повертає список словників". Промпт повинен містити хоча б 3 деталі.',
                starterCode: 'const betterPrompt = `\n// твій покращений промпт тут\n`;\n',
                tests: [
                  { expression: 'betterPrompt.length > 50', expected: 'true', desc: 'Промпт достатньо детальний (>50 символів)' },
                  { expression: 'betterPrompt.toLowerCase().includes("python")', expected: 'true', desc: 'Згадано мову програмування' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'ai-l03',
            title: 'AI Інструменти',
            theory: `<h2>AI Інструменти 2025</h2>
<h3>LLM провайдери</h3>
<ul>
  <li><strong>Claude (Anthropic)</strong> — найкращий для коду та аналізу. API: <code>claude-sonnet-4-5</code></li>
  <li><strong>GPT-4o (OpenAI)</strong> — загальне призначення, мультимодальний</li>
  <li><strong>Gemini (Google)</strong> — інтеграція з Google Workspace</li>
  <li><strong>Llama 3 (Meta)</strong> — open-source, можна запускати локально через Ollama</li>
</ul>
<h3>Coding Assistants</h3>
<ul>
  <li><strong>GitHub Copilot</strong> — autocomplete в VS Code</li>
  <li><strong>Cursor</strong> — IDE побудований навколо AI</li>
  <li><strong>Claude Code</strong> — CLI для роботи з кодом (те, що використовується зараз)</li>
</ul>
<h3>Automation</h3>
<ul>
  <li><strong>n8n</strong> — open-source автоматизація з AI nodes</li>
  <li><strong>Zapier / Make</strong> — no-code інтеграції</li>
  <li><strong>LangChain</strong> — фреймворк для AI агентів (Python/JS)</li>
</ul>
<h3>Local AI (Ollama)</h3>
<pre><code># Встановити модель
ollama pull llama3.2:3b

# Запустити в термінал
ollama run llama3.2:3b

# API
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2:3b",
  "messages": [{"role": "user", "content": "Hello!"}]
}'</code></pre>`,
            challenges: [
              {
                id: 'ai-l03-c1',
                title: 'AI Tool порівняння',
                prompt: 'Оголоси об\'єкт <code>const tools</code> з 3 полями: назва інструменту → короткий опис (рядок). Наприклад: <code>{ "n8n": "...", "Ollama": "...", "Cursor": "..." }</code>.',
                starterCode: 'const tools = {\n  // 3 AI інструменти і їх опис\n};\n',
                tests: [
                  { expression: 'Object.keys(tools).length >= 3', expected: 'true', desc: 'Мінімум 3 інструменти' },
                  { expression: 'Object.values(tools).every(v => typeof v === "string" && v.length > 5)', expected: 'true', desc: 'Опис кожного — рядок >5 символів' },
                ],
                xp: 15,
                language: 'javascript',
              },
            ],
          },
        ],
      },
    ],
  },

  sql: {
    id: 'sql',
    name: 'SQL',
    icon: '🗃️',
    color: '#e97316',
    desc: 'Мова запитів до баз даних. Must-have для будь-якого розробника.',
    language: 'sql',
    locked: false,
    modules: [
      {
        id: 'sql-basics',
        title: 'Основи SQL',
        icon: '📋',
        lessons: [
          {
            id: 'sql-l01',
            title: 'SELECT і WHERE',
            theory: `<h2>SQL: Вибірка даних</h2>
<p>SQL (Structured Query Language) — мова для роботи з реляційними базами даних.</p>
<h3>Базова вибірка</h3>
<pre><code>-- Всі записи
SELECT * FROM users;

-- Конкретні поля
SELECT name, age FROM users;

-- Фільтрація
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE city = 'Kyiv';</code></pre>
<h3>Оператори WHERE</h3>
<pre><code>WHERE age BETWEEN 18 AND 30
WHERE name LIKE 'A%'       -- починається з A
WHERE city IN ('Kyiv', 'Lviv')
WHERE email IS NOT NULL</code></pre>
<h3>Сортування і ліміт</h3>
<pre><code>SELECT * FROM users ORDER BY age DESC LIMIT 10;</code></pre>`,
            challenges: [
              {
                id: 'sql-l01-c1',
                title: 'SQL запит',
                prompt: 'Напиши SQL запит, що вибирає <code>name</code> і <code>email</code> з таблиці <code>users</code>, де <code>age > 25</code>, відсортований за <code>name</code> за зростанням. Збережи в <code>const query</code>.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`;\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("select")', expected: 'true', desc: 'Є SELECT' },
                  { expression: 'query.toLowerCase().includes("where")', expected: 'true', desc: 'Є WHERE' },
                  { expression: 'query.toLowerCase().includes("order by")', expected: 'true', desc: 'Є ORDER BY' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
        ],
      },
    ],
  },
};

// ── XP / Levels ───────────────────────────────────────────────────────────────

const XP_LEVELS = [
  { name: 'Новачок',       min: 0,     icon: '🌱' },
  { name: 'Junior Dev',    min: 100,   icon: '💻' },
  { name: 'Middle Dev',    min: 500,   icon: '⚙️' },
  { name: 'Senior Dev',    min: 1500,  icon: '🚀' },
  { name: 'Principal',     min: 4000,  icon: '🧠' },
  { name: 'Code Wizard',   min: 10000, icon: '🧙' },
];

function getLevel(xp) {
  let level = XP_LEVELS[0];
  for (const l of XP_LEVELS) {
    if (xp >= l.min) level = l;
  }
  return level;
}

function getNextLevel(xp) {
  for (let i = 0; i < XP_LEVELS.length; i++) {
    if (xp < XP_LEVELS[i].min) return XP_LEVELS[i];
  }
  return null;
}

function getXpProgress(xp) {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.min - current.min;
  const earned = xp - current.min;
  return Math.round((earned / range) * 100);
}

// ── Daily challenges pool ─────────────────────────────────────────────────────

const DAILY_POOL = [
  { title: 'Reverse a string', lang: 'JavaScript', courseId: 'javascript', xp: 15 },
  { title: 'Sum of array', lang: 'Python', courseId: 'python', xp: 15 },
  { title: 'Find max in array', lang: 'JavaScript', courseId: 'javascript', xp: 15 },
  { title: 'Count vowels', lang: 'Python', courseId: 'python', xp: 20 },
  { title: 'FizzBuzz', lang: 'JavaScript', courseId: 'javascript', xp: 20 },
  { title: 'Flatten array', lang: 'JavaScript', courseId: 'javascript', xp: 25 },
  { title: 'Fibonacci sequence', lang: 'Python', courseId: 'python', xp: 25 },
  { title: 'Palindrome check', lang: 'JavaScript', courseId: 'javascript', xp: 20 },
];

function getDailyChallenge() {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % DAILY_POOL.length;
  return DAILY_POOL[dayIndex];
}
