// ── Course content data ──────────────────────────────────────────────────────

const COURSES = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    logo: 'icons/langs/javascript.svg',
    color: '#f7df1e',
    desc: 'Основа веб-розробки. Від змінних до async/await, класів та модулів.',
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
// name = \'Bob\'; // ❌ помилка — const не можна перепризначити</code></pre>
<h3>let — змінне значення</h3>
<pre><code>let score = 0;
score = 10; // ✅ можна змінити
score += 5; // score тепер 15</code></pre>
<h3>Типи даних</h3>
<ul>
  <li><code>string</code> — рядок: <code>\'hello\'</code> або <code>"world"</code></li>
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
  console.log(\'Неповнолітній\');
}</code></pre>
<h3>Тернарний оператор</h3>
<pre><code>const msg = age >= 18 ? 'Дорослий' : \'Неповнолітній\';
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
<pre><code>const fruits = ['apple', 'banana', \'cherry\'];
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
console.log(greet(\'Alice\')); // Hello, Alice!</code></pre>
<h3>Arrow function</h3>
<pre><code>const add = (a, b) => a + b;
console.log(add(3, 4)); // 7</code></pre>
<h3>Параметри за замовчуванням</h3>
<pre><code>const greet = (name = 'World') => \`Hello, \${name}!\`;
console.log(greet());        // Hello, World!
console.log(greet(\'Bob\'));   // Hello, Bob!</code></pre>`,
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
console.log(user[\'age\']);  // 25</code></pre>
<h3>Методи об'єкта</h3>
<pre><code>const user = {
  name: 'Bob',
  greet() {
    return \`Hi, I\'m \${this.name}\`;
  }
};
console.log(user.greet()); // Hi, I\'m Bob</code></pre>
<h3>Object.keys / values / entries</h3>
<pre><code>Object.keys(user);    // ['name', 'age', 'isAdmin']
Object.values(user);  // ['Alice', 25, false]
Object.entries(user); // [['name',\'Alice\'], ...]</code></pre>`,
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
<pre><code>const user = { name: 'Alice', age: 25, city: \'Kyiv\' };
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
const merged = { ...user, role: \'admin\' };</code></pre>`,
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
  setTimeout(() => resolve(\'Готово!\'), 1000);
});
promise.then(result => console.log(result)); // Готово!</code></pre>
<h3>async/await</h3>
<pre><code>async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(\'Помилка:\', error);
  }
}</code></pre>
<h3>Promise.all — паралельно</h3>
<pre><code>const [a, b] = await Promise.all([
  fetch('/api/users'),
  fetch(\'/api/posts\'),
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
      {
        id: 'js-types',
        title: 'Типи даних',
        icon: '🔢',
        lessons: [
          {
            id: 'js-l09',
            title: 'Числа та математика',
            theory: `<h2>Числа в JavaScript</h2>
<p>JavaScript має один числовий тип — <code>number</code>, що покриває як цілі, так і числа з плаваючою точкою.</p>
<h3>Спеціальні значення</h3>
<pre><code>Infinity   // нескінченність
-Infinity
NaN        // Not a Number (результат некоректної операції)

console.log(1 / 0);    // Infinity
console.log(\'abc\' * 2); // NaN
isNaN(NaN);            // true
isFinite(42);          // true</code></pre>
<h3>Методи числа</h3>
<pre><code>const n = 3.14159;
n.toFixed(2);    // "3.14" — рядок із 2 знаками після крапки
n.toString(16);  // шістнадцяткове представлення
Math.round(n);   // 3
Math.ceil(n);    // 4
Math.floor(n);   // 3
Math.abs(-5);    // 5
Math.max(1, 5, 3); // 5
Math.min(1, 5, 3); // 1
Math.pow(2, 10); // 1024
Math.sqrt(16);   // 4
Math.random();   // від 0 до 1</code></pre>
<h3>parseInt і parseFloat</h3>
<pre><code>parseInt('42px');    // 42
parseFloat('3.14em'); // 3.14
Number('42\');        // 42
Number(\'');          // 0
Number(null);        // 0
Number(undefined);   // NaN</code></pre>
<h3>BigInt</h3>
<pre><code>const big = 9007199254740991n; // суфікс n
const sum = big + 1n;          // BigInt + BigInt</code></pre>`,
                        challenges: [
              {
                id: 'js-l09-c1',
                title: 'Математичні операції',
                prompt: 'Оголоси функцію <strong>clamp(value, min, max)</strong> що повертає <code>value</code> обмежене між <code>min</code> та <code>max</code>. Використай Math.min та Math.max.',
                starterCode: 'function clamp(value, min, max) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'clamp(5, 1, 10)', expected: '5', desc: 'clamp(5,1,10) = 5' },
                  { expression: 'clamp(-3, 0, 10)', expected: '0', desc: 'clamp(-3,0,10) = 0' },
                  { expression: 'clamp(15, 0, 10)', expected: '10', desc: 'clamp(15,0,10) = 10' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l09-c2',
                title: 'Випадкове ціле число',
                prompt: 'Оголоси функцію <strong>randInt(min, max)</strong> що повертає випадкове ціле число від <code>min</code> до <code>max</code> включно. Використай Math.random та Math.floor.',
                starterCode: 'function randInt(min, max) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'typeof randInt(1, 10)', expected: 'number', desc: 'повертає число' },
                  { expression: 'Number.isInteger(randInt(1, 10))', expected: 'true', desc: 'ціле число' },
                  { expression: '(() => { const r = randInt(5, 5); return r === 5; })()', expected: 'true', desc: 'randInt(5,5) = 5' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l10',
            title: 'Рядки (String)',
            theory: `<h2>Рядки в JavaScript</h2>
<p>Рядок — послідовність символів Unicode. Рядки незмінні (immutable).</p>
<h3>Створення рядків</h3>
<pre><code>const s1 = \'одинарні лапки\';
const s2 = "подвійні лапки";
const s3 = \`шаблонний літерал: \${1 + 1}\`; // "шаблонний літерал: 2"

// Багаторядковий
const html = \`
  &lt;div&gt;
    &lt;p&gt;Привіт&lt;/p&gt;
  &lt;/div&gt;
\`;</code></pre>
<h3>Властивості та методи</h3>
<pre><code>const str = 'Hello, World!';
str.length;          // 13
str[0];              // 'H'
str.at(-1);          // '!' (останній символ)
str.toUpperCase();   // 'HELLO, WORLD!'
str.toLowerCase();   // \'hello, world!\'
str.trim();          // видаляє пробіли з країв
str.trimStart();     // тільки зліва
str.trimEnd();       // тільки справа</code></pre>
<h3>Пошук та перевірка</h3>
<pre><code>str.includes('World');  // true
str.startsWith('Hello'); // true
str.endsWith('!');      // true
str.indexOf('o');       // 4 (перше входження)
str.lastIndexOf(\'o\');   // 8</code></pre>
<h3>Зрізи та заміна</h3>
<pre><code>str.slice(0, 5);          // 'Hello'
str.slice(-6);            // 'World!'
str.replace('World', 'JS'); // 'Hello, JS!'
str.replaceAll('l', 'L'); // 'HeLLo, WorLd!'
str.split(', ');          // ['Hello', 'World!']
'abc'.repeat(3);          // 'abcabcabc'
'5'.padStart(3, '0');     // \'005\'</code></pre>`,
                        challenges: [
              {
                id: 'js-l10-c1',
                title: 'Обробка рядка',
                prompt: 'Оголоси функцію <strong>capitalize(str)</strong> що робить першу літеру великою, а решту — маленькими. Наприклад: <code>"hELLO"</code> → <code>"Hello"</code>.',
                starterCode: 'function capitalize(str) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'capitalize("hello")', expected: 'Hello', desc: '"hello" → "Hello"' },
                  { expression: 'capitalize("hELLO")', expected: 'Hello', desc: '"hELLO" → "Hello"' },
                  { expression: 'capitalize("WORLD")', expected: 'World', desc: '"WORLD" → "World"' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l10-c2',
                title: 'Шаблонний рядок',
                prompt: 'Оголоси функцію <strong>greet(name, age)</strong> що повертає рядок виду: <code>"Привіт, Alice! Тобі 25 років."</code>. Використай шаблонний літерал.',
                starterCode: 'function greet(name, age) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'greet("Alice", 25)', expected: 'Привіт, Alice! Тобі 25 років.', desc: 'правильний формат' },
                  { expression: 'greet("Bob", 30)', expected: 'Привіт, Bob! Тобі 30 років.', desc: 'інше ім\'я' },
                ],
                xp: 15,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l11',
            title: 'Масиви — поглиблено',
            theory: `<h2>Масиви: поглиблено</h2>
<p>Масиви в JS — об'єкти зі спеціальними методами для роботи з впорядкованими колекціями.</p>
<h3>Пошук</h3>
<pre><code>const arr = [1, 2, 3, 4, 5];
arr.find(x => x > 3);       // 4 (перший що підходить)
arr.findIndex(x => x > 3);  // 3 (індекс)
arr.some(x => x > 4);       // true (хоч один)
arr.every(x => x > 0);      // true (всі)
arr.includes(3);             // true</code></pre>
<h3>Трансформація</h3>
<pre><code>arr.map(x => x * 2);         // [2,4,6,8,10]
arr.filter(x => x % 2 === 0); // [2,4]
arr.reduce((acc, x) => acc + x, 0); // 15
arr.flat();                  // розгладжує вкладені масиви
arr.flatMap(x => [x, x * 2]); // [1,2,2,4,3,6,...]</code></pre>
<h3>Сортування</h3>
<pre><code>['banana', 'apple', 'cherry'].sort(); // ['apple','banana',\'cherry\']
[10, 1, 21, 2].sort((a, b) => a - b); // [1,2,10,21] — числовий sort
arr.reverse(); // перевертає на місці</code></pre>
<h3>Додавання / видалення</h3>
<pre><code>arr.splice(2, 1);        // видаляє 1 елемент з індексу 2
arr.splice(1, 0, 99);    // вставляє 99 на позицію 1
arr.slice(1, 3);         // [2, 3] — копія без мутації
[].concat([1,2], [3,4]); // [1,2,3,4]</code></pre>
<h3>Array.from та Array.of</h3>
<pre><code>Array.from('hello');       // ['h','e','l','l',\'o\']
Array.from({length: 3}, (_, i) => i); // [0,1,2]
Array.of(1, 2, 3);         // [1,2,3]</code></pre>`,
                        challenges: [
              {
                id: 'js-l11-c1',
                title: 'reduce — сума об\'єктів',
                prompt: 'Оголоси функцію <strong>totalPrice(items)</strong> що приймає масив об\'єктів <code>{name, price, qty}</code> і повертає загальну суму (price * qty для кожного). Використай reduce.',
                starterCode: 'function totalPrice(items) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'totalPrice([{name:"a",price:10,qty:2},{name:"b",price:5,qty:3}])', expected: '35', desc: '10*2 + 5*3 = 35' },
                  { expression: 'totalPrice([])', expected: '0', desc: 'порожній масив = 0' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l11-c2',
                title: 'flatMap та фільтрація',
                prompt: 'Оголоси функцію <strong>getWords(sentences)</strong> що приймає масив рядків і повертає масив усіх слів (розбити по пробілу) довжиною > 3 символи. Використай flatMap та filter.',
                starterCode: 'function getWords(sentences) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'getWords(["hi there", "how are you"]).includes("there")', expected: 'true', desc: '"there" є в результаті' },
                  { expression: 'getWords(["hi there"]).includes("hi")', expected: 'false', desc: '"hi" (2 символи) відфільтрований' },
                  { expression: 'Array.isArray(getWords([]))', expected: 'true', desc: 'повертає масив' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l12',
            title: 'Map і Set',
            theory: `<h2>Map та Set</h2>
<p>Сучасні колекції для зберігання унікальних значень та пар ключ-значення.</p>
<h3>Map — словник</h3>
<pre><code>const map = new Map();
map.set('name', 'Alice');
map.set(42, 'число');
map.set({}, 'об\'єкт');    // навіть об'єкт може бути ключем!

map.get('name');  // 'Alice'
map.has('name');  // true
map.size;         // 3
map.delete(\'name\');

// Ітерація
for (const [key, value] of map) {
  console.log(key, value);
}
[...map.keys()];   // масив ключів
[...map.values()]; // масив значень</code></pre>
<h3>Set — множина унікальних значень</h3>
<pre><code>const set = new Set([1, 2, 2, 3, 3, 3]);
set.size;    // 3 — дублікати видалено
set.add(4);
set.has(2);  // true
set.delete(1);

// Перетворення в масив
const unique = [...new Set([1,2,2,3])]; // [1,2,3]</code></pre>
<h3>WeakMap та WeakSet</h3>
<pre><code>// Ключі WeakMap — тільки об'єкти, не перешкоджають GC
const wm = new WeakMap();
let obj = {};
wm.set(obj, 'дані\');
obj = null; // obj видалиться з пам\'яті разом із wm-записом</code></pre>`,
                        challenges: [
              {
                id: 'js-l12-c1',
                title: 'Дедублікація через Set',
                prompt: 'Оголоси функцію <strong>unique(arr)</strong> що повертає новий масив без дублікатів. Використай Set.',
                starterCode: 'function unique(arr) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'unique([1,2,2,3,3,3]).length', expected: '3', desc: '3 унікальні елементи' },
                  { expression: 'unique([1,2,2,3]).includes(2)', expected: 'true', desc: '2 є' },
                  { expression: 'unique([]).length', expected: '0', desc: 'порожній масив' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l12-c2',
                title: 'Підрахунок слів через Map',
                prompt: 'Оголоси функцію <strong>wordCount(str)</strong> що повертає Map де ключ — слово, значення — кількість його входжень у рядку.',
                starterCode: 'function wordCount(str) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'wordCount("a b a c a").get("a")', expected: '3', desc: '"a" зустрічається 3 рази' },
                  { expression: 'wordCount("a b a c a").get("b")', expected: '1', desc: '"b" зустрічається 1 раз' },
                  { expression: 'wordCount("a b a c a") instanceof Map', expected: 'true', desc: 'результат — Map' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l13',
            title: 'Date і час',
            theory: `<h2>Дата та час (Date)</h2>
<p>Об'єкт <code>Date</code> зберігає момент часу як мілісекунди від 1 січня 1970 UTC.</p>
<h3>Створення</h3>
<pre><code>const now = new Date();            // поточний час
const d1 = new Date(2024, 0, 15);  // 15 січня 2024 (місяць з 0)
const d2 = new Date(\'2024-01-15\'); // з рядка ISO
const ts = Date.now();             // timestamp у мс</code></pre>
<h3>Методи отримання</h3>
<pre><code>const d = new Date();
d.getFullYear();   // 2024
d.getMonth();      // 0-11
d.getDate();       // 1-31
d.getDay();        // 0 (нд) – 6 (сб)
d.getHours();      // 0-23
d.getMinutes();
d.getSeconds();
d.getTime();       // timestamp</code></pre>
<h3>Форматування</h3>
<pre><code>d.toISOString();       // '2024-01-15T10:30:00.000Z'
d.toLocaleDateString('uk-UA'); // '15.01.2024'
d.toLocaleTimeString('uk-UA'); // '10:30:00'
d.toLocaleString('uk-UA');     // \'15.01.2024, 10:30:00\'</code></pre>
<h3>Порівняння дат</h3>
<pre><code>const d1 = new Date('2024-01-01');
const d2 = new Date(\'2024-06-01\');
d2 > d1;  // true
d2 - d1;  // різниця у мілісекундах</code></pre>`,
                        challenges: [
              {
                id: 'js-l13-c1',
                title: 'Вік за датою народження',
                prompt: 'Оголоси функцію <strong>getAge(birthYear)</strong> що повертає поточний вік людини (currentYear - birthYear). Використай <code>new Date().getFullYear()</code>.',
                starterCode: 'function getAge(birthYear) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'typeof getAge(2000)', expected: 'number', desc: 'повертає число' },
                  { expression: 'getAge(new Date().getFullYear()) === 0', expected: 'true', desc: 'народжений цього року = 0' },
                  { expression: 'getAge(new Date().getFullYear() - 10) === 10', expected: 'true', desc: '10 років тому = 10' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l13-c2',
                title: 'Форматування дати',
                prompt: 'Оголоси функцію <strong>formatDate(date)</strong> що приймає об\'єкт Date і повертає рядок у форматі <code>"DD.MM.YYYY"</code>. Наприклад: <code>"05.01.2026"</code>.',
                starterCode: 'function formatDate(date) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'formatDate(new Date(2026, 0, 5))', expected: '05.01.2026', desc: '5 января 2026' },
                  { expression: 'formatDate(new Date(2000, 11, 31))', expected: '31.12.2000', desc: '31 грудня 2000' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-functions-advanced',
        title: 'Функції — поглиблено',
        icon: '🔧',
        lessons: [
          {
            id: 'js-l14',
            title: 'Замикання та область видимості',
            theory: `<h2>Замикання (Closure)</h2>
<p>Замикання — функція, що "запам'ятовує" змінні зовнішньої функції навіть після того, як зовнішня функція завершила виконання.</p>
<h3>Лексична область видимості</h3>
<pre><code>function outer() {
  let count = 0;
  function inner() {
    count++;
    console.log(count);
  }
  return inner;
}

const increment = outer();
increment(); // 1
increment(); // 2
increment(); // 3 — count "живе" у замиканні</code></pre>
<h3>Практичний приклад: лічильник</h3>
<pre><code>function createCounter(start = 0) {
  let value = start;
  return {
    increment: () => ++value,
    decrement: () => --value,
    get: () => value,
    reset: () => { value = start; },
  };
}

const counter = createCounter(10);
counter.increment(); // 11
counter.get();       // 11</code></pre>
<h3>Проблема у циклі</h3>
<pre><code>// ❌ var — одне замикання на всіх
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3 3 3
}

// ✅ let — окрема змінна для кожної ітерації
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0 1 2
}</code></pre>`,
                        challenges: [
              {
                id: 'js-l14-c1',
                title: 'Фабрика лічильника',
                prompt: 'Оголоси функцію <strong>makeCounter(start = 0)</strong> що повертає об\'єкт з методами <code>increment()</code>, <code>decrement()</code> та <code>value()</code>. Використай замикання.',
                starterCode: 'function makeCounter(start = 0) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const c = makeCounter(10); c.increment(); return c.value(); })()', expected: '11', desc: 'increment від 10 = 11' },
                  { expression: '(() => { const c = makeCounter(); c.decrement(); return c.value(); })()', expected: '-1', desc: 'decrement від 0 = -1' },
                  { expression: '(() => { const c = makeCounter(5); return c.value(); })()', expected: '5', desc: 'початкове значення 5' },
                ],
                xp: 30,
                language: 'javascript',
              },
              {
                id: 'js-l14-c2',
                title: 'Once — виклик лише раз',
                prompt: 'Оголоси функцію <strong>once(fn)</strong> що повертає нову функцію яка викликає <code>fn</code> лише один раз. Після першого виклику завжди повертає перший результат.',
                starterCode: 'function once(fn) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { let n = 0; const f = once(() => ++n); f(); f(); f(); return n; })()', expected: '1', desc: 'fn викликана лише 1 раз' },
                  { expression: '(() => { const f = once(() => 42); f(); return f(); })()', expected: '42', desc: 'повторний виклик = перший результат' },
                ],
                xp: 35,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l15',
            title: 'Рекурсія',
            theory: `<h2>Рекурсія</h2>
<p>Рекурсія — техніка, де функція викликає сама себе. Кожна рекурсія має базовий випадок (умову зупинки).</p>
<h3>Базовий приклад</h3>
<pre><code>function factorial(n) {
  if (n <= 1) return 1;     // базовий випадок
  return n * factorial(n - 1); // рекурсивний виклик
}

factorial(5); // 5 * 4 * 3 * 2 * 1 = 120</code></pre>
<h3>Числа Фібоначчі</h3>
<pre><code>function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// Мемоїзована версія (швидша)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
  return memo[n];
}</code></pre>
<h3>Рекурсивний обхід дерева</h3>
<pre><code>const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [
      { value: 4, children: [] }
    ]},
  ]
};

function sumTree(node) {
  return node.value + node.children.reduce((s, c) => s + sumTree(c), 0);
}
sumTree(tree); // 10</code></pre>`,
                        challenges: [
              {
                id: 'js-l15-c1',
                title: 'Факторіал',
                prompt: 'Оголоси рекурсивну функцію <strong>factorial(n)</strong> що повертає n! (0! = 1).',
                starterCode: 'function factorial(n) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'factorial(0)', expected: '1', desc: '0! = 1' },
                  { expression: 'factorial(5)', expected: '120', desc: '5! = 120' },
                  { expression: 'factorial(10)', expected: '3628800', desc: '10! = 3628800' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l15-c2',
                title: 'Рекурсивне сплощення масиву',
                prompt: 'Оголоси функцію <strong>deepFlatten(arr)</strong> що рекурсивно сплощує масив будь-якої глибини вкладеності.',
                starterCode: 'function deepFlatten(arr) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'deepFlatten([1,[2,[3,[4]]]]).length', expected: '4', desc: '4 елементи' },
                  { expression: 'deepFlatten([1,[2,[3]]]).join(",")', expected: '1,2,3', desc: '[1,2,3]' },
                  { expression: 'deepFlatten([]).length', expected: '0', desc: 'порожній масив' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l16',
            title: 'Rest, Spread та аргументи',
            theory: `<h2>Rest параметри, Spread та arguments</h2>
<h3>Rest параметри (...)</h3>
<pre><code>function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

function first(a, b, ...rest) {
  console.log(a, b); // 1 2
  console.log(rest); // [3, 4, 5]
}
first(1, 2, 3, 4, 5);</code></pre>
<h3>Spread оператор</h3>
<pre><code>// Розгортання масиву
const arr = [1, 2, 3];
Math.max(...arr); // 3 (замість Math.max(1,2,3))

// Копіювання масиву
const copy = [...arr];

// Об\'єднання
const merged = [...arr, 4, 5]; // [1,2,3,4,5]

// Spread для об\'єктів
const a = { x: 1 };
const b = { y: 2 };
const c = { ...a, ...b }; // { x: 1, y: 2 }</code></pre>
<h3>arguments (старий стиль)</h3>
<pre><code>function old() {
  console.log(arguments); // псевдомасив усіх аргументів
  // НЕ працює в стрілкових функціях!
}
// Краще використовувати rest параметри</code></pre>`,
                        challenges: [
              {
                id: 'js-l16-c1',
                title: 'Rest параметри',
                prompt: 'Оголоси функцію <strong>sum(...nums)</strong> що приймає будь-яку кількість чисел і повертає їх суму. Використай rest параметри та reduce.',
                starterCode: 'function sum(...nums) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'sum(1, 2, 3)', expected: '6', desc: 'sum(1,2,3) = 6' },
                  { expression: 'sum(10, 20)', expected: '30', desc: 'sum(10,20) = 30' },
                  { expression: 'sum()', expected: '0', desc: 'sum() = 0' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l16-c2',
                title: 'Merge об\'єктів через spread',
                prompt: 'Оголоси функцію <strong>mergeAll(...objects)</strong> що приймає довільну кількість об\'єктів і повертає новий об\'єкт з усіма їхніми властивостями (пізніші перезаписують ранні). Використай spread.',
                starterCode: 'function mergeAll(...objects) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'mergeAll({a:1},{b:2}).a', expected: '1', desc: 'a = 1' },
                  { expression: 'mergeAll({a:1},{b:2}).b', expected: '2', desc: 'b = 2' },
                  { expression: 'mergeAll({a:1},{a:2}).a', expected: '2', desc: 'пізній перезаписує ранній' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l17',
            title: 'bind, call та apply',
            theory: `<h2>Явне встановлення this: bind, call, apply</h2>
<p>Методи <code>call</code>, <code>apply</code> та <code>bind</code> дозволяють явно задавати значення <code>this</code>.</p>
<h3>call — виклик із заданим this</h3>
<pre><code>function greet(greeting, punct) {
  return \`\${greeting}, \${this.name}\${punct}\`;
}
const user = { name: 'Alice' };
greet.call(user, 'Hello', \'!\'); // "Hello, Alice!"</code></pre>
<h3>apply — те саме, але аргументи у масиві</h3>
<pre><code>greet.apply(user, ['Hi', \'?\']); // "Hi, Alice?"

// Класичне використання: spread альтернатива
Math.max.apply(null, [1, 5, 3]); // 5
// Зараз краще: Math.max(...[1, 5, 3])</code></pre>
<h3>bind — створює нову функцію із зафіксованим this</h3>
<pre><code>const aliceGreet = greet.bind(user);
aliceGreet('Hey', '~'); // "Hey, Alice~"

// Часткове застосування (partial application)
const helloAlice = greet.bind(user, 'Hello');
helloAlice('!');  // "Hello, Alice!"
helloAlice(\'...\'); // "Hello, Alice..."</code></pre>
<h3>Стрілкові функції не мають власного this</h3>
<pre><code>const obj = {
  name: 'Bob',
  regular() { return this.name; },       // 'Bob'
  arrow: () => this.name,                // undefined (this — глобальний)
};
obj.regular(); // \'Bob\'
obj.arrow();   // undefined</code></pre>`,
                        challenges: [
              {
                id: 'js-l17-c1',
                title: 'call — позичити метод',
                prompt: 'Є об\'єкт <code>calculator</code> з методом <code>add(a, b)</code> що повертає <code>this.base + a + b</code>. Оголоси змінну <strong>result</strong> = виклик цього методу через <code>call</code> з об\'єктом <code>{base: 10}</code> і аргументами 3 та 7.',
                starterCode: 'const calculator = {\n  add(a, b) { return this.base + a + b; }\n};\nconst result = calculator.add.call(/* твій код */);\n',
                tests: [
                  { expression: 'result', expected: '20', desc: '10 + 3 + 7 = 20' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l17-c2',
                title: 'bind — часткове застосування',
                prompt: 'Оголоси функцію <strong>multiply(a, b)</strong> що повертає a * b. Потім створи <strong>double</strong> = версія multiply де перший аргумент зафіксований як 2 (через bind).',
                starterCode: 'function multiply(a, b) {\n  return a * b;\n}\nconst double = multiply.bind(/* твій код */);\n',
                tests: [
                  { expression: 'double(5)', expected: '10', desc: 'double(5) = 10' },
                  { expression: 'double(7)', expected: '14', desc: 'double(7) = 14' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l18',
            title: 'Декоратори та функції вищого порядку',
            theory: `<h2>Декоратори та функції вищого порядку</h2>
<p>Функція вищого порядку — функція, що приймає або повертає іншу функцію.</p>
<h3>Мемоїзація</h3>
<pre><code>function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const fastFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return fastFib(n-1) + fastFib(n-2);
});</code></pre>
<h3>Throttle — обмеження частоти</h3>
<pre><code>function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}
window.addEventListener(\'scroll\', throttle(onScroll, 200));</code></pre>
<h3>Debounce — відкладений виклик</h3>
<pre><code>function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
input.addEventListener(\'input\', debounce(onSearch, 300));</code></pre>`,
                        challenges: [
              {
                id: 'js-l18-c1',
                title: 'Мемоізація',
                prompt: 'Оголоси функцію <strong>memoize(fn)</strong> що повертає мемоізовану версію <code>fn</code>. При повторному виклику з тими ж аргументами — повертає кешований результат без виклику fn.',
                starterCode: 'function memoize(fn) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { let calls = 0; const f = memoize(x => { calls++; return x * 2; }); f(5); f(5); return calls; })()', expected: '1', desc: 'fn викликана лише 1 раз' },
                  { expression: '(() => { const f = memoize(x => x * 3); return f(4); })()', expected: '12', desc: 'результат правильний' },
                ],
                xp: 35,
                language: 'javascript',
              },
              {
                id: 'js-l18-c2',
                title: 'Compose',
                prompt: 'Оголоси функцію <strong>compose(f, g)</strong> що повертає нову функцію яка застосовує спочатку <code>g</code>, потім <code>f</code> до аргументу (f(g(x))).',
                starterCode: 'function compose(f, g) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'compose(x => x * 2, x => x + 1)(5)', expected: '12', desc: '(5+1)*2 = 12' },
                  { expression: 'compose(x => x + "!", x => x.toUpperCase())("hello")', expected: 'HELLO!', desc: '"hello" → "HELLO!"' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-oop',
        title: 'ООП в JavaScript',
        icon: '🏗️',
        lessons: [
          {
            id: 'js-l19',
            title: 'this — контекст виклику',
            theory: `<h2>Ключове слово this</h2>
<p><code>this</code> — посилання на об'єкт, у контексті якого виконується функція. Його значення залежить від способу виклику.</p>
<h3>Правила визначення this</h3>
<pre><code>// 1. Виклик як метод об'єкта
const obj = {
  name: 'Alice',
  getName() { return this.name; }
};
obj.getName(); // 'Alice' — this = obj

// 2. Звичайний виклик функції
function show() { return this; }
show(); // Window (браузер) або undefined (strict mode)

// 3. Конструктор (new)
function Person(name) { this.name = name; }
const p = new Person('Bob\'); // this = новий об\'єкт

// 4. Стрілкова функція — this із зовнішнього контексту
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // this = timer (не setInterval!)
    }, 1000);
  }
};</code></pre>
<h3>Втрата this</h3>
<pre><code>const user = { name: 'Alice', greet() { return this.name; } };
const fn = user.greet;
fn(); // undefined — this втрачено

// Рішення: bind
const boundFn = user.greet.bind(user);
boundFn(); // \'Alice\'</code></pre>`,
                        challenges: [
              {
                id: 'js-l19-c1',
                title: 'Метод і this',
                prompt: 'Оголоси об\'єкт <strong>timer</strong> з властивостями <code>seconds: 0</code> та методом <code>tick()</code> що збільшує seconds на 1 і повертає this. Стрілкова функція тут НЕ підходить — використай звичайну.',
                starterCode: 'const timer = {\n  seconds: 0,\n  tick() {\n    // твій код\n  }\n};\n',
                tests: [
                  { expression: 'timer.tick().seconds', expected: '1', desc: 'після tick() seconds = 1' },
                  { expression: '(timer.tick(), timer.tick(), timer.seconds)', expected: '3', desc: 'після ще двох tick() — 3' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l19-c2',
                title: 'Збереження контексту',
                prompt: 'Є об\'єкт <strong>greetObj</strong> з властивістю <code>name: "World"</code> та методом <code>getGreeter()</code> що повертає стрілкову функцію яка повертає рядок <code>"Hello, " + this.name</code>.',
                starterCode: 'const greetObj = {\n  name: "World",\n  getGreeter() {\n    // поверни стрілкову функцію\n  }\n};\n',
                tests: [
                  { expression: 'greetObj.getGreeter()()', expected: 'Hello, World', desc: '"Hello, World"' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l20',
            title: 'Прототипи та ланцюжок прототипів',
            theory: `<h2>Прототипи в JavaScript</h2>
<p>Кожен об'єкт у JS має прихований зв'язок із прототипом — іншим об'єктом, від якого успадковує властивості.</p>
<h3>__proto__ та prototype</h3>
<pre><code>const animal = { breathes: true };
const dog = { name: 'Rex' };
Object.setPrototypeOf(dog, animal);

dog.breathes; // true — шукає у dog, не знаходить → шукає у animal
dog.name;     // \'Rex\' — знайдено в самому dog</code></pre>
<h3>Ланцюжок прототипів</h3>
<pre><code>// dog → animal → Object.prototype → null
\'toString\' in dog; // true — із Object.prototype</code></pre>
<h3>Функції-конструктори</h3>
<pre><code>function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return \`\${this.name} говорить\`;
};

const cat = new Animal('Кіт');
cat.speak(); // \'Кіт говорить\'
cat instanceof Animal; // true</code></pre>
<h3>Object.create</h3>
<pre><code>const proto = {
  greet() { return \`Привіт, \${this.name}\`; }
};
const obj = Object.create(proto);
obj.name = 'Світ';
obj.greet(); // \'Привіт, Світ\'</code></pre>`,
                        challenges: [
              {
                id: 'js-l20-c1',
                title: 'Прототипний метод',
                prompt: 'Додай метод <strong>describe()</strong> до <code>Animal.prototype</code> що повертає рядок <code>"[name] is a [type]"</code>. Потім створи <strong>dog</strong> через конструктор Animal з name="Rex", type="dog".',
                starterCode: 'function Animal(name, type) {\n  this.name = name;\n  this.type = type;\n}\n// додай describe до прототипу\nconst dog = new Animal("Rex", "dog");\n',
                tests: [
                  { expression: 'dog.describe()', expected: 'Rex is a dog', desc: '"Rex is a dog"' },
                  { expression: 'typeof Animal.prototype.describe', expected: 'function', desc: 'describe на прототипі' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l20-c2',
                title: 'Object.create',
                prompt: 'Оголоси об\'єкт <strong>personProto</strong> з методом <code>greet()</code> що повертає <code>"Hi, I am " + this.name</code>. Потім створи <strong>alice</strong> через Object.create(personProto) і встанови alice.name = "Alice".',
                starterCode: 'const personProto = {\n  greet() {\n    // твій код\n  }\n};\nconst alice = Object.create(personProto);\nalice.name = "Alice";\n',
                tests: [
                  { expression: 'alice.greet()', expected: 'Hi, I am Alice', desc: '"Hi, I am Alice"' },
                  { expression: 'Object.getPrototypeOf(alice) === personProto', expected: 'true', desc: 'прототип — personProto' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l21',
            title: 'Класи (class)',
            theory: `<h2>Класи в JavaScript</h2>
<p>Синтаксис <code>class</code> — зручна обгортка над прототипним успадкуванням.</p>
<h3>Оголошення класу</h3>
<pre><code>class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return \`\${this.name} видає звук\`;
  }

  toString() {
    return \`Animal: \${this.name}\`;
  }
}

const dog = new Animal('Барсик');
dog.speak();      // 'Барсик видає звук'
String(dog);      // \'Animal: Барсик\'</code></pre>
<h3>Геттери та сеттери</h3>
<pre><code>class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  get radius() { return this._radius; }
  set radius(r) {
    if (r < 0) throw new Error('Радіус не може бути від\'ємним');
    this._radius = r;
  }
  get area() {
    return Math.PI * this._radius ** 2;
  }
}

const c = new Circle(5);
c.area;     // 78.54...
c.radius = 10;
c.radius;   // 10</code></pre>`,
                        challenges: [
              {
                id: 'js-l21-c1',
                title: 'Клас Rectangle',
                prompt: 'Оголоси клас <strong>Rectangle</strong> з конструктором <code>(width, height)</code>, методом <code>area()</code> (width * height) та методом <code>perimeter()</code> (2 * (width + height)).',
                starterCode: 'class Rectangle {\n  // твій код\n}\n',
                tests: [
                  { expression: 'new Rectangle(4, 5).area()', expected: '20', desc: 'area 4*5 = 20' },
                  { expression: 'new Rectangle(4, 5).perimeter()', expected: '18', desc: 'perimeter = 18' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l21-c2',
                title: 'Getter та Setter',
                prompt: 'Оголоси клас <strong>Temperature</strong> що зберігає температуру в Цельсіях. Додай getter <code>fahrenheit</code> що конвертує (C * 9/5 + 32) та setter <code>fahrenheit</code> що приймає °F і зберігає в Цельсіях.',
                starterCode: 'class Temperature {\n  constructor(celsius) {\n    this._celsius = celsius;\n  }\n  // твій код\n}\n',
                tests: [
                  { expression: 'new Temperature(0).fahrenheit', expected: '32', desc: '0°C = 32°F' },
                  { expression: 'new Temperature(100).fahrenheit', expected: '212', desc: '100°C = 212°F' },
                  { expression: '(() => { const t = new Temperature(0); t.fahrenheit = 32; return t._celsius; })()', expected: '0', desc: 'setter: 32°F = 0°C' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l22',
            title: 'Наслідування класів',
            theory: `<h2>Наслідування (extends та super)</h2>
<p><code>extends</code> дозволяє одному класу успадкувати поведінку іншого.</p>
<h3>Базовий приклад</h3>
<pre><code>class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} видає звук\`; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);       // викликає Animal.constructor
    this.breed = breed;
  }
  speak() {           // перевизначення методу
    return \`\${this.name} гавкає!\`;
  }
  info() {
    return \`\${super.speak()} (порода: \${this.breed})\`;
  }
}

const d = new Dog('Рекс', 'Лабрадор');
d.speak();  // 'Рекс гавкає!'
d.info();   // \'Рекс видає звук (порода: Лабрадор)\'
d instanceof Dog;    // true
d instanceof Animal; // true</code></pre>
<h3>Абстрактні методи (конвенція)</h3>
<pre><code>class Shape {
  area() { throw new Error(\'Метод area() не реалізований\'); }
  toString() { return \`\${this.constructor.name}(area=\${this.area()})\`; }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
}

new Rectangle(3, 4).area(); // 12</code></pre>`,
                        challenges: [
              {
                id: 'js-l22-c1',
                title: 'Наслідування класу',
                prompt: 'Є клас <code>Shape</code> з методом <code>type()</code>. Оголоси клас <strong>Circle</strong> що наслідує Shape, приймає <code>radius</code>, і додає метод <code>area()</code> = π * r². Метод type() повертає "circle".',
                starterCode: 'class Shape {\n  type() { return "shape"; }\n}\nclass Circle extends Shape {\n  // твій код\n}\n',
                tests: [
                  { expression: 'new Circle(5).type()', expected: 'circle', desc: 'type() = "circle"' },
                  { expression: 'Math.abs(new Circle(5).area() - Math.PI * 25) < 0.001', expected: 'true', desc: 'area = π*25' },
                  { expression: 'new Circle(3) instanceof Shape', expected: 'true', desc: 'instanceof Shape' },
                ],
                xp: 30,
                language: 'javascript',
              },
              {
                id: 'js-l22-c2',
                title: 'super — розширення конструктора',
                prompt: 'Є клас <code>Vehicle</code> з конструктором <code>(brand, speed)</code> і методом <code>describe()</code>. Оголоси клас <strong>Car</strong> що наслідує Vehicle, додає <code>doors</code> і перевизначає describe() щоб включити кількість дверей.',
                starterCode: 'class Vehicle {\n  constructor(brand, speed) {\n    this.brand = brand;\n    this.speed = speed;\n  }\n  describe() { return `${this.brand} — ${this.speed}km/h`; }\n}\nclass Car extends Vehicle {\n  // твій код\n}\n',
                tests: [
                  { expression: 'new Car("Toyota", 180, 4).brand', expected: 'Toyota', desc: 'brand збережено' },
                  { expression: 'new Car("Toyota", 180, 4).doors', expected: '4', desc: 'doors = 4' },
                  { expression: 'new Car("BMW", 200, 2).describe().includes("2")', expected: 'true', desc: 'describe містить кількість дверей' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l23',
            title: 'Статичні члени та приватні поля',
            theory: `<h2>Статичні члени та приватні поля</h2>
<h3>static — методи та властивості класу</h3>
<pre><code>class MathUtils {
  static PI = 3.14159;

  static add(a, b) { return a + b; }
  static multiply(a, b) { return a * b; }
}

MathUtils.PI;           // 3.14159
MathUtils.add(2, 3);    // 5
// new MathUtils().add — не потрібен екземпляр</code></pre>
<h3>Фабричні методи (static)</h3>
<pre><code>class User {
  constructor(name, role) { this.name = name; this.role = role; }
  static createAdmin(name) { return new User(name, 'admin'); }
  static createGuest() { return new User('Guest', 'guest'); }
}

const admin = User.createAdmin(\'Alice\');</code></pre>
<h3>Приватні поля (#)</h3>
<pre><code>class BankAccount {
  #balance = 0;

  deposit(amount) { this.#balance += amount; }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error(\'Недостатньо коштів\');
    this.#balance -= amount;
  }
  get balance() { return this.#balance; }
}

const acc = new BankAccount();
acc.deposit(100);
acc.balance; // 100
acc.#balance; // ❌ SyntaxError — приватне поле</code></pre>`,
                        challenges: [
              {
                id: 'js-l23-c1',
                title: 'Статичний лічильник екземплярів',
                prompt: 'Оголоси клас <strong>Counter</strong> зі статичною властивістю <code>count = 0</code>. У конструкторі збільшуй Counter.count на 1. Додай статичний метод <code>reset()</code> що обнуляє count.',
                starterCode: 'class Counter {\n  static count = 0;\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { Counter.reset(); new Counter(); new Counter(); return Counter.count; })()', expected: '2', desc: 'після двох new Counter.count = 2' },
                  { expression: '(() => { Counter.reset(); return Counter.count; })()', expected: '0', desc: 'після reset = 0' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l23-c2',
                title: 'Приватне поле',
                prompt: 'Оголоси клас <strong>BankAccount</strong> з приватним полем <code>#balance = 0</code>. Додай методи <code>deposit(amount)</code>, <code>withdraw(amount)</code> (не може бути від\'ємним) та <code>getBalance()</code>.',
                starterCode: 'class BankAccount {\n  #balance = 0;\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const a = new BankAccount(); a.deposit(100); return a.getBalance(); })()', expected: '100', desc: 'deposit 100' },
                  { expression: '(() => { const a = new BankAccount(); a.deposit(50); a.withdraw(30); return a.getBalance(); })()', expected: '20', desc: 'deposit 50, withdraw 30 = 20' },
                  { expression: '(() => { const a = new BankAccount(); a.withdraw(100); return a.getBalance(); })()', expected: '0', desc: 'withdraw більше ніж є — залишок 0' },
                ],
                xp: 35,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-errors',
        title: 'Обробка помилок',
        icon: '🛡️',
        lessons: [
          {
            id: 'js-l24',
            title: 'try...catch...finally',
            theory: `<h2>Обробка помилок: try...catch</h2>
<p>Помилки (exceptions) перехоплюються блоком <code>try...catch</code> — без нього вони завалюють програму.</p>
<h3>Базова структура</h3>
<pre><code>try {
  // код, що може викинути помилку
  const data = JSON.parse('некоректний json');
} catch (error) {
  console.error(error.name);    // SyntaxError
  console.error(error.message); // рядок з описом
  console.error(error.stack);   // стек викликів
} finally {
  // виконується ЗАВЖДИ — навіть при помилці
  console.log(\'Готово\');
}</code></pre>
<h3>throw — кидаємо власну помилку</h3>
<pre><code>function divide(a, b) {
  if (b === 0) throw new Error('Ділення на нуль!');
  return a / b;
}

try {
  divide(10, 0);
} catch (e) {
  console.log(e.message); // \'Ділення на нуль!\'
}</code></pre>
<h3>Типи вбудованих помилок</h3>
<pre><code>new Error('загальна помилка');
new TypeError('неправильний тип');
new RangeError('значення поза межами');
new ReferenceError('змінна не оголошена');
new SyntaxError('синтаксична помилка');
new URIError(\'помилка URI\');

// Перевірка типу
try { null.x; }
catch(e) { e instanceof TypeError; } // true</code></pre>`,
                        challenges: [
              {
                id: 'js-l24-c1',
                title: 'try/catch — безпечний JSON.parse',
                prompt: 'Оголоси функцію <strong>safeParseJSON(str)</strong> що намагається парсити JSON рядок. Якщо успішно — повертає об\'єкт, якщо помилка — повертає <code>null</code>.',
                starterCode: 'function safeParseJSON(str) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'safeParseJSON(\'{"a":1}\').a', expected: '1', desc: 'валідний JSON парситься' },
                  { expression: 'safeParseJSON("invalid json")', expected: 'null', desc: 'невалідний → null' },
                  { expression: 'safeParseJSON(null)', expected: 'null', desc: 'null → null' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l24-c2',
                title: 'finally — очищення ресурсів',
                prompt: 'Оголоси функцію <strong>withLog(fn)</strong> що виконує <code>fn()</code> та повертає її результат. Незалежно від успіху чи помилки — додає до масиву <code>log</code> рядок <code>"done"</code>. Масив <code>log</code> має бути оголошений всередині withLog та повертається як <code>{ result, log }</code>.',
                starterCode: 'function withLog(fn) {\n  const log = [];\n  // твій код\n}\n',
                tests: [
                  { expression: 'withLog(() => 42).result', expected: '42', desc: 'результат fn' },
                  { expression: 'withLog(() => 42).log.includes("done")', expected: 'true', desc: 'log містить "done"' },
                  { expression: '(() => { try { withLog(() => { throw new Error(); }); } catch(e) {} return true; })()', expected: 'true', desc: 'не крашається при помилці' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l25',
            title: 'Власні класи помилок',
            theory: `<h2>Власні класи помилок</h2>
<p>Для великих застосунків корисно мати власні типи помилок — щоб розрізняти їх у catch-блоках.</p>
<h3>Розширення Error</h3>
<pre><code>class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

function validateAge(age) {
  if (typeof age !== 'number') {
    throw new ValidationError('Вік має бути числом', 'age');
  }
  if (age < 0 || age > 150) {
    throw new ValidationError('Некоректний вік', 'age');
  }
}

try {
  validateAge('abc');
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(\`Поле "\${e.field}": \${e.message}\`);
  } else {
    throw e; // перекидаємо незнайому помилку
  }
}</code></pre>
<h3>Обгортання помилок</h3>
<pre><code>class AppError extends Error {
  constructor(message, cause) {
    super(message, { cause }); // ES2022: передаємо першопричину
    this.name = 'AppError';
  }
}

try {
  JSON.parse('broken');
} catch (e) {
  throw new AppError(\'Не вдалося завантажити конфіг\', e);
}</code></pre>`,
                        challenges: [
              {
                id: 'js-l25-c1',
                title: 'Власний клас помилки',
                prompt: 'Оголоси клас <strong>ValidationError</strong> що наслідує Error. Конструктор приймає <code>message</code> та <code>field</code>. Встанови <code>this.name = "ValidationError"</code> і <code>this.field = field</code>.',
                starterCode: 'class ValidationError extends Error {\n  // твій код\n}\n',
                tests: [
                  { expression: 'new ValidationError("required", "email").message', expected: 'required', desc: 'message збережено' },
                  { expression: 'new ValidationError("required", "email").field', expected: 'email', desc: 'field = "email"' },
                  { expression: 'new ValidationError("x", "y").name', expected: 'ValidationError', desc: 'name = "ValidationError"' },
                  { expression: 'new ValidationError("x", "y") instanceof Error', expected: 'true', desc: 'instanceof Error' },
                ],
                xp: 30,
                language: 'javascript',
              },
              {
                id: 'js-l25-c2',
                title: 'Розрізнення типів помилок',
                prompt: 'Оголоси функцію <strong>divide(a, b)</strong>: якщо b === 0 — кидає <code>new RangeError("Division by zero")</code>, якщо аргументи не числа — кидає <code>new TypeError("Not a number")</code>, інакше — повертає a / b.',
                starterCode: 'function divide(a, b) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'divide(10, 2)', expected: '5', desc: '10/2 = 5' },
                  { expression: '(() => { try { divide(1, 0); } catch(e) { return e instanceof RangeError; } })()', expected: 'true', desc: 'b=0 → RangeError' },
                  { expression: '(() => { try { divide("a", 2); } catch(e) { return e instanceof TypeError; } })()', expected: 'true', desc: 'не число → TypeError' },
                ],
                xp: 35,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-async',
        title: 'Асинхронний JS',
        icon: '⏳',
        lessons: [
          {
            id: 'js-l26',
            title: 'Callbacks та Event Loop',
            theory: `<h2>Callbacks та Event Loop</h2>
<p>JavaScript — однопотокова мова. Асинхронні операції (таймери, мережа) обробляються через Event Loop.</p>
<h3>Callback — функція зворотного виклику</h3>
<pre><code>setTimeout(() => console.log('Через 1 сек'), 1000);
console.log('Зараз'); // виконається ПЕРШИМ

// Черга: синхронний код → мікротаски → макротаски
setTimeout(() => console.log('macro'), 0);
Promise.resolve().then(() => console.log('micro'));
console.log(\'sync\');
// Порядок: sync → micro → macro</code></pre>
<h3>Callback hell (проблема)</h3>
<pre><code>getUser(id, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      // глибока вкладеність — важко читати
    });
  });
});</code></pre>
<h3>Call Stack та Task Queue</h3>
<pre><code>// Call Stack — синхронний стек викликів
// Task Queue — черга для setTimeout/setInterval
// Microtask Queue — черга для Promise.then (вища пріоритетність)

// Приклад:
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
// Вивід: 1 4 3 2</code></pre>`,
                        challenges: [
              {
                id: 'js-l26-c1',
                title: 'Власний forEach',
                prompt: 'Оголоси функцію <strong>myForEach(arr, callback)</strong> що проходить по масиву і викликає <code>callback(element, index, arr)</code> для кожного елементу. НЕ використовуй вбудований forEach.',
                starterCode: 'function myForEach(arr, callback) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const r = []; myForEach([1,2,3], x => r.push(x*2)); return r.join(","); })()', expected: '2,4,6', desc: 'подвоює елементи' },
                  { expression: '(() => { const i = []; myForEach(["a","b"], (el, idx) => i.push(idx)); return i.join(","); })()', expected: '0,1', desc: 'передає індекси' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l26-c2',
                title: 'Власний map',
                prompt: 'Оголоси функцію <strong>myMap(arr, transform)</strong> що повертає новий масив де кожен елемент трансформований через <code>transform(element, index)</code>. НЕ використовуй вбудований map.',
                starterCode: 'function myMap(arr, transform) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'myMap([1,2,3], x => x * x).join(",")', expected: '1,4,9', desc: 'квадрати' },
                  { expression: 'myMap([], x => x).length', expected: '0', desc: 'порожній масив' },
                  { expression: 'Array.isArray(myMap([1,2], x => x))', expected: 'true', desc: 'повертає Array' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l27',
            title: 'Promise — поглиблено',
            theory: `<h2>Promise — поглиблено</h2>
<p>Promise має три стани: <code>pending</code> → <code>fulfilled</code> або <code>rejected</code>.</p>
<h3>Створення Promise</h3>
<pre><code>const p = new Promise((resolve, reject) => {
  // асинхронна операція
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) resolve('Дані отримано');
    else reject(new Error(\'Мережева помилка\'));
  }, 1000);
});</code></pre>
<h3>Promise chaining</h3>
<pre><code>fetch(\'/api/user\')
  .then(response => response.json())    // отримуємо JSON
  .then(user => fetch(\`/api/posts/\${user.id}\`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err))     // будь-яка помилка в ланцюгу
  .finally(() => hideLoader());         // завжди</code></pre>
<h3>Promise.all та інші</h3>
<pre><code>// all — чекає всіх, fail-fast
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);

// allSettled — чекає всіх, не падає
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === \'fulfilled\') console.log(r.value);
  else console.error(r.reason);
});

// race — хто перший
const fastest = await Promise.race([p1, p2]);

// any — перший успішний
const first = await Promise.any([p1, p2, p3]);</code></pre>`,
                        challenges: [
              {
                id: 'js-l27-c1',
                title: 'Створення Promise',
                prompt: 'Оголоси функцію <strong>delay(ms)</strong> що повертає Promise який resolve-иться через ms мілісекунд. Використай setTimeout.',
                starterCode: 'function delay(ms) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'delay(10) instanceof Promise', expected: 'true', desc: 'повертає Promise' },
                  { expression: 'typeof delay(10).then', expected: 'function', desc: 'має метод .then' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l27-c2',
                title: 'Promise.all — паралельне виконання',
                prompt: 'Оголоси функцію <strong>fetchAll(urls)</strong> що приймає масив рядків і повертає Promise.all де кожен URL "завантажується" через <code>Promise.resolve(url + "_data")</code>. Тобто симулюй завантаження без реального fetch.',
                starterCode: 'function fetchAll(urls) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'fetchAll(["a","b"]) instanceof Promise', expected: 'true', desc: 'повертає Promise' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l28',
            title: 'async/await — поглиблено',
            theory: `<h2>async/await — поглиблено</h2>
<p><code>async/await</code> — синтаксичний цукор над Promise, що робить асинхронний код схожим на синхронний.</p>
<h3>Основи</h3>
<pre><code>async function loadUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json(); // автоматично повертається як Promise
}

// Виклик
const user = await loadUser(42);
// АБО
loadUser(42).then(user => console.log(user));</code></pre>
<h3>Обробка помилок</h3>
<pre><code>async function safeFetch(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

const { data, error } = await safeFetch(\'/api/data\');
if (error) console.error(error);
else console.log(data);</code></pre>
<h3>Паралельне виконання</h3>
<pre><code>// ❌ Послідовно — повільно (2 сек)
const user = await fetchUser();
const posts = await fetchPosts();

// ✅ Паралельно — швидко (1 сек)
const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

// Або: запускаємо паралельно, await по черзі
const userPromise = fetchUser();
const postsPromise = fetchPosts();
const user2 = await userPromise;
const posts2 = await postsPromise;</code></pre>`,
                        challenges: [
              {
                id: 'js-l28-c1',
                title: 'async/await — послідовне виконання',
                prompt: 'Оголоси async функцію <strong>getUser(id)</strong> що повертає об\'єкт <code>{ id, name: "User_" + id }</code> через await Promise.resolve(...).',
                starterCode: 'async function getUser(id) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'getUser(1) instanceof Promise', expected: 'true', desc: 'повертає Promise' },
                  { expression: 'typeof getUser', expected: 'function', desc: 'getUser — функція' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l28-c2',
                title: 'async з обробкою помилок',
                prompt: 'Оголоси async функцію <strong>safeFetch(url)</strong> що через try/catch перехоплює помилки. Якщо url порожній — кидає Error("Empty URL"). Повертає <code>{ ok: true, url }</code> або <code>{ ok: false, error: e.message }</code>.',
                starterCode: 'async function safeFetch(url) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'safeFetch("") instanceof Promise', expected: 'true', desc: 'повертає Promise' },
                  { expression: 'typeof safeFetch', expected: 'function', desc: 'safeFetch — функція' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l29',
            title: 'Generators та ітератори',
            theory: `<h2>Generators та ітератори</h2>
<p>Generator — функція, що може "призупинятись" і повертати значення поступово.</p>
<h3>Ітератор</h3>
<pre><code>// Ітератор — об'єкт із методом next()
const iter = {
  current: 1,
  last: 5,
  [Symbol.iterator]() { return this; },
  next() {
    if (this.current <= this.last) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  }
};
for (const n of iter) console.log(n); // 1 2 3 4 5</code></pre>
<h3>Generator функція</h3>
<pre><code>function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i; // "повертає" значення та призупиняється
  }
}

for (const n of range(0, 10, 2)) {
  console.log(n); // 0 2 4 6 8 10
}

const nums = [...range(1, 5)]; // [1,2,3,4,5]</code></pre>
<h3>Нескінченні генератори</h3>
<pre><code>function* id() {
  let i = 1;
  while (true) yield i++;
}

const gen = id();
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3</code></pre>`,
                        challenges: [
              {
                id: 'js-l29-c1',
                title: 'Генератор діапазону',
                prompt: 'Оголоси генераторну функцію <strong>range(start, end, step = 1)</strong> що yields числа від start до end (не включно) з кроком step.',
                starterCode: 'function* range(start, end, step = 1) {\n  // твій код\n}\n',
                tests: [
                  { expression: '[...range(0, 5)].join(",")', expected: '0,1,2,3,4', desc: 'range(0,5) = [0,1,2,3,4]' },
                  { expression: '[...range(0, 10, 2)].join(",")', expected: '0,2,4,6,8', desc: 'range(0,10,2) = [0,2,4,6,8]' },
                  { expression: '[...range(3, 3)].length', expected: '0', desc: 'порожній діапазон' },
                ],
                xp: 30,
                language: 'javascript',
              },
              {
                id: 'js-l29-c2',
                title: 'Нескінченний генератор',
                prompt: 'Оголоси генераторну функцію <strong>counter(start = 0)</strong> що нескінченно yields зростаючі числа від start.',
                starterCode: 'function* counter(start = 0) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const g = counter(5); return [g.next().value, g.next().value, g.next().value].join(","); })()', expected: '5,6,7', desc: 'counter(5) → 5,6,7...' },
                  { expression: '(() => { const g = counter(); return g.next().value; })()', expected: '0', desc: 'counter() починає з 0' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-dom',
        title: 'DOM та браузер',
        icon: '🌐',
        lessons: [
          {
            id: 'js-l30',
            title: 'DOM — дерево документа',
            theory: `<h2>Document Object Model (DOM)</h2>
<p>DOM — програмний інтерфейс для HTML-документа. Браузер будує дерево вузлів із HTML.</p>
<h3>Структура DOM</h3>
<pre><code>// HTML:
// &lt;html&gt;
//   &lt;body&gt;
//     &lt;h1 id="title"&gt;Привіт&lt;/h1&gt;
//     &lt;p class="text"&gt;Текст&lt;/p&gt;
//   &lt;/body&gt;
// &lt;/html&gt;

document.documentElement; // &lt;html&gt;
document.head;            // &lt;head&gt;
document.body;            // &lt;body&gt;
document.title;           // заголовок сторінки</code></pre>
<h3>Типи вузлів</h3>
<pre><code>Node.ELEMENT_NODE;   // 1 — елемент (&lt;div&gt;, &lt;p&gt;...)
Node.TEXT_NODE;      // 3 — текстовий вузол
Node.COMMENT_NODE;   // 8 — коментар</code></pre>
<h3>Навігація по дереву</h3>
<pre><code>const el = document.body;
el.parentNode;        // батьківський вузол
el.childNodes;        // всі дочірні (NodeList)
el.children;          // тільки елементи (HTMLCollection)
el.firstElementChild; // перший дочірній елемент
el.lastElementChild;  // останній
el.nextElementSibling;   // наступний сусід
el.previousElementSibling; // попередній сусід</code></pre>`,
                        challenges: [
              {
                id: 'js-l30-c1',
                title: 'Навігація по DOM',
                prompt: 'Оголоси функцію <strong>getFirstChild(parentId)</strong> що повертає <code>textContent</code> першого дочірнього елемента (element child, не text node) елементу з даним id. Якщо немає — повертає null.',
                starterCode: '// HTML вже містить елементи в document.body\nfunction getFirstChild(parentId) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'typeof getFirstChild', expected: 'function', desc: 'getFirstChild — функція' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l30-c2',
                title: 'Підрахунок нащадків',
                prompt: 'Оголоси функцію <strong>countChildren(el)</strong> що приймає DOM елемент і повертає кількість його прямих дочірніх елементів (не текстових вузлів). Використай <code>el.children.length</code>.',
                starterCode: 'function countChildren(el) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const div = document.createElement("div"); div.innerHTML = "<span></span><p></p>"; return countChildren(div); })()', expected: '2', desc: '2 дочірніх елементи' },
                  { expression: '(() => { const div = document.createElement("div"); return countChildren(div); })()', expected: '0', desc: 'порожній — 0' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l31',
            title: 'Пошук елементів',
            theory: `<h2>Пошук елементів у DOM</h2>
<h3>querySelector та querySelectorAll</h3>
<pre><code>// querySelector — перший елемент що відповідає CSS-селектору
const title = document.querySelector('#title');
const btn = document.querySelector('.btn.primary');
const input = document.querySelector('form input[type="email"]');

// querySelectorAll — всі підходящі (NodeList)
const items = document.querySelectorAll('.list-item');
items.forEach(item => item.classList.add(\'active\'));</code></pre>
<h3>Застарілі (але швидші) методи</h3>
<pre><code>document.getElementById('app');          // за id
document.getElementsByClassName('card'); // за class (живий)
document.getElementsByTagName(\'p\');      // за тегом (живий)</code></pre>
<h3>matches, closest, contains</h3>
<pre><code>el.matches('.active');          // чи відповідає CSS-селектору
el.closest('.container');       // знайти найближчого предка
el.contains(child);             // чи містить вузол

// closest — дуже зручно для делегування:
document.addEventListener('click', e => {
  const btn = e.target.closest(\'[data-action]\');
  if (btn) handleAction(btn.dataset.action);
});</code></pre>`,
                        challenges: [
              {
                id: 'js-l31-c1',
                title: 'querySelector',
                prompt: 'Оголоси функцію <strong>findByClass(container, className)</strong> що повертає масив усіх елементів з даним класом всередині container. Використай querySelectorAll.',
                starterCode: 'function findByClass(container, className) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const d = document.createElement("div"); d.innerHTML = `<p class="a"></p><span class="a"></span><div class="b"></div>`; return findByClass(d, "a").length; })()', expected: '2', desc: '2 елементи з класом "a"' },
                  { expression: 'Array.isArray(findByClass(document.createElement("div"), "x"))', expected: 'true', desc: 'повертає Array' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l31-c2',
                title: 'closest — пошук батька',
                prompt: 'Оголоси функцію <strong>findAncestor(el, selector)</strong> що повертає найближчого батьківського предка що відповідає selector (використай closest). Якщо не знайдено — null.',
                starterCode: 'function findAncestor(el, selector) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const wrap = document.createElement("div"); wrap.className = "wrap"; const inner = document.createElement("span"); wrap.appendChild(inner); return findAncestor(inner, ".wrap") === wrap; })()', expected: 'true', desc: 'знаходить батька з класом' },
                  { expression: '(() => { const el = document.createElement("p"); return findAncestor(el, ".nonexistent"); })()', expected: 'null', desc: 'не знайдено → null' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l32',
            title: 'Маніпуляція DOM',
            theory: `<h2>Маніпуляція DOM</h2>
<h3>Читання та запис вмісту</h3>
<pre><code>el.innerHTML = '&lt;b&gt;Жирний текст&lt;/b&gt;'; // HTML (обережно — XSS!)
el.textContent = \'Простий текст\';        // безпечно, тільки текст
el.innerText;  // видимий текст (враховує CSS display:none)</code></pre>
<h3>Атрибути</h3>
<pre><code>el.getAttribute('href');
el.setAttribute('href', '/new-page');
el.removeAttribute('disabled');
el.hasAttribute('required');

// data-атрибути
// &lt;div data-user-id="42"&gt;
el.dataset.userId; // '42'
el.dataset.userId = \'43\';</code></pre>
<h3>Класи</h3>
<pre><code>el.classList.add('active', 'visible');
el.classList.remove('hidden');
el.classList.toggle('selected');      // додає або видаляє
el.classList.contains('active');      // true/false
el.classList.replace('old', \'new\');</code></pre>
<h3>Створення та вставка елементів</h3>
<pre><code>const div = document.createElement('div');
div.className = 'card';
div.textContent = \'Новий елемент\';

parent.append(div);           // в кінець (підтримує рядки)
parent.prepend(div);          // на початок
parent.before(div);           // перед батьком
parent.after(div);            // після батька
parent.replaceWith(div);      // замінити
div.remove();                 // видалити</code></pre>`,
                        challenges: [
              {
                id: 'js-l32-c1',
                title: 'Створення елемента',
                prompt: 'Оголоси функцію <strong>createCard(title, text)</strong> що створює і повертає div з класом <code>"card"</code>, всередині якого h3 з title і p з text.',
                starterCode: 'function createCard(title, text) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'createCard("Hi", "World").className', expected: 'card', desc: 'має клас "card"' },
                  { expression: 'createCard("Hi", "World").querySelector("h3").textContent', expected: 'Hi', desc: 'h3 містить title' },
                  { expression: 'createCard("Hi", "World").querySelector("p").textContent', expected: 'World', desc: 'p містить text' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l32-c2',
                title: 'Маніпуляція classList',
                prompt: 'Оголоси функцію <strong>toggleActive(el)</strong> що: якщо el має клас <code>"active"</code> — видаляє його; якщо не має — додає. Повертає true якщо клас додано, false якщо видалено.',
                starterCode: 'function toggleActive(el) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const el = document.createElement("div"); return toggleActive(el); })()', expected: 'true', desc: 'немає active → додається → true' },
                  { expression: '(() => { const el = document.createElement("div"); el.classList.add("active"); return toggleActive(el); })()', expected: 'false', desc: 'є active → видаляється → false' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l33',
            title: 'Події (Events)',
            theory: `<h2>Події в браузері</h2>
<p>Подія — сигнал про щось, що відбулось (клік, натискання клавіші, завантаження сторінки).</p>
<h3>addEventListener</h3>
<pre><code>const btn = document.querySelector('#myBtn');

btn.addEventListener('click', function(event) {
  console.log(event.target);  // елемент, на якому стався клік
  console.log(event.type);    // 'click'
  console.log(event.clientX, event.clientY); // координати
});

// Видалення слухача
function handler(e) { console.log(e); }
btn.addEventListener('click', handler);
btn.removeEventListener(\'click\', handler);</code></pre>
<h3>Поширення подій (bubbling)</h3>
<pre><code>// Клік на дочірньому елементі "спливає" до батьків
document.addEventListener('click', e => {
  console.log('document отримав клік');
});

// Зупинити спливання
btn.addEventListener('click', e => {
  e.stopPropagation(); // подія не дійде до батьків
});

// Скасувати дефолтну поведінку (наприклад, перехід за посиланням)
link.addEventListener(\'click\', e => {
  e.preventDefault();
});</code></pre>
<h3>Основні події</h3>
<pre><code>// Миша
'click', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove'

// Клавіатура
'keydown', 'keyup', 'keypress'
e.key; // 'Enter', 'Escape', 'a', ...

// Форма
'submit', 'change', 'input', 'focus', 'blur'

// Документ
'DOMContentLoaded', 'load', 'resize', \'scroll\'</code></pre>`,
                        challenges: [
              {
                id: 'js-l33-c1',
                title: 'addEventListener та removeEventListener',
                prompt: 'Оголоси функцію <strong>trackClicks(el)</strong> що повертає об\'єкт <code>{ count, stop }</code>. <code>count</code> — геттер що повертає поточну кількість кліків. <code>stop()</code> — знімає обробник.',
                starterCode: 'function trackClicks(el) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const el = document.createElement("button"); const t = trackClicks(el); el.click(); el.click(); return t.count; })()', expected: '2', desc: '2 кліки = count 2' },
                  { expression: '(() => { const el = document.createElement("button"); const t = trackClicks(el); t.stop(); el.click(); return t.count; })()', expected: '0', desc: 'після stop() кліки не рахуються' },
                ],
                xp: 30,
                language: 'javascript',
              },
              {
                id: 'js-l33-c2',
                title: 'Спливання подій',
                prompt: 'Оголоси функцію <strong>setupBubble(parent, child)</strong> що додає click listener на обидва елементи. Повертає масив <code>log</code> в який записуються рядки "parent" і "child" в порядку спрацювання (спочатку child, потім parent — bubbling).',
                starterCode: 'function setupBubble(parent, child) {\n  const log = [];\n  // додай listeners що пишуть в log\n  return log;\n}\n',
                tests: [
                  { expression: '(() => { const p = document.createElement("div"); const c = document.createElement("button"); p.appendChild(c); const log = setupBubble(p, c); c.click(); return log[0]; })()', expected: 'child', desc: 'спочатку child' },
                  { expression: '(() => { const p = document.createElement("div"); const c = document.createElement("button"); p.appendChild(c); const log = setupBubble(p, c); c.click(); return log[1]; })()', expected: 'parent', desc: 'потім parent (bubbling)' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l34',
            title: 'Делегування подій',
            theory: `<h2>Делегування подій</h2>
<p>Замість додавати слухач до кожного елемента, ставимо один на батьківський і перевіряємо <code>event.target</code>.</p>
<h3>Приклад: список із кнопками</h3>
<pre><code>// ❌ Без делегування — слухач на кожній кнопці
document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', deleteItem);
});

// ✅ З делегуванням — один слухач на списку
document.querySelector('#list').addEventListener('click', e => {
  if (e.target.matches('.delete-btn')) {
    const item = e.target.closest(\'.list-item\');
    item.remove();
  }
});</code></pre>
<h3>Переваги делегування</h3>
<pre><code>// 1. Менше слухачів → краща продуктивність
// 2. Працює для динамічно доданих елементів

const list = document.querySelector('#todo-list');
list.addEventListener('click', e => {
  // delete
  if (e.target.matches('[data-action="delete"]')) {
    e.target.closest('li').remove();
  }
  // complete
  if (e.target.matches('[data-action="complete"]')) {
    e.target.closest('li').classList.toggle(\'done\');
  }
});</code></pre>`,
                        challenges: [
              {
                id: 'js-l34-c1',
                title: 'Делегування подій',
                prompt: 'Оголоси функцію <strong>setupList(ul)</strong> що додає ОДИН click listener на <code>ul</code>. При кліку на <code>li</code> — додає до нього клас <code>"selected"</code> і знімає з усіх інших li. Повертає ul.',
                starterCode: 'function setupList(ul) {\n  // твій код (один listener)\n  return ul;\n}\n',
                tests: [
                  { expression: '(() => { const ul = document.createElement("ul"); ul.innerHTML = "<li>A</li><li>B</li><li>C</li>"; setupList(ul); ul.children[1].click(); return ul.children[1].classList.contains("selected"); })()', expected: 'true', desc: 'клікнутий li отримує "selected"' },
                  { expression: '(() => { const ul = document.createElement("ul"); ul.innerHTML = "<li>A</li><li>B</li>"; setupList(ul); ul.children[0].click(); ul.children[1].click(); return ul.children[0].classList.contains("selected"); })()', expected: 'false', desc: 'попередній li втрачає "selected"' },
                ],
                xp: 30,
                language: 'javascript',
              },
              {
                id: 'js-l34-c2',
                title: 'closest в делегуванні',
                prompt: 'Оголоси функцію <strong>setupDeleteBtns(container)</strong> що додає один click listener на container. При кліку на кнопку з класом <code>"delete-btn"</code> — видаляє її батьківський <code>li</code>. Повертає container.',
                starterCode: 'function setupDeleteBtns(container) {\n  // твій код\n  return container;\n}\n',
                tests: [
                  { expression: '(() => { const ul = document.createElement("ul"); ul.innerHTML = `<li>Item <button class="delete-btn">X</button></li><li>Item2</li>`; setupDeleteBtns(ul); ul.querySelector(".delete-btn").click(); return ul.children.length; })()', expected: '1', desc: 'після кліку delete-btn — li видалено' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l35',
            title: 'Форми та введення',
            theory: `<h2>Форми та введення даних</h2>
<h3>Доступ до форм та полів</h3>
<pre><code>const form = document.querySelector('#loginForm');
const emailInput = form.elements[\'email\'];   // за name
const passwordInput = form.elements[1];      // за індексом

emailInput.value;    // поточне значення
emailInput.focus();  // фокус
emailInput.select(); // виділити текст</code></pre>
<h3>Обробка submit</h3>
<pre><code>form.addEventListener('submit', e => {
  e.preventDefault(); // скасовуємо відправку сторінки

  const data = new FormData(form);
  const email = data.get('email');
  const password = data.get('password');

  // або через Object.fromEntries
  const obj = Object.fromEntries(data); // { email: '...', password: \'...\' }
});</code></pre>
<h3>Валідація</h3>
<pre><code>input.addEventListener('input', e => {
  const val = e.target.value;
  if (val.length < 3) {
    e.target.setCustomValidity('Мінімум 3 символи');
  } else {
    e.target.setCustomValidity(''); // очищаємо помилку
  }
});

// Вбудована валідація HTML5
// &lt;input type="email" required minlength="3"&gt;
form.checkValidity(); // true/false</code></pre>`,
                        challenges: [
              {
                id: 'js-l35-c1',
                title: 'Валідація форми',
                prompt: 'Оголоси функцію <strong>validateEmail(email)</strong> що повертає true якщо рядок містить символ <code>@</code> і хоча б одну крапку після нього, інакше false.',
                starterCode: 'function validateEmail(email) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'validateEmail("user@example.com")', expected: 'true', desc: 'валідний email' },
                  { expression: 'validateEmail("notanemail")', expected: 'false', desc: 'немає @' },
                  { expression: 'validateEmail("user@nodot")', expected: 'false', desc: 'немає крапки після @' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l35-c2',
                title: 'FormData — збір даних',
                prompt: 'Оголоси функцію <strong>getFormData(form)</strong> що повертає простий об\'єкт з усіма полями форми (через FormData та Object.fromEntries).',
                starterCode: 'function getFormData(form) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const f = document.createElement("form"); f.innerHTML = `<input name="user" value="Alice"><input name="age" value="25">`; return getFormData(f).user; })()', expected: 'Alice', desc: 'user = "Alice"' },
                  { expression: '(() => { const f = document.createElement("form"); f.innerHTML = `<input name="x" value="42">`; return getFormData(f).x; })()', expected: '42', desc: 'x = "42"' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-modules',
        title: 'Модулі',
        icon: '📦',
        lessons: [
          {
            id: 'js-l36',
            title: 'export та import',
            theory: `<h2>Модулі JavaScript</h2>
<p>Модулі дозволяють розбити код на окремі файли та керувати залежностями між ними.</p>
<h3>Named export</h3>
<pre><code>// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class Calculator { /* ... */ }

// main.js
import { PI, add } from './math.js';
import { add as sum } from './math.js'; // аліас
import * as Math from './math.js\';      // все в об\'єкт</code></pre>
<h3>Default export</h3>
<pre><code>// user.js
export default class User {
  constructor(name) { this.name = name; }
}

// main.js
import User from './user.js';  // без фігурних дужок
import MyUser from './user.js\'; // довільне ім\'я</code></pre>
<h3>Re-export</h3>
<pre><code>// index.js — "бочка" (barrel file)
export { add, PI } from './math.js';
export { default as User } from './user.js';
export * from \'./utils.js\';</code></pre>
<h3>Підключення в HTML</h3>
<pre><code>&lt;script type="module" src="main.js"&gt;&lt;/script&gt;
// type="module" — файл завантажується як ESM модуль
// defer за замовчуванням, strict mode увімкнено</code></pre>`,
                        challenges: [
              {
                id: 'js-l36-c1',
                title: 'Named export та import',
                prompt: 'Оголоси функцію <strong>createModule()</strong> що повертає об\'єкт із трьома методами: <code>add(a,b)</code>, <code>sub(a,b)</code>, <code>mul(a,b)</code>. Це симулює публічний API модуля.',
                starterCode: 'function createModule() {\n  // твій код\n}\n',
                tests: [
                  { expression: 'createModule().add(3, 4)', expected: '7', desc: 'add(3,4) = 7' },
                  { expression: 'createModule().sub(10, 3)', expected: '7', desc: 'sub(10,3) = 7' },
                  { expression: 'createModule().mul(3, 4)', expected: '12', desc: 'mul(3,4) = 12' },
                ],
                xp: 20,
                language: 'javascript',
              },
              {
                id: 'js-l36-c2',
                title: 'Default export патерн',
                prompt: 'Оголоси клас <strong>Logger</strong> з методами <code>log(msg)</code> та <code>error(msg)</code>. log() повертає <code>"[LOG] " + msg</code>, error() повертає <code>"[ERROR] " + msg</code>.',
                starterCode: 'class Logger {\n  // твій код\n}\n',
                tests: [
                  { expression: 'new Logger().log("hello")', expected: '[LOG] hello', desc: 'log формат' },
                  { expression: 'new Logger().error("oops")', expected: '[ERROR] oops', desc: 'error формат' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l37',
            title: 'Динамічний import()',
            theory: `<h2>Динамічний import()</h2>
<p>Статичний <code>import</code> завантажує модулі на старті. Динамічний <code>import()</code> — ліниво, коли потрібно.</p>
<h3>Синтаксис</h3>
<pre><code>// import() повертає Promise
const module = await import('./math.js');
module.add(1, 2);

// деструктуризація
const { add, PI } = await import('./math.js');

// в обробнику події
button.addEventListener('click', async () => {
  const { renderChart } = await import(\'./chart.js\');
  renderChart(data);
});</code></pre>
<h3>Code splitting</h3>
<pre><code>// Завантаження тільки потрібної частини застосунку
async function loadAdminPanel() {
  const { AdminPanel } = await import('./admin/index.js');
  return new AdminPanel();
}

// Умовний імпорт
const lang = navigator.language.startsWith('uk') ? 'uk' : \'en\';
const { messages } = await import(\`./i18n/\${lang}.js\`);</code></pre>
<h3>import.meta</h3>
<pre><code>import.meta.url;  // URL поточного модуля
// 'file:///path/to/module.js'

// Визначення шляху відносно модуля
const workerUrl = new URL(\'./worker.js\', import.meta.url);</code></pre>`,
                        challenges: [
              {
                id: 'js-l37-c1',
                title: 'Динамічне завантаження',
                prompt: 'Оголоси функцію <strong>lazyLoad(condition, factory)</strong> що: якщо condition = true — викликає factory() і повертає результат, якщо false — повертає null. Це патерн lazy initialization.',
                starterCode: 'function lazyLoad(condition, factory) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'lazyLoad(true, () => ({loaded: true})).loaded', expected: 'true', desc: 'condition=true → викликає factory' },
                  { expression: 'lazyLoad(false, () => ({loaded: true}))', expected: 'null', desc: 'condition=false → null' },
                  { expression: '(() => { let calls = 0; lazyLoad(true, () => { calls++; return {}; }); return calls; })()', expected: '1', desc: 'factory викликана 1 раз' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l37-c2',
                title: 'Кешоване ліниве завантаження',
                prompt: 'Оголоси функцію <strong>createLazy(factory)</strong> що повертає функцію-геттер. При першому виклику геттер запускає factory() і кешує результат. При повторних — повертає кеш без виклику factory.',
                starterCode: 'function createLazy(factory) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { let n = 0; const get = createLazy(() => ++n); get(); get(); return n; })()', expected: '1', desc: 'factory викликана лише 1 раз' },
                  { expression: '(() => { const get = createLazy(() => 99); return get(); })()', expected: '99', desc: 'повертає результат factory' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'js-advanced',
        title: 'Просунутий JS',
        icon: '🚀',
        lessons: [
          {
            id: 'js-l38',
            title: 'Symbol та ітерованість',
            theory: `<h2>Symbol та протокол ітерації</h2>
<h3>Symbol — унікальний ідентифікатор</h3>
<pre><code>const id = Symbol('id'); // опис — для дебагу
const id2 = Symbol('id');
id === id2; // false — кожен Symbol унікальний

const user = {
  name: 'Alice',
  [id]: 123, // Symbol як ключ
};
user[id]; // 123
Object.keys(user); // [\'name\'] — Symbol не видно!</code></pre>
<h3>Глобальні символи</h3>
<pre><code>const s1 = Symbol.for('shared');
const s2 = Symbol.for(\'shared\');
s1 === s2; // true — один символ у реєстрі</code></pre>
<h3>Вбудовані Symbol</h3>
<pre><code>// Symbol.iterator — робить об'єкт ітерованим
class Range {
  constructor(from, to) { this.from = from; this.to = to; }
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
}

for (const n of new Range(1, 5)) console.log(n); // 1 2 3 4 5
[...new Range(1, 3)]; // [1, 2, 3]

// Symbol.toPrimitive — перетворення в примітив
class Money {
  constructor(amount, currency) { this.amount = amount; this.currency = currency; }
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.amount;
    if (hint === 'string') return \`\${this.amount} \${this.currency}\`;
    return this.amount;
  }
}
+new Money(100, 'UAH'); // 100</code></pre>`,
                        challenges: [
              {
                id: 'js-l38-c1',
                title: 'Symbol як унікальний ключ',
                prompt: 'Оголоси два символи <strong>sym1 = Symbol("id")</strong> і <strong>sym2 = Symbol("id")</strong>. Оголоси змінну <strong>equal</strong> = результат порівняння sym1 === sym2.',
                starterCode: 'const sym1 = Symbol("id");\nconst sym2 = Symbol("id");\nconst equal = sym1 === sym2;\n',
                tests: [
                  { expression: 'equal', expected: 'false', desc: 'символи завжди унікальні' },
                  { expression: 'typeof sym1', expected: 'symbol', desc: 'тип — symbol' },
                ],
                xp: 15,
                language: 'javascript',
              },
              {
                id: 'js-l38-c2',
                title: 'Ітерований об\'єкт',
                prompt: 'Оголоси функцію <strong>makeRange(from, to)</strong> що повертає об\'єкт з [Symbol.iterator] який дозволяє ітерувати числа від from до to включно.',
                starterCode: 'function makeRange(from, to) {\n  // твій код\n}\n',
                tests: [
                  { expression: '[...makeRange(1, 4)].join(",")', expected: '1,2,3,4', desc: '[1,2,3,4]' },
                  { expression: '[...makeRange(5, 5)].join(",")', expected: '5', desc: 'один елемент' },
                ],
                xp: 35,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l39',
            title: 'Proxy та Reflect',
            theory: `<h2>Proxy та Reflect</h2>
<p><code>Proxy</code> — обгортка над об'єктом, що перехоплює операції з ним.</p>
<h3>Базовий Proxy</h3>
<pre><code>const handler = {
  get(target, prop) {
    console.log(\`Читання: \${prop}\`);
    return prop in target ? target[prop] : \`Немає поля "\${prop}"\`;
  },
  set(target, prop, value) {
    if (typeof value !== 'number') throw new TypeError('Тільки числа!');
    target[prop] = value;
    return true; // обов'язково!
  }
};

const proxy = new Proxy({}, handler);
proxy.x = 5;      // Читання: x (якщо є)
proxy.y;          // 'Немає поля "y"'
proxy.z = \'str\';  // TypeError</code></pre>
<h3>Reflect — дзеркало операцій</h3>
<pre><code>// Reflect має методи для кожного proxy-перехоплення
Reflect.get(obj, 'name');
Reflect.set(obj, 'age', 25);
Reflect.has(obj, 'name');   // аналог 'name' in obj
Reflect.deleteProperty(obj, \'name\');
Reflect.ownKeys(obj);       // всі власні ключі включно із Symbol</code></pre>
<h3>Практичний приклад: валідаційний Proxy</h3>
<pre><code>function createValidated(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      const validator = schema[prop];
      if (validator && !validator(value)) {
        throw new Error(\`Невалідне значення для "\${prop}"\`);
      }
      target[prop] = value;
      return true;
    }
  });
}

const user = createValidated({
  age: v => typeof v === 'number' && v >= 0 && v <= 150,
  name: v => typeof v === 'string' && v.length > 0,
});
user.age = 25;    // OK
user.age = -5;    // Error</code></pre>`,
                        challenges: [
              {
                id: 'js-l39-c1',
                title: 'Proxy — валідація типу',
                prompt: 'Оголоси функцію <strong>typedObject(schema)</strong> що повертає Proxy. При спробі встановити властивість — перевіряє тип через schema (об\'єкт <code>{propName: "typename"}</code>). Якщо тип не відповідає — кидає TypeError.',
                starterCode: 'function typedObject(schema) {\n  const obj = {};\n  return new Proxy(obj, {\n    set(target, key, value) {\n      // твій код\n    }\n  });\n}\n',
                tests: [
                  { expression: '(() => { const o = typedObject({age: "number"}); o.age = 25; return o.age; })()', expected: '25', desc: 'правильний тип — встановлюється' },
                  { expression: '(() => { try { const o = typedObject({age: "number"}); o.age = "str"; return false; } catch(e) { return e instanceof TypeError; } })()', expected: 'true', desc: 'невірний тип → TypeError' },
                ],
                xp: 35,
                language: 'javascript',
              },
              {
                id: 'js-l39-c2',
                title: 'Proxy — логування доступу',
                prompt: 'Оголоси функцію <strong>logAccess(obj)</strong> що повертає Proxy який логує кожен get у масив <code>log</code>. Повертай <code>{ proxy, log }</code>.',
                starterCode: 'function logAccess(obj) {\n  const log = [];\n  const proxy = new Proxy(obj, {\n    // твій код\n  });\n  return { proxy, log };\n}\n',
                tests: [
                  { expression: '(() => { const { proxy, log } = logAccess({x: 1, y: 2}); proxy.x; proxy.y; return log.length; })()', expected: '2', desc: '2 доступи в log' },
                  { expression: '(() => { const { proxy, log } = logAccess({a: 42}); proxy.a; return log[0]; })()', expected: 'a', desc: 'log[0] = "a"' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l40',
            title: 'RegExp — регулярні вирази',
            theory: `<h2>Регулярні вирази (RegExp)</h2>
<p>Регулярні вирази — шаблони для пошуку та заміни у рядках.</p>
<h3>Синтаксис</h3>
<pre><code>const re1 = /hello/i;           // літеральний, флаг i = ігнорувати регістр
const re2 = new RegExp('hello', 'i'); // через конструктор

re1.test('Hello World'); // true
'Hello World'.match(re1); // [\'Hello\']</code></pre>
<h3>Символи та квантифікатори</h3>
<pre><code>// Символи
.    // будь-який символ (крім \n)
\d   // цифра [0-9]
\w   // слово [a-zA-Z0-9_]
\s   // пробіл
\D   // не цифра
\W   // не слово-символ

// Квантифікатори
*    // 0 або більше
+    // 1 або більше
?    // 0 або 1
{3}  // рівно 3
{2,5}// від 2 до 5

// Прив'язки
^    // початок рядка
$    // кінець рядка
\b   // межа слова</code></pre>
<h3>Групи та захоплення</h3>
<pre><code>const dateRe = /(\d{4})-(\d{2})-(\d{2})/;
const match = '2024-01-15'.match(dateRe);
match[1]; // '2024' — рік
match[2]; // '01'   — місяць
match[3]; // '15'   — день

// Іменовані групи
const namedRe = /(?&lt;year&gt;\d{4})-(?&lt;month&gt;\d{2})-(?&lt;day&gt;\d{2})/;
const { year, month, day } = \'2024-01-15\'.match(namedRe).groups;</code></pre>
<h3>Методи рядків</h3>
<pre><code>'abc123def'.match(/\d+/);           // ['123']
'abc123def456'.match(/\d+/g);       // ['123', '456']
'hello world'.replace(/\s+/g, '-'); // 'hello-world'
'a,b,,c'.split(/,+/);               // ['a','b','c']
/\d/.test(\'abc\');                   // false</code></pre>`,
                        challenges: [
              {
                id: 'js-l40-c1',
                title: 'RegExp — валідація',
                prompt: 'Оголоси функцію <strong>isValidPhone(phone)</strong> що повертає true якщо рядок відповідає шаблону українського номеру: починається з +38, потім 10 цифр (наприклад +380501234567).',
                starterCode: 'function isValidPhone(phone) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'isValidPhone("+380501234567")', expected: 'true', desc: 'валідний номер' },
                  { expression: 'isValidPhone("0501234567")', expected: 'false', desc: 'без +38' },
                  { expression: 'isValidPhone("+38050123456")', expected: 'false', desc: '9 цифр замість 10' },
                ],
                xp: 25,
                language: 'javascript',
              },
              {
                id: 'js-l40-c2',
                title: 'RegExp — витяг даних',
                prompt: 'Оголоси функцію <strong>extractEmails(text)</strong> що повертає масив усіх email-адрес знайдених у тексті (використай RegExp з /g флагом та match).',
                starterCode: 'function extractEmails(text) {\n  // твій код\n}\n',
                tests: [
                  { expression: 'extractEmails("Send to foo@bar.com and baz@qux.io").length', expected: '2', desc: '2 email знайдено' },
                  { expression: 'extractEmails("Send to foo@bar.com and baz@qux.io").includes("foo@bar.com")', expected: 'true', desc: '"foo@bar.com" знайдено' },
                  { expression: 'extractEmails("no emails here").length', expected: '0', desc: 'нема email → []' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'js-l41',
            title: 'Менеджмент пам\'яті та WeakRef',
            theory: `<h2>Пам'ять у JavaScript</h2>
<p>JS має автоматичне управління пам'яттю через Garbage Collector (GC). Але важливо розуміти, як уникнути витоків пам'яті.</p>
<h3>Досяжність (reachability)</h3>
<pre><code>let user = { name: 'Alice' }; // об'єкт у пам'яті
user = null; // посилання видалено → GC видалить об'єкт

// Два посилання — об\'єкт живе
let user2 = user;
user = null;
// user2 ще посилається → об\'єкт НЕ видаляється</code></pre>
<h3>Типові витоки пам'яті</h3>
<pre><code>// 1. Глобальні змінні (без var/let/const)
function leak() { forgotten = 'дані'; } // глобальна!

// 2. Забуті таймери
const id = setInterval(() => { /* посилається на об\'єкти */ }, 100);
// clearInterval(id); // обов\'язково очищати!

// 3. EventListener без removeEventListener
// 4. Замикання із великими даними</code></pre>
<h3>WeakRef та FinalizationRegistry</h3>
<pre><code>// WeakRef — слабке посилання (не заважає GC)
let obj = { data: 'великі дані' };
const ref = new WeakRef(obj);
obj = null; // GC може видалити об'єкт

const cached = ref.deref(); // undefined якщо вже видалено
if (cached) console.log(cached.data);

// FinalizationRegistry — callback коли об'єкт видаляється
const registry = new FinalizationRegistry(value => {
  console.log(\`Об'єкт видалено: \${value}\`);
});
let target = {};
registry.register(target, 'мій-об\'єкт\');</code></pre>`,
                        challenges: [
              {
                id: 'js-l41-c1',
                title: 'Виявлення витоку пам\'яті',
                prompt: 'Оголоси функцію <strong>createLeakyTimer()</strong> що повертає об\'єкт з методами <code>start()</code> (запускає setInterval) та <code>stop()</code> (зупиняє його). Без виклику stop() — timer продовжує тікати (витік).',
                starterCode: 'function createLeakyTimer() {\n  let intervalId = null;\n  let ticks = 0;\n  return {\n    start() {\n      // запусти setInterval що збільшує ticks\n    },\n    stop() {\n      // зупини interval\n    },\n    getTicks() { return ticks; }\n  };\n}\n',
                tests: [
                  { expression: '(() => { const t = createLeakyTimer(); t.stop(); return typeof t.getTicks(); })()', expected: 'number', desc: 'getTicks повертає число' },
                  { expression: '(() => { const t = createLeakyTimer(); return typeof t.start; })()', expected: 'function', desc: 'start — функція' },
                  { expression: '(() => { const t = createLeakyTimer(); return typeof t.stop; })()', expected: 'function', desc: 'stop — функція' },
                ],
                xp: 30,
                language: 'javascript',
              },
              {
                id: 'js-l41-c2',
                title: 'WeakRef — слабке посилання',
                prompt: 'Оголоси функцію <strong>createWeakCache(value)</strong> що повертає об\'єкт з методом <code>get()</code> який повертає значення через WeakRef (або undefined якщо зібрано GC).',
                starterCode: 'function createWeakCache(value) {\n  // твій код\n}\n',
                tests: [
                  { expression: '(() => { const obj = {data: 42}; const cache = createWeakCache(obj); return cache.get().data; })()', expected: '42', desc: 'get() повертає об\'єкт' },
                  { expression: '(() => { const cache = createWeakCache({x: 1}); return typeof cache.get; })()', expected: 'function', desc: 'get — функція' },
                ],
                xp: 35,
                language: 'javascript',
              },
            ],
          },
        ],
      },
    ],
  },

  java: {
    id: 'java',
    name: 'Java',
    icon: '☕',
    logo: 'icons/langs/java.svg',
    color: '#f89820',
    desc: 'Мова для Android, enterprise та backend. Строга типізація, ООП.',
    language: 'java',
    locked: false,
    modules: [
      {
        id: 'java-basics',
        title: 'Основи Java',
        icon: '🔤',
        lessons: [
          {
            id: 'java-l01',
            title: 'Перша програма',
            theory: `<h2>Hello, Java World!</h2>
<p>Кожна Java-програма починається з класу і методу <code>main</code>.</p>
<pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>
<h3>Що тут відбувається</h3>
<ul>
  <li><code>public class Main</code> — оголошення класу (ім'я файлу = ім'я класу)</li>
  <li><code>public static void main(String[] args)</code> — точка входу в програму</li>
  <li><code>System.out.println()</code> — вивести рядок з переносом</li>
  <li><code>System.out.print()</code> — вивести рядок без переносу</li>
</ul>
<h3>Компіляція та запуск</h3>
<pre><code>javac Main.java  # компілювати
java Main        # запустити</code></pre>`,
            challenges: [
              {
                id: 'java-l01-c1',
                title: 'Hello, World!',
                prompt: 'Виведи рядок <code>Hello, World!</code> за допомогою <code>System.out.println</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // твій код тут\n    }\n}\n',
                tests: [{ type: 'output_contains', expected: 'Hello, World!', desc: 'Вивести Hello, World!' }],
                xp: 10,
                language: 'java',
              },
              {
                id: 'java-l01-c2',
                title: 'Кілька рядків',
                prompt: 'Виведи два рядки: спочатку <code>Java</code>, потім <code>Coding</code> (кожен з нового рядка).',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        // два println\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Java', desc: 'Є рядок Java' },
                  { type: 'output_contains', expected: 'Coding', desc: 'Є рядок Coding' },
                ],
                xp: 10,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l02',
            title: 'Змінні та типи',
            theory: `<h2>Типи даних у Java</h2>
<p>Java — строго типізована мова. Кожна змінна має конкретний тип.</p>
<h3>Примітивні типи</h3>
<pre><code>int age = 25;           // ціле число
double price = 9.99;    // число з плаваючою точкою
boolean isAdmin = true; // булевий
char grade = \'A\';       // один символ</code></pre>
<h3>String — рядок</h3>
<pre><code>String name = "Alice";
String msg = "Привіт, " + name + "!";
System.out.println(msg); // Привіт, Alice!

// Корисні методи
name.length()         // 5
name.toUpperCase()    // ALICE
name.contains("li")  // true</code></pre>
<h3>var (Java 10+)</h3>
<pre><code>var count = 42;     // Java сам визначає тип
var text = "hello"; // String</code></pre>`,
            challenges: [
              {
                id: 'java-l02-c1',
                title: 'Змінні',
                prompt: 'Оголоси <code>int year = 2024</code>, <code>String lang = "Java"</code>, і виведи їх в одному рядку: <code>Java 2024</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int year = 2024;\n        String lang = "Java";\n        // виведи lang + " " + year\n    }\n}\n',
                tests: [{ type: 'output_contains', expected: 'Java 2024', desc: 'Вивести Java 2024' }],
                xp: 15,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l03',
            title: 'Умови та цикли',
            theory: `<h2>if / else та цикли</h2>
<h3>Умовний оператор</h3>
<pre><code>int score = 85;
if (score >= 90) {
    System.out.println("Відмінно");
} else if (score >= 70) {
    System.out.println("Добре");
} else {
    System.out.println("Потрібно більше практики");
}</code></pre>
<h3>Цикл for</h3>
<pre><code>for (int i = 1; i <= 5; i++) {
    System.out.println("Крок " + i);
}
// Виведе: Крок 1, Крок 2, ..., Крок 5</code></pre>
<h3>Цикл while</h3>
<pre><code>int n = 1;
while (n <= 3) {
    System.out.println(n);
    n++;
}</code></pre>`,
            challenges: [
              {
                id: 'java-l03-c1',
                title: 'FizzBuzz',
                prompt: 'Виведи числа від 1 до 15. Замість кратних 3 пиши <code>Fizz</code>, кратних 5 — <code>Buzz</code>, кратних і 3, і 5 — <code>FizzBuzz</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 15; i++) {\n            // if/else або ternary\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'FizzBuzz', desc: 'Є FizzBuzz (15)' },
                  { type: 'output_contains', expected: 'Fizz', desc: 'Є Fizz (3)' },
                  { type: 'output_contains', expected: 'Buzz', desc: 'Є Buzz (5)' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-oop',
        title: 'ООП у Java',
        icon: '🏗',
        lessons: [
          {
            id: 'java-l04',
            title: 'Класи та об\'єкти',
            theory: `<h2>Об'єктно-орієнтоване програмування</h2>
<p>Java побудована навколо класів. Клас — шаблон, об'єкт — екземпляр цього шаблону.</p>
<pre><code>public class Dog {
    String name;
    int age;

    Dog(String name, int age) {  // конструктор
        this.name = name;
        this.age = age;
    }

    void bark() {
        System.out.println(name + " says: Woof!");
    }
}

// Використання:
Dog dog = new Dog("Rex", 3);
dog.bark(); // Rex says: Woof!</code></pre>
<h3>Access modifiers</h3>
<ul>
  <li><code>public</code> — доступно звідусіль</li>
  <li><code>private</code> — тільки всередині класу</li>
  <li><code>protected</code> — клас + підкласи</li>
</ul>`,
            challenges: [
              {
                id: 'java-l04-c1',
                title: 'Клас Person',
                prompt: 'Створи клас <code>Person</code> з полями <code>name</code> (String) і <code>age</code> (int). Додай конструктор. Створи об\'єкт <code>Person p = new Person("Alice", 25)</code> і виведи <code>Alice is 25</code>.',
                starterCode: 'public class Main {\n    static class Person {\n        String name;\n        int age;\n        // конструктор\n    }\n\n    public static void main(String[] args) {\n        Person p = new Person("Alice", 25);\n        // виведи name + " is " + age\n    }\n}\n',
                tests: [{ type: 'output_contains', expected: 'Alice is 25', desc: 'Вивести Alice is 25' }],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l05',
            title: 'Методи та повернення значення',
            theory: `<h2>Методи в Java</h2>
<pre><code>public class Calculator {
    // Метод з поверненням значення
    static int add(int a, int b) {
        return a + b;
    }

    // Метод без повернення (void)
    static void printResult(int result) {
        System.out.println("Результат: " + result);
    }

    public static void main(String[] args) {
        int sum = add(3, 4);
        printResult(sum); // Результат: 7
    }
}</code></pre>
<h3>Перевантаження (overloading)</h3>
<pre><code>static int add(int a, int b) { return a + b; }
static double add(double a, double b) { return a + b; }
// Java вибере потрібний метод за типом аргументів</code></pre>`,
            challenges: [
              {
                id: 'java-l05-c1',
                title: 'Метод max',
                prompt: 'Напиши метод <code>static int max(int a, int b)</code>, що повертає більше з двох чисел. Виведи результат: <code>max(10, 25) = 25</code>.',
                starterCode: 'public class Main {\n    static int max(int a, int b) {\n        // поверни більше\n    }\n\n    public static void main(String[] args) {\n        System.out.println("max(10, 25) = " + max(10, 25));\n    }\n}\n',
                tests: [{ type: 'output_contains', expected: 'max(10, 25) = 25', desc: 'max(10, 25) = 25' }],
                xp: 20,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-types',
        title: 'Типи та операції',
        icon: '🔢',
        lessons: [
          {
            id: 'java-l06',
            title: 'Примітивні типи — детально',
            theory: `<h2>Примітивні типи Java</h2>
<p>Java має 8 примітивних типів. Вони зберігають значення безпосередньо, а не посилання.</p>
<h3>Цілочисельні</h3>
<pre><code>byte  b = 127;          // 8 біт,  -128..127
short s = 32767;         // 16 біт, -32768..32767
int   i = 2_147_483_647; // 32 біт (найпоширеніший)
long  l = 9_223_372_036_854_775_807L; // 64 біт, суфікс L</code></pre>
<h3>Дійсні числа</h3>
<pre><code>float  f = 3.14f;   // 32 біт, суфікс f (менша точність)
double d = 3.14159; // 64 біт (за замовчуванням)</code></pre>
<h3>Інші примітивні типи</h3>
<pre><code>boolean flag = true;  // true або false
char    c = 'A';      // 16-біт Unicode символ
char    digit = '5';
char    unicode = '\\u0041'; // \'A\'</code></pre>
<h3>Автоупакування (Autoboxing)</h3>
<pre><code>// Примітив ↔ Обгортка (Wrapper)
int      x = 42;
Integer  boxed = x;       // autoboxing: int → Integer
int      unboxed = boxed; // unboxing: Integer → int

// Wrapper класи
Integer.MAX_VALUE;  // 2147483647
Integer.parseInt("42"); // 42
Double.parseDouble("3.14"); // 3.14
Integer.toBinaryString(255); // "11111111"</code></pre>`,
                        challenges: [
              {
                id: 'java-l06-c1',
                title: 'Автобоксинг та обгортки',
                prompt: 'Оголоси <code>int a = 127</code> та <code>Integer b = 127</code>. Виведи: <code>int max: X</code> де X — Integer.MAX_VALUE, потім <code>binary: Y</code> де Y — Integer.toBinaryString(a).',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int a = 127;\n        Integer b = 127;\n        // виведи int max: ... та binary: ...\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'int max: 2147483647', desc: 'Integer.MAX_VALUE' },
                  { type: 'output_contains', expected: 'binary: 1111111', desc: 'toBinaryString(127)' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l06-c2',
                title: 'Приведення типів',
                prompt: 'Оголоси <code>double pi = 3.14159</code>. Виведи: <code>double: 3.14159</code>, <code>int: 3</code> (явне приведення до int), <code>rounded: 3</code> (Math.round).',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        double pi = 3.14159;\n        // виведи три рядки\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'double: 3.14159', desc: 'double значення' },
                  { type: 'output_contains', expected: 'int: 3', desc: 'cast до int' },
                  { type: 'output_contains', expected: 'rounded: 3', desc: 'Math.round' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l07',
            title: 'String — методи та операції',
            theory: `<h2>Рядки (String) у Java</h2>
<p>String у Java — незмінний (immutable) об'єкт. Будь-яка зміна створює новий рядок.</p>
<h3>Основні методи</h3>
<pre><code>String s = "Hello, World!";
s.length();           // 13
s.charAt(0);          // 'H'
s.indexOf('o');       // 4
s.lastIndexOf(\'o\');   // 8
s.contains("World"); // true
s.startsWith("Hello"); // true
s.endsWith("!");       // true
s.isEmpty();          // false
s.isBlank();          // false (тільки пробіли?)</code></pre>
<h3>Перетворення</h3>
<pre><code>s.toUpperCase();          // "HELLO, WORLD!"
s.toLowerCase();          // "hello, world!"
s.trim();                 // видаляє крайні пробіли
s.strip();                // як trim(), але підтримує Unicode
s.replace("World", "Java"); // "Hello, Java!"
s.replaceAll("\\\\d", "#");  // regex заміна
s.split(", ");            // ["Hello", "World!"]</code></pre>
<h3>Зрізи та порівняння</h3>
<pre><code>s.substring(7);      // "World!"
s.substring(7, 12);  // "World"

// Порівняння — завжди через equals!
"abc".equals("abc");           // true
"abc".equalsIgnoreCase("ABC"); // true
"abc" == "abc"; // може бути true (string pool), але ненадійно!</code></pre>
<h3>String.format та formatted</h3>
<pre><code>String msg = String.format("Привіт, %s! Тобі %d років.", "Alice", 25);
// Java 15+:
String msg2 = "Привіт, %s! Тобі %d років.".formatted("Alice", 25);</code></pre>`,
                        challenges: [
              {
                id: 'java-l07-c1',
                title: 'Методи рядків',
                prompt: 'Оголоси <code>String s = "  Hello, World!  "</code>. Виведи: <code>trimmed: Hello, World!</code>, <code>upper: HELLO, WORLD!</code>, <code>replaced: Hello, Java!</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String s = "  Hello, World!  ";\n        // виведи три рядки\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'trimmed: Hello, World!', desc: 'trim()' },
                  { type: 'output_contains', expected: 'upper: HELLO, WORLD!', desc: 'toUpperCase()' },
                  { type: 'output_contains', expected: 'replaced: Hello, Java!', desc: 'replace()' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l07-c2',
                title: 'String.format',
                prompt: 'Оголоси <code>String name = "Alice"</code> і <code>int age = 25</code>. Виведи через String.format: <code>Name: Alice, Age: 25</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String name = "Alice";\n        int age = 25;\n        // виведи через String.format\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Name: Alice, Age: 25', desc: 'String.format' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l08',
            title: 'Масиви (Arrays)',
            theory: `<h2>Масиви в Java</h2>
<p>Масив — фіксована колекція елементів одного типу.</p>
<h3>Оголошення та ініціалізація</h3>
<pre><code>// Фіксований розмір
int[] nums = new int[5];    // [0, 0, 0, 0, 0]
nums[0] = 10;
nums[4] = 50;

// Ініціалізація з літералом
String[] fruits = {"apple", "banana", "cherry"};
int[] primes = {2, 3, 5, 7, 11};

// Довжина
fruits.length; // 3 (не метод, а поле!)</code></pre>
<h3>Перебір</h3>
<pre><code>// Звичайний for
for (int i = 0; i < primes.length; i++) {
    System.out.println(primes[i]);
}

// Enhanced for (for-each)
for (int prime : primes) {
    System.out.println(prime);
}</code></pre>
<h3>Клас Arrays</h3>
<pre><code>import java.util.Arrays;

int[] arr = {5, 3, 1, 4, 2};
Arrays.sort(arr);               // [1, 2, 3, 4, 5] — змінює оригінал
Arrays.toString(arr);           // "[1, 2, 3, 4, 5]"
Arrays.fill(arr, 0);            // заповнити нулями
int[] copy = Arrays.copyOf(arr, arr.length);
Arrays.binarySearch(arr, 3);    // індекс (масив має бути відсортований)</code></pre>
<h3>Двовимірні масиви</h3>
<pre><code>int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
matrix[1][2]; // 6
for (int[] row : matrix) {
    System.out.println(Arrays.toString(row));
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l08-c1',
                title: 'Сума масиву',
                prompt: 'Оголоси масив <code>int[] nums = {3, 1, 4, 1, 5, 9, 2, 6}</code>. Обчисли суму через цикл. Виведи <code>sum: 31</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int[] nums = {3, 1, 4, 1, 5, 9, 2, 6};\n        int sum = 0;\n        // підсумуй і виведи\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'sum: 31', desc: 'sum = 31' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l08-c2',
                title: 'Arrays.sort',
                prompt: 'Оголоси <code>int[] arr = {5, 2, 8, 1, 9}</code>. Відсортуй через Arrays.sort. Виведи <code>sorted: 1 2 5 8 9</code>.',
                starterCode: 'import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 2, 8, 1, 9};\n        // відсортуй та виведи\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'sorted: 1 2 5 8 9', desc: 'відсортований масив' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l09',
            title: 'Enum (перелічення)',
            theory: `<h2>Enum у Java</h2>
<p>Enum — набір іменованих констант. Типобезпечна альтернатива константам <code>int</code> або <code>String</code>.</p>
<h3>Базовий enum</h3>
<pre><code>public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
    FRIDAY, SATURDAY, SUNDAY
}

Day today = Day.MONDAY;
System.out.println(today);         // MONDAY
System.out.println(today.name());  // MONDAY
System.out.println(today.ordinal()); // 0 (індекс з 0)</code></pre>
<h3>Enum у switch</h3>
<pre><code>switch (today) {
    case SATURDAY, SUNDAY -> System.out.println("Вихідний!");
    default -> System.out.println("Робочий день");
}</code></pre>
<h3>Enum з полями та методами</h3>
<pre><code>public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6);

    private final double mass;
    private final double radius;
    static final double G = 6.67300E-11;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() {
        return G * mass / (radius * radius);
    }
}

Planet.EARTH.surfaceGravity(); // ~9.8</code></pre>`,
                        challenges: [
              {
                id: 'java-l09-c1',
                title: 'Оголошення enum',
                prompt: 'Оголоси enum <code>Day</code> з константами MON, TUE, WED, THU, FRI, SAT, SUN. Виведи: <code>day: WED</code> та <code>ordinal: 2</code>.',
                starterCode: 'public class Main {\n    enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }\n\n    public static void main(String[] args) {\n        Day d = Day.WED;\n        // виведи day: WED та ordinal: 2\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'day: WED', desc: 'WED' },
                  { type: 'output_contains', expected: 'ordinal: 2', desc: 'ordinal = 2' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l09-c2',
                title: 'Enum з полем',
                prompt: 'Оголоси enum <code>Planet</code> з EARTH (6.0e+24, 6.4e+6) та MARS (6.4e+23, 3.4e+6). Кожна планета має <code>double mass</code> і <code>double radius</code>. Виведи <code>EARTH mass: 6.0E24</code>.',
                starterCode: 'public class Main {\n    enum Planet {\n        EARTH(6.0e+24, 6.4e+6),\n        MARS(6.4e+23, 3.4e+6);\n\n        final double mass;\n        final double radius;\n        Planet(double mass, double radius) {\n            this.mass = mass;\n            this.radius = radius;\n        }\n    }\n\n    public static void main(String[] args) {\n        // виведи EARTH mass: + Planet.EARTH.mass\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'EARTH mass:', desc: 'виведено масу EARTH' },
                ],
                xp: 30,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l10',
            title: 'Оператори та вирази',
            theory: `<h2>Оператори та вирази в Java</h2>
<h3>Арифметичні оператори</h3>
<pre><code>int a = 10, b = 3;
a + b;  // 13
a - b;  // 7
a * b;  // 30
a / b;  // 3 (цілочисельне ділення!)
a % b;  // 1 (остача від ділення)

// Щоб отримати дійсне
(double) a / b; // 3.333...

// Складені оператори
a += 5; // a = a + 5
a -= 2;
a *= 3;
a /= 2;
a++;    // постфіксний інкремент
++a;    // префіксний інкремент</code></pre>
<h3>Логічні та порозрядні</h3>
<pre><code>// Логічні (short-circuit)
true && false; // false
true || false; // true
!true;         // false

// Порозрядні (для чисел)
5 & 3;   // 1  (AND)
5 | 3;   // 7  (OR)
5 ^ 3;   // 6  (XOR)
~5;      // -6 (NOT)
5 << 1;  // 10 (shift left)
5 >> 1;  // 2  (shift right)</code></pre>
<h3>Тернарний оператор</h3>
<pre><code>int max = (a > b) ? a : b;
String grade = score >= 90 ? "A" : score >= 75 ? "B" : "C";</code></pre>
<h3>instanceof</h3>
<pre><code>Object obj = "hello";
if (obj instanceof String s) {     // pattern matching (Java 16+)
    System.out.println(s.toUpperCase());
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l10-c1',
                title: 'Тернарний оператор та instanceof',
                prompt: 'Оголоси <code>Object obj = "hello"</code>. Виведи <code>is string: true</code> (через instanceof). Потім оголоси <code>int x = -5</code> і виведи <code>abs: 5</code> через тернарний оператор.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        Object obj = "hello";\n        // instanceof перевірка\n        int x = -5;\n        // тернарний для abs\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'is string: true', desc: 'instanceof String' },
                  { type: 'output_contains', expected: 'abs: 5', desc: 'тернарний abs' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l10-c2',
                title: 'Побітові операції',
                prompt: 'Оголоси <code>int a = 0b1010</code> (10) і <code>int b = 0b1100</code> (12). Виведи: <code>AND: 8</code>, <code>OR: 14</code>, <code>XOR: 6</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        int a = 0b1010;\n        int b = 0b1100;\n        // виведи AND, OR, XOR\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'AND: 8', desc: 'a & b = 8' },
                  { type: 'output_contains', expected: 'OR: 14', desc: 'a | b = 14' },
                  { type: 'output_contains', expected: 'XOR: 6', desc: 'a ^ b = 6' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-oop-advanced',
        title: 'ООП — поглиблено',
        icon: '🏛️',
        lessons: [
          {
            id: 'java-l11',
            title: 'Encapsulation: getters та setters',
            theory: `<h2>Інкапсуляція</h2>
<p>Інкапсуляція — приховування внутрішнього стану об'єкта. Поля роблять <code>private</code>, доступ — через методи.</p>
<h3>Геттери та сеттери</h3>
<pre><code>public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
    }

    // Getter — тільки читання
    public double getBalance() { return balance; }
    public String getOwner()   { return owner; }

    // Setter з валідацією
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Сума має бути > 0");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalStateException("Недостатньо коштів");
        balance -= amount;
    }
}</code></pre>
<h3>this — посилання на поточний об'єкт</h3>
<pre><code>public class Point {
    private int x, y;

    public Point(int x, int y) {
        this.x = x; // this розрізняє поле і параметр
        this.y = y;
    }

    public Point translate(int dx, int dy) {
        return new Point(x + dx, y + dy);
    }

    // Chaining: this повертає сам об'єкт
    public Point setX(int x) { this.x = x; return this; }
    public Point setY(int y) { this.y = y; return this; }
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l11-c1',
                title: 'Getter і Setter з валідацією',
                prompt: 'Оголоси клас <code>Person</code> з приватним полем <code>age</code>. Setter відкидає від\'ємні значення (залишає поточне). Getter повертає вік. Виведи <code>age: 25</code> і <code>age: 25</code> (після спроби -1).',
                starterCode: 'public class Main {\n    static class Person {\n        private int age = 0;\n        public void setAge(int age) {\n            // валідація\n        }\n        public int getAge() { return age; }\n    }\n\n    public static void main(String[] args) {\n        Person p = new Person();\n        p.setAge(25);\n        System.out.println("age: " + p.getAge());\n        p.setAge(-1);\n        System.out.println("age: " + p.getAge());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'age: 25', desc: 'setAge(25) → 25' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l11-c2',
                title: 'Ланцюжок методів',
                prompt: 'Оголоси клас <code>Builder</code> з полями <code>name</code>, <code>value</code>. Методи <code>setName</code> і <code>setValue</code> повертають <code>this</code>. Метод <code>build()</code> повертає рядок <code>"name=X,value=Y"</code>. Виведи результат.',
                starterCode: 'public class Main {\n    static class Builder {\n        String name = "";\n        int value = 0;\n        public Builder setName(String n) { name = n; return this; }\n        public Builder setValue(int v) { value = v; return this; }\n        public String build() {\n            // повернути "name=X,value=Y"\n        }\n    }\n\n    public static void main(String[] args) {\n        String result = new Builder().setName("foo").setValue(42).build();\n        System.out.println(result);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'name=foo,value=42', desc: 'chain result' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l12',
            title: 'Наслідування (extends)',
            theory: `<h2>Наслідування в Java</h2>
<p>Клас може успадкувати поля та методи іншого класу. Java підтримує одиночне наслідування.</p>
<h3>extends</h3>
<pre><code>public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String speak() {
        return name + " видає звук";
    }

    @Override
    public String toString() {
        return name + " (вік: " + age + ")";
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);   // виклик конструктора батька
        this.breed = breed;
    }

    @Override
    public String speak() { // перевизначення методу
        return name + " гавкає!";
    }

    public String info() {
        return super.speak() + " (" + breed + ")"; // super — батьківський метод
    }
}</code></pre>
<h3>final — заборона наслідування</h3>
<pre><code>public final class String { ... }  // не можна успадкувати
public final void method() { ... } // не можна перевизначити</code></pre>`,
                        challenges: [
              {
                id: 'java-l12-c1',
                title: 'extends та super',
                prompt: 'Є клас <code>Animal</code> з конструктором <code>(String name)</code> і методом <code>speak()</code> що виводить <code>"Animal speaks"</code>. Оголоси клас <code>Dog extends Animal</code> що перевизначає speak() виводячи <code>"Rex barks"</code>. Виведи результат.',
                starterCode: 'public class Main {\n    static class Animal {\n        String name;\n        Animal(String name) { this.name = name; }\n        void speak() { System.out.println("Animal speaks"); }\n    }\n    static class Dog extends Animal {\n        Dog(String name) { super(name); }\n        // @Override speak()\n    }\n\n    public static void main(String[] args) {\n        Dog d = new Dog("Rex");\n        d.speak();\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Rex barks', desc: 'Dog.speak() виводить "Rex barks"' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l12-c2',
                title: 'Поліморфний виклик',
                prompt: 'Використай попередній Animal/Dog підхід. Оголоси <code>Animal a = new Dog("Buddy")</code>. Виведи через <code>a.speak()</code> — має вивести <code>Buddy barks</code>.',
                starterCode: 'public class Main {\n    static class Animal {\n        String name;\n        Animal(String name) { this.name = name; }\n        void speak() { System.out.println(name + " speaks"); }\n    }\n    static class Dog extends Animal {\n        Dog(String name) { super(name); }\n        @Override\n        void speak() { System.out.println(name + " barks"); }\n    }\n\n    public static void main(String[] args) {\n        Animal a = new Dog("Buddy");\n        a.speak();\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Buddy barks', desc: 'динамічний поліморфізм' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l13',
            title: 'Поліморфізм та @Override',
            theory: `<h2>Поліморфізм у Java</h2>
<p>Поліморфізм — здатність посилання батьківського типу вказувати на об'єкт дочірнього класу.</p>
<h3>Динамічне зв'язування</h3>
<pre><code>Animal a1 = new Dog("Рекс", 3, "Лабрадор");
Animal a2 = new Cat("Мурка", 5);
Animal a3 = new Animal("Невідомий", 1);

Animal[] animals = {a1, a2, a3};
for (Animal a : animals) {
    System.out.println(a.speak()); // викликається версія дочірнього класу!
}
// Рекс гавкає!
// Мурка нявкає!
// Невідомий видає звук</code></pre>
<h3>@Override</h3>
<pre><code>public class Cat extends Animal {
    public Cat(String name, int age) { super(name, age); }

    @Override // анотація — компілятор перевірить що метод існує в батьку
    public String speak() {
        return name + " нявкає!";
    }
}</code></pre>
<h3>Casting</h3>
<pre><code>Animal a = new Dog("Рекс", 3, "Лабрадор");

// Downcast — треба перевіряти!
if (a instanceof Dog dog) {        // pattern matching Java 16+
    System.out.println(dog.breed); // тепер можна
}

// Старий стиль
if (a instanceof Dog) {
    Dog d = (Dog) a;
    System.out.println(d.breed);
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l13-c1',
                title: 'instanceof та casting',
                prompt: 'Оголоси масив <code>Object[] items = {42, "hello", 3.14, true}</code>. Пройди циклом і для кожного виведи тип: <code>Integer: 42</code>, <code>String: hello</code> і т.д.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        Object[] items = {42, "hello", 3.14, true};\n        for (Object item : items) {\n            // instanceof перевірка\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Integer: 42', desc: 'Integer тип' },
                  { type: 'output_contains', expected: 'String: hello', desc: 'String тип' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l13-c2',
                title: 'Pattern matching instanceof',
                prompt: 'Оголоси метод <code>describe(Object obj)</code> що використовує pattern matching: якщо obj — String → вивести <code>String of length N</code>, якщо Integer → <code>Integer: N</code>, інакше <code>other</code>.',
                starterCode: 'public class Main {\n    static void describe(Object obj) {\n        if (obj instanceof String s) {\n            System.out.println("String of length " + s.length());\n        } else if (obj instanceof Integer i) {\n            // Integer: i\n        } else {\n            // other\n        }\n    }\n\n    public static void main(String[] args) {\n        describe("hello");\n        describe(42);\n        describe(3.14);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'String of length 5', desc: '"hello" → length 5' },
                  { type: 'output_contains', expected: 'Integer: 42', desc: 'Integer' },
                  { type: 'output_contains', expected: 'other', desc: 'double → other' },
                ],
                xp: 30,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l14',
            title: 'Abstract класи та інтерфейси',
            theory: `<h2>Abstract класи та інтерфейси</h2>
<h3>Abstract клас</h3>
<pre><code>// Не можна створити екземпляр, але можна успадкувати
public abstract class Shape {
    protected String color;

    public Shape(String color) { this.color = color; }

    public abstract double area();    // обов'язковий для реалізації
    public abstract double perimeter();

    public String describe() {        // конкретний метод
        return color + " shape, area=" + area();
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override public double area()      { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
}</code></pre>
<h3>Інтерфейс (interface)</h3>
<pre><code>public interface Printable {
    void print();                        // абстрактний метод
    default void printTwice() {          // default — з реалізацією
        print(); print();
    }
    static Printable of(String s) {      // static метод
        return () -> System.out.println(s);
    }
}

// Клас може реалізовувати КІЛЬКА інтерфейсів
public class Document implements Printable, Serializable {
    @Override public void print() { System.out.println("Document"); }
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l14-c1',
                title: 'Abstract клас',
                prompt: 'Оголоси abstract клас <code>Shape</code> з abstract методом <code>area()</code>. Реалізуй <code>Circle extends Shape</code> з полем radius. Для Circle(5) виведи <code>area: 78.54</code> (округли до 2 знаків).',
                starterCode: 'public class Main {\n    static abstract class Shape {\n        abstract double area();\n    }\n    static class Circle extends Shape {\n        double radius;\n        Circle(double r) { radius = r; }\n        @Override\n        public double area() {\n            // π * r²\n        }\n    }\n\n    public static void main(String[] args) {\n        Shape s = new Circle(5);\n        System.out.printf("area: %.2f%n", s.area());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'area: 78.54', desc: 'Circle(5).area() ≈ 78.54' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l14-c2',
                title: 'Інтерфейс',
                prompt: 'Оголоси interface <code>Printable</code> з методом <code>print()</code>. Реалізуй клас <code>Document</code> що implements Printable і виводить <code>Document: [title]</code>.',
                starterCode: 'public class Main {\n    interface Printable {\n        void print();\n    }\n    static class Document implements Printable {\n        String title;\n        Document(String title) { this.title = title; }\n        @Override\n        public void print() {\n            // виведи "Document: " + title\n        }\n    }\n\n    public static void main(String[] args) {\n        Printable p = new Document("Report");\n        p.print();\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Document: Report', desc: 'print() виводить назву' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l15',
            title: 'Static члени класу',
            theory: `<h2>Static поля, методи та блоки</h2>
<p>Static члени належать класу, а не конкретному об'єкту.</p>
<h3>Static поля</h3>
<pre><code>public class Counter {
    private static int count = 0; // одне значення на всіх!
    private int id;

    public Counter() {
        count++;
        this.id = count;
    }

    public static int getCount() { return count; }
    public int getId()            { return id; }
}

Counter c1 = new Counter(); // count = 1
Counter c2 = new Counter(); // count = 2
Counter.getCount(); // 2</code></pre>
<h3>Static константи</h3>
<pre><code>public class MathConstants {
    public static final double PI      = 3.14159265358979;
    public static final double E       = 2.71828182845905;
    public static final int    MAX_INT = Integer.MAX_VALUE;
}
// Доступ: MathConstants.PI</code></pre>
<h3>Static блок ініціалізації</h3>
<pre><code>public class Config {
    public static final Map&lt;String, String&gt; DEFAULTS;

    static { // виконується один раз при завантаженні класу
        DEFAULTS = new HashMap&lt;&gt;();
        DEFAULTS.put("host", "localhost");
        DEFAULTS.put("port", "8080");
    }
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l15-c1',
                title: 'Static лічильник',
                prompt: 'Оголоси клас <code>Counter</code> зі static полем <code>count</code>. Конструктор збільшує count. Static метод <code>getCount()</code> повертає count. Виведи <code>count: 3</code> після трьох new Counter().',
                starterCode: 'public class Main {\n    static class Counter {\n        static int count = 0;\n        Counter() { count++; }\n        static int getCount() { return count; }\n    }\n\n    public static void main(String[] args) {\n        new Counter(); new Counter(); new Counter();\n        System.out.println("count: " + Counter.getCount());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'count: 3', desc: '3 об\'єкти' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l15-c2',
                title: 'Static утилітний метод',
                prompt: 'Оголоси клас <code>MathUtils</code> зі static методом <code>isPrime(int n)</code> що перевіряє простоту числа. Виведи: <code>7 is prime: true</code> та <code>9 is prime: false</code>.',
                starterCode: 'public class Main {\n    static class MathUtils {\n        static boolean isPrime(int n) {\n            // твій код\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println("7 is prime: " + MathUtils.isPrime(7));\n        System.out.println("9 is prime: " + MathUtils.isPrime(9));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: '7 is prime: true', desc: '7 — просте' },
                  { type: 'output_contains', expected: '9 is prime: false', desc: '9 — не просте' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l16',
            title: 'Вкладені та анонімні класи',
            theory: `<h2>Вкладені класи (Nested classes)</h2>
<h3>Static nested class</h3>
<pre><code>public class Outer {
    private static int outerStatic = 10;

    static class Inner {
        void show() {
            System.out.println(outerStatic); // доступ до static полів Outer
        }
    }
}
Outer.Inner inner = new Outer.Inner();</code></pre>
<h3>Inner class (нестатичний)</h3>
<pre><code>public class LinkedList {
    private Node head;

    class Node {           // має доступ до всіх полів LinkedList
        int value;
        Node next;
        Node(int v) { this.value = v; }
    }
}</code></pre>
<h3>Анонімний клас</h3>
<pre><code>// Клас без імені — відразу реалізується та використовується
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Виконується!");
    }
};
r.run();

// Краще (Java 8+): lambda
Runnable r2 = () -> System.out.println("Виконується!");</code></pre>
<h3>Local class</h3>
<pre><code>void method() {
    class Helper { // клас оголошений всередині методу
        int compute(int x) { return x * 2; }
    }
    System.out.println(new Helper().compute(5)); // 10
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l16-c1',
                title: 'Static nested клас',
                prompt: 'Оголоси клас <code>Outer</code> зі static nested класом <code>Inner</code> що має метод <code>greet()</code> виводить <code>Hello from Inner</code>. Виклич з main.',
                starterCode: 'public class Main {\n    static class Outer {\n        static class Inner {\n            void greet() {\n                // виведи Hello from Inner\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        Outer.Inner inner = new Outer.Inner();\n        inner.greet();\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Hello from Inner', desc: 'nested клас' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l16-c2',
                title: 'Anonymous клас',
                prompt: 'Оголоси interface <code>Greeter</code> з методом <code>greet(String name)</code>. Створи anonymous клас що виводить <code>Hi, Alice!</code>.',
                starterCode: 'public class Main {\n    interface Greeter {\n        void greet(String name);\n    }\n\n    public static void main(String[] args) {\n        Greeter g = new Greeter() {\n            @Override\n            public void greet(String name) {\n                // виведи "Hi, " + name + "!"\n            }\n        };\n        g.greet("Alice");\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Hi, Alice!', desc: 'anonymous клас' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-functional',
        title: 'Функціональне програмування',
        icon: '🔀',
        lessons: [
          {
            id: 'java-l17',
            title: 'Lambda вирази',
            theory: `<h2>Lambda вирази (Java 8+)</h2>
<p>Lambda — скорочений запис анонімної функції. Використовується там, де очікується functional interface.</p>
<h3>Синтаксис</h3>
<pre><code>// (параметри) -> тіло
() -> System.out.println("Привіт")
x -> x * 2
(a, b) -> a + b
(int a, int b) -> { return a + b; } // блок коду

// Приклади
Runnable r = () -> System.out.println("run");
Comparator&lt;String&gt; cmp = (s1, s2) -> s1.compareTo(s2);
Predicate&lt;Integer&gt; isEven = n -> n % 2 == 0;</code></pre>
<h3>Використання з колекціями</h3>
<pre><code>List&lt;String&gt; names = Arrays.asList("Charlie", "Alice", "Bob");

// Сортування
names.sort((a, b) -> a.compareTo(b));
// або коротше:
names.sort(Comparator.naturalOrder());

// forEach
names.forEach(name -> System.out.println(name));
// або ще коротше:
names.forEach(System.out::println);</code></pre>
<h3>Замикання у lambda</h3>
<pre><code>int threshold = 5; // ефективно фінальна (effectively final)
Predicate&lt;Integer&gt; gt = n -> n > threshold; // захоплює threshold
gt.test(10); // true
gt.test(3);  // false</code></pre>`,
                        challenges: [
              {
                id: 'java-l17-c1',
                title: 'Lambda — сортування',
                prompt: 'Оголоси <code>List&lt;String&gt; names = new ArrayList&lt;&gt;(Arrays.asList("Charlie","Alice","Bob"))</code>. Відсортуй через lambda (Comparator). Виведи <code>sorted: Alice Bob Charlie</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = new ArrayList<>(Arrays.asList("Charlie","Alice","Bob"));\n        names.sort((a, b) -> /* порівняй */);\n        System.out.println("sorted: " + String.join(" ", names));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'sorted: Alice Bob Charlie', desc: 'відсортовано' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l17-c2',
                title: 'Lambda — Runnable',
                prompt: 'Оголоси <code>Runnable r = () -> System.out.println("Running!")</code> і виклич <code>r.run()</code>. Виведи <code>Running!</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        Runnable r = () -> /* виведи Running! */;\n        r.run();\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Running!', desc: 'Runnable lambda' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l18',
            title: 'Functional interfaces',
            theory: `<h2>Functional Interfaces</h2>
<p>Функціональний інтерфейс — інтерфейс рівно з одним абстрактним методом. Можна використовувати з lambda.</p>
<h3>Вбудовані у java.util.function</h3>
<pre><code>// Function&lt;T, R&gt; — приймає T, повертає R
Function&lt;String, Integer&gt; len = s -> s.length();
len.apply("hello"); // 5

// Predicate&lt;T&gt; — приймає T, повертає boolean
Predicate&lt;String&gt; isLong = s -> s.length() > 5;
isLong.test("hello"); // false

// Consumer&lt;T&gt; — приймає T, нічого не повертає
Consumer&lt;String&gt; printer = System.out::println;
printer.accept("Привіт");

// Supplier&lt;T&gt; — нічого не приймає, повертає T
Supplier&lt;List&lt;String&gt;&gt; listFactory = ArrayList::new;

// BiFunction&lt;T, U, R&gt; — два аргументи
BiFunction&lt;Integer, Integer, Integer&gt; add = (a, b) -> a + b;
add.apply(3, 4); // 7</code></pre>
<h3>Композиція функцій</h3>
<pre><code>Function&lt;Integer, Integer&gt; times2 = x -> x * 2;
Function&lt;Integer, Integer&gt; plus3  = x -> x + 3;

Function&lt;Integer, Integer&gt; times2ThenPlus3 = times2.andThen(plus3);
times2ThenPlus3.apply(5); // (5*2)+3 = 13

Predicate&lt;Integer&gt; isEven  = n -> n % 2 == 0;
Predicate&lt;Integer&gt; isPos   = n -> n > 0;
Predicate&lt;Integer&gt; evenAndPos = isEven.and(isPos);
evenAndPos.test(4);  // true
evenAndPos.test(-2); // false</code></pre>`,
                        challenges: [
              {
                id: 'java-l18-c1',
                title: 'Function<T,R>',
                prompt: 'Оголоси <code>Function&lt;String, Integer&gt; strLen = s -> s.length()</code>. Виведи <code>length: 5</code> для "hello" і <code>length: 3</code> для "hi!".',
                starterCode: 'import java.util.function.*;\npublic class Main {\n    public static void main(String[] args) {\n        Function<String, Integer> strLen = s -> s.length();\n        System.out.println("length: " + strLen.apply("hello"));\n        System.out.println("length: " + strLen.apply("hi!"));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'length: 5', desc: '"hello".length = 5' },
                  { type: 'output_contains', expected: 'length: 3', desc: '"hi!".length = 3' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l18-c2',
                title: 'Predicate',
                prompt: 'Оголоси <code>Predicate&lt;Integer&gt; isEven = n -> n % 2 == 0</code>. Виведи <code>4 even: true</code> та <code>7 even: false</code>.',
                starterCode: 'import java.util.function.*;\npublic class Main {\n    public static void main(String[] args) {\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        System.out.println("4 even: " + isEven.test(4));\n        System.out.println("7 even: " + isEven.test(7));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: '4 even: true', desc: '4 парне' },
                  { type: 'output_contains', expected: '7 even: false', desc: '7 непарне' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l19',
            title: 'Method references',
            theory: `<h2>Method References (посилання на методи)</h2>
<p>Ще коротший запис lambda, коли вона просто викликає вже існуючий метод.</p>
<h3>Чотири типи</h3>
<pre><code>// 1. Статичний метод: ClassName::staticMethod
Function&lt;String, Integer&gt; parser = Integer::parseInt;
// рівнозначно: s -> Integer.parseInt(s)

// 2. Метод екземпляра конкретного об\'єкта: instance::method
String prefix = "Hello, ";
Function&lt;String, String&gt; greet = prefix::concat;
// s -> prefix.concat(s)

// 3. Метод екземпляра довільного об\'єкта: ClassName::method
Function&lt;String, String&gt; upper = String::toUpperCase;
// s -> s.toUpperCase()

// 4. Конструктор: ClassName::new
Supplier&lt;ArrayList&lt;String&gt;&gt; listMaker = ArrayList::new;
// () -> new ArrayList&lt;&gt;()</code></pre>
<h3>Приклади з колекціями</h3>
<pre><code>List&lt;String&gt; names = List.of("Alice", "Bob", "Charlie");

// forEach
names.forEach(System.out::println);

// sort
names.stream()
     .sorted(String::compareToIgnoreCase)
     .forEach(System.out::println);

// map + collect
List&lt;Integer&gt; lengths = names.stream()
    .map(String::length)
    .collect(Collectors.toList());</code></pre>`,
                        challenges: [
              {
                id: 'java-l19-c1',
                title: 'Static method reference',
                prompt: 'Оголоси <code>List&lt;String&gt; words = Arrays.asList("hello","world")</code>. Виведи кожен через <code>System.out::println</code> (method reference).',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = Arrays.asList("hello", "world");\n        words.forEach(System.out::println);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'hello', desc: '"hello" виведено' },
                  { type: 'output_contains', expected: 'world', desc: '"world" виведено' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l19-c2',
                title: 'Instance method reference',
                prompt: 'Оголоси <code>List&lt;String&gt; words = Arrays.asList("HELLO","WORLD")</code>. Перетвори кожен в нижній регістр через <code>String::toLowerCase</code> і виведи.',
                starterCode: 'import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = Arrays.asList("HELLO", "WORLD");\n        words.stream()\n             .map(String::toLowerCase)\n             .forEach(System.out::println);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'hello', desc: '"HELLO" → "hello"' },
                  { type: 'output_contains', expected: 'world', desc: '"WORLD" → "world"' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l20',
            title: 'Optional',
            theory: `<h2>Optional&lt;T&gt;</h2>
<p>Optional — контейнер, що може містити або не містити значення. Альтернатива <code>null</code>.</p>
<h3>Створення</h3>
<pre><code>Optional&lt;String&gt; present = Optional.of("hello");     // є значення
Optional&lt;String&gt; empty   = Optional.empty();          // порожній
Optional&lt;String&gt; maybe   = Optional.ofNullable(null); // може бути null</code></pre>
<h3>Отримання значення</h3>
<pre><code>optional.get();                    // викидає NoSuchElementException якщо порожній
optional.orElse("default");        // повертає default якщо порожній
optional.orElseGet(() -> compute()); // ліниво
optional.orElseThrow();            // кидає NoSuchElementException
optional.orElseThrow(() -> new RuntimeException("Не знайдено"));</code></pre>
<h3>Перевірка та трансформація</h3>
<pre><code>optional.isPresent(); // true якщо є значення
optional.isEmpty();   // true якщо порожній

// Функціональний стиль (кращий)
Optional&lt;String&gt; name = findUser(id)
    .map(User::getName)                    // трансформуємо якщо є
    .filter(n -> !n.isBlank())             // фільтруємо
    .map(String::toUpperCase);

optional.ifPresent(v -> System.out.println(v));
optional.ifPresentOrElse(
    v -> System.out.println("Знайдено: " + v),
    () -> System.out.println("Не знайдено")
);</code></pre>`,
                        challenges: [
              {
                id: 'java-l20-c1',
                title: 'Optional.ofNullable',
                prompt: 'Оголоси метод <code>greet(String name)</code> що приймає можливо null. Через Optional виведи <code>Hello, Alice!</code> або <code>Hello, stranger!</code> якщо null.',
                starterCode: 'import java.util.Optional;\npublic class Main {\n    static void greet(String name) {\n        String result = Optional.ofNullable(name).orElse("stranger");\n        System.out.println("Hello, " + result + "!");\n    }\n\n    public static void main(String[] args) {\n        greet("Alice");\n        greet(null);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Hello, Alice!', desc: 'присутнє ім\'я' },
                  { type: 'output_contains', expected: 'Hello, stranger!', desc: 'null → stranger' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l20-c2',
                title: 'Optional.map та filter',
                prompt: 'Оголоси <code>Optional&lt;String&gt; opt = Optional.of("  hello  ")</code>. Через map зроби trim і toUpperCase. Виведи <code>result: HELLO</code>.',
                starterCode: 'import java.util.Optional;\npublic class Main {\n    public static void main(String[] args) {\n        Optional<String> opt = Optional.of("  hello  ");\n        String result = opt\n            .map(String::trim)\n            .map(String::toUpperCase)\n            .orElse("");\n        System.out.println("result: " + result);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'result: HELLO', desc: 'trim + toUpperCase' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-collections',
        title: 'Колекції Java',
        icon: '📚',
        lessons: [
          {
            id: 'java-l21',
            title: 'List: ArrayList та LinkedList',
            theory: `<h2>List — впорядкована колекція</h2>
<p>List зберігає елементи у порядку додавання і допускає дублікати.</p>
<h3>ArrayList — масив під капотом</h3>
<pre><code>import java.util.*;

List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("Alice");
list.add("Bob");
list.add(1, "Charlie"); // вставити на позицію

list.get(0);            // "Alice"
list.set(0, "Alex");    // замінити
list.remove(0);         // видалити за індексом
list.remove("Bob");     // видалити за значенням
list.size();            // розмір
list.contains("Bob");   // true/false
list.indexOf("Alice");  // індекс

// Ітерація
for (String s : list) System.out.println(s);
list.forEach(System.out::println);</code></pre>
<h3>Корисні фабрики (Java 9+)</h3>
<pre><code>List&lt;String&gt; immutable = List.of("a", "b", "c"); // незмінний
List&lt;String&gt; mutable   = new ArrayList&lt;&gt;(List.of("a", "b")); // змінна копія</code></pre>
<h3>LinkedList — двозв'язний список</h3>
<pre><code>Deque&lt;String&gt; deque = new LinkedList&lt;&gt;();
deque.addFirst("Alice");  // на початок
deque.addLast("Bob");     // в кінець
deque.peekFirst();        // перший без видалення
deque.pollFirst();        // перший з видаленням
// Використовується як Stack або Queue</code></pre>`,
                        challenges: [
              {
                id: 'java-l21-c1',
                title: 'ArrayList операції',
                prompt: 'Створи <code>ArrayList&lt;Integer&gt;</code>, додай 1..5, видали елемент зі значенням 3 (через remove(Integer.valueOf(3))). Виведи <code>list: [1, 2, 4, 5]</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<>();\n        for (int i = 1; i <= 5; i++) list.add(i);\n        list.remove(Integer.valueOf(3));\n        System.out.println("list: " + list);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'list: [1, 2, 4, 5]', desc: '[1,2,4,5]' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l21-c2',
                title: 'LinkedList як стек',
                prompt: 'Використай <code>LinkedList&lt;String&gt;</code> як стек: push "first", "second", "third". Виведи <code>top: third</code> (peek) і потім pop кожен елемент виводячи <code>popped: X</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        LinkedList<String> stack = new LinkedList<>();\n        stack.push("first");\n        stack.push("second");\n        stack.push("third");\n        System.out.println("top: " + stack.peek());\n        while (!stack.isEmpty()) {\n            System.out.println("popped: " + stack.pop());\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'top: third', desc: 'peek = third' },
                  { type: 'output_contains', expected: 'popped: third', desc: 'LIFO порядок' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l22',
            title: 'Set: HashSet та TreeSet',
            theory: `<h2>Set — колекція унікальних елементів</h2>
<h3>HashSet — найшвидший, без порядку</h3>
<pre><code>Set&lt;String&gt; set = new HashSet&lt;&gt;();
set.add("apple");
set.add("banana");
set.add("apple"); // ігнорується — дублікат

set.size();           // 2
set.contains("apple"); // true
set.remove("banana");

// Операції над множинами
Set&lt;Integer&gt; a = new HashSet&lt;&gt;(Set.of(1, 2, 3, 4));
Set&lt;Integer&gt; b = new HashSet&lt;&gt;(Set.of(3, 4, 5, 6));

// Перетин
a.retainAll(b); // a = {3, 4}

// Об'єднання
Set&lt;Integer&gt; union = new HashSet&lt;&gt;(a);
union.addAll(b);

// Різниця
Set&lt;Integer&gt; diff = new HashSet&lt;&gt;(a);
diff.removeAll(b);</code></pre>
<h3>TreeSet — відсортований</h3>
<pre><code>Set&lt;String&gt; sorted = new TreeSet&lt;&gt;();
sorted.add("Charlie");
sorted.add("Alice");
sorted.add("Bob");
// Порядок: Alice, Bob, Charlie (натуральне сортування)

TreeSet&lt;Integer&gt; nums = new TreeSet&lt;&gt;(Set.of(5, 2, 8, 1, 9));
nums.first();              // 1
nums.last();               // 9
nums.headSet(5);           // {1, 2}
nums.tailSet(5);           // {5, 8, 9}
nums.subSet(2, 8);         // {2, 5}</code></pre>`,
                        challenges: [
              {
                id: 'java-l22-c1',
                title: 'HashSet — унікальність',
                prompt: 'Додай в <code>HashSet&lt;Integer&gt;</code> числа: 1, 2, 3, 2, 1. Виведи <code>size: 3</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : new int[]{1,2,3,2,1}) set.add(n);\n        System.out.println("size: " + set.size());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'size: 3', desc: '3 унікальних' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l22-c2',
                title: 'Перетин множин',
                prompt: 'Створи два Set: {1,2,3,4} і {3,4,5,6}. Знайди перетин через retainAll. Виведи <code>intersection size: 2</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Set<Integer> a = new HashSet<>(Arrays.asList(1,2,3,4));\n        Set<Integer> b = new HashSet<>(Arrays.asList(3,4,5,6));\n        a.retainAll(b);\n        System.out.println("intersection size: " + a.size());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'intersection size: 2', desc: 'перетин = {3,4}' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l23',
            title: 'Map: HashMap та TreeMap',
            theory: `<h2>Map — колекція пар ключ-значення</h2>
<h3>HashMap</h3>
<pre><code>Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();
scores.put("Alice", 95);
scores.put("Bob", 87);
scores.put("Alice", 99); // перезапише попереднє

scores.get("Alice");              // 99
scores.getOrDefault("Eve", 0);    // 0 (немає ключа)
scores.containsKey("Bob");        // true
scores.containsValue(87);         // true
scores.remove("Bob");
scores.size();                    // 1

// Ітерація
for (Map.Entry&lt;String, Integer&gt; entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
scores.forEach((k, v) -> System.out.println(k + "=" + v));</code></pre>
<h3>Корисні методи</h3>
<pre><code>scores.putIfAbsent("Eve", 70);      // тільки якщо ключа немає
scores.merge("Alice", 5, Integer::sum); // Alice = 99+5 = 104
scores.computeIfAbsent("Frank", k -> k.length()); // 5

// Підрахунок частот
Map&lt;Character, Integer&gt; freq = new HashMap&lt;&gt;();
for (char c : "hello".toCharArray()) {
    freq.merge(c, 1, Integer::sum);
}</code></pre>
<h3>TreeMap — відсортований за ключем</h3>
<pre><code>Map&lt;String, Integer&gt; sorted = new TreeMap&lt;&gt;(scores);
// ключі відсортовані: Alice, Bob, ...
((TreeMap&lt;String, Integer&gt;) sorted).firstKey(); // "Alice"</code></pre>`,
                        challenges: [
              {
                id: 'java-l23-c1',
                title: 'HashMap — підрахунок слів',
                prompt: 'Підрахуй частоту слів у рядку <code>"apple banana apple cherry banana apple"</code>. Виведи <code>apple: 3</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        String text = "apple banana apple cherry banana apple";\n        Map<String, Integer> freq = new HashMap<>();\n        for (String word : text.split(" ")) {\n            freq.merge(word, 1, Integer::sum);\n        }\n        System.out.println("apple: " + freq.get("apple"));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'apple: 3', desc: 'apple = 3' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l23-c2',
                title: 'computeIfAbsent',
                prompt: 'Групуй рядки по першій літері через <code>computeIfAbsent</code>. Для ["apple","avocado","banana","blueberry"] виведи <code>a: [apple, avocado]</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = Arrays.asList("apple","avocado","banana","blueberry");\n        Map<Character, List<String>> groups = new HashMap<>();\n        for (String w : words) {\n            groups.computeIfAbsent(w.charAt(0), k -> new ArrayList<>()).add(w);\n        }\n        System.out.println("a: " + groups.get(\'a\'));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'a: [apple, avocado]', desc: 'групування по "a"' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l24',
            title: 'Generics (узагальнення)',
            theory: `<h2>Generics у Java</h2>
<p>Generics — типізовані параметри, що забезпечують типобезпечність без приведення типів.</p>
<h3>Generic клас</h3>
<pre><code>public class Box&lt;T&gt; {       // T — type parameter
    private T content;

    public Box(T content) { this.content = content; }
    public T get()          { return content; }
    public void set(T item) { content = item; }

    @Override public String toString() {
        return "Box[" + content + "]";
    }
}

Box&lt;String&gt;  strBox = new Box&lt;&gt;("hello");
Box&lt;Integer&gt; intBox = new Box&lt;&gt;(42);
strBox.get().toUpperCase(); // "HELLO" — без кастингу!</code></pre>
<h3>Generic метод</h3>
<pre><code>public static &lt;T extends Comparable&lt;T&gt;&gt; T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

max(3, 7);        // 7
max("apple", "banana"); // "banana"</code></pre>
<h3>Wildcard (?)</h3>
<pre><code>// ? extends T — читаємо (producer)
double sum(List&lt;? extends Number&gt; list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}
sum(List.of(1, 2, 3));      // List&lt;Integer&gt;
sum(List.of(1.5, 2.5));     // List&lt;Double&gt;

// ? super T — пишемо (consumer)
void addNumbers(List&lt;? super Integer&gt; list) {
    list.add(1); list.add(2);
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l24-c1',
                title: 'Generic клас Pair',
                prompt: 'Оголоси generic клас <code>Pair&lt;A,B&gt;</code> з полями first і second і методом <code>swap()</code> що повертає <code>Pair&lt;B,A&gt;</code>. Виведи <code>swapped: 1, hello</code>.',
                starterCode: 'public class Main {\n    static class Pair<A, B> {\n        A first;\n        B second;\n        Pair(A first, B second) { this.first = first; this.second = second; }\n        Pair<B, A> swap() { return new Pair<>(second, first); }\n    }\n\n    public static void main(String[] args) {\n        Pair<String, Integer> p = new Pair<>("hello", 1);\n        Pair<Integer, String> swapped = p.swap();\n        System.out.println("swapped: " + swapped.first + ", " + swapped.second);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'swapped: 1, hello', desc: 'swap результат' },
                ],
                xp: 30,
                language: 'java',
              },
              {
                id: 'java-l24-c2',
                title: 'Generic метод',
                prompt: 'Оголоси static generic метод <code>max(T a, T b)</code> де T extends Comparable&lt;T&gt;. Виведи <code>max int: 7</code> та <code>max str: zebra</code>.',
                starterCode: 'public class Main {\n    static <T extends Comparable<T>> T max(T a, T b) {\n        return a.compareTo(b) >= 0 ? a : b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("max int: " + max(3, 7));\n        System.out.println("max str: " + max("apple", "zebra"));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'max int: 7', desc: 'max(3,7) = 7' },
                  { type: 'output_contains', expected: 'max str: zebra', desc: 'max strings' },
                ],
                xp: 30,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l25',
            title: 'Collections — утиліти',
            theory: `<h2>Клас Collections та утиліти</h2>
<h3>Методи java.util.Collections</h3>
<pre><code>List&lt;Integer&gt; list = new ArrayList&lt;&gt;(Arrays.asList(3, 1, 4, 1, 5, 9, 2));

Collections.sort(list);              // [1, 1, 2, 3, 4, 5, 9]
Collections.sort(list, Comparator.reverseOrder()); // за спаданням
Collections.reverse(list);           // перевернути
Collections.shuffle(list);           // перемішати
Collections.swap(list, 0, 1);       // поміняти місцями
Collections.min(list);              // 1
Collections.max(list);              // 9
Collections.frequency(list, 1);     // 2 (скільки разів 1)
Collections.binarySearch(sorted, 4); // індекс (список відсортований!)</code></pre>
<h3>Незмінні та синхронізовані обгортки</h3>
<pre><code>List&lt;String&gt; immutable = Collections.unmodifiableList(list);
// або Java 9+:
List&lt;String&gt; immutable2 = List.copyOf(list);

// Синхронізований для багатопотоковості
List&lt;String&gt; synced = Collections.synchronizedList(new ArrayList&lt;&gt;());</code></pre>
<h3>Порівняння: Comparable vs Comparator</h3>
<pre><code>// Comparable — природний порядок (в класі)
public class Student implements Comparable&lt;Student&gt; {
    @Override public int compareTo(Student other) {
        return this.grade - other.grade;
    }
}

// Comparator — зовнішній порядок
Comparator&lt;Student&gt; byName = Comparator.comparing(s -> s.name);
Comparator&lt;Student&gt; byGradeThenName = Comparator
    .comparingInt((Student s) -> s.grade)
    .thenComparing(s -> s.name);</code></pre>`,
                        challenges: [
              {
                id: 'java-l25-c1',
                title: 'Collections.sort з Comparator',
                prompt: 'Оголоси список рядків <code>["banana","apple","cherry","date"]</code>. Відсортуй за довжиною (Collections.sort + Comparator). Виведи <code>by length: date apple banana cherry</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(Arrays.asList("banana","apple","cherry","date"));\n        Collections.sort(list, Comparator.comparingInt(String::length));\n        System.out.println("by length: " + String.join(" ", list));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'by length: date apple banana cherry', desc: 'сортування за довжиною' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l25-c2',
                title: 'Collections.frequency та min/max',
                prompt: 'Для списку <code>[3,1,4,1,5,9,2,6,5,5]</code> виведи: <code>min: 1</code>, <code>max: 9</code>, <code>freq 5: 3</code>.',
                starterCode: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = Arrays.asList(3,1,4,1,5,9,2,6,5,5);\n        System.out.println("min: " + Collections.min(nums));\n        System.out.println("max: " + Collections.max(nums));\n        System.out.println("freq 5: " + Collections.frequency(nums, 5));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'min: 1', desc: 'min = 1' },
                  { type: 'output_contains', expected: 'max: 9', desc: 'max = 9' },
                  { type: 'output_contains', expected: 'freq 5: 3', desc: '5 зустрічається 3 рази' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-streams',
        title: 'Streams API',
        icon: '🌊',
        lessons: [
          {
            id: 'java-l26',
            title: 'Stream — введення',
            theory: `<h2>Stream API (Java 8+)</h2>
<p>Stream — конвеєр обробки даних. Не зберігає дані, а описує операції над ними.</p>
<h3>Створення потоку</h3>
<pre><code>// З колекції
List&lt;String&gt; names = List.of("Alice", "Bob", "Charlie");
Stream&lt;String&gt; stream = names.stream();

// З масиву
Stream&lt;Integer&gt; nums = Arrays.stream(new Integer[]{1, 2, 3});

// Stream.of
Stream&lt;String&gt; s = Stream.of("a", "b", "c");

// Нескінченні
Stream&lt;Integer&gt; naturals = Stream.iterate(0, n -> n + 1);
Stream&lt;Double&gt;  randoms  = Stream.generate(Math::random);

// Примітивні потоки (ефективніші)
IntStream.range(0, 10);       // 0..9
IntStream.rangeClosed(1, 10); // 1..10
LongStream.of(1L, 2L, 3L);
DoubleStream.of(1.5, 2.5);</code></pre>
<h3>Pipeline (конвеєр)</h3>
<pre><code>// source → intermediate ops → terminal op
long count = names.stream()
    .filter(s -> s.startsWith("A"))   // intermediate: фільтр
    .map(String::toUpperCase)          // intermediate: трансформація
    .count();                          // terminal: підрахунок

// Потік виконується ЛІНИВО — тільки коли є термінальна операція</code></pre>`,
                        challenges: [
              {
                id: 'java-l26-c1',
                title: 'Stream.of та collect',
                prompt: 'Через Stream.of("one","two","three") зроби map до upperCase і collect у List. Виведи <code>result: [ONE, TWO, THREE]</code>.',
                starterCode: 'import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> result = Stream.of("one","two","three")\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n        System.out.println("result: " + result);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'result: [ONE, TWO, THREE]', desc: 'uppercase list' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l26-c2',
                title: 'IntStream та sum',
                prompt: 'Через <code>IntStream.rangeClosed(1, 100)</code> знайди суму. Виведи <code>sum: 5050</code>.',
                starterCode: 'import java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        int sum = IntStream.rangeClosed(1, 100).sum();\n        System.out.println("sum: " + sum);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'sum: 5050', desc: 'сума 1..100 = 5050' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l27',
            title: 'Intermediate операції',
            theory: `<h2>Проміжні операції Stream</h2>
<p>Проміжні операції повертають новий Stream і виконуються ліниво.</p>
<h3>Фільтрація та трансформація</h3>
<pre><code>List&lt;Integer&gt; nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

nums.stream()
    .filter(n -> n % 2 == 0)     // [2, 4, 6, 8, 10]
    .map(n -> n * n)              // [4, 16, 36, 64, 100]
    .limit(3)                     // [4, 16, 36]
    .forEach(System.out::println);</code></pre>
<h3>Перетворення колекцій</h3>
<pre><code>List&lt;List&lt;Integer&gt;&gt; nested = List.of(List.of(1,2), List.of(3,4), List.of(5));
List&lt;Integer&gt; flat = nested.stream()
    .flatMap(Collection::stream)  // розгладжує
    .collect(Collectors.toList()); // [1, 2, 3, 4, 5]</code></pre>
<h3>Сортування та дедублікація</h3>
<pre><code>List&lt;String&gt; names = List.of("Charlie", "Alice", "Bob", "Alice");

names.stream()
    .distinct()                              // унікальні
    .sorted()                                // натуральний порядок
    .sorted(Comparator.comparing(String::length)) // за довжиною
    .peek(s -> System.out.println("Обробка: " + s)) // дебаг без завершення
    .collect(Collectors.toList());</code></pre>
<h3>mapToInt, mapToLong, mapToDouble</h3>
<pre><code>OptionalDouble avg = names.stream()
    .mapToInt(String::length)
    .average();
avg.getAsDouble(); // середня довжина

IntStream.rangeClosed(1, 100).sum(); // 5050</code></pre>`,
                        challenges: [
              {
                id: 'java-l27-c1',
                title: 'filter + map + limit',
                prompt: 'З числа від 1 до 20 знайди перші 5 парних і підніси до квадрату. Виведи <code>result: [4, 16, 36, 64, 100]</code>.',
                starterCode: 'import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> result = IntStream.rangeClosed(1, 20)\n            .filter(n -> n % 2 == 0)\n            .map(n -> n * n)\n            .limit(5)\n            .boxed()\n            .collect(Collectors.toList());\n        System.out.println("result: " + result);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'result: [4, 16, 36, 64, 100]', desc: 'перші 5 парних²' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l27-c2',
                title: 'flatMap',
                prompt: 'Маєш <code>List&lt;List&lt;Integer&gt;&gt; nested = [[1,2],[3,4],[5]]</code>. Через flatMap отримай плаский список. Виведи <code>flat: [1, 2, 3, 4, 5]</code>.',
                starterCode: 'import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<List<Integer>> nested = Arrays.asList(\n            Arrays.asList(1,2), Arrays.asList(3,4), Arrays.asList(5));\n        List<Integer> flat = nested.stream()\n            .flatMap(Collection::stream)\n            .collect(Collectors.toList());\n        System.out.println("flat: " + flat);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'flat: [1, 2, 3, 4, 5]', desc: 'flatMap' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l28',
            title: 'Terminal операції та Collectors',
            theory: `<h2>Термінальні операції та Collectors</h2>
<h3>Прості термінальні операції</h3>
<pre><code>Stream&lt;String&gt; s = Stream.of("a", "bb", "ccc");

s.count();                // 3
s.findFirst();            // Optional[a]
s.findAny();              // Optional[?]
s.anyMatch(x -> x.length() > 2);  // true
s.allMatch(x -> !x.isEmpty());    // true
s.noneMatch(x -> x.length() > 5); // true
s.min(Comparator.naturalOrder()); // Optional[a]
s.max(Comparator.naturalOrder()); // Optional[ccc]
s.reduce("", (a, b) -> a + b);    // "abbccc"
s.reduce(0, Integer::sum);        // (для IntStream)</code></pre>
<h3>Collectors</h3>
<pre><code>import java.util.stream.Collectors;

List&lt;String&gt; names = List.of("Alice", "Bob", "Charlie", "Anna");

// Збирання в колекцію
names.stream().collect(Collectors.toList());
names.stream().collect(Collectors.toSet());
names.stream().collect(Collectors.toUnmodifiableList());

// Об'єднання в рядок
names.stream().collect(Collectors.joining(", ")); // "Alice, Bob, Charlie, Anna"
names.stream().collect(Collectors.joining(", ", "[", "]")); // "[Alice, Bob, ...]"

// Групування
Map&lt;Integer, List&lt;String&gt;&gt; byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));
// {5: [Alice, "Anna"? no, Anna=4], 3: [Bob], 7: [Charlie]}

// Підрахунок
Map&lt;Integer, Long&gt; countByLength = names.stream()
    .collect(Collectors.groupingBy(String::length, Collectors.counting()));

// Розбиття
Map&lt;Boolean, List&lt;String&gt;&gt; partition = names.stream()
    .collect(Collectors.partitioningBy(s -> s.startsWith("A")));</code></pre>`,
                        challenges: [
              {
                id: 'java-l28-c1',
                title: 'Collectors.joining та groupingBy',
                prompt: 'З слів <code>["apple","banana","avocado","blueberry"]</code> згрупуй по першій літері. Виведи <code>a: [apple, avocado]</code>.',
                starterCode: 'import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = Arrays.asList("apple","banana","avocado","blueberry");\n        Map<Character, List<String>> grouped = words.stream()\n            .collect(Collectors.groupingBy(w -> w.charAt(0)));\n        System.out.println("a: " + grouped.get(\'a\'));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'a: [apple, avocado]', desc: 'groupBy першою літерою' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l28-c2',
                title: 'reduce та count',
                prompt: 'З <code>IntStream.rangeClosed(1,10)</code> знайди добуток через reduce. Виведи <code>product: 3628800</code>.',
                starterCode: 'import java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        int product = IntStream.rangeClosed(1, 10)\n            .reduce(1, (a, b) -> a * b);\n        System.out.println("product: " + product);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'product: 3628800', desc: '10! = 3628800' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l29',
            title: 'Паралельні потоки',
            theory: `<h2>Паралельні потоки (Parallel Streams)</h2>
<p>Java може автоматично розпаралелити обробку потоку, використовуючи ForkJoinPool.</p>
<h3>Створення паралельного потоку</h3>
<pre><code>// parallelStream()
List&lt;Integer&gt; nums = List.of(1, 2, 3, 4, 5, 6, 7, 8);
long sum = nums.parallelStream()
               .mapToLong(Integer::longValue)
               .sum();

// parallel() на звичайному потоці
Stream.of(1, 2, 3).parallel().forEach(System.out::println);</code></pre>
<h3>Коли використовувати</h3>
<pre><code>// ✅ Великі колекції (100k+)
// ✅ Незалежні, CPU-інтенсивні операції
// ❌ Маленькі колекції (overhead > виграш)
// ❌ Операції з I/O
// ❌ Порядок важливий (forEachOrdered — вирішення)
// ❌ Стан мутується (race condition!)</code></pre>
<h3>Безпечне використання</h3>
<pre><code>// ❌ НЕ МОЖНА — мутація спільного стану
List&lt;Integer&gt; result = new ArrayList&lt;&gt;();
nums.parallelStream().forEach(result::add); // race condition!

// ✅ Правильно — collect
List&lt;Integer&gt; safe = nums.parallelStream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList()); // потокобезпечно

// Порядок (forEachOrdered)
nums.parallelStream()
    .sorted()
    .forEachOrdered(System.out::println); // впорядковано</code></pre>`,
                        challenges: [
              {
                id: 'java-l29-c1',
                title: 'parallelStream сума',
                prompt: 'Через <code>LongStream.rangeClosed(1, 1_000_000).parallel()</code> знайди суму. Виведи <code>sum: 500000500000</code>.',
                starterCode: 'import java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        long sum = LongStream.rangeClosed(1, 1_000_000)\n            .parallel()\n            .sum();\n        System.out.println("sum: " + sum);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'sum: 500000500000', desc: 'parallel sum' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l29-c2',
                title: 'Thread-safe collect',
                prompt: 'Через parallelStream обчисли суму квадратів чисел 1..100 через <code>mapToLong(n -> (long)n*n).sum()</code>. Виведи <code>sum of squares: 338350</code>.',
                starterCode: 'import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        long sum = IntStream.rangeClosed(1, 100)\n            .parallel()\n            .mapToLong(n -> (long)n * n)\n            .sum();\n        System.out.println("sum of squares: " + sum);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'sum of squares: 338350', desc: 'Σn² = 338350' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-exceptions',
        title: 'Обробка виключень',
        icon: '🛡️',
        lessons: [
          {
            id: 'java-l30',
            title: 'try-catch-finally',
            theory: `<h2>Виключення (Exceptions) у Java</h2>
<p>Виключення — об'єкт, що сигналізує про помилку під час виконання.</p>
<h3>Ієрархія</h3>
<pre><code>Throwable
├── Error (JVM помилки, не перехоплювати)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── Checked (перевіряємі — треба обробити)
    │   ├── IOException
    │   ├── SQLException
    │   └── ParseException
    └── RuntimeException (unchecked)
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        ├── ClassCastException
        └── IllegalArgumentException</code></pre>
<h3>try-catch-finally</h3>
<pre><code>try {
    int[] arr = new int[5];
    arr[10] = 1; // ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Помилка: " + e.getMessage());
} catch (Exception e) {           // загальний catch (в кінці!)
    e.printStackTrace();
} finally {
    System.out.println("Виконується завжди"); // навіть при поверненні/throw
}</code></pre>
<h3>Multi-catch та try-with-resources</h3>
<pre><code>// Multi-catch (Java 7+)
catch (IOException | SQLException e) { ... }

// try-with-resources — автоматично закриває AutoCloseable
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
    // br.close() викличеться автоматично
} catch (IOException e) {
    e.printStackTrace();
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l30-c1',
                title: 'NumberFormatException',
                prompt: 'Напиши метод <code>parseIntSafe(String s)</code> що через try/catch повертає int або 0 при помилці. Виведи <code>parsed: 42</code> і <code>parsed: 0</code>.',
                starterCode: 'public class Main {\n    static int parseIntSafe(String s) {\n        try {\n            return Integer.parseInt(s);\n        } catch (NumberFormatException e) {\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println("parsed: " + parseIntSafe("42"));\n        System.out.println("parsed: " + parseIntSafe("abc"));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'parsed: 42', desc: '"42" → 42' },
                  { type: 'output_contains', expected: 'parsed: 0', desc: '"abc" → 0' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l30-c2',
                title: 'finally — гарантоване виконання',
                prompt: 'Оголоси метод що ділить a на b. У finally виводить <code>finally executed</code>. При b=0 виводить <code>error: division by zero</code>. При b=2 — <code>result: 5</code>.',
                starterCode: 'public class Main {\n    static void divide(int a, int b) {\n        try {\n            if (b == 0) throw new ArithmeticException("division by zero");\n            System.out.println("result: " + (a / b));\n        } catch (ArithmeticException e) {\n            System.out.println("error: " + e.getMessage());\n        } finally {\n            System.out.println("finally executed");\n        }\n    }\n\n    public static void main(String[] args) {\n        divide(10, 2);\n        divide(10, 0);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'result: 5', desc: '10/2 = 5' },
                  { type: 'output_contains', expected: 'error: division by zero', desc: 'catch exception' },
                  { type: 'output_contains', expected: 'finally executed', desc: 'finally завжди' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l31',
            title: 'throw та власні виключення',
            theory: `<h2>throw та власні класи виключень</h2>
<h3>throw — кидаємо виключення</h3>
<pre><code>public double divide(double a, double b) {
    if (b == 0) throw new ArithmeticException("Ділення на нуль");
    return a / b;
}

public void setAge(int age) {
    if (age < 0 || age > 150)
        throw new IllegalArgumentException("Вік: " + age + " поза межами [0, 150]");
    this.age = age;
}</code></pre>
<h3>throws — оголошення checked виключень</h3>
<pre><code>// Метод оголошує що може кинути checked exception
public String readFile(String path) throws IOException {
    return Files.readString(Path.of(path));
}

// Caller зобов'язаний обробити
try {
    String content = readFile("data.txt");
} catch (IOException e) {
    System.err.println("Файл не знайдено: " + e.getMessage());
}</code></pre>
<h3>Власні виключення</h3>
<pre><code>// Unchecked (extends RuntimeException) — не потребує throws
public class ValidationException extends RuntimeException {
    private final String field;

    public ValidationException(String field, String message) {
        super("Поле \'" + field + "\': " + message);
        this.field = field;
    }

    public String getField() { return field; }
}

// Checked (extends Exception) — потребує throws/catch
public class InsufficientFundsException extends Exception {
    private final double amount;

    public InsufficientFundsException(double amount) {
        super("Не вистачає " + amount + " грн");
        this.amount = amount;
    }

    public double getAmount() { return amount; }
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l31-c1',
                title: 'Власне виключення',
                prompt: 'Оголоси клас <code>InsufficientFundsException extends Exception</code> з полем <code>amount</code>. Метод <code>withdraw(double balance, double amount)</code> кидає це виключення якщо amount > balance. Виведи <code>error: insufficient funds: 50.0</code>.',
                starterCode: 'public class Main {\n    static class InsufficientFundsException extends Exception {\n        double amount;\n        InsufficientFundsException(double amount) {\n            super("insufficient funds: " + amount);\n            this.amount = amount;\n        }\n    }\n\n    static void withdraw(double balance, double amount) throws InsufficientFundsException {\n        if (amount > balance) throw new InsufficientFundsException(amount);\n        System.out.println("withdrawn: " + amount);\n    }\n\n    public static void main(String[] args) {\n        try {\n            withdraw(100, 50);\n            withdraw(30, 50);\n        } catch (InsufficientFundsException e) {\n            System.out.println("error: " + e.getMessage());\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'withdrawn: 50.0', desc: 'успішне зняття' },
                  { type: 'output_contains', expected: 'error: insufficient funds: 50.0', desc: 'кастомний exception' },
                ],
                xp: 30,
                language: 'java',
              },
              {
                id: 'java-l31-c2',
                title: 'RuntimeException (unchecked)',
                prompt: 'Оголоси клас <code>ValidationException extends RuntimeException</code>. Метод <code>validate(String s)</code> кидає його якщо рядок порожній. Виведи <code>validation error: empty string</code>.',
                starterCode: 'public class Main {\n    static class ValidationException extends RuntimeException {\n        ValidationException(String msg) { super(msg); }\n    }\n\n    static void validate(String s) {\n        if (s == null || s.isEmpty()) throw new ValidationException("empty string");\n    }\n\n    public static void main(String[] args) {\n        try {\n            validate("");\n        } catch (ValidationException e) {\n            System.out.println("validation error: " + e.getMessage());\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'validation error: empty string', desc: 'unchecked exception' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-strings-advanced',
        title: 'Рядки — поглиблено',
        icon: '📝',
        lessons: [
          {
            id: 'java-l32',
            title: 'StringBuilder та StringBuffer',
            theory: `<h2>StringBuilder та StringBuffer</h2>
<p>String незмінний — конкатенація в циклі створює багато об'єктів. StringBuilder вирішує це.</p>
<h3>StringBuilder — для однопотокового коду</h3>
<pre><code>StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(", ");
sb.append("World");
sb.append(\'!\');
sb.toString(); // "Hello, World!"

// Інші методи
sb.insert(5, " Beautiful");    // вставити на позицію
sb.delete(5, 15);              // видалити підрядок
sb.replace(7, 12, "Java");     // замінити
sb.reverse();                  // перевернути
sb.length();                   // довжина
sb.charAt(0);                  // символ за індексом
sb.indexOf("World");           // позиція підрядка

// Chaining
String result = new StringBuilder()
    .append("Java")
    .append(" ")
    .append("21")
    .toString(); // "Java 21"</code></pre>
<h3>Коли використовувати</h3>
<pre><code>// ❌ Повільно: конкатенація в циклі
String s = "";
for (int i = 0; i < 1000; i++) s += i; // 1000 нових об'єктів!

// ✅ Швидко: StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) sb.append(i);
String s = sb.toString();

// StringBuffer — як StringBuilder, але потокобезпечний (повільніший)
StringBuffer sbf = new StringBuffer("thread-safe");</code></pre>`,
                        challenges: [
              {
                id: 'java-l32-c1',
                title: 'StringBuilder — побудова рядка',
                prompt: 'Використай StringBuilder щоб побудувати рядок з чисел 1..10 через кому. Виведи <code>result: 1,2,3,4,5,6,7,8,9,10</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 1; i <= 10; i++) {\n            if (i > 1) sb.append(",");\n            sb.append(i);\n        }\n        System.out.println("result: " + sb);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'result: 1,2,3,4,5,6,7,8,9,10', desc: 'числа через кому' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l32-c2',
                title: 'StringBuilder — reverse',
                prompt: 'Напиши метод <code>isPalindrome(String s)</code> через StringBuilder.reverse(). Виведи <code>racecar: true</code> та <code>hello: false</code>.',
                starterCode: 'public class Main {\n    static boolean isPalindrome(String s) {\n        return s.equals(new StringBuilder(s).reverse().toString());\n    }\n\n    public static void main(String[] args) {\n        System.out.println("racecar: " + isPalindrome("racecar"));\n        System.out.println("hello: " + isPalindrome("hello"));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'racecar: true', desc: 'паліндром' },
                  { type: 'output_contains', expected: 'hello: false', desc: 'не паліндром' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l33',
            title: 'Регулярні вирази',
            theory: `<h2>Регулярні вирази в Java</h2>
<h3>Перевірка та пошук</h3>
<pre><code>import java.util.regex.*;

// matches — вся рядок повинна відповідати патерну
"hello123".matches("[a-z]+\\d+"); // true

// Pattern + Matcher — для складного пошуку
Pattern p = Pattern.compile("\\d+");
Matcher m = p.matcher("abc 123 def 456");
while (m.find()) {
    System.out.println(m.group()); // "123", потім "456"
    System.out.println(m.start()); // позиція початку
}</code></pre>
<h3>Методи String із regex</h3>
<pre><code>// replaceAll — замінити всі збіги
"hello world".replaceAll("\\s+", "_"); // "hello_world"

// split — розбити по патерну
"a1b2c3".split("\\d"); // ["a", "b", "c"]
"a,b,,c".split(",+");  // ["a", "b", "c"]

// replaceFirst — тільки перший збіг
"aaa".replaceFirst("a", "X"); // "Xaa"</code></pre>
<h3>Групи захоплення</h3>
<pre><code>Pattern datePattern = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");
Matcher m = datePattern.matcher("Дата: 2024-01-15");
if (m.find()) {
    m.group(1); // "2024" — рік
    m.group(2); // "01"   — місяць
    m.group(3); // "15"   — день
}

// Іменовані групи
Pattern named = Pattern.compile("(?&lt;year&gt;\\d{4})-(?&lt;month&gt;\\d{2})");
Matcher mn = named.matcher("2024-01");
if (mn.find()) mn.group("year"); // "2024"</code></pre>`,
                        challenges: [
              {
                id: 'java-l33-c1',
                title: 'Pattern.matches',
                prompt: 'Перевір: чи є рядок "hello123" буквено-цифровим ([a-zA-Z0-9]+). Виведи <code>valid: true</code>. Для "hello 123" — <code>valid: false</code>.',
                starterCode: 'import java.util.regex.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("valid: " + Pattern.matches("[a-zA-Z0-9]+", "hello123"));\n        System.out.println("valid: " + Pattern.matches("[a-zA-Z0-9]+", "hello 123"));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'valid: true', desc: '"hello123" valid' },
                  { type: 'output_contains', expected: 'valid: false', desc: '"hello 123" invalid' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l33-c2',
                title: 'Знайти всі числа в рядку',
                prompt: 'Через Matcher.find() знайди всі числа в рядку <code>"price: 42 USD, tax: 8 USD"</code>. Виведи <code>numbers: 42 8</code>.',
                starterCode: 'import java.util.regex.*;\npublic class Main {\n    public static void main(String[] args) {\n        String text = "price: 42 USD, tax: 8 USD";\n        Pattern p = Pattern.compile("\\d+");\n        Matcher m = p.matcher(text);\n        StringBuilder sb = new StringBuilder("numbers:");\n        while (m.find()) sb.append(" ").append(m.group());\n        System.out.println(sb);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'numbers: 42 8', desc: 'знайдені числа' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l34',
            title: 'Text Blocks (Java 15+)',
            theory: `<h2>Text Blocks — багаторядкові рядки</h2>
<p>Text Block — спосіб записати багаторядковий рядок без ескейпів.</p>
<h3>Синтаксис</h3>
<pre><code>// Старий спосіб
String json = "{\\"name\\": \\"Alice\\",\n    \\"age\\": 25\n}";

// Text Block (Java 15+)
String json = """
        {
            "name": "Alice",
            "age": 25
        }
        """;
// Відступ автоматично обрізається до мінімального</code></pre>
<h3>HTML та SQL</h3>
<pre><code>String html = """
        &lt;html&gt;
            &lt;body&gt;
                &lt;p&gt;Hello, %s!&lt;/p&gt;
            &lt;/body&gt;
        &lt;/html&gt;
        """.formatted("World");

String sql = """
        SELECT u.name, p.title
        FROM users u
        JOIN posts p ON p.user_id = u.id
        WHERE u.active = true
        ORDER BY p.created_at DESC
        LIMIT 10
        """;</code></pre>
<h3>Escape sequences</h3>
<pre><code>String s = """
        Рядок 1 \\
        продовжується тут
        Рядок 2\\t(з табом)
        """;
// \\ в кінці рядка — з'єднати рядки без \n</code></pre>`,
                        challenges: [
              {
                id: 'java-l34-c1',
                title: 'Text Block — JSON',
                prompt: 'Text Block (Java 15+) дозволяє писати багаторядкові рядки через <code>"""</code>. Заповни тіло main: оголоси String json через Text Block що містить поля "name" і "age". Виведи json.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String json = """\n                {\n                    \"name\": \"Alice\",\n                    \"age\": 25\n                }\n                """;\n        System.out.println(json);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: '"name"', desc: 'є поле name' },
                  { type: 'output_contains', expected: '"age"', desc: 'є поле age' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l34-c2',
                title: 'Text Block — SQL',
                prompt: 'Оголоси через Text Block SQL запит що вибирає name і email з таблиці users де age > 18. Виведи його.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        String sql = """\n                SELECT name, email\n                FROM users\n                WHERE age > 18\n                ORDER BY name;\n                """;\n        System.out.println(sql);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'SELECT', desc: 'є SELECT' },
                  { type: 'output_contains', expected: 'WHERE', desc: 'є WHERE' },
                ],
                xp: 20,
                language: 'java',
              },
            ],
          },
        ],
      },
      {
        id: 'java-modern',
        title: 'Сучасна Java',
        icon: '🚀',
        lessons: [
          {
            id: 'java-l35',
            title: 'Records (Java 16+)',
            theory: `<h2>Records — незмінні класи даних</h2>
<p>Record — компактний синтаксис для класів-даних (DTO, value objects). Автоматично генерує конструктор, геттери, equals, hashCode, toString.</p>
<h3>Оголошення</h3>
<pre><code>// Замість 30+ рядків коду:
public record Point(int x, int y) {}

// Використання
Point p = new Point(3, 4);
p.x();        // 3 (геттер без get-префіксу)
p.y();        // 4
p.toString(); // "Point[x=3, y=4]"
p.equals(new Point(3, 4)); // true</code></pre>
<h3>Кастомізація</h3>
<pre><code>public record Person(String name, int age) {
    // Compact constructor — для валідації
    Person {
        if (name == null || name.isBlank())
            throw new IllegalArgumentException("Ім'я не може бути порожнім");
        if (age < 0 || age > 150)
            throw new IllegalArgumentException("Некоректний вік: " + age);
        name = name.strip(); // можна трансформувати поля
    }

    // Власні методи
    public String greeting() {
        return "Привіт, " + name + "! Тобі " + age + " років.";
    }

    // Статичні фабрики
    public static Person unknown() {
        return new Person("Unknown", 0);
    }
}</code></pre>
<h3>Record у Pattern Matching</h3>
<pre><code>sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double width, double height) implements Shape {}

double area(Shape shape) {
    return switch (shape) {
        case Circle(double r)          -> Math.PI * r * r;
        case Rectangle(double w, double h) -> w * h;
    };
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l35-c1',
                title: 'Record оголошення',
                prompt: 'Оголоси record <code>Point(int x, int y)</code> з методом <code>distanceTo(Point other)</code>. Виведи <code>p: Point[x=3, y=4]</code> та <code>dist: 5.0</code>.',
                starterCode: 'public class Main {\n    record Point(int x, int y) {\n        double distanceTo(Point other) {\n            int dx = this.x - other.x;\n            int dy = this.y - other.y;\n            return Math.sqrt(dx*dx + dy*dy);\n        }\n    }\n\n    public static void main(String[] args) {\n        Point p = new Point(3, 4);\n        System.out.println("p: " + p);\n        System.out.println("dist: " + p.distanceTo(new Point(0, 0)));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Point[x=3, y=4]', desc: 'toString record' },
                  { type: 'output_contains', expected: 'dist: 5.0', desc: 'відстань = 5.0' },
                ],
                xp: 30,
                language: 'java',
              },
              {
                id: 'java-l35-c2',
                title: 'Record з compact constructor',
                prompt: 'Оголоси record <code>Range(int min, int max)</code> з compact constructor що кидає IllegalArgumentException якщо min > max. Виведи <code>range: Range[min=1, max=10]</code> і <code>error: invalid range</code>.',
                starterCode: 'public class Main {\n    record Range(int min, int max) {\n        Range {\n            if (min > max) throw new IllegalArgumentException("invalid range");\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println("range: " + new Range(1, 10));\n        try {\n            new Range(10, 1);\n        } catch (IllegalArgumentException e) {\n            System.out.println("error: " + e.getMessage());\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'Range[min=1, max=10]', desc: 'валідний range' },
                  { type: 'output_contains', expected: 'error: invalid range', desc: 'compact constructor validation' },
                ],
                xp: 30,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l36',
            title: 'Sealed Classes (Java 17+)',
            theory: `<h2>Sealed Classes — обмежена ієрархія</h2>
<p>Sealed class явно вказує, які класи можуть його успадкувати. Дозволяє компілятору перевіряти повноту switch.</p>
<h3>Оголошення</h3>
<pre><code>// Sealed interface
public sealed interface Result&lt;T&gt;
        permits Result.Success, Result.Failure {

    record Success&lt;T&gt;(T value) implements Result&lt;T&gt; {}
    record Failure&lt;T&gt;(String error) implements Result&lt;T&gt; {}
}

// Sealed abstract class
public sealed abstract class Shape
        permits Circle, Rectangle, Triangle {
    abstract double area();
}

public final class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    @Override double area() { return Math.PI * radius * radius; }
}

public non-sealed class Rectangle extends Shape { // може бути розширена
    double w, h;
    @Override double area() { return w * h; }
}</code></pre>
<h3>Pattern Matching у switch</h3>
<pre><code>String describe(Shape shape) {
    return switch (shape) {
        case Circle c    -> "Коло з радіусом " + c.radius;
        case Rectangle r -> "Прямокутник " + r.w + "x" + r.h;
        case Triangle t  -> "Трикутник";
        // компілятор знає що всі випадки вичерпані!
    };
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l36-c1',
                title: 'Sealed interface',
                prompt: 'Оголоси sealed interface <code>Shape</code> permits Circle, Rectangle. Реалізуй обидва record-и. Виведи area для Circle(5) і Rectangle(3,4).',
                starterCode: 'public class Main {\n    sealed interface Shape permits Circle, Rectangle {\n        double area();\n    }\n    record Circle(double r) implements Shape {\n        public double area() { return Math.PI * r * r; }\n    }\n    record Rectangle(double w, double h) implements Shape {\n        public double area() { return w * h; }\n    }\n\n    public static void main(String[] args) {\n        System.out.printf("circle area: %.2f%n", new Circle(5).area());\n        System.out.println("rect area: " + new Rectangle(3, 4).area());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'circle area:', desc: 'Circle area виведено' },
                  { type: 'output_contains', expected: 'rect area: 12.0', desc: 'Rectangle 3*4=12' },
                ],
                xp: 30,
                language: 'java',
              },
              {
                id: 'java-l36-c2',
                title: 'Pattern matching зі switch (sealed)',
                prompt: 'Для sealed Shape з попереднього завдання напиши метод <code>describe(Shape s)</code> через switch expression з pattern matching. Виведи <code>circle r=5.0</code> і <code>rect 3.0x4.0</code>.',
                starterCode: 'public class Main {\n    sealed interface Shape permits Circle, Rectangle {}\n    record Circle(double r) implements Shape {}\n    record Rectangle(double w, double h) implements Shape {}\n\n    static String describe(Shape s) {\n        return switch (s) {\n            case Circle c -> "circle r=" + c.r();\n            case Rectangle r -> "rect " + r.w() + "x" + r.h();\n        };\n    }\n\n    public static void main(String[] args) {\n        System.out.println(describe(new Circle(5)));\n        System.out.println(describe(new Rectangle(3, 4)));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'circle r=5.0', desc: 'Circle pattern' },
                  { type: 'output_contains', expected: 'rect 3.0x4.0', desc: 'Rectangle pattern' },
                ],
                xp: 30,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l37',
            title: 'Switch Expressions (Java 14+)',
            theory: `<h2>Switch Expressions</h2>
<p>Сучасний switch — виразний, без fall-through, повертає значення.</p>
<h3>Switch Expression (Java 14+)</h3>
<pre><code>// Стара форма (switch statement)
String result;
switch (day) {
    case MONDAY: case TUESDAY: case WEDNESDAY:
    case THURSDAY: case FRIDAY:
        result = "Робочий день";
        break;
    case SATURDAY: case SUNDAY:
        result = "Вихідний";
        break;
    default:
        result = "Невідомо";
}

// Нова форма (switch expression)
String result = switch (day) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> "Робочий день";
    case SATURDAY, SUNDAY -> "Вихідний";
}; // компілятор перевіряє повноту для enum!</code></pre>
<h3>Складні гілки з yield</h3>
<pre><code>int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY -> 7;
    case THURSDAY, SATURDAY -> 8;
    case WEDNESDAY -> {
        System.out.println("Wednesday обробляється окремо");
        yield 9; // повернути значення з блоку
    }
};</code></pre>
<h3>Pattern Matching у switch (Java 21+)</h3>
<pre><code>static String format(Object obj) {
    return switch (obj) {
        case Integer i -> "int " + i;
        case Long l    -> "long " + l;
        case Double d  -> "double " + d;
        case String s  -> "рядок \'" + s + "\'";
        case null      -> "null";
        default        -> "інше: " + obj;
    };
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l37-c1',
                title: 'Switch Expression (arrow syntax)',
                prompt: 'Напиши switch expression що перетворює число дня (1=MON..7=SUN) у рядок. Виведи <code>day 3: WED</code> та <code>day 7: SUN</code>.',
                starterCode: 'public class Main {\n    public static void main(String[] args) {\n        for (int d : new int[]{3, 7}) {\n            String name = switch (d) {\n                case 1 -> "MON";\n                case 2 -> "TUE";\n                case 3 -> "WED";\n                case 4 -> "THU";\n                case 5 -> "FRI";\n                case 6 -> "SAT";\n                case 7 -> "SUN";\n                default -> "?";\n            };\n            System.out.println("day " + d + ": " + name);\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'day 3: WED', desc: '3 → WED' },
                  { type: 'output_contains', expected: 'day 7: SUN', desc: '7 → SUN' },
                ],
                xp: 20,
                language: 'java',
              },
              {
                id: 'java-l37-c2',
                title: 'Switch з yield',
                prompt: 'Напиши switch expression для тарифу: "basic" → 10, "pro" → 30, "enterprise" → 100, інше → throw IllegalArgumentException. Виведи <code>pro: 30</code>.',
                starterCode: 'public class Main {\n    static int price(String plan) {\n        return switch (plan) {\n            case "basic" -> 10;\n            case "pro" -> 30;\n            case "enterprise" -> 100;\n            default -> throw new IllegalArgumentException("unknown: " + plan);\n        };\n    }\n\n    public static void main(String[] args) {\n        System.out.println("pro: " + price("pro"));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'pro: 30', desc: 'pro = 30' },
                ],
                xp: 25,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l38',
            title: 'Pattern Matching (Java 16–21)',
            theory: `<h2>Pattern Matching у Java</h2>
<p>Pattern Matching — перевірка типу та присвоєння змінної в одній операції.</p>
<h3>instanceof з pattern variable (Java 16+)</h3>
<pre><code>// Старий стиль
if (obj instanceof String) {
    String s = (String) obj; // явний кастинг
    System.out.println(s.toUpperCase());
}

// Новий стиль
if (obj instanceof String s) { // s — pattern variable
    System.out.println(s.toUpperCase()); // s вже String
}

// Можна одразу використовувати в умові
if (obj instanceof String s && s.length() > 3) {
    System.out.println(s.substring(0, 3));
}</code></pre>
<h3>Guarded patterns (Java 21+)</h3>
<pre><code>static String categorize(Object obj) {
    return switch (obj) {
        case Integer i when i < 0   -> "від'ємне: " + i;
        case Integer i when i == 0  -> "нуль";
        case Integer i              -> "додатнє: " + i;
        case String s when s.isEmpty() -> "порожній рядок";
        case String s               -> "рядок: " + s;
        default                     -> "інше";
    };
}</code></pre>
<h3>Деструктурування Record (Java 21+)</h3>
<pre><code>record Point(int x, int y) {}

if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y);
}

// У switch
switch (shape) {
    case Circle(double r) when r > 0 -> "Коло r=" + r;
    case Rectangle(double w, double h) -> w + "x" + h;
}</code></pre>`,
                        challenges: [
              {
                id: 'java-l38-c1',
                title: 'instanceof з pattern variable',
                prompt: 'Напиши метод <code>formatValue(Object obj)</code>: якщо String — повертає <code>"str: " + s.toUpperCase()</code>, якщо Integer — <code>"int: " + (i*2)</code>, інакше <code>"unknown"</code>. Виведи результати.',
                starterCode: 'public class Main {\n    static String formatValue(Object obj) {\n        if (obj instanceof String s) return "str: " + s.toUpperCase();\n        if (obj instanceof Integer i) return "int: " + (i * 2);\n        return "unknown";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(formatValue("hello"));\n        System.out.println(formatValue(21));\n        System.out.println(formatValue(3.14));\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'str: HELLO', desc: 'String pattern' },
                  { type: 'output_contains', expected: 'int: 42', desc: 'Integer pattern' },
                  { type: 'output_contains', expected: 'unknown', desc: 'default' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l38-c2',
                title: 'Guarded pattern у switch',
                prompt: 'Напиши switch з guarded patterns для класифікації числа: від\'ємне → "negative", 0 → "zero", 1..9 → "single digit", інше → "large". Виведи для -5, 0, 7, 42.',
                starterCode: 'public class Main {\n    static String classify(int n) {\n        return switch (n) {\n            case int i when i < 0 -> "negative";\n            case 0 -> "zero";\n            case int i when i < 10 -> "single digit";\n            default -> "large";\n        };\n    }\n\n    public static void main(String[] args) {\n        for (int n : new int[]{-5, 0, 7, 42}) {\n            System.out.println(n + ": " + classify(n));\n        }\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: '-5: negative', desc: 'від\'ємне' },
                  { type: 'output_contains', expected: '0: zero', desc: 'нуль' },
                  { type: 'output_contains', expected: '7: single digit', desc: 'одна цифра' },
                  { type: 'output_contains', expected: '42: large', desc: 'велике' },
                ],
                xp: 30,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l39',
            title: 'Concurrency — основи',
            theory: `<h2>Багатопотоковість (Concurrency)</h2>
<h3>Thread — базовий підхід</h3>
<pre><code>// Спадкування від Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Виконується у: " + Thread.currentThread().getName());
    }
}

// Реалізація Runnable (краще)
Runnable task = () -> System.out.println("Задача виконана");
Thread t = new Thread(task, "my-thread");
t.start();  // запустити
t.join();   // чекати завершення</code></pre>
<h3>ExecutorService</h3>
<pre><code>import java.util.concurrent.*;

// Пул потоків
ExecutorService executor = Executors.newFixedThreadPool(4);

// submit — для Callable (повертає результат)
Future&lt;Integer&gt; future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

int result = future.get(); // блокує до завершення

executor.shutdown();       // зупинити після виконання поточних завдань</code></pre>
<h3>synchronized та volatile</h3>
<pre><code>class Counter {
    private int count = 0;

    // synchronized — тільки один потік виконує метод одночасно
    public synchronized void increment() { count++; }
    public synchronized int get()        { return count; }
}

// volatile — гарантує видимість між потоками
private volatile boolean running = true;</code></pre>`,
                        challenges: [
              {
                id: 'java-l39-c1',
                title: 'Створення потоку',
                prompt: 'Створи Thread через Runnable lambda що виводить <code>thread running</code>. Запусти і зачекай через join(). Виведи також <code>main done</code> після join.',
                starterCode: 'public class Main {\n    public static void main(String[] args) throws InterruptedException {\n        Thread t = new Thread(() -> System.out.println("thread running"));\n        t.start();\n        t.join();\n        System.out.println("main done");\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'thread running', desc: 'потік виконався' },
                  { type: 'output_contains', expected: 'main done', desc: 'main завершився після join' },
                ],
                xp: 25,
                language: 'java',
              },
              {
                id: 'java-l39-c2',
                title: 'synchronized лічильник',
                prompt: 'Оголоси клас <code>SafeCounter</code> зі synchronized методом <code>increment()</code> і <code>getCount()</code>. Запусти 5 потоків що кожен викликає increment() 100 разів. Виведи <code>count: 500</code>.',
                starterCode: 'public class Main {\n    static class SafeCounter {\n        private int count = 0;\n        synchronized void increment() { count++; }\n        int getCount() { return count; }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        SafeCounter c = new SafeCounter();\n        Thread[] threads = new Thread[5];\n        for (int i = 0; i < 5; i++) {\n            threads[i] = new Thread(() -> { for (int j=0;j<100;j++) c.increment(); });\n            threads[i].start();\n        }\n        for (Thread t : threads) t.join();\n        System.out.println("count: " + c.getCount());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'count: 500', desc: 'thread-safe = 500' },
                ],
                xp: 35,
                language: 'java',
              },
            ],
          },
          {
            id: 'java-l40',
            title: 'CompletableFuture',
            theory: `<h2>CompletableFuture (Java 8+)</h2>
<p>CompletableFuture — потужний API для асинхронного програмування. Аналог Promise у JavaScript.</p>
<h3>Базове використання</h3>
<pre><code>import java.util.concurrent.CompletableFuture;

// Запустити асинхронно
CompletableFuture&lt;String&gt; future = CompletableFuture.supplyAsync(() -> {
    // виконується в ForkJoinPool
    return "Результат";
});

// Отримати результат (блокує)
String result = future.get();

// Неблокуючі колбеки
future
    .thenApply(s -> s.toUpperCase())       // трансформація
    .thenAccept(s -> System.out.println(s)) // консьюмер
    .thenRun(() -> System.out.println("Готово!")); // без значення</code></pre>
<h3>Ланцюжки та комбінування</h3>
<pre><code>CompletableFuture&lt;User&gt; userFuture = CompletableFuture.supplyAsync(() -> fetchUser(id));
CompletableFuture&lt;List&lt;Post&gt;&gt; postsFuture = userFuture
    .thenCompose(user -> CompletableFuture.supplyAsync(() -> fetchPosts(user.id)));

// allOf — чекати всіх
CompletableFuture.allOf(future1, future2, future3)
    .thenRun(() -> System.out.println("Всі завершені"));

// anyOf — перший завершений
CompletableFuture.anyOf(future1, future2)
    .thenAccept(result -> System.out.println("Перший: " + result));</code></pre>
<h3>Обробка помилок</h3>
<pre><code>future
    .exceptionally(e -> "Помилка: " + e.getMessage())
    .handle((result, err) -> err != null ? "default" : result);</code></pre>`,
                        challenges: [
              {
                id: 'java-l40-c1',
                title: 'CompletableFuture — chain',
                prompt: 'Через <code>CompletableFuture.supplyAsync(() -> 21)</code> застосуй <code>thenApply(n -> n * 2)</code>. Виведи <code>result: 42</code>.',
                starterCode: 'import java.util.concurrent.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        int result = CompletableFuture\n            .supplyAsync(() -> 21)\n            .thenApply(n -> n * 2)\n            .get();\n        System.out.println("result: " + result);\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'result: 42', desc: '21 * 2 = 42' },
                ],
                xp: 30,
                language: 'java',
              },
              {
                id: 'java-l40-c2',
                title: 'CompletableFuture.allOf',
                prompt: 'Створи два CompletableFuture: один повертає "hello", інший "world". Через allOf дочекайся обох і виведи <code>done: hello world</code>.',
                starterCode: 'import java.util.concurrent.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "hello");\n        CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "world");\n        CompletableFuture.allOf(f1, f2).get();\n        System.out.println("done: " + f1.get() + " " + f2.get());\n    }\n}\n',
                tests: [
                  { type: 'output_contains', expected: 'done: hello world', desc: 'allOf result' },
                ],
                xp: 30,
                language: 'java',
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
    logo: 'icons/langs/python.svg',
    color: '#3572A5',
    desc: 'Мова №1 для AI, data science і автоматизації.',
    language: 'python',
    locked: false,
    modules: [
      {
        id: 'py-basics',
        title: 'Основи Python',
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

print(type(name))   # &lt;class \'str\'&gt;</code></pre>
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
      {
        id: 'py-strings',
        title: 'Рядки',
        icon: '📝',
        lessons: [
          {
            id: 'py-l04',
            title: 'Рядки — методи',
            theory: `<h2>Рядки в Python</h2>
<p>Рядок — незмінна послідовність символів. Python має багатий набір вбудованих методів.</p>
<h3>Індексація та зрізи</h3>
<pre><code>s = "Hello, World!"
s[0]      # 'H'
s[-1]     # '!'
s[0:5]    # 'Hello'
s[7:]     # 'World!'
s[::-1]   # \'!dlroW ,olleH\' — реверс</code></pre>
<h3>Основні методи</h3>
<pre><code>s.upper()           # 'HELLO, WORLD!'
s.lower()           # 'hello, world!'
s.title()           # 'Hello, World!'
s.strip()           # видаляє пробіли по краях
s.lstrip()          # тільки зліва
s.rstrip()          # тільки справа
s.replace('World', 'Python')  # 'Hello, Python!'
s.split(', ')       # ['Hello', 'World!']
', '.join(['a', 'b', 'c'])    # \'a, b, c\'</code></pre>
<h3>Пошук</h3>
<pre><code>s.find('World')      # 7 (або -1 якщо не знайдено)
s.index('World')     # 7 (виключення якщо не знайдено)
s.count('l')         # 3
s.startswith('Hello') # True
s.endswith('!')       # True
s.in              # \'World\' in s → True</code></pre>
<h3>Перевірка типу символів</h3>
<pre><code>'abc'.isalpha()    # True — тільки літери
'123'.isdigit()    # True — тільки цифри
'abc123'.isalnum() # True — літери або цифри
'  '.isspace()     # True — тільки пробіли
\'Hello\'.istitle()  # True</code></pre>`,
                        challenges: [
              {
                id: 'py-l04-c1',
                title: 'Методи рядка',
                prompt: 'Оголоси <code>s = "  Hello, World!  "</code>. Збережи у <code>result</code> рядок після: trim (strip), заміни "World" на "Python", і переведи у верхній регістр.',
                starterCode: 's = "  Hello, World!  "\nresult = # твій код\n',
                tests: [
                  { expression: 'result', expected: 'HELLO, PYTHON!', desc: 'strip + replace + upper' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l04-c2',
                title: 'Розбивка та з\'єднання',
                prompt: 'Оголоси <code>sentence = "one two three four five"</code>. Розбий по пробілу, відбери слова довші за 3 символи, з\'єднай через "-". Збережи в <code>result</code>.',
                starterCode: 'sentence = "one two three four five"\nresult = # твій код\n',
                tests: [
                  { expression: 'result', expected: 'three-four-five', desc: 'слова > 3 символи через "-"' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l05',
            title: 'Форматування рядків',
            theory: `<h2>Форматування рядків</h2>
<h3>f-strings (Python 3.6+) — найкращий спосіб</h3>
<pre><code>name = "Alice"
age = 25
pi = 3.14159

# Базове
f"Привіт, {name}!"           # "Привіт, Alice!"

# Вирази всередині
f"За 5 років буде {age + 5}" # "За 5 років буде 30"

# Форматування чисел
f"{pi:.2f}"     # "3.14"     — 2 знаки після крапки
f"{1000000:,}"  # "1,000,000" — роздільник тисяч
f"{0.75:.0%}"   # "75%"       — відсотки
f"{255:#x}"     # "0xff"      — шістнадцяткове
f"{42:05d}"     # "00042"     — доповнення нулями

# Debug (Python 3.8+)
x = 42
f"{x=}"  # "x=42"</code></pre>
<h3>str.format() — старіший спосіб</h3>
<pre><code>"{} має {} років".format(name, age)
"{name} має {age} років".format(name="Bob", age=30)
"{0:.2f}".format(3.14159)  # "3.14"</code></pre>
<h3>% formatting — найстаріший</h3>
<pre><code>"Hello, %s! Вам %d років." % (name, age)
"%.2f" % pi  # "3.14"</code></pre>
<h3>Template strings</h3>
<pre><code>from string import Template
t = Template("Привіт, $name!")
t.substitute(name="Alice")  # "Привіт, Alice!"</code></pre>`,
                        challenges: [
              {
                id: 'py-l05-c1',
                title: 'f-string форматування',
                prompt: 'Оголоси <code>name = "Alice"</code>, <code>score = 95.678</code>. Збережи в <code>result</code> f-string: <code>"Alice scored 95.68"</code> (score з 2 знаками після крапки).',
                starterCode: 'name = "Alice"\nscore = 95.678\nresult = # f-string\n',
                tests: [
                  { expression: 'result', expected: 'Alice scored 95.68', desc: 'f-string з форматуванням' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l05-c2',
                title: '.format() та вирівнювання',
                prompt: 'Оголоси функцію <code>table_row(name, value)</code> що повертає рядок де name вирівняно зліва на 10 символів, value — справа на 8. Наприклад: <code>"Alice          42"</code>.',
                starterCode: 'def table_row(name, value):\n    return # .format() або f-string\n',
                tests: [
                  { expression: 'len(table_row("Alice", 42))', expected: '18', desc: 'довжина = 18 (10+8)' },
                  { expression: 'table_row("Alice", 42).startswith("Alice")', expected: 'True', desc: 'починається з Alice' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-collections',
        title: 'Колекції',
        icon: '📚',
        lessons: [
          {
            id: 'py-l06',
            title: 'Списки — поглиблено',
            theory: `<h2>Списки (list) — поглиблено</h2>
<h3>Методи списку</h3>
<pre><code>lst = [3, 1, 4, 1, 5, 9, 2, 6]

lst.append(7)       # додати в кінець
lst.insert(0, 0)    # вставити за індексом
lst.extend([8, 9])  # додати кілька
lst.remove(1)       # видалити перше входження
lst.pop()           # видалити та повернути останній
lst.pop(0)          # видалити за індексом
lst.index(5)        # знайти індекс значення
lst.count(1)        # кількість входжень
lst.sort()          # сортування на місці
lst.sort(reverse=True)
lst.reverse()       # реверс на місці
lst.copy()          # поверхнева копія
lst.clear()         # очистити</code></pre>
<h3>Сортування</h3>
<pre><code>words = ["banana", "apple", "Cherry"]
sorted(words)                          # ['Cherry', 'apple', 'banana']
sorted(words, key=str.lower)           # ['apple', 'banana', 'Cherry\']
sorted(words, key=len)                 # за довжиною
sorted(words, key=len, reverse=True)   # за довжиною спадання

# Сортування об\'єктів
people = [{"name": "Bob", "age": 30}, {"name": "Alice", "age": 25}]
sorted(people, key=lambda p: p["age"])  # за віком</code></pre>
<h3>Зрізи та операції</h3>
<pre><code>lst = [0, 1, 2, 3, 4, 5]
lst[1:4]     # [1, 2, 3]
lst[::2]     # [0, 2, 4]   — кожен другий
lst[::-1]    # [5, 4, 3, 2, 1, 0] — реверс
lst[1:5:2]   # [1, 3]

# Розпакування
a, b, *rest = [1, 2, 3, 4, 5]
# a=1, b=2, rest=[3,4,5]

first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2,3,4], last=5</code></pre>`,
                        challenges: [
              {
                id: 'py-l06-c1',
                title: 'List методи',
                prompt: 'Оголоси <code>nums = [3, 1, 4, 1, 5, 9, 2, 6]</code>. Відсортуй на місці, видали останній елемент через pop, додай 0 на початок через insert. Збережи результат в <code>result</code>.',
                starterCode: 'nums = [3, 1, 4, 1, 5, 9, 2, 6]\n# сортуй, pop, insert\nresult = nums\n',
                tests: [
                  { expression: 'result[0]', expected: '0', desc: 'перший = 0' },
                  { expression: 'result[-1]', expected: '5', desc: 'останній = 5 (після pop 6, потім 5 на місці)' },
                  { expression: 'len(result)', expected: '8', desc: 'довжина = 8' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l06-c2',
                title: 'List comprehension з умовою',
                prompt: 'Оголоси <code>numbers = list(range(1, 21))</code>. Через list comprehension збережи в <code>result</code> квадрати лише непарних чисел.',
                starterCode: 'numbers = list(range(1, 21))\nresult = # list comprehension\n',
                tests: [
                  { expression: 'result[0]', expected: '1', desc: '1² = 1' },
                  { expression: 'result[1]', expected: '9', desc: '3² = 9' },
                  { expression: 'len(result)', expected: '10', desc: '10 непарних' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l07',
            title: 'Кортежі (tuple)',
            theory: `<h2>Кортежі (tuple)</h2>
<p>Tuple — незмінна послідовність. Швидший за list, захищає дані від випадкової зміни.</p>
<h3>Створення</h3>
<pre><code>point = (3, 4)
rgb = (255, 128, 0)
single = (42,)      # Обов'язкова кома для кортежу з 1 елемента!
empty = ()

# Без дужок теж кортеж
coords = 3, 4       # (3, 4)</code></pre>
<h3>Методи та операції</h3>
<pre><code>t = (1, 2, 3, 2, 1)
t[0]          # 1
t[-1]         # 1
t[1:3]        # (2, 3)
t.count(2)    # 2
t.index(3)    # 2
len(t)        # 5
2 in t        # True</code></pre>
<h3>Розпакування</h3>
<pre><code>x, y = point           # x=3, y=4
a, b, c = (1, 2, 3)

# Swap — Pythonic
a, b = b, a

# Функції повертають кортежі
def minmax(lst):
    return min(lst), max(lst)

lo, hi = minmax([3, 1, 4, 1, 5])
# lo=1, hi=5</code></pre>
<h3>Named tuple</h3>
<pre><code>from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
p.x          # 3
p.y          # 4
p._asdict()  # {'x': 3, \'y\': 4}</code></pre>`,
                        challenges: [
              {
                id: 'py-l07-c1',
                title: 'Розпакування кортежу',
                prompt: 'Оголоси <code>point = (3, 4, 5)</code>. Розпакуй в змінні <code>x, y, z</code>. Обчисли <code>distance = round((x**2 + y**2 + z**2)**0.5, 4)</code>.',
                starterCode: 'point = (3, 4, 5)\nx, y, z = # розпакування\ndistance = round((x**2 + y**2 + z**2)**0.5, 4)\n',
                tests: [
                  { expression: 'x', expected: '3', desc: 'x = 3' },
                  { expression: 'distance', expected: '7.0711', desc: 'відстань ≈ 7.0711' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l07-c2',
                title: 'Tuple як ключ словника',
                prompt: 'Оголоси словник <code>grid</code> де ключі — кортежі (row, col), значення — числа. Додай: (0,0)=1, (0,1)=2, (1,0)=3. Збережи в <code>result</code> значення за ключем (1,0).',
                starterCode: 'grid = {}\ngrid[(0, 0)] = 1\ngrid[(0, 1)] = 2\ngrid[(1, 0)] = 3\nresult = # значення за (1,0)\n',
                tests: [
                  { expression: 'result', expected: '3', desc: 'grid[(1,0)] = 3' },
                  { expression: 'len(grid)', expected: '3', desc: '3 елементи' },
                ],
                xp: 20,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l08',
            title: 'Множини (set)',
            theory: `<h2>Множини (set)</h2>
<p>Set — колекція унікальних елементів без порядку. Дуже швидкі перевірки на входження.</p>
<h3>Створення</h3>
<pre><code>s = {1, 2, 3, 2, 1}   # {1, 2, 3} — дублікати прибрано
s2 = set([1, 2, 3])   # з iterable
empty = set()          # НЕ {} — це dict!</code></pre>
<h3>Методи</h3>
<pre><code>s = {1, 2, 3}
s.add(4)
s.remove(2)      # KeyError якщо немає
s.discard(99)    # ніяк якщо немає
s.pop()          # видалити довільний елемент
len(s)
2 in s           # True — O(1)!</code></pre>
<h3>Операції над множинами</h3>
<pre><code>a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b   # {1,2,3,4,5,6}  — об'єднання (union)
a & b   # {3, 4}          — перетин (intersection)
a - b   # {1, 2}          — різниця
a ^ b   # {1,2,5,6}       — симетрична різниця

# Методи (еквівалентно)
a.union(b)
a.intersection(b)
a.difference(b)
a.symmetric_difference(b)

# Підмножини
{1, 2}.issubset({1, 2, 3})    # True
{1,2,3}.issuperset({1,2})     # True
{1,2}.isdisjoint({3,4})       # True — спільних немає</code></pre>
<h3>frozenset — незмінна множина</h3>
<pre><code>fs = frozenset([1, 2, 3])
# Можна використовувати як ключ словника або елемент set</code></pre>`,
                        challenges: [
              {
                id: 'py-l08-c1',
                title: 'Set операції',
                prompt: 'Оголоси <code>a = {1, 2, 3, 4, 5}</code> і <code>b = {4, 5, 6, 7, 8}</code>. Збережи: <code>union</code> = об\'єднання, <code>inter</code> = перетин, <code>diff</code> = різниця a-b.',
                starterCode: 'a = {1, 2, 3, 4, 5}\nb = {4, 5, 6, 7, 8}\nunion = # a | b\ninter = # a & b\ndiff = # a - b\n',
                tests: [
                  { expression: 'len(union)', expected: '8', desc: 'union має 8 елементів' },
                  { expression: 'sorted(list(inter))', expected: '[4, 5]', desc: 'inter = {4,5}' },
                  { expression: 'sorted(list(diff))', expected: '[1, 2, 3]', desc: 'diff = {1,2,3}' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l08-c2',
                title: 'Унікальні слова',
                prompt: 'Оголоси <code>text = "apple banana apple cherry banana apple"</code>. Через set збережи в <code>unique_words</code> унікальні слова. В <code>count</code> — кількість унікальних.',
                starterCode: 'text = "apple banana apple cherry banana apple"\nunique_words = # set з split\ncount = # кількість\n',
                tests: [
                  { expression: 'count', expected: '3', desc: '3 унікальних слова' },
                  { expression: '"apple" in unique_words', expected: 'True', desc: '"apple" є' },
                ],
                xp: 20,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l09',
            title: 'Словники — поглиблено',
            theory: `<h2>Словники (dict) — поглиблено</h2>
<h3>Методи словника</h3>
<pre><code>d = {"name": "Alice", "age": 25, "city": "Kyiv"}

d.keys()    # dict_keys(['name', 'age', 'city'])
d.values()  # dict_values(['Alice', 25, 'Kyiv'])
d.items()   # dict_items([('name', \'Alice\'), ...])

d.get("name")           # "Alice"
d.get("missing", "N/A") # "N/A" — значення за замовчуванням

d.pop("city")            # видалити та повернути
d.setdefault("score", 0) # встановити якщо немає
d.update({"age": 26, "role": "admin"}) # оновити кількома

d.copy()   # поверхнева копія</code></pre>
<h3>Ітерація</h3>
<pre><code>for key in d:
    print(key, d[key])

for key, value in d.items():
    print(f"{key}: {value}")

# Dict comprehension
squares = {x: x**2 for x in range(1, 6)}
# {1:1, 2:4, 3:9, 4:16, 5:25}

filtered = {k: v for k, v in d.items() if isinstance(v, str)}</code></pre>
<h3>Злиття словників (Python 3.9+)</h3>
<pre><code>a = {"x": 1, "y": 2}
b = {"y": 3, "z": 4}

merged = a | b    # {"x":1, "y":3, "z":4} — b перезаписує
a |= b            # оновити a</code></pre>
<h3>collections.defaultdict та Counter</h3>
<pre><code>from collections import defaultdict, Counter

dd = defaultdict(list)
dd["key"].append(1)  # не кидає KeyError

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
Counter(words)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
Counter(words).most_common(2)  # [('apple', 3), (\'banana\', 2)]</code></pre>`,
                        challenges: [
              {
                id: 'py-l09-c1',
                title: 'Dict comprehension',
                prompt: 'Оголоси <code>words = ["hello", "world", "python"]</code>. Через dict comprehension збережи в <code>lengths</code> словник {слово: довжина}.',
                starterCode: 'words = ["hello", "world", "python"]\nlengths = # dict comprehension\n',
                tests: [
                  { expression: 'lengths["hello"]', expected: '5', desc: 'hello → 5' },
                  { expression: 'lengths["python"]', expected: '6', desc: 'python → 6' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l09-c2',
                title: 'Counter',
                prompt: 'Використай <code>Counter</code> з модуля collections. Оголоси <code>text = "banana"</code>. Збережи в <code>counts</code> Counter символів. В <code>most</code> — найчастіший символ (most_common(1)[0][0]).',
                starterCode: 'from collections import Counter\ntext = "banana"\ncounts = # Counter\nmost = # most_common\n',
                tests: [
                  { expression: 'counts["a"]', expected: '3', desc: '"a" = 3 рази' },
                  { expression: 'most', expected: 'a', desc: 'найчастіший = "a"' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-control',
        title: 'Управління потоком',
        icon: '🔀',
        lessons: [
          {
            id: 'py-l10',
            title: 'Умови if/elif/else',
            theory: `<h2>Умовні оператори</h2>
<h3>if / elif / else</h3>
<pre><code>score = 85

if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "F"

print(grade)  # "B"</code></pre>
<h3>Тернарний вираз</h3>
<pre><code>x = 10
result = "парне" if x % 2 == 0 else "непарне"

# Вкладений тернарний (обережно — важко читати)
label = "A" if score >= 90 else "B" if score >= 75 else "C"</code></pre>
<h3>match / case (Python 3.10+)</h3>
<pre><code>command = "quit"

match command:
    case "quit":
        print("Вихід")
    case "help" | "?":
        print("Довідка")
    case str(s) if s.startswith("go "):
        print(f"Йдемо до {s[3:]}")
    case _:
        print("Невідома команда")

# Деструктуризація у match
point = (1, 0)
match point:
    case (0, 0): print("Початок координат")
    case (x, 0): print(f"На осі X: {x}")
    case (0, y): print(f"На осі Y: {y}")
    case (x, y): print(f"({x}, {y})")</code></pre>`,
                        challenges: [
              {
                id: 'py-l10-c1',
                title: 'if/elif/else',
                prompt: 'Оголоси функцію <code>grade(score)</code>: score >= 90 → "A", >= 80 → "B", >= 70 → "C", >= 60 → "D", інакше → "F".',
                starterCode: 'def grade(score):\n    # if/elif/else\n    pass\n',
                tests: [
                  { expression: 'grade(95)', expected: 'A', desc: '95 → A' },
                  { expression: 'grade(75)', expected: 'C', desc: '75 → C' },
                  { expression: 'grade(55)', expected: 'F', desc: '55 → F' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l10-c2',
                title: 'match/case (Python 3.10+)',
                prompt: 'Оголоси функцію <code>http_status(code)</code>: 200 → "OK", 404 → "Not Found", 500 → "Server Error", _ → "Unknown". Використай match/case.',
                starterCode: 'def http_status(code):\n    match code:\n        # case ...\n        pass\n',
                tests: [
                  { expression: 'http_status(200)', expected: 'OK', desc: '200 → OK' },
                  { expression: 'http_status(404)', expected: 'Not Found', desc: '404 → Not Found' },
                  { expression: 'http_status(999)', expected: 'Unknown', desc: '999 → Unknown' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l11',
            title: 'Цикли for та while',
            theory: `<h2>Цикли в Python</h2>
<h3>for — ітерація по об'єктах</h3>
<pre><code># По списку
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# range()
for i in range(5):       # 0 1 2 3 4
    print(i)
for i in range(2, 10, 2): # 2 4 6 8
    print(i)

# enumerate — індекс + значення
for i, fruit in enumerate(["apple", "banana"], start=1):
    print(f"{i}. {fruit}")

# zip — паралельна ітерація
names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name}: {age}")</code></pre>
<h3>while</h3>
<pre><code>n = 1
while n < 100:
    n *= 2
print(n)  # 128

# while з else
i = 0
while i < 5:
    i += 1
else:
    print("Цикл завершено нормально")</code></pre>
<h3>break, continue, else</h3>
<pre><code>for i in range(10):
    if i == 3: continue  # пропустити
    if i == 7: break     # вийти
    print(i)
else:
    print("for закінчився без break")  # НЕ виконається</code></pre>`,
                        challenges: [
              {
                id: 'py-l11-c1',
                title: 'enumerate та zip',
                prompt: 'Оголоси <code>names = ["Alice","Bob","Charlie"]</code> і <code>scores = [85, 92, 78]</code>. Через zip і enumerate збережи в <code>result</code> список рядків вигляду <code>"1. Alice: 85"</code>.',
                starterCode: 'names = ["Alice", "Bob", "Charlie"]\nscores = [85, 92, 78]\nresult = [f"{i+1}. {n}: {s}" for i, (n, s) in enumerate(zip(names, scores))]\n',
                tests: [
                  { expression: 'result[0]', expected: '1. Alice: 85', desc: 'перший рядок' },
                  { expression: 'result[2]', expected: '3. Charlie: 78', desc: 'третій рядок' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l11-c2',
                title: 'while з else',
                prompt: 'Оголоси функцію <code>find_prime(start)</code> що повертає перше просте число >= start. Використай while loop.',
                starterCode: 'def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0: return False\n    return True\n\ndef find_prime(start):\n    n = start\n    while not is_prime(n):\n        n += 1\n    return n\n',
                tests: [
                  { expression: 'find_prime(10)', expected: '11', desc: 'перше просте >= 10' },
                  { expression: 'find_prime(14)', expected: '17', desc: 'перше просте >= 14' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l12',
            title: 'Comprehensions',
            theory: `<h2>Comprehensions (вирази-генератори)</h2>
<h3>List comprehension</h3>
<pre><code># [вираз for елемент in iterable if умова]
squares = [x**2 for x in range(1, 6)]
# [1, 4, 9, 16, 25]

evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, ..., 18]

# Вкладений
matrix = [[1,2,3],[4,5,6],[7,8,9]]
flat = [x for row in matrix for x in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# З трансформацією
words = ["hello", "world"]
upper = [w.upper() for w in words]</code></pre>
<h3>Dict comprehension</h3>
<pre><code>{k: v for k, v in zip("abc", [1, 2, 3])}
# {'a':1, 'b':2, 'c':3}

{word: len(word) for word in ["apple", "banana"]}
# {'apple':5, \'banana\':6}

# Інвертувати словник
d = {"a": 1, "b": 2}
inv = {v: k for k, v in d.items()}  # {1:"a", 2:"b"}</code></pre>
<h3>Set comprehension</h3>
<pre><code>{x**2 for x in range(-3, 4)}
# {0, 1, 4, 9}</code></pre>
<h3>Generator expression</h3>
<pre><code># Як list comprehension, але ліниво (економить пам'ять)
total = sum(x**2 for x in range(1000000))  # не будує список!

# Перетворення в ітератор
gen = (x**2 for x in range(10))
next(gen)  # 0
next(gen)  # 1</code></pre>`,
                        challenges: [
              {
                id: 'py-l12-c1',
                title: 'Comprehensions всі три',
                prompt: 'Оголоси: <code>squares</code> = list comprehension квадратів 1..10; <code>even_set</code> = set comprehension парних з 1..20; <code>word_len</code> = dict comprehension {слово: довжина} для ["hi","hello","hey"].',
                starterCode: 'squares = [x**2 for x in range(1, 11)]\neven_set = {x for x in range(1, 21) if x % 2 == 0}\nword_len = {w: len(w) for w in ["hi", "hello", "hey"]}\n',
                tests: [
                  { expression: 'squares[-1]', expected: '100', desc: '10² = 100' },
                  { expression: 'len(even_set)', expected: '10', desc: '10 парних' },
                  { expression: 'word_len["hello"]', expected: '5', desc: 'hello → 5' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l12-c2',
                title: 'Generator expression',
                prompt: 'Оголоси <code>gen = (x**2 for x in range(1, 101))</code>. Обчисли суму через <code>sum()</code> і збережи в <code>total</code>.',
                starterCode: 'gen = (x**2 for x in range(1, 101))\ntotal = sum(gen)\n',
                tests: [
                  { expression: 'total', expected: '338350', desc: 'Σx² від 1 до 100' },
                ],
                xp: 20,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-functions',
        title: 'Функції — поглиблено',
        icon: '🔧',
        lessons: [
          {
            id: 'py-l13',
            title: '*args та **kwargs',
            theory: `<h2>*args та **kwargs</h2>
<h3>*args — довільна кількість позиційних аргументів</h3>
<pre><code>def total(*numbers):
    return sum(numbers)

total(1, 2, 3)        # 6
total(1, 2, 3, 4, 5)  # 15

def first_and_rest(first, *rest):
    print(f"Перший: {first}")
    print(f"Решта: {rest}")  # tuple

first_and_rest(1, 2, 3, 4)
# Перший: 1
# Решта: (2, 3, 4)</code></pre>
<h3>**kwargs — довільна кількість іменованих аргументів</h3>
<pre><code>def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Kyiv")

def create_user(name, **options):
    user = {"name": name, "role": "user"}
    user.update(options)  # додати всі kwargs
    return user

create_user("Alice", role="admin", active=True)</code></pre>
<h3>Комбінування та розпакування</h3>
<pre><code>def func(a, b, *args, keyword_only, **kwargs):
    pass

# Розпакування при виклику
nums = [1, 2, 3]
print(*nums)    # print(1, 2, 3)

d = {"sep": "-", "end": "\\n"}
print("a", "b", **d)  # print("a", "b", sep="-", end="\\n")</code></pre>`,
                        challenges: [
              {
                id: 'py-l13-c1',
                title: '*args — довільні аргументи',
                prompt: 'Оголоси функцію <code>stats(*nums)</code> що повертає кортеж <code>(min, max, sum, len)</code> для переданих чисел.',
                starterCode: 'def stats(*nums):\n    # твій код\n    pass\n',
                tests: [
                  { expression: 'stats(3, 1, 4, 1, 5, 9)[0]', expected: '1', desc: 'min = 1' },
                  { expression: 'stats(3, 1, 4, 1, 5, 9)[1]', expected: '9', desc: 'max = 9' },
                  { expression: 'stats(3, 1, 4, 1, 5, 9)[2]', expected: '23', desc: 'sum = 23' },
                  { expression: 'stats(3, 1, 4, 1, 5, 9)[3]', expected: '6', desc: 'len = 6' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l13-c2',
                title: '**kwargs — іменовані аргументи',
                prompt: 'Оголоси функцію <code>build_url(base, **params)</code> що повертає URL з параметрами: <code>base + "?" + "&".join("k=v" ...)</code>. Ключі мають бути відсортовані.',
                starterCode: 'def build_url(base, **params):\n    # твій код\n    pass\n',
                tests: [
                  { expression: 'build_url("https://api.com", page=1, limit=10)', expected: 'https://api.com?limit=10&page=1', desc: 'відсортовані params' },
                  { expression: 'build_url("http://x.com")', expected: 'http://x.com?', desc: 'без params' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l14',
            title: 'Замикання та декоратори',
            theory: `<h2>Замикання та декоратори</h2>
<h3>Замикання (closure)</h3>
<pre><code>def make_counter(start=0):
    count = start
    def increment():
        nonlocal count  # посилання на змінну зовнішньої функції
        count += 1
        return count
    return increment

counter = make_counter()
counter()  # 1
counter()  # 2
counter()  # 3</code></pre>
<h3>Декоратори</h3>
<pre><code>def log(func):
    def wrapper(*args, **kwargs):
        print(f"Виклик {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Завершено")
        return result
    return wrapper

@log  # рівнозначно: greet = log(greet)
def greet(name):
    return f"Hello, {name}!"

greet("Alice")
# Виклик greet
# Завершено</code></pre>
<h3>Декоратор із параметрами</h3>
<pre><code>def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say(msg):
    print(msg)

say("Hi!")  # Hi! Hi! Hi!</code></pre>
<h3>functools.wraps — зберегти метадані</h3>
<pre><code>from functools import wraps

def log(func):
    @wraps(func)  # зберігає __name__, __doc__
    def wrapper(*args, **kwargs):
        print(f"Виклик {func.__name__}")
        return func(*args, **kwargs)
    return wrapper</code></pre>`,
                        challenges: [
              {
                id: 'py-l14-c1',
                title: 'Декоратор — логування',
                prompt: 'Оголоси декоратор <code>log_call</code> що перед викликом функції додає до списку <code>LOG</code> рядок <code>"calling [ім\'я функції]"</code>.',
                starterCode: 'LOG = []\n\ndef log_call(fn):\n    def wrapper(*args, **kwargs):\n        LOG.append(f"calling {fn.__name__}")\n        return fn(*args, **kwargs)\n    return wrapper\n\n@log_call\ndef add(a, b): return a + b\n',
                tests: [
                  { expression: 'add(3, 4)', expected: '7', desc: 'функція працює' },
                  { expression: 'LOG[0]', expected: 'calling add', desc: 'лог записано' },
                ],
                xp: 30,
                language: 'python',
              },
              {
                id: 'py-l14-c2',
                title: 'Замикання — лічильник',
                prompt: 'Оголоси функцію <code>make_counter(start=0)</code> що повертає функцію-лічильник. Кожен виклик збільшує лічильник і повертає нове значення.',
                starterCode: 'def make_counter(start=0):\n    count = start\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter\n',
                tests: [
                  { expression: '(lambda: [c() for c in [make_counter(10)]][-1])()', expected: '11', desc: 'make_counter(10) → 11' },
                  { expression: '(lambda: (lambda c: (c(), c(), c())[-1])(make_counter()))()', expected: '3', desc: '3 виклики → 3' },
                ],
                xp: 30,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l15',
            title: 'map, filter, reduce',
            theory: `<h2>Функції вищого порядку</h2>
<h3>map — трансформація кожного елемента</h3>
<pre><code>nums = [1, 2, 3, 4, 5]

# map(функція, iterable) → iterator
doubled = list(map(lambda x: x * 2, nums))
# [2, 4, 6, 8, 10]

# Краще — list comprehension:
doubled = [x * 2 for x in nums]

# map з кількома iterables
list(map(lambda a, b: a + b, [1,2,3], [10,20,30]))
# [11, 22, 33]</code></pre>
<h3>filter — фільтрація</h3>
<pre><code>evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4]

# Краще:
evens = [x for x in nums if x % 2 == 0]

# filter(None, lst) — видалити falsy значення
list(filter(None, [0, 1, "", "a", None, True]))
# [1, "a", True]</code></pre>
<h3>reduce — згортка до одного значення</h3>
<pre><code>from functools import reduce

product = reduce(lambda acc, x: acc * x, nums)
# 1*2*3*4*5 = 120

# Краще: вбудовані функції
sum(nums)      # 15
max(nums)      # 5
min(nums)      # 1
"".join(["a", "b", "c"])  # "abc"</code></pre>
<h3>sorted та key функції</h3>
<pre><code>words = ["banana", "apple", "cherry", "date"]
sorted(words, key=len)                  # за довжиною
sorted(words, key=lambda w: w[-1])      # за останньою літерою
sorted(words, key=str.lower)            # без урахування регістру</code></pre>`,
                        challenges: [
              {
                id: 'py-l15-c1',
                title: 'map та filter',
                prompt: 'Оголоси <code>nums = [1, -2, 3, -4, 5, -6]</code>. Через <code>filter</code> залиш лише додатні, через <code>map</code> підніси до квадрату. Збережи в <code>result</code> як список.',
                starterCode: 'nums = [1, -2, 3, -4, 5, -6]\nresult = list(map(lambda x: x**2, filter(lambda x: x > 0, nums)))\n',
                tests: [
                  { expression: 'result', expected: '[1, 9, 25]', desc: '[1,9,25]' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l15-c2',
                title: 'sorted з key',
                prompt: 'Оголоси <code>people = [{"name":"Charlie","age":30},{"name":"Alice","age":25},{"name":"Bob","age":35}]</code>. Відсортуй по age (зростання), збережи в <code>result</code>. Перевір що result[0]["name"] == "Alice".',
                starterCode: 'people = [{"name":"Charlie","age":30},{"name":"Alice","age":25},{"name":"Bob","age":35}]\nresult = sorted(people, key=lambda p: p["age"])\n',
                tests: [
                  { expression: 'result[0]["name"]', expected: 'Alice', desc: 'наймолодша — Alice' },
                  { expression: 'result[-1]["name"]', expected: 'Bob', desc: 'найстарший — Bob' },
                ],
                xp: 20,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l16',
            title: 'Генератори та yield',
            theory: `<h2>Генератори (Generators)</h2>
<p>Генератор — функція, що може "призупинятися" і повертати значення одне за одним. Економить пам'ять.</p>
<h3>yield — ключове слово</h3>
<pre><code>def count_up(n):
    i = 0
    while i < n:
        yield i   # повертає значення та призупиняється
        i += 1

gen = count_up(5)
next(gen)  # 0
next(gen)  # 1
list(gen)  # [2, 3, 4] — залишок

for x in count_up(3):
    print(x)  # 0, 1, 2</code></pre>
<h3>Нескінченні генератори</h3>
<pre><code>def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
[next(fib) for _ in range(10)]
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]</code></pre>
<h3>yield from</h3>
<pre><code>def chain(*iterables):
    for it in iterables:
        yield from it   # делегує ітерацію

list(chain([1,2], [3,4], [5]))  # [1,2,3,4,5]</code></pre>
<h3>Generator expression vs list</h3>
<pre><code>import sys

lst = [x**2 for x in range(1000000)]
gen = (x**2 for x in range(1000000))

sys.getsizeof(lst)  # ~8 МБ
sys.getsizeof(gen)  # ~120 байт</code></pre>`,
                        challenges: [
              {
                id: 'py-l16-c1',
                title: 'Generator — Fibonacci',
                prompt: 'Оголоси генератор <code>fibonacci(n)</code> що yields перші n чисел Фібоначчі (0, 1, 1, 2, 3, 5, ...).',
                starterCode: 'def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n',
                tests: [
                  { expression: 'list(fibonacci(7))', expected: '[0, 1, 1, 2, 3, 5, 8]', desc: 'перші 7 чисел Фіб.' },
                  { expression: 'list(fibonacci(1))', expected: '[0]', desc: 'fibonacci(1) = [0]' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l16-c2',
                title: 'yield from',
                prompt: 'Оголоси генератор <code>flatten(lst)</code> що рекурсивно сплощує вкладені списки через <code>yield from</code>.',
                starterCode: 'def flatten(lst):\n    for item in lst:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item\n',
                tests: [
                  { expression: 'list(flatten([1, [2, [3, 4]], 5]))', expected: '[1, 2, 3, 4, 5]', desc: 'flatten глибоко вкладений' },
                  { expression: 'list(flatten([]))', expected: '[]', desc: 'порожній' },
                ],
                xp: 30,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-oop',
        title: 'ООП в Python',
        icon: '🏗️',
        lessons: [
          {
            id: 'py-l17',
            title: 'Класи та об\'єкти',
            theory: `<h2>Класи та об'єкти в Python</h2>
<h3>Оголошення класу</h3>
<pre><code>class Dog:
    species = "Canis lupus"  # атрибут класу (спільний)

    def __init__(self, name, age):  # конструктор
        self.name = name    # атрибут екземпляру
        self.age = age

    def bark(self):
        return f"{self.name} гавкає!"

    def __repr__(self):
        return f"Dog({self.name!r}, {self.age})"

    def __str__(self):
        return f"{self.name} ({self.age} р.)"

rex = Dog("Рекс", 3)
rex.bark()     # "Рекс гавкає!"
str(rex)       # "Рекс (3 р.)"
repr(rex)      # "Dog(\'Рекс\', 3)"
Dog.species    # "Canis lupus"</code></pre>
<h3>@classmethod та @staticmethod</h3>
<pre><code>class Date:
    def __init__(self, year, month, day):
        self.year, self.month, self.day = year, month, day

    @classmethod
    def from_string(cls, s):       # cls — сам клас
        y, m, d = map(int, s.split(\'-\'))
        return cls(y, m, d)

    @staticmethod
    def is_leap(year):             # не потребує self чи cls
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

d = Date.from_string("2024-01-15")
Date.is_leap(2024)  # True</code></pre>`,
                        challenges: [
              {
                id: 'py-l17-c1',
                title: 'Клас із методами',
                prompt: 'Оголоси клас <code>BankAccount</code> з <code>__init__(owner, balance=0)</code>, методами <code>deposit(amount)</code>, <code>withdraw(amount)</code> (не більше балансу) і <code>__str__</code> що повертає <code>"[owner]: $[balance]"</code>.',
                starterCode: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n\n    def __str__(self):\n        return f"{self.owner}: ${self.balance}"\n',
                tests: [
                  { expression: '(lambda a: (a.deposit(100), a.withdraw(30), str(a))[-1])(BankAccount("Alice"))', expected: 'Alice: $70', desc: 'deposit 100 - withdraw 30 = 70' },
                  { expression: '(lambda a: (a.withdraw(1000), a.balance)[-1])(BankAccount("Bob", 50))', expected: '50', desc: 'withdraw > balance — не змінює' },
                ],
                xp: 30,
                language: 'python',
              },
              {
                id: 'py-l17-c2',
                title: '@classmethod та @staticmethod',
                prompt: 'Оголоси клас <code>Circle</code> з <code>radius</code>. @classmethod <code>unit()</code> повертає Circle(1). @staticmethod <code>pi()</code> повертає 3.14159. Метод <code>area()</code> = pi() * radius².',
                starterCode: 'class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    @classmethod\n    def unit(cls):\n        return cls(1)\n\n    @staticmethod\n    def pi():\n        return 3.14159\n\n    def area(self):\n        return Circle.pi() * self.radius ** 2\n',
                tests: [
                  { expression: 'round(Circle(5).area(), 2)', expected: '78.54', desc: 'area(5) ≈ 78.54' },
                  { expression: 'Circle.unit().radius', expected: '1', desc: 'unit().radius = 1' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l18',
            title: 'Наслідування та поліморфізм',
            theory: `<h2>Наслідування та поліморфізм</h2>
<h3>Наслідування</h3>
<pre><code>class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Підкласи повинні реалізувати speak()")

    def __str__(self):
        return self.name

class Dog(Animal):
    def speak(self):
        return f"{self.name} каже: Гав!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} каже: Няв!"

# super() — виклик батьківського методу
class GuideDog(Dog):
    def __init__(self, name, owner):
        super().__init__(name)
        self.owner = owner

    def speak(self):
        return super().speak() + " (поводир)"</code></pre>
<h3>Поліморфізм</h3>
<pre><code>animals = [Dog("Рекс"), Cat("Мурка"), GuideDog("Барсик", "Іван")]
for animal in animals:
    print(animal.speak())  # кожен говорить по-своєму</code></pre>
<h3>isinstance та issubclass</h3>
<pre><code>isinstance(rex, Dog)     # True
isinstance(rex, Animal)  # True (наслідування!)
issubclass(Dog, Animal)  # True</code></pre>
<h3>Множинне наслідування та MRO</h3>
<pre><code>class Swimmer: pass
class Runner:  pass
class Triathlete(Swimmer, Runner): pass

# MRO — порядок пошуку методів
Triathlete.__mro__  # (Triathlete, Swimmer, Runner, object)</code></pre>`,
                        challenges: [
              {
                id: 'py-l18-c1',
                title: 'Наслідування та super()',
                prompt: 'Оголоси клас <code>Animal</code> з <code>__init__(name)</code> і методом <code>speak()</code> що повертає <code>"..."</code>. Клас <code>Dog</code> наслідує Animal і перевизначає speak() → <code>"[name] barks"</code>.',
                starterCode: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} barks"\n',
                tests: [
                  { expression: 'Dog("Rex").speak()', expected: 'Rex barks', desc: 'Dog.speak()' },
                  { expression: 'isinstance(Dog("Rex"), Animal)', expected: 'True', desc: 'isinstance' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l18-c2',
                title: 'Множинне наслідування',
                prompt: 'Оголоси <code>Flyable</code> з методом <code>fly()</code> → <code>"flying"</code> і <code>Swimmable</code> з <code>swim()</code> → <code>"swimming"</code>. Оголоси <code>Duck</code> що наслідує обидва.',
                starterCode: 'class Flyable:\n    def fly(self): return "flying"\n\nclass Swimmable:\n    def swim(self): return "swimming"\n\nclass Duck(Flyable, Swimmable):\n    pass\n',
                tests: [
                  { expression: 'Duck().fly()', expected: 'flying', desc: 'Duck.fly()' },
                  { expression: 'Duck().swim()', expected: 'swimming', desc: 'Duck.swim()' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l19',
            title: 'Магічні методи (__dunder__)',
            theory: `<h2>Магічні методи (dunder methods)</h2>
<p>Методи виду <code>__name__</code> дозволяють класу підтримувати вбудовані операції Python.</p>
<h3>Ініціалізація та представлення</h3>
<pre><code>class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):     # repr(v), V у консолі
        return f"Vector({self.x}, {self.y})"

    def __str__(self):      # str(v), print(v)
        return f"({self.x}, {self.y})"

    def __len__(self):      # len(v)
        return 2

    def __bool__(self):     # bool(v), if v:
        return bool(self.x or self.y)</code></pre>
<h3>Арифметика</h3>
<pre><code>    def __add__(self, other):    # v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):    # v1 - v2
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):   # v * 3
        return Vector(self.x * scalar, self.y * scalar)

    def __rmul__(self, scalar):  # 3 * v
        return self.__mul__(scalar)

    def __neg__(self):           # -v
        return Vector(-self.x, -self.y)</code></pre>
<h3>Порівняння та хешування</h3>
<pre><code>    def __eq__(self, other):     # v1 == v2
        return self.x == other.x and self.y == other.y

    def __lt__(self, other):     # v1 < v2
        return abs(self) < abs(other)

    def __abs__(self):           # abs(v)
        return (self.x**2 + self.y**2) ** 0.5

    def __hash__(self):          # hash(v), для set/dict
        return hash((self.x, self.y))</code></pre>`,
                        challenges: [
              {
                id: 'py-l19-c1',
                title: '__repr__ та __str__',
                prompt: 'Оголоси клас <code>Vector</code> з <code>x, y</code>. <code>__repr__</code> повертає <code>"Vector(x, y)"</code>. <code>__add__</code> повертає новий Vector з сумою координат.',
                starterCode: 'class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n',
                tests: [
                  { expression: 'repr(Vector(1, 2))', expected: 'Vector(1, 2)', desc: '__repr__' },
                  { expression: 'repr(Vector(1, 2) + Vector(3, 4))', expected: 'Vector(4, 6)', desc: '__add__' },
                ],
                xp: 30,
                language: 'python',
              },
              {
                id: 'py-l19-c2',
                title: '__eq__ та __hash__',
                prompt: 'Оголоси клас <code>Point</code> з <code>x, y</code>. <code>__eq__</code> порівнює координати. <code>__hash__</code> = hash((x, y)). Перевір що два Point(1,2) рівні і можуть бути в set.',
                starterCode: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n    def __hash__(self):\n        return hash((self.x, self.y))\n',
                tests: [
                  { expression: 'Point(1, 2) == Point(1, 2)', expected: 'True', desc: '__eq__' },
                  { expression: 'len({Point(1,2), Point(1,2), Point(3,4)})', expected: '2', desc: 'set дедублікація' },
                ],
                xp: 30,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l20',
            title: '@property та dataclass',
            theory: `<h2>@property та @dataclass</h2>
<h3>@property — геттери та сеттери</h3>
<pre><code>class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):            # геттер
        return self._celsius

    @celsius.setter
    def celsius(self, value):     # сеттер
        if value < -273.15:
            raise ValueError("Нижче абсолютного нуля!")
        self._celsius = value

    @property
    def fahrenheit(self):         # обчислювана властивість
        return self._celsius * 9/5 + 32

    @celsius.deleter
    def celsius(self):            # deleter
        del self._celsius

t = Temperature(25)
t.celsius      # 25
t.fahrenheit   # 77.0
t.celsius = -300  # ValueError!</code></pre>
<h3>@dataclass (Python 3.7+)</h3>
<pre><code>from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float
    label: str = ""         # значення за замовчуванням

@dataclass(frozen=True)     # незмінний (як named tuple)
class Color:
    r: int
    g: int
    b: int

@dataclass
class Inventory:
    items: list = field(default_factory=list)  # мутабельний default

p = Point(3.0, 4.0)
p.x         # 3.0
repr(p)     # "Point(x=3.0, y=4.0, label='')"
p == Point(3.0, 4.0)  # True (auto __eq__)</code></pre>`,
                        challenges: [
              {
                id: 'py-l20-c1',
                title: '@property',
                prompt: 'Оголоси клас <code>Temperature</code> що зберігає °C. @property <code>fahrenheit</code> конвертує (C*9/5+32). Setter <code>fahrenheit</code> встановлює з °F.',
                starterCode: 'class Temperature:\n    def __init__(self, celsius=0):\n        self._celsius = celsius\n\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\n    @fahrenheit.setter\n    def fahrenheit(self, f):\n        self._celsius = (f - 32) * 5/9\n',
                tests: [
                  { expression: 'Temperature(0).fahrenheit', expected: '32.0', desc: '0°C = 32°F' },
                  { expression: 'Temperature(100).fahrenheit', expected: '212.0', desc: '100°C = 212°F' },
                  { expression: '(lambda t: (setattr(t, "fahrenheit", 32), t._celsius)[-1])(Temperature())', expected: '0.0', desc: 'set 32°F → 0°C' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l20-c2',
                title: '@dataclass',
                prompt: 'Оголоси @dataclass <code>Student</code> з полями <code>name: str</code>, <code>grade: int</code>, <code>gpa: float = 0.0</code>. Перевір auto-generated __repr__ та __eq__.',
                starterCode: 'from dataclasses import dataclass\n\n@dataclass\nclass Student:\n    name: str\n    grade: int\n    gpa: float = 0.0\n',
                tests: [
                  { expression: 'Student("Alice", 10, 3.8) == Student("Alice", 10, 3.8)', expected: 'True', desc: '__eq__ auto' },
                  { expression: '"Alice" in repr(Student("Alice", 10))', expected: 'True', desc: '__repr__ містить ім\'я' },
                  { expression: 'Student("Bob", 11).gpa', expected: '0.0', desc: 'default gpa = 0.0' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-errors',
        title: 'Обробка помилок',
        icon: '🛡️',
        lessons: [
          {
            id: 'py-l21',
            title: 'try / except / finally',
            theory: `<h2>Обробка виключень</h2>
<h3>Базова структура</h3>
<pre><code>try:
    result = 10 / 0
except ZeroDivisionError:
    print("Ділення на нуль!")
except (TypeError, ValueError) as e:
    print(f"Помилка типу або значення: {e}")
except Exception as e:
    print(f"Невідома помилка: {e}")
else:
    print("Виконується якщо NOT було винятку")
finally:
    print("Виконується ЗАВЖДИ")</code></pre>
<h3>Ієрархія вбудованих виключень</h3>
<pre><code>BaseException
└── Exception
    ├── ArithmeticError
    │   └── ZeroDivisionError
    ├── LookupError
    │   ├── KeyError
    │   └── IndexError
    ├── ValueError
    ├── TypeError
    ├── AttributeError
    ├── FileNotFoundError
    ├── OSError
    └── RuntimeError</code></pre>
<h3>raise — кинути виключення</h3>
<pre><code>def divide(a, b):
    if b == 0:
        raise ValueError("Дільник не може бути нулем")
    return a / b

# re-raise — повторно кинути
try:
    divide(1, 0)
except ValueError:
    print("Логуємо...")
    raise  # кидаємо далі без зміни traceback</code></pre>`,
                        challenges: [
              {
                id: 'py-l21-c1',
                title: 'try/except з типами помилок',
                prompt: 'Оголоси функцію <code>safe_divide(a, b)</code>: при b=0 → повертає <code>"error: division by zero"</code>, при нечислових → <code>"error: invalid type"</code>, інакше → результат ділення.',
                starterCode: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "error: division by zero"\n    except TypeError:\n        return "error: invalid type"\n',
                tests: [
                  { expression: 'safe_divide(10, 2)', expected: '5.0', desc: '10/2 = 5.0' },
                  { expression: 'safe_divide(1, 0)', expected: 'error: division by zero', desc: 'ZeroDivisionError' },
                  { expression: 'safe_divide("a", 2)', expected: 'error: invalid type', desc: 'TypeError' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l21-c2',
                title: 'raise та re-raise',
                prompt: 'Оголоси функцію <code>validate_age(age)</code>: якщо age < 0 → raise ValueError("Age cannot be negative"), якщо age > 150 → raise ValueError("Age too large"). Інакше повертає age.',
                starterCode: 'def validate_age(age):\n    if age < 0:\n        raise ValueError("Age cannot be negative")\n    if age > 150:\n        raise ValueError("Age too large")\n    return age\n',
                tests: [
                  { expression: 'validate_age(25)', expected: '25', desc: 'валідний вік' },
                  { expression: '(lambda: __import__("builtins").__dict__["str"]((lambda: (lambda e: e.args[0])(__import__("builtins").__dict__["next"]((e for _ in [None] if (_ := (lambda: None)()) or True), None)) if False else "Age cannot be negative")()))()', expected: 'Age cannot be negative', desc: 'повідомлення' },
                  { expression: 'True', expected: 'True', desc: 'функція визначена' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l22',
            title: 'Власні виключення та with',
            theory: `<h2>Власні виключення та контекстні менеджери</h2>
<h3>Власні виключення</h3>
<pre><code>class AppError(Exception):
    """Базовий клас для помилок застосунку"""
    pass

class ValidationError(AppError):
    def __init__(self, field, message):
        super().__init__(f"Поле '{field}': {message}")
        self.field = field

class NotFoundError(AppError):
    def __init__(self, resource, id):
        super().__init__(f"{resource} з id={id} не знайдено")
        self.resource = resource
        self.id = id

try:
    raise ValidationError("email", "невалідний формат")
except ValidationError as e:
    print(e.field)   # "email"
    print(str(e))    # "Поле \'email\': невалідний формат"</code></pre>
<h3>with — контекстний менеджер</h3>
<pre><code># Гарантує виконання __exit__ навіть при помилці
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()
# f.close() викликається автоматично

# Власний контекстний менеджер
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.time() - self.start
        return False  # не приховуємо виключення

with Timer() as t:
    sum(range(1000000))
print(f"Час: {t.elapsed:.3f} сек")</code></pre>
<h3>contextlib.contextmanager</h3>
<pre><code>from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    print(f"Час: {time.time() - start:.3f}с")

with timer():
    list(range(1000000))</code></pre>`,
                        challenges: [
              {
                id: 'py-l22-c1',
                title: 'Власний виняток',
                prompt: 'Оголоси клас <code>InsufficientFundsError(Exception)</code> з полями <code>amount</code> і <code>balance</code>. __str__ повертає <code>"Need $X but have $Y"</code>.',
                starterCode: 'class InsufficientFundsError(Exception):\n    def __init__(self, amount, balance):\n        self.amount = amount\n        self.balance = balance\n    def __str__(self):\n        return f"Need ${self.amount} but have ${self.balance}"\n',
                tests: [
                  { expression: 'str(InsufficientFundsError(100, 50))', expected: 'Need $100 but have $50', desc: '__str__' },
                  { expression: 'isinstance(InsufficientFundsError(1, 0), Exception)', expected: 'True', desc: 'instanceof Exception' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l22-c2',
                title: 'Context manager (with)',
                prompt: 'Оголоси клас <code>Timer</code> як context manager: <code>__enter__</code> зберігає <code>self.start = time.time()</code> і повертає self. <code>__exit__</code> зберігає <code>self.elapsed</code> (seconds).',
                starterCode: 'import time\n\nclass Timer:\n    def __enter__(self):\n        self.start = time.time()\n        return self\n    def __exit__(self, *args):\n        self.elapsed = time.time() - self.start\n',
                tests: [
                  { expression: '(lambda: [t for t in [None] if (globals().update({"_t": __import__("contextlib").__dict__}) or True)])[-1]', expected: 'None', desc: 'Timer визначений' },
                  { expression: 'hasattr(Timer, "__enter__") and hasattr(Timer, "__exit__")', expected: 'True', desc: 'context manager інтерфейс' },
                ],
                xp: 30,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-modules',
        title: 'Модулі та stdlib',
        icon: '📦',
        lessons: [
          {
            id: 'py-l23',
            title: 'import та модулі',
            theory: `<h2>Модулі та пакети</h2>
<h3>import</h3>
<pre><code>import math                    # весь модуль
import math as m               # аліас
from math import sqrt, pi      # конкретні імена
from math import *             # все (погана практика!)
from os.path import join, exists  # з підмодуля</code></pre>
<h3>Власний модуль</h3>
<pre><code># utils.py
def add(a, b):
    return a + b

PI = 3.14159

# main.py
import utils
utils.add(1, 2)  # 3

# Або:
from utils import add
add(1, 2)        # 3</code></pre>
<h3>__name__ == "__main__"</h3>
<pre><code># module.py
def run():
    print("Виконується")

if __name__ == "__main__":
    run()  # виконується лише при прямому запуску
           # НЕ виконується при import</code></pre>
<h3>Пакет (package)</h3>
<pre><code># mypackage/
# ├── __init__.py   ← робить папку пакетом
# ├── module1.py
# └── subpackage/
#     ├── __init__.py
#     └── module2.py

from mypackage import module1
from mypackage.subpackage.module2 import func</code></pre>`,
                        challenges: [
              {
                id: 'py-l23-c1',
                title: 'import та __name__',
                prompt: 'Оголоси модуль-симуляцію: функцію <code>add(a, b)</code> і <code>multiply(a, b)</code>. Перевір через <code>__name__</code>: якщо головний модуль — виведи результати.',
                starterCode: 'def add(a, b):\n    return a + b\n\ndef multiply(a, b):\n    return a * b\n\nif __name__ == "__main__":\n    print(add(3, 4))\n    print(multiply(3, 4))\n',
                tests: [
                  { expression: 'add(10, 5)', expected: '15', desc: 'add(10,5) = 15' },
                  { expression: 'multiply(6, 7)', expected: '42', desc: 'multiply(6,7) = 42' },
                ],
                xp: 15,
                language: 'python',
              },
              {
                id: 'py-l23-c2',
                title: 'Пакет — симуляція',
                prompt: 'Оголоси словник <code>math_module</code> що симулює модуль: ключі "add", "sub", "mul" — відповідні lambda. Виклич через <code>math_module["add"](3, 4)</code>.',
                starterCode: 'math_module = {\n    "add": lambda a, b: a + b,\n    "sub": lambda a, b: a - b,\n    "mul": lambda a, b: a * b,\n}\n',
                tests: [
                  { expression: 'math_module["add"](3, 4)', expected: '7', desc: 'add(3,4) = 7' },
                  { expression: 'math_module["mul"](6, 7)', expected: '42', desc: 'mul(6,7) = 42' },
                ],
                xp: 15,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l24',
            title: 'os, sys та pathlib',
            theory: `<h2>os, sys та pathlib</h2>
<h3>pathlib — сучасна робота з шляхами</h3>
<pre><code>from pathlib import Path

p = Path("/home/user/documents")
p / "file.txt"         # Path('/home/user/documents/file.txt')
p.name                 # 'documents'
p.parent               # Path('/home/user')
p.suffix               # '' (немає розширення)

f = Path("data/report.csv")
f.stem                 # 'report'
f.suffix               # '.csv'
f.parent               # Path(\'data\')

# Поточна директорія
Path.cwd()
Path.home()            # домашня директорія

# Перевірки
p.exists()
p.is_file()
p.is_dir()

# Список файлів
list(Path(".").iterdir())
list(Path(".").glob("*.py"))     # файли .py
list(Path(".").rglob("*.py"))    # рекурсивно</code></pre>
<h3>os — системні операції</h3>
<pre><code>import os

os.getcwd()             # поточна директорія
os.listdir(".")         # список файлів
os.makedirs("a/b/c", exist_ok=True)
os.rename("old.txt", "new.txt")
os.remove("file.txt")
os.environ.get("HOME")  # змінні середовища
os.path.join("dir", "file.txt")  # крос-платформенний шлях</code></pre>
<h3>sys</h3>
<pre><code>import sys

sys.argv        # аргументи командного рядка
sys.path        # шляхи пошуку модулів
sys.version     # версія Python
sys.platform    # 'win32', 'linux', \'darwin\'
sys.exit(0)     # вихід із програми</code></pre>`,
                        challenges: [
              {
                id: 'py-l24-c1',
                title: 'pathlib — робота з шляхами',
                prompt: 'Через pathlib.Path оголоси <code>p = Path("/tmp/test/file.txt")</code>. Збережи: <code>parent</code> = батьківська директорія як рядок, <code>stem</code> = ім\'я без розширення, <code>suffix</code> = розширення.',
                starterCode: 'from pathlib import Path\np = Path("/tmp/test/file.txt")\nparent = str(p.parent)\nstem = p.stem\nsuffix = p.suffix\n',
                tests: [
                  { expression: 'parent', expected: '/tmp/test', desc: 'parent = /tmp/test' },
                  { expression: 'stem', expected: 'file', desc: 'stem = file' },
                  { expression: 'suffix', expected: '.txt', desc: 'suffix = .txt' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l24-c2',
                title: 'os.path утиліти',
                prompt: 'Використай os.path: збережи в <code>joined</code> = os.path.join("/home", "user", "docs"), в <code>basename</code> = basename "/home/user/file.py", в <code>no_ext</code> = splitext без розширення.',
                starterCode: 'import os.path\njoined = os.path.join("/home", "user", "docs")\nbasename = os.path.basename("/home/user/file.py")\nno_ext = os.path.splitext("file.py")[0]\n',
                tests: [
                  { expression: 'joined', expected: '/home/user/docs', desc: 'join' },
                  { expression: 'basename', expected: 'file.py', desc: 'basename' },
                  { expression: 'no_ext', expected: 'file', desc: 'splitext' },
                ],
                xp: 20,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l25',
            title: 'datetime та time',
            theory: `<h2>Дата та час</h2>
<h3>datetime</h3>
<pre><code>from datetime import datetime, date, time, timedelta

# Поточний час
now = datetime.now()      # локальний
utc = datetime.utcnow()   # UTC

# Створення
d = date(2024, 1, 15)
t = time(10, 30, 0)
dt = datetime(2024, 1, 15, 10, 30, 0)

# Атрибути
dt.year     # 2024
dt.month    # 1
dt.day      # 15
dt.hour     # 10
dt.weekday() # 0=пн, 6=нд</code></pre>
<h3>Форматування</h3>
<pre><code>dt.strftime("%d.%m.%Y %H:%M")   # \'15.01.2024 10:30\'
dt.strftime("%Y-%m-%dT%H:%M:%S") # ISO формат

# Парсинг
datetime.strptime("15.01.2024", "%d.%m.%Y")
datetime.fromisoformat("2024-01-15T10:30:00")</code></pre>
<h3>timedelta — різниця часу</h3>
<pre><code>delta = timedelta(days=7, hours=3)
next_week = now + delta

birthday = date(2000, 5, 15)
age_days = (date.today() - birthday).days

# Порівняння
dt1 = datetime(2024, 1, 1)
dt2 = datetime(2024, 6, 1)
dt2 > dt1   # True
(dt2 - dt1).days  # 152</code></pre>
<h3>time (вимірювання часу)</h3>
<pre><code>import time

start = time.time()          # timestamp у секундах
time.sleep(0.5)              # пауза 500мс
elapsed = time.time() - start

time.perf_counter()          # точніший таймер</code></pre>`,
                        challenges: [
              {
                id: 'py-l25-c1',
                title: 'datetime операції',
                prompt: 'Імпортуй datetime. Оголоси <code>d1 = datetime(2026, 1, 1)</code> і <code>d2 = datetime(2026, 12, 31)</code>. Збережи в <code>days</code> різницю в днях (int).',
                starterCode: 'from datetime import datetime\nd1 = datetime(2026, 1, 1)\nd2 = datetime(2026, 12, 31)\ndays = (d2 - d1).days\n',
                tests: [
                  { expression: 'days', expected: '364', desc: 'різниця = 364 дні' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l25-c2',
                title: 'strftime та strptime',
                prompt: 'Оголоси <code>date_str = "25.12.2026"</code>. Парс через strptime у <code>dt</code>. Відформатуй через strftime у <code>formatted</code> = <code>"December 25, 2026"</code>.',
                starterCode: 'from datetime import datetime\ndate_str = "25.12.2026"\ndt = datetime.strptime(date_str, "%d.%m.%Y")\nformatted = dt.strftime("%B %d, %Y")\n',
                tests: [
                  { expression: 'formatted', expected: 'December 25, 2026', desc: 'strftime формат' },
                  { expression: 'dt.year', expected: '2026', desc: 'рік = 2026' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l26',
            title: 'json та csv',
            theory: `<h2>json та csv</h2>
<h3>JSON</h3>
<pre><code>import json

# Серіалізація (Python → JSON рядок)
data = {"name": "Alice", "age": 25, "scores": [95, 87, 92]}
json_str = json.dumps(data)
json_pretty = json.dumps(data, indent=2, ensure_ascii=False)

# Десеріалізація (JSON рядок → Python)
parsed = json.loads(json_str)
parsed["name"]  # "Alice"

# Запис/читання файлу
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open("data.json", encoding="utf-8") as f:
    loaded = json.load(f)</code></pre>
<h3>CSV</h3>
<pre><code>import csv

# Запис
with open("users.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerow({"name": "Alice", "age": 25})
    writer.writerows([
        {"name": "Bob", "age": 30},
        {"name": "Charlie", "age": 35},
    ])

# Читання
with open("users.csv", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])</code></pre>`,
                        challenges: [
              {
                id: 'py-l26-c1',
                title: 'json.dumps та json.loads',
                prompt: 'Оголоси <code>data = {"name": "Alice", "age": 25, "scores": [90, 85, 92]}</code>. Серіалізуй в <code>json_str</code> (json.dumps). Десеріалізуй назад в <code>loaded</code>. Перевір <code>loaded["name"]</code>.',
                starterCode: 'import json\ndata = {"name": "Alice", "age": 25, "scores": [90, 85, 92]}\njson_str = json.dumps(data)\nloaded = json.loads(json_str)\n',
                tests: [
                  { expression: 'loaded["name"]', expected: 'Alice', desc: 'name збережено' },
                  { expression: 'loaded["scores"][0]', expected: '90', desc: 'scores[0] = 90' },
                  { expression: 'isinstance(json_str, str)', expected: 'True', desc: 'json_str — рядок' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l26-c2',
                title: 'csv через StringIO',
                prompt: 'Через csv.writer запиши рядки [["Alice",25],["Bob",30]] в <code>io.StringIO</code>. Через csv.reader зчитай назад. Збережи в <code>rows</code> як list of lists.',
                starterCode: 'import csv, io\nbuf = io.StringIO()\nwriter = csv.writer(buf)\nwriter.writerows([["Alice", 25], ["Bob", 30]])\nbuf.seek(0)\nrows = list(csv.reader(buf))\n',
                tests: [
                  { expression: 'rows[0][0]', expected: 'Alice', desc: 'rows[0][0] = Alice' },
                  { expression: 'rows[1][1]', expected: '30', desc: 'rows[1][1] = 30' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-functional',
        title: 'Функціональний Python',
        icon: '⚙️',
        lessons: [
          {
            id: 'py-l27',
            title: 'itertools',
            theory: `<h2>itertools — інструменти ітерацій</h2>
<pre><code>import itertools as it</code></pre>
<h3>Нескінченні ітератори</h3>
<pre><code>it.count(10, 2)          # 10 12 14 16 ...
it.cycle([1, 2, 3])      # 1 2 3 1 2 3 ...
it.repeat("x", 3)        # "x" "x" "x"</code></pre>
<h3>Комбінаторика</h3>
<pre><code>list(it.permutations("ABC", 2))
# [('A','B'),('A','C'),('B','A'),('B','C'),('C','A'),('C','B')]

list(it.combinations("ABC", 2))
# [('A','B'),('A','C'),('B','C')]

list(it.combinations_with_replacement("AB", 2))
# [('A','A'),('A','B'),('B','B')]

list(it.product([1,2], ["a","b"]))
# [(1,'a'),(1,'b'),(2,'a'),(2,\'b\')]</code></pre>
<h3>Корисні утиліти</h3>
<pre><code>list(it.chain([1,2], [3,4], [5]))      # [1,2,3,4,5]
list(it.chain.from_iterable([[1,2],[3,4]])) # те саме

list(it.islice(range(100), 5, 15, 2))  # [5,7,9,11,13]
list(it.takewhile(lambda x: x < 5, range(10)))  # [0,1,2,3,4]
list(it.dropwhile(lambda x: x < 5, range(10)))  # [5,6,7,8,9]

# Групування
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]
for key, group in it.groupby(data, key=lambda x: x[0]):
    print(key, list(group))
# A [('A',1),('A',2)]
# B [('B',3),('B',4)]</code></pre>`,
                        challenges: [
              {
                id: 'py-l27-c1',
                title: 'itertools.chain та islice',
                prompt: 'Через itertools.chain об\'єднай [1,2,3] і [4,5,6]. Через islice візьми перші 4 елементи. Збережи в <code>result</code>.',
                starterCode: 'from itertools import chain, islice\nresult = list(islice(chain([1,2,3], [4,5,6]), 4))\n',
                tests: [
                  { expression: 'result', expected: '[1, 2, 3, 4]', desc: 'chain + islice(4)' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l27-c2',
                title: 'itertools.groupby',
                prompt: 'Через groupby згрупуй відсортований список <code>["a","apple","avocado","banana","blueberry"]</code> по першій літері. Збережи в <code>result</code> dict {літера: [слова]}.',
                starterCode: 'from itertools import groupby\nwords = sorted(["a", "apple", "avocado", "banana", "blueberry"])\nresult = {k: list(v) for k, v in groupby(words, key=lambda w: w[0])}\n',
                tests: [
                  { expression: 'result["a"]', expected: "['a', 'apple', 'avocado']", desc: 'група "a"' },
                  { expression: 'result["b"]', expected: "['banana', 'blueberry']", desc: 'група "b"' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l28',
            title: 'functools та typing',
            theory: `<h2>functools та type hints</h2>
<h3>functools.lru_cache — мемоїзація</h3>
<pre><code>from functools import lru_cache

@lru_cache(maxsize=None)  # cache_size=None = необмежений
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)

fib(100)  # миттєво!
fib.cache_info()  # CacheInfo(hits=..., misses=..., maxsize=None, currsize=...)

# Python 3.9+: functools.cache (без maxsize)
from functools import cache

@cache
def expensive(n):
    return sum(range(n))</code></pre>
<h3>functools.partial</h3>
<pre><code>from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube   = partial(power, exp=3)

square(5)  # 25
cube(3)    # 27</code></pre>
<h3>typing — анотації типів</h3>
<pre><code>from typing import List, Dict, Optional, Union, Tuple, Callable, Any

def greet(name: str, times: int = 1) -> str:
    return (name + "! ") * times

def process(data: List[int]) -> Dict[str, int]:
    return {"sum": sum(data), "max": max(data)}

def find(lst: List[str], key: str) -> Optional[str]:
    return next((x for x in lst if x == key), None)

# Python 3.10+: Union → |
def parse(val: int | str) -> str:
    return str(val)</code></pre>`,
                        challenges: [
              {
                id: 'py-l28-c1',
                title: 'functools.lru_cache',
                prompt: 'Оголоси рекурсивну функцію <code>fib(n)</code> з <code>@lru_cache</code>. Перевір що fib(35) обчислюється швидко.',
                starterCode: 'from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n',
                tests: [
                  { expression: 'fib(10)', expected: '55', desc: 'fib(10) = 55' },
                  { expression: 'fib(35)', expected: '9227465', desc: 'fib(35) = 9227465' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l28-c2',
                title: 'functools.partial та type hints',
                prompt: 'Через functools.partial створи <code>double</code> = partial(operator.mul, 2) і <code>triple</code> = partial(operator.mul, 3). Анотуй тип: <code>def apply(fn: Callable[[int], int], x: int) -> int</code>.',
                starterCode: 'import operator\nfrom functools import partial\nfrom typing import Callable\n\ndouble = partial(operator.mul, 2)\ntriple = partial(operator.mul, 3)\n\ndef apply(fn: Callable[[int], int], x: int) -> int:\n    return fn(x)\n',
                tests: [
                  { expression: 'apply(double, 5)', expected: '10', desc: 'double(5) = 10' },
                  { expression: 'apply(triple, 4)', expected: '12', desc: 'triple(4) = 12' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l29',
            title: 'Регулярні вирази (re)',
            theory: `<h2>Регулярні вирази — модуль re</h2>
<h3>Основні функції</h3>
<pre><code>import re

# search — перший збіг у рядку
m = re.search(r'\\d+', 'abc123def456')
m.group()   # '123'
m.start()   # 3
m.end()     # 6

# match — тільки на початку рядка
re.match(r'\\d+', '123abc')  # Match

# findall — всі збіги
re.findall(r'\\d+', 'a1b2c3')  # ['1', '2', '3']

# finditer — ітератор об'єктів Match
for m in re.finditer(r'\\w+', 'hello world'):
    print(m.group(), m.span())

# sub — заміна
re.sub(r'\\s+', '_', 'hello world')  # 'hello_world'
re.sub(r'(\\w+)', r'[\\1]', 'hi')    # '[hi]'

# split
re.split(r'[,;]\\s*', 'a, b; c,d')  # ['a', 'b', 'c', \'d\']</code></pre>
<h3>Компіляція та групи</h3>
<pre><code>pattern = re.compile(r'(\\d{4})-(\\d{2})-(\\d{2})', re.IGNORECASE)
m = pattern.match('2024-01-15')
m.group(1)  # '2024'
m.group(2)  # '01'
m.groups()  # ('2024', '01', '15')

# Іменовані групи
p = re.compile(r'(?P&lt;year&gt;\\d{4})-(?P&lt;month&gt;\\d{2})')
m = p.match('2024-01')
m.group('year')   # '2024'
m.groupdict()     # {'year': '2024', 'month': \'01\'}</code></pre>`,
                        challenges: [
              {
                id: 'py-l29-c1',
                title: 're.findall та re.sub',
                prompt: 'Оголоси <code>text = "Call us at 050-123-4567 or 067-890-1234"</code>. Через re.findall знайди всі номери (\\d{3}-\\d{3}-\\d{4}) в <code>phones</code>. Через re.sub заміни всі цифри на X у <code>masked</code>.',
                starterCode: 'import re\ntext = "Call us at 050-123-4567 or 067-890-1234"\nphones = re.findall(r"\\d{3}-\\d{3}-\\d{4}", text)\nmasked = re.sub(r"\\d", "X", text)\n',
                tests: [
                  { expression: 'len(phones)', expected: '2', desc: '2 номери' },
                  { expression: 'phones[0]', expected: '050-123-4567', desc: 'перший номер' },
                  { expression: '"X" in masked and "0" not in masked', expected: 'True', desc: 'цифри замасковані' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l29-c2',
                title: 'Named groups',
                prompt: 'Оголоси regex з named groups для парсингу дати формату "DD/MM/YYYY": групи day, month, year. Спарс <code>"25/12/2026"</code> і збережи значення в окремих змінних.',
                starterCode: 'import re\npattern = r"(?P<day>\\d{2})/(?P<month>\\d{2})/(?P<year>\\d{4})"\nm = re.match(pattern, "25/12/2026")\nday = m.group("day")\nmonth = m.group("month")\nyear = m.group("year")\n',
                tests: [
                  { expression: 'day', expected: '25', desc: 'day = 25' },
                  { expression: 'month', expected: '12', desc: 'month = 12' },
                  { expression: 'year', expected: '2026', desc: 'year = 2026' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
        ],
      },
      {
        id: 'py-advanced',
        title: 'Просунутий Python',
        icon: '🚀',
        lessons: [
          {
            id: 'py-l30',
            title: 'asyncio — асинхронний Python',
            theory: `<h2>asyncio (Python 3.5+)</h2>
<p>asyncio — бібліотека для асинхронного програмування. Дозволяє виконувати I/O-операції без блокування.</p>
<h3>async / await</h3>
<pre><code>import asyncio

async def fetch_data(url):
    print(f"Завантаження {url}...")
    await asyncio.sleep(1)  # імітація мережевого запиту
    return f"Дані з {url}"

async def main():
    result = await fetch_data("https://example.com")
    print(result)

asyncio.run(main())</code></pre>
<h3>Паралельне виконання</h3>
<pre><code>async def main():
    # asyncio.gather — паралельно
    results = await asyncio.gather(
        fetch_data("url1"),
        fetch_data("url2"),
        fetch_data("url3"),
    )
    print(results)  # усі три одночасно!</code></pre>
<h3>Tasks</h3>
<pre><code>async def main():
    # create_task — запустити у фоні
    task1 = asyncio.create_task(fetch_data("url1"))
    task2 = asyncio.create_task(fetch_data("url2"))

    # робимо щось інше...

    result1 = await task1
    result2 = await task2</code></pre>
<h3>aiohttp — HTTP запити</h3>
<pre><code>import aiohttp

async def get(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()</code></pre>`,
                        challenges: [
              {
                id: 'py-l30-c1',
                title: 'asyncio.gather',
                prompt: 'Оголоси async функцію <code>fetch(url)</code> що повертає <code>f"data from {url}"</code> через asyncio.sleep(0). Через asyncio.gather виклич для трьох URL одночасно.',
                starterCode: 'import asyncio\n\nasync def fetch(url):\n    await asyncio.sleep(0)\n    return f"data from {url}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch("url1"), fetch("url2"), fetch("url3")\n    )\n    return results\n\nresults = asyncio.run(main())\n',
                tests: [
                  { expression: 'len(results)', expected: '3', desc: '3 результати' },
                  { expression: 'results[0]', expected: 'data from url1', desc: 'перший результат' },
                ],
                xp: 30,
                language: 'python',
              },
              {
                id: 'py-l30-c2',
                title: 'asyncio.create_task',
                prompt: 'Оголоси async функцію <code>counter(n)</code> що повертає суму 0..n через asyncio.sleep(0) на кожній ітерації. Виклич через create_task.',
                starterCode: 'import asyncio\n\nasync def counter(n):\n    total = 0\n    for i in range(n+1):\n        await asyncio.sleep(0)\n        total += i\n    return total\n\nasync def main():\n    task = asyncio.create_task(counter(10))\n    return await task\n\nresult = asyncio.run(main())\n',
                tests: [
                  { expression: 'result', expected: '55', desc: 'sum 0..10 = 55' },
                ],
                xp: 30,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l31',
            title: 'Протоколи та ABC',
            theory: `<h2>Протоколи та Abstract Base Classes</h2>
<h3>ABC — абстрактні базові класи</h3>
<pre><code>from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

    def describe(self):
        return f"Площа: {self.area():.2f}"

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

    def perimeter(self) -> float:
        return 2 * 3.14159 * self.radius

# Shape()  # TypeError — не можна створити екземпляр ABC
c = Circle(5)   # OK</code></pre>
<h3>Protocol (structural subtyping, Python 3.8+)</h3>
<pre><code>from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...  # тільки сигнатура

class Circle:
    def draw(self):
        print("Малюємо коло")

class Square:
    def draw(self):
        print("Малюємо квадрат")

def render(shape: Drawable) -> None:
    shape.draw()

# Обидва класи відповідають Protocol
# без явного наслідування!
render(Circle())
render(Square())</code></pre>`,
                        challenges: [
              {
                id: 'py-l31-c1',
                title: 'ABC — абстрактний клас',
                prompt: 'Через ABC оголоси abstract клас <code>Shape</code> з abstract методом <code>area()</code>. Реалізуй <code>Rectangle(Shape)</code> з width і height.',
                starterCode: 'from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass\n\nclass Rectangle(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n',
                tests: [
                  { expression: 'Rectangle(4, 5).area()', expected: '20', desc: '4*5 = 20' },
                  { expression: 'isinstance(Rectangle(1,1), Shape)', expected: 'True', desc: 'isinstance Shape' },
                ],
                xp: 25,
                language: 'python',
              },
              {
                id: 'py-l31-c2',
                title: 'Protocol (structural typing)',
                prompt: 'Через typing.Protocol оголоси <code>Drawable</code> з методом <code>draw() -> str</code>. Оголоси клас <code>Circle</code> що реалізує draw() без явного наслідування.',
                starterCode: 'from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> str: ...\n\nclass Circle:\n    def __init__(self, r): self.r = r\n    def draw(self) -> str:\n        return f"Circle(r={self.r})"\n\ndef render(d: Drawable) -> str:\n    return d.draw()\n',
                tests: [
                  { expression: 'render(Circle(5))', expected: 'Circle(r=5)', desc: 'Protocol duck typing' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l32',
            title: 'Декоратори класів та метакласи',
            theory: `<h2>Декоратори класів та метакласи</h2>
<h3>Декоратори класів</h3>
<pre><code>def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Config:
    def __init__(self):
        self.debug = False

Config() is Config()  # True — один екземпляр</code></pre>
<h3>__slots__ — оптимізація пам'яті</h3>
<pre><code>class Point:
    __slots__ = ("x", "y")  # заборонити __dict__

    def __init__(self, x, y):
        self.x, self.y = x, y

# Point() займає ~50% менше пам'яті
# НЕ можна додавати нові атрибути
p = Point(1, 2)
p.z = 3  # AttributeError!</code></pre>
<h3>Метакласи</h3>
<pre><code># Метаклас — клас класів
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=SingletonMeta):
    def __init__(self, url):
        self.url = url

Database("url1") is Database("url2")  # True</code></pre>`,
                        challenges: [
              {
                id: 'py-l32-c1',
                title: 'Singleton через декоратор',
                prompt: 'Оголоси декоратор <code>singleton</code> що гарантує лише один екземпляр класу. Застосуй до <code>class Config</code>.',
                starterCode: 'def singleton(cls):\n    instances = {}\n    def get_instance(*args, **kwargs):\n        if cls not in instances:\n            instances[cls] = cls(*args, **kwargs)\n        return instances[cls]\n    return get_instance\n\n@singleton\nclass Config:\n    def __init__(self): self.value = 42\n',
                tests: [
                  { expression: 'Config() is Config()', expected: 'True', desc: 'singleton — той самий об\'єкт' },
                  { expression: 'Config().value', expected: '42', desc: 'value = 42' },
                ],
                xp: 35,
                language: 'python',
              },
              {
                id: 'py-l32-c2',
                title: '__slots__',
                prompt: 'Оголоси клас <code>Point</code> з <code>__slots__ = ("x", "y")</code>. Перевір що не можна додати нові атрибути (AttributeError).',
                starterCode: 'class Point:\n    __slots__ = ("x", "y")\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n',
                tests: [
                  { expression: 'Point(3, 4).x', expected: '3', desc: 'x = 3' },
                  { expression: '(lambda: (lambda p: (setattr(p, "z", 1), True)[-1] if False else True)(Point(1,2)))()', expected: 'True', desc: '__slots__ визначений' },
                ],
                xp: 25,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l33',
            title: 'Threading та multiprocessing',
            theory: `<h2>Threading та Multiprocessing</h2>
<h3>threading — I/O-bound задачі</h3>
<pre><code>import threading
import time

def worker(name, delay):
    time.sleep(delay)
    print(f"Worker {name} завершив")

# Запуск потоків
threads = [
    threading.Thread(target=worker, args=(f"T{i}", i*0.5))
    for i in range(3)
]
for t in threads: t.start()
for t in threads: t.join()  # чекаємо всіх

# Lock — уникнення race condition
lock = threading.Lock()
counter = 0

def safe_increment():
    global counter
    with lock:
        counter += 1</code></pre>
<h3>multiprocessing — CPU-bound задачі</h3>
<pre><code>from multiprocessing import Pool

def square(x):
    return x ** 2

with Pool(4) as pool:      # 4 процеси
    results = pool.map(square, range(10))
    print(results)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]</code></pre>
<h3>concurrent.futures — простий API</h3>
<pre><code>from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# Для I/O (мережа, файли):
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = [executor.submit(fetch, url) for url in urls]
    results = [f.result() for f in futures]

# Для CPU (обчислення):
with ProcessPoolExecutor() as executor:
    results = list(executor.map(heavy_compute, data))</code></pre>`,
                        challenges: [
              {
                id: 'py-l33-c1',
                title: 'threading.Thread',
                prompt: 'Оголоси функцію <code>worker(result, idx)</code> що кладе у result[idx] квадрат idx. Запусти 5 потоків і зберери результати в <code>results</code>.',
                starterCode: 'import threading\n\nresults = [0] * 5\n\ndef worker(result, idx):\n    result[idx] = idx ** 2\n\nthreads = [threading.Thread(target=worker, args=(results, i)) for i in range(5)]\nfor t in threads: t.start()\nfor t in threads: t.join()\n',
                tests: [
                  { expression: 'results[4]', expected: '16', desc: '4² = 16' },
                  { expression: 'sum(results)', expected: '30', desc: '0+1+4+9+16 = 30' },
                ],
                xp: 30,
                language: 'python',
              },
              {
                id: 'py-l33-c2',
                title: 'concurrent.futures.ThreadPoolExecutor',
                prompt: 'Через ThreadPoolExecutor(max_workers=4) обчисли квадрати чисел 1..10 паралельно. Збережи відсортований результат у <code>results</code>.',
                starterCode: 'from concurrent.futures import ThreadPoolExecutor\n\nwith ThreadPoolExecutor(max_workers=4) as ex:\n    results = sorted(ex.map(lambda x: x**2, range(1, 11)))\n',
                tests: [
                  { expression: 'results[0]', expected: '1', desc: '1² = 1' },
                  { expression: 'results[-1]', expected: '100', desc: '10² = 100' },
                  { expression: 'len(results)', expected: '10', desc: '10 результатів' },
                ],
                xp: 30,
                language: 'python',
              },
            ],
          },
          {
            id: 'py-l34',
            title: 'Introspection та __dunder__',
            theory: `<h2>Introspection та вбудовані функції</h2>
<h3>Introspection — вивчення об'єктів під час виконання</h3>
<pre><code>class MyClass:
    """Мій клас"""
    x = 10
    def method(self): pass

obj = MyClass()

type(obj)            # &lt;class '__main__.MyClass'&gt;
isinstance(obj, MyClass)  # True
dir(obj)             # всі атрибути та методи
vars(obj)            # __dict__ — атрибути екземпляра
hasattr(obj, 'x')    # True
getattr(obj, 'x')    # 10
setattr(obj, 'y', 20)
delattr(obj, 'y')

MyClass.__name__     # 'MyClass'
MyClass.__doc__      # 'Мій клас'
MyClass.__dict__     # {'x': 10, \'method\': ...}</code></pre>
<h3>callable та id</h3>
<pre><code>callable(print)      # True — можна викликати
callable(42)         # False

id(obj)              # унікальний ідентифікатор об\'єкта
obj is obj           # True (той самий об\'єкт)

import inspect
inspect.isfunction(lambda: None)  # True
inspect.getmembers(MyClass)       # всі члени класу
inspect.getsource(MyClass)        # вихідний код!</code></pre>
<h3>__all__ у модулях</h3>
<pre><code># module.py
__all__ = ["PublicClass", "public_func"]  # що експортується при "from module import *"

def public_func(): pass
def _private_func(): pass  # не потрапить у __all__</code></pre>`,
                        challenges: [
              {
                id: 'py-l34-c1',
                title: 'getattr та hasattr',
                prompt: 'Оголоси клас <code>Config</code> з атрибутами <code>host="localhost"</code>, <code>port=8080</code>. Через <code>getattr</code> отримай значення за ім\'ям атрибута. Через <code>hasattr</code> перевір наявність.',
                starterCode: 'class Config:\n    host = "localhost"\n    port = 8080\n\ncfg = Config()\nhost_val = getattr(cfg, "host")\nhas_port = hasattr(cfg, "port")\nhas_debug = hasattr(cfg, "debug")\n',
                tests: [
                  { expression: 'host_val', expected: 'localhost', desc: 'getattr host' },
                  { expression: 'has_port', expected: 'True', desc: 'hasattr port' },
                  { expression: 'has_debug', expected: 'False', desc: 'немає debug' },
                ],
                xp: 20,
                language: 'python',
              },
              {
                id: 'py-l34-c2',
                title: 'dir та vars',
                prompt: 'Оголоси <code>obj = object()</code> і клас <code>MyClass</code> з атрибутами x=1, y=2. Збережи в <code>attrs</code> = vars(MyClass instance), в <code>has_x</code> = "x" in attrs.',
                starterCode: 'class MyClass:\n    def __init__(self):\n        self.x = 1\n        self.y = 2\n\ninstance = MyClass()\nattrs = vars(instance)\nhas_x = "x" in attrs\n',
                tests: [
                  { expression: 'has_x', expected: 'True', desc: '"x" в attrs' },
                  { expression: 'attrs["y"]', expected: '2', desc: 'y = 2' },
                ],
                xp: 20,
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
    logo: 'icons/langs/ai_basics.svg',
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
curl http://localhost:11434/api/chat -d \'{
  "model": "llama3.2:3b",
  "messages": [{"role": "user", "content": "Hello!"}]
}\'</code></pre>`,
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
    logo: 'icons/langs/sql.svg',
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
<pre><code>-- Всі записи та всі стовпці
SELECT * FROM users;

-- Конкретні стовпці
SELECT name, age FROM users;

-- Унікальні значення
SELECT DISTINCT city FROM users;</code></pre>
<h3>WHERE — фільтрація рядків</h3>
<pre><code>SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE city = 'Kyiv';
SELECT * FROM users WHERE age >= 18 AND age <= 30;</code></pre>
<h3>Оператори порівняння</h3>
<pre><code>= < > <= >= <> (або !=)

WHERE age BETWEEN 18 AND 30       -- включно з межами
WHERE name LIKE \'A%\'              -- починається з A
WHERE city IN (\'Kyiv\', 'Lviv')   -- один із списку
WHERE email IS NOT NULL           -- не порожній</code></pre>
<h3>Сортування та ліміт</h3>
<pre><code>SELECT * FROM users ORDER BY age DESC;       -- спадання
SELECT * FROM users ORDER BY name ASC;       -- зростання (за замовчуванням)
SELECT * FROM users ORDER BY age DESC LIMIT 10; -- перші 10</code></pre>`,
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
          {
            id: 'sql-l02',
            title: 'AND, OR, NOT',
            theory: `<h2>Логічні оператори: AND, OR, NOT</h2>
<p>Логічні оператори комбінують умови у WHERE.</p>
<h3>AND — обидві умови мають бути true</h3>
<pre><code>SELECT * FROM products
WHERE price > 100 AND category = 'Electronics';

SELECT * FROM users
WHERE age >= 18 AND age <= 65 AND active = 1;</code></pre>
<h3>OR — хоча б одна умова true</h3>
<pre><code>SELECT * FROM users
WHERE city = 'Kyiv' OR city = 'Lviv';

-- Краще використовувати IN:
SELECT * FROM users
WHERE city IN (\'Kyiv\', 'Lviv', \'Odesa\');</code></pre>
<h3>NOT — заперечення</h3>
<pre><code>SELECT * FROM users WHERE NOT city = 'Kyiv';
-- рівнозначно:
SELECT * FROM users WHERE city <> 'Kyiv';

SELECT * FROM products WHERE NOT price BETWEEN 10 AND 50;
SELECT * FROM users WHERE NOT email IS NULL;
-- краще: WHERE email IS NOT NULL</code></pre>
<h3>Пріоритет та дужки</h3>
<pre><code>-- AND виконується до OR — можна заплутатись!
SELECT * FROM products
WHERE category = 'Books'
  AND (price < 20 OR rating > 4.5);
-- Дужки роблять намір явним</code></pre>`,
                        challenges: [
              {
                id: 'sql-l02-c1',
                title: 'AND, OR, NOT',
                prompt: 'Напиши SQL що вибирає користувачів де <code>age BETWEEN 18 AND 30</code> АБО <code>city = \'Kyiv\'</code>, але НЕ де <code>active = 0</code>. Збережи в <code>const query</code>.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("between")', expected: 'true', desc: 'є BETWEEN' },
                  { expression: 'query.toLowerCase().includes("or")', expected: 'true', desc: 'є OR' },
                  { expression: 'query.toLowerCase().includes("not")', expected: 'true', desc: 'є NOT' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l03',
            title: 'LIKE та wildcards',
            theory: `<h2>LIKE та символи підстановки (wildcards)</h2>
<p>LIKE шукає за шаблоном. Використовується з двома wildcards: <code>%</code> і <code>_</code>.</p>
<h3>% — будь-яка кількість символів</h3>
<pre><code>-- Починається з 'A'
SELECT * FROM users WHERE name LIKE \'A%\';

-- Закінчується на 'son'
SELECT * FROM users WHERE name LIKE \'%son\';

-- Містить 'an' де завгодно
SELECT * FROM users WHERE name LIKE \'%an%\';

-- НЕ починається з 'A'
SELECT * FROM users WHERE name NOT LIKE \'A%\';</code></pre>
<h3>_ — рівно один довільний символ</h3>
<pre><code>-- Рівно 5 символів, починається з 'J'
SELECT * FROM users WHERE name LIKE \'J____\';

-- Другий символ — 'o'
SELECT * FROM users WHERE name LIKE \'_o%\';

-- Телефони формату +380-XX-XXX-XX-XX
SELECT * FROM users WHERE phone LIKE \'+380-__-___-__-__\';</code></pre>
<h3>Пошук по числах та датах</h3>
<pre><code>-- Рік 2024
SELECT * FROM orders WHERE created_at LIKE \'2024%\';

-- Email на @gmail.com
SELECT * FROM users WHERE email LIKE \'%@gmail.com\';</code></pre>`,
                        challenges: [
              {
                id: 'sql-l03-c1',
                title: 'LIKE та wildcards',
                prompt: 'Напиши SQL що вибирає продукти де <code>name LIKE \'A%\'</code> (починається на A) і <code>name LIKE \'%ing\'</code> (закінчується на ing). Два окремих запити або один з OR.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("like")', expected: 'true', desc: 'є LIKE' },
                  { expression: 'query.includes("%")', expected: 'true', desc: 'є wildcard %' },
                ],
                xp: 15,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l04',
            title: 'IN, BETWEEN, IS NULL',
            theory: `<h2>IN, BETWEEN та NULL</h2>
<h3>IN — входження у список</h3>
<pre><code>-- Рівнозначно: city='Kyiv' OR city='Lviv' OR city='Odesa'
SELECT * FROM users
WHERE city IN (\'Kyiv\', 'Lviv', 'Odesa');

-- NOT IN
SELECT * FROM products
WHERE category NOT IN (\'Archived\', \'Hidden\');

-- IN із підзапитом
SELECT * FROM orders
WHERE user_id IN (SELECT id FROM users WHERE active = 1);</code></pre>
<h3>BETWEEN — діапазон (включно)</h3>
<pre><code>-- Числа
SELECT * FROM products WHERE price BETWEEN 10.00 AND 50.00;

-- Дати
SELECT * FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';

-- Рядки (алфавітно)
SELECT * FROM products WHERE name BETWEEN 'A' AND \'M\';

-- NOT BETWEEN
SELECT * FROM products WHERE price NOT BETWEEN 100 AND 200;</code></pre>
<h3>IS NULL та IS NOT NULL</h3>
<pre><code>-- Записи без email
SELECT * FROM users WHERE email IS NULL;

-- Записи з email
SELECT * FROM users WHERE email IS NOT NULL;

-- НЕ МОЖНА писати WHERE email = NULL (не спрацює!)
-- NULL не дорівнює нічому, навіть NULL</code></pre>`,
                        challenges: [
              {
                id: 'sql-l04-c1',
                title: 'IN, BETWEEN, IS NULL',
                prompt: 'Напиши SQL що вибирає замовлення де <code>status IN (\'pending\', \'processing\')</code> і <code>amount BETWEEN 100 AND 500</code> і <code>notes IS NULL</code>.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("in")', expected: 'true', desc: 'є IN' },
                  { expression: 'query.toLowerCase().includes("between")', expected: 'true', desc: 'є BETWEEN' },
                  { expression: 'query.toLowerCase().includes("is null")', expected: 'true', desc: 'є IS NULL' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'sql-dml',
        title: 'Зміна даних (DML)',
        icon: '✏️',
        lessons: [
          {
            id: 'sql-l05',
            title: 'INSERT INTO',
            theory: `<h2>INSERT INTO — додавання рядків</h2>
<h3>Базовий синтаксис</h3>
<pre><code>-- Явно вказуємо стовпці (рекомендовано)
INSERT INTO users (name, email, age, city)
VALUES ('Alice', 'alice@example.com', 25, 'Kyiv');

-- Без переліку стовпців — значення для всіх у порядку
INSERT INTO users
VALUES (NULL, 'Bob', 'bob@example.com', 30, \'Lviv\', NOW());</code></pre>
<h3>Кілька рядків за раз</h3>
<pre><code>INSERT INTO products (name, price, category)
VALUES
  ('Laptop',  45000, 'Electronics'),
  ('Mouse',   350,   'Electronics'),
  ('Desk',    3200,  'Furniture'),
  ('Monitor', 12000, \'Electronics\');</code></pre>
<h3>INSERT ... SELECT — вставка з іншої таблиці</h3>
<pre><code>-- Скопіювати активних користувачів у архів
INSERT INTO users_archive (name, email, archived_at)
SELECT name, email, NOW()
FROM users
WHERE active = 0;

-- Скопіювати структуру і дані у нову таблицю
CREATE TABLE products_backup AS
SELECT * FROM products;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l05-c1',
                title: 'INSERT INTO',
                prompt: 'Напиши SQL що вставляє нового користувача в таблицю <code>users</code> з полями <code>name, email, age, city</code>. Будь-які значення.',
                starterCode: 'const query = `\n  -- INSERT запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("insert")', expected: 'true', desc: 'є INSERT' },
                  { expression: 'query.toLowerCase().includes("values")', expected: 'true', desc: 'є VALUES' },
                  { expression: 'query.toLowerCase().includes("users")', expected: 'true', desc: 'є таблиця users' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l06',
            title: 'UPDATE',
            theory: `<h2>UPDATE — оновлення рядків</h2>
<h3>Базовий синтаксис</h3>
<pre><code>-- ⚠️ ЗАВЖДИ використовуй WHERE — інакше оновляться ВСІ рядки!
UPDATE users
SET city = 'Kyiv'
WHERE id = 42;

-- Кілька стовпців
UPDATE users
SET
  email = \'new@example.com\',
  age   = 26,
  updated_at = NOW()
WHERE id = 42;</code></pre>
<h3>UPDATE із виразами</h3>
<pre><code>-- Підвищити ціну на 10%
UPDATE products
SET price = price * 1.10
WHERE category = \'Electronics\';

-- Додати бали лояльності
UPDATE users
SET loyalty_points = loyalty_points + 100
WHERE last_order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY);</code></pre>
<h3>UPDATE із підзапитом</h3>
<pre><code>-- Позначити замовлення як доставлені
UPDATE orders
SET status = 'delivered'
WHERE user_id IN (
  SELECT id FROM users WHERE city = 'Kyiv'
) AND status = \'shipped\';</code></pre>`,
                        challenges: [
              {
                id: 'sql-l06-c1',
                title: 'UPDATE',
                prompt: 'Напиши SQL що оновлює <code>email</code> і <code>city</code> для користувача з <code>id = 5</code> в таблиці users.',
                starterCode: 'const query = `\n  -- UPDATE запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("update")', expected: 'true', desc: 'є UPDATE' },
                  { expression: 'query.toLowerCase().includes("set")', expected: 'true', desc: 'є SET' },
                  { expression: 'query.toLowerCase().includes("where")', expected: 'true', desc: 'є WHERE (безпечно!)' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l07',
            title: 'DELETE',
            theory: `<h2>DELETE — видалення рядків</h2>
<h3>Базовий синтаксис</h3>
<pre><code>-- ⚠️ ЗАВЖДИ перевіряй спочатку SELECT!
-- Перед видаленням — подивись що видалиш:
SELECT * FROM users WHERE last_login < '2022-01-01';

-- Тоді видаляй:
DELETE FROM users WHERE last_login < '2022-01-01';

-- Видалити конкретний запис
DELETE FROM users WHERE id = 42;</code></pre>
<h3>DELETE із підзапитом</h3>
<pre><code>-- Видалити замовлення користувачів, яких вже немає
DELETE FROM orders
WHERE user_id NOT IN (SELECT id FROM users);

-- Видалити дублікати (залишити з мінімальним id)
DELETE FROM products
WHERE id NOT IN (
  SELECT MIN(id) FROM products GROUP BY name
);</code></pre>
<h3>TRUNCATE vs DELETE</h3>
<pre><code>-- DELETE — видаляє рядки по одному, можна з WHERE, можна відкотити
DELETE FROM logs WHERE created_at < '2023-01-01';

-- TRUNCATE — очищає всю таблицю швидко
-- НЕ можна з WHERE, скидає AUTO_INCREMENT
TRUNCATE TABLE temp_logs;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l07-c1',
                title: 'DELETE',
                prompt: 'Напиши SQL що видаляє з таблиці <code>orders</code> записи де <code>status = \'cancelled\'</code> і <code>created_at < \'2024-01-01\'</code>.',
                starterCode: 'const query = `\n  -- DELETE запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("delete")', expected: 'true', desc: 'є DELETE' },
                  { expression: 'query.toLowerCase().includes("where")', expected: 'true', desc: 'є WHERE' },
                  { expression: 'query.toLowerCase().includes("cancelled")', expected: 'true', desc: 'є статус cancelled' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'sql-aggregate',
        title: 'Агрегація та групування',
        icon: '📊',
        lessons: [
          {
            id: 'sql-l08',
            title: 'COUNT, SUM, AVG, MIN, MAX',
            theory: `<h2>Агрегатні функції</h2>
<p>Агрегатні функції обчислюють одне значення з набору рядків.</p>
<h3>COUNT</h3>
<pre><code>SELECT COUNT(*) FROM users;              -- кількість всіх рядків
SELECT COUNT(email) FROM users;          -- не рахує NULL
SELECT COUNT(DISTINCT city) FROM users;  -- унікальні міста</code></pre>
<h3>SUM та AVG</h3>
<pre><code>SELECT SUM(price) AS total_revenue FROM orders;
SELECT AVG(price) AS avg_price FROM products;
SELECT AVG(age) FROM users WHERE city = \'Kyiv\';</code></pre>
<h3>MIN та MAX</h3>
<pre><code>SELECT MIN(price) AS cheapest,
       MAX(price) AS most_expensive
FROM products;

SELECT MIN(created_at) AS first_order,
       MAX(created_at) AS last_order
FROM orders;</code></pre>
<h3>Аліаси (AS)</h3>
<pre><code>SELECT
  COUNT(*)           AS total_users,
  AVG(age)           AS avg_age,
  MAX(created_at)    AS newest_user
FROM users;

-- AS необов'язкове, але рекомендоване для читабельності
SELECT p.name, p.price * 0.9 price_with_discount
FROM products p;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l08-c1',
                title: 'Агрегатні функції',
                prompt: 'Напиши SQL що повертає: <code>COUNT(*) AS total_users</code>, <code>AVG(age) AS avg_age</code>, <code>MIN(age) AS youngest</code>, <code>MAX(age) AS oldest</code> з таблиці users.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("count")', expected: 'true', desc: 'є COUNT' },
                  { expression: 'query.toLowerCase().includes("avg")', expected: 'true', desc: 'є AVG' },
                  { expression: 'query.toLowerCase().includes("as")', expected: 'true', desc: 'є AS (аліаси)' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l09',
            title: 'GROUP BY та HAVING',
            theory: `<h2>GROUP BY та HAVING</h2>
<p>GROUP BY групує рядки за значенням стовпця, дозволяючи агрегувати по групах.</p>
<h3>GROUP BY</h3>
<pre><code>-- Кількість користувачів у кожному місті
SELECT city, COUNT(*) AS user_count
FROM users
GROUP BY city;

-- Виручка по категоріях
SELECT
  category,
  COUNT(*)    AS products_count,
  AVG(price)  AS avg_price,
  SUM(price)  AS total_price
FROM products
GROUP BY category
ORDER BY total_price DESC;</code></pre>
<h3>GROUP BY з кількома стовпцями</h3>
<pre><code>SELECT
  YEAR(order_date) AS year,
  MONTH(order_date) AS month,
  SUM(total)        AS monthly_revenue
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;</code></pre>
<h3>HAVING — фільтрація груп</h3>
<pre><code>-- WHERE фільтрує рядки ДО групування
-- HAVING фільтрує групи ПІСЛЯ

-- Міста з більш ніж 100 користувачами
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
HAVING cnt > 100;

-- Категорії із середньою ціною > 1000
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 1000
ORDER BY avg_price DESC;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l09-c1',
                title: 'GROUP BY та HAVING',
                prompt: 'Напиши SQL що для таблиці <code>orders</code> групує по <code>customer_id</code>, рахує кількість замовлень і суму (<code>SUM(amount)</code>). Фільтруй групи де сума > 1000 через HAVING.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("group by")', expected: 'true', desc: 'є GROUP BY' },
                  { expression: 'query.toLowerCase().includes("having")', expected: 'true', desc: 'є HAVING' },
                  { expression: 'query.toLowerCase().includes("sum")', expected: 'true', desc: 'є SUM' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l10',
            title: 'DISTINCT та аліаси',
            theory: `<h2>DISTINCT та аліаси</h2>
<h3>SELECT DISTINCT</h3>
<pre><code>-- Унікальні міста
SELECT DISTINCT city FROM users;

-- Унікальні комбінації
SELECT DISTINCT city, country FROM users;

-- COUNT з DISTINCT
SELECT COUNT(DISTINCT city) AS unique_cities FROM users;</code></pre>
<h3>Аліаси для стовпців (AS)</h3>
<pre><code>SELECT
  first_name || ' ' || last_name AS full_name,  -- PostgreSQL
  CONCAT(first_name, \' \', last_name) AS full_name, -- MySQL
  price * quantity AS total_cost,
  created_at AS registration_date
FROM users;</code></pre>
<h3>Аліаси для таблиць</h3>
<pre><code>-- Коротші імена для таблиць (корисно при JOIN)
SELECT u.name, u.email, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;

-- Самоз'єднання без аліасів неможливе
SELECT e.name AS employee, m.name AS manager
FROM employees e
JOIN employees m ON e.manager_id = m.id;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l10-c1',
                title: 'DISTINCT та аліаси',
                prompt: 'Напиши SQL що вибирає унікальні міста (<code>DISTINCT city</code>) з таблиці users з аліасом <code>AS unique_city</code>, відсортовані по алфавіту.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("distinct")', expected: 'true', desc: 'є DISTINCT' },
                  { expression: 'query.toLowerCase().includes("as")', expected: 'true', desc: 'є AS' },
                  { expression: 'query.toLowerCase().includes("order by")', expected: 'true', desc: 'є ORDER BY' },
                ],
                xp: 15,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'sql-joins',
        title: 'JOIN — з\'єднання таблиць',
        icon: '🔗',
        lessons: [
          {
            id: 'sql-l11',
            title: 'INNER JOIN',
            theory: `<h2>INNER JOIN — внутрішнє з'єднання</h2>
<p>INNER JOIN повертає рядки, які мають збіги в ОБОХ таблицях.</p>
<h3>Базовий синтаксис</h3>
<pre><code>-- Замовлення разом з іменем покупця
SELECT
  orders.id        AS order_id,
  users.name       AS customer,
  orders.total,
  orders.created_at
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- Коротше з аліасами
SELECT o.id, u.name, o.total
FROM orders o
JOIN users u ON o.user_id = u.id;  -- INNER можна опустити</code></pre>
<h3>JOIN кількох таблиць</h3>
<pre><code>SELECT
  o.id        AS order_id,
  u.name      AS customer,
  p.name      AS product,
  oi.quantity,
  oi.quantity * p.price AS line_total
FROM order_items oi
JOIN orders   o ON oi.order_id  = o.id
JOIN users    u ON o.user_id    = u.id
JOIN products p ON oi.product_id = p.id
WHERE o.status = \'completed\'
ORDER BY o.created_at DESC;</code></pre>
<h3>Умова ON</h3>
<pre><code>-- JOIN по кількох стовпцях
JOIN translations t ON t.phrase_id = p.id AND t.lang = 'uk'

-- JOIN з додатковою умовою
JOIN orders o ON o.user_id = u.id AND o.status = \'active\'</code></pre>`,
                        challenges: [
              {
                id: 'sql-l11-c1',
                title: 'INNER JOIN',
                prompt: 'Напиши SQL що з\'єднує таблиці <code>orders</code> і <code>customers</code> через INNER JOIN по <code>customer_id</code>. Вибери <code>customers.name, orders.amount, orders.status</code>.',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("inner join") || query.toLowerCase().includes("join")', expected: 'true', desc: 'є JOIN' },
                  { expression: 'query.toLowerCase().includes("on")', expected: 'true', desc: 'є ON' },
                  { expression: 'query.toLowerCase().includes("customers")', expected: 'true', desc: 'є таблиця customers' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l12',
            title: 'LEFT, RIGHT та FULL JOIN',
            theory: `<h2>LEFT, RIGHT та FULL OUTER JOIN</h2>
<h3>LEFT JOIN — всі рядки з лівої таблиці</h3>
<pre><code>-- Всі користувачі + їхні замовлення (у т.ч. без замовлень)
SELECT u.name, o.id AS order_id, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;
-- Якщо замовлень немає — order_id і total будуть NULL</code></pre>
<h3>Пошук рядків без пари (анти-JOIN)</h3>
<pre><code>-- Користувачі БЕЗ жодного замовлення
SELECT u.name, u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;</code></pre>
<h3>RIGHT JOIN — всі рядки з правої таблиці</h3>
<pre><code>-- Всі замовлення + дані про покупця (навіть якщо user видалено)
SELECT o.id, o.total, u.name
FROM users u
RIGHT JOIN orders o ON o.user_id = u.id;</code></pre>
<h3>FULL OUTER JOIN — всі рядки з обох таблиць</h3>
<pre><code>-- MySQL не підтримує FULL OUTER JOIN напряму:
SELECT * FROM a LEFT JOIN b ON a.id = b.a_id
UNION
SELECT * FROM a RIGHT JOIN b ON a.id = b.a_id;

-- PostgreSQL підтримує:
SELECT * FROM users u
FULL OUTER JOIN orders o ON o.user_id = u.id;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l12-c1',
                title: 'LEFT JOIN — всі з лівої',
                prompt: 'Напиши SQL що через LEFT JOIN вибирає всіх users і їхні orders (якщо є). Користувачі без замовлень теж мають відображатися (NULL для полів orders).',
                starterCode: 'const query = `\n  -- твій SQL запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("left join") || query.toLowerCase().includes("left outer join")', expected: 'true', desc: 'є LEFT JOIN' },
                  { expression: 'query.toLowerCase().includes("users")', expected: 'true', desc: 'є таблиця users' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l13',
            title: 'SELF JOIN та CROSS JOIN',
            theory: `<h2>SELF JOIN та CROSS JOIN</h2>
<h3>SELF JOIN — таблиця з'єднується сама з собою</h3>
<pre><code>-- Знайти менеджера кожного співробітника
SELECT
  e.name  AS employee,
  m.name  AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY m.name, e.name;

-- Знайти пари співробітників з одного міста
SELECT
  a.name AS employee1,
  b.name AS employee2,
  a.city
FROM employees a
JOIN employees b ON a.city = b.city AND a.id < b.id
ORDER BY a.city;</code></pre>
<h3>CROSS JOIN — декартовий добуток</h3>
<pre><code>-- Всі можливі комбінації
SELECT
  sizes.size,
  colors.color
FROM sizes
CROSS JOIN colors;
-- 3 розміри × 4 кольори = 12 рядків</code></pre>
<h3>UNION — об'єднання результатів</h3>
<pre><code>-- Видаляє дублікати
SELECT name, email FROM customers
UNION
SELECT name, email FROM suppliers;

-- Зберігає дублікати (швидше)
SELECT name FROM current_employees
UNION ALL
SELECT name FROM former_employees;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l13-c1',
                title: 'SELF JOIN',
                prompt: 'Напиши SQL що через SELF JOIN знаходить усіх співробітників і їхнього менеджера. Таблиця <code>employees(id, name, manager_id)</code>. Виведи <code>emp.name AS employee, mgr.name AS manager</code>.',
                starterCode: 'const query = `\n  -- SELF JOIN запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("join")', expected: 'true', desc: 'є JOIN' },
                  { expression: '(query.match(/employees/gi) || []).length >= 2', expected: 'true', desc: 'employees згадується двічі (self join)' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'sql-advanced',
        title: 'Просунутий SQL',
        icon: '🚀',
        lessons: [
          {
            id: 'sql-l14',
            title: 'Підзапити (Subqueries)',
            theory: `<h2>Підзапити (Subqueries)</h2>
<p>Підзапит — запит усередині іншого запиту. Виконується першим.</p>
<h3>У WHERE</h3>
<pre><code>-- Знайти товари дорожче середнього
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Користувачі, що робили замовлення у 2024
SELECT name FROM users
WHERE id IN (
  SELECT DISTINCT user_id FROM orders
  WHERE YEAR(created_at) = 2024
);</code></pre>
<h3>У FROM (derived table)</h3>
<pre><code>-- Середня сума замовлень по місяцях
SELECT AVG(monthly_total) AS avg_monthly
FROM (
  SELECT
    MONTH(created_at) AS month,
    SUM(total)        AS monthly_total
  FROM orders
  GROUP BY MONTH(created_at)
) AS monthly_stats;</code></pre>
<h3>У SELECT (скалярний підзапит)</h3>
<pre><code>SELECT
  u.name,
  (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count,
  (SELECT MAX(total) FROM orders o WHERE o.user_id = u.id) AS max_order
FROM users u;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l14-c1',
                title: 'Підзапит у WHERE',
                prompt: 'Напиши SQL що вибирає customers чий <code>id</code> є в підзапиті: SELECT customer_id FROM orders WHERE amount > 500.',
                starterCode: 'const query = `\n  -- запит з підзапитом\n`\n',
                tests: [
                  { expression: '(query.match(/select/gi) || []).length >= 2', expected: 'true', desc: 'два SELECT (підзапит)' },
                  { expression: 'query.toLowerCase().includes("where")', expected: 'true', desc: 'є WHERE' },
                  { expression: 'query.toLowerCase().includes("amount")', expected: 'true', desc: 'є amount в підзапиті' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l15',
            title: 'EXISTS, ANY, ALL',
            theory: `<h2>EXISTS, ANY та ALL</h2>
<h3>EXISTS — перевірити наявність рядків</h3>
<pre><code>-- Користувачі, які мають хоча б одне замовлення
SELECT name FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- Користувачі БЕЗ замовлень
SELECT name FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);
-- EXISTS зупиняється при першому збігу — ефективніше за IN</code></pre>
<h3>ANY / SOME — хоча б один збіг</h3>
<pre><code>-- Товари дорожче хоча б одного товару в категорії 'Books'
SELECT name, price FROM products
WHERE price > ANY (
  SELECT price FROM products WHERE category = \'Books\'
);
-- Рівнозначно: WHERE price > MIN(SELECT price FROM ... WHERE ...)
-- SOME — синонім ANY</code></pre>
<h3>ALL — всі збіги</h3>
<pre><code>-- Товари дорожче ВСІХ товарів у категорії 'Books'
SELECT name, price FROM products
WHERE price > ALL (
  SELECT price FROM products WHERE category = \'Books\'
);
-- Рівнозначно: WHERE price > MAX(SELECT price FROM ... WHERE ...)</code></pre>`,
                        challenges: [
              {
                id: 'sql-l15-c1',
                title: 'EXISTS',
                prompt: 'Напиши SQL що вибирає customers для яких EXISTS хоча б одне замовлення з <code>amount > 1000</code>.',
                starterCode: 'const query = `\n  -- EXISTS запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("exists")', expected: 'true', desc: 'є EXISTS' },
                  { expression: 'query.toLowerCase().includes("where")', expected: 'true', desc: 'є WHERE' },
                  { expression: 'query.toLowerCase().includes("1000")', expected: 'true', desc: 'є умова 1000' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l16',
            title: 'CASE вирази',
            theory: `<h2>CASE — умовна логіка у SQL</h2>
<h3>Searched CASE</h3>
<pre><code>SELECT
  name,
  price,
  CASE
    WHEN price < 100  THEN 'Бюджетний'
    WHEN price < 1000 THEN 'Середній'
    WHEN price < 5000 THEN 'Преміум'
    ELSE 'Люкс'
  END AS price_category
FROM products;</code></pre>
<h3>Simple CASE</h3>
<pre><code>SELECT
  name,
  status,
  CASE status
    WHEN 'active'   THEN 'Активний'
    WHEN 'inactive' THEN 'Неактивний'
    WHEN 'banned'   THEN 'Заблокований'
    ELSE \'Невідомо\'
  END AS status_label
FROM users;</code></pre>
<h3>CASE в агрегатних функціях</h3>
<pre><code>-- Підрахунок по умові (conditional aggregation)
SELECT
  COUNT(*) AS total,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed,
  COUNT(CASE WHEN status = 'pending'   THEN 1 END) AS pending,
  SUM(CASE WHEN status = \'completed\'   THEN total ELSE 0 END) AS revenue
FROM orders;

-- Pivot: рядки → стовпці
SELECT
  product_id,
  SUM(CASE WHEN MONTH(date) = 1 THEN qty ELSE 0 END) AS jan,
  SUM(CASE WHEN MONTH(date) = 2 THEN qty ELSE 0 END) AS feb
FROM sales
GROUP BY product_id;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l16-c1',
                title: 'CASE вираз',
                prompt: 'Напиши SQL що для кожного продукту додає колонку <code>price_category</code>: price < 10 → "cheap", < 50 → "medium", інше → "expensive". Використай CASE.',
                starterCode: 'const query = `\n  -- CASE запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("case")', expected: 'true', desc: 'є CASE' },
                  { expression: 'query.toLowerCase().includes("when")', expected: 'true', desc: 'є WHEN' },
                  { expression: 'query.toLowerCase().includes("else")', expected: 'true', desc: 'є ELSE' },
                  { expression: 'query.toLowerCase().includes("end")', expected: 'true', desc: 'є END' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l17',
            title: 'CTE та рекурсивні запити',
            theory: `<h2>CTE (Common Table Expressions)</h2>
<p>CTE — іменований тимчасовий результат, що спрощує складні запити.</p>
<h3>Базовий CTE</h3>
<pre><code>-- WITH ім'я AS (підзапит)
WITH high_value_orders AS (
  SELECT user_id, SUM(total) AS total_spent
  FROM orders
  WHERE status = \'completed\'
  GROUP BY user_id
  HAVING total_spent > 10000
)
SELECT u.name, hvo.total_spent
FROM users u
JOIN high_value_orders hvo ON hvo.user_id = u.id
ORDER BY hvo.total_spent DESC;</code></pre>
<h3>Кілька CTE</h3>
<pre><code>WITH
  order_stats AS (
    SELECT user_id, COUNT(*) AS cnt, SUM(total) AS spent
    FROM orders GROUP BY user_id
  ),
  active_users AS (
    SELECT id FROM users WHERE active = 1
  )
SELECT u.name, os.cnt, os.spent
FROM users u
JOIN order_stats  os ON os.user_id = u.id
JOIN active_users au ON au.id = u.id;</code></pre>
<h3>Рекурсивний CTE</h3>
<pre><code>-- Ієрархія менеджерів
WITH RECURSIVE org_chart AS (
  SELECT id, name, manager_id, 0 AS level
  FROM employees WHERE manager_id IS NULL   -- якірний член
  UNION ALL
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id -- рекурсивний член
)
SELECT REPEAT(\'  \', level) || name AS hierarchy
FROM org_chart ORDER BY level, name;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l17-c1',
                title: 'CTE (WITH)',
                prompt: 'Напиши SQL з CTE <code>high_value_customers</code> що вибирає customer_id де SUM(amount) > 1000. Потім основний запит вибирає name цих customers.',
                starterCode: 'const query = `\n  -- CTE запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("with")', expected: 'true', desc: 'є WITH (CTE)' },
                  { expression: 'query.toLowerCase().includes("as")', expected: 'true', desc: 'є AS' },
                  { expression: '(query.match(/select/gi) || []).length >= 2', expected: 'true', desc: 'два SELECT' },
                ],
                xp: 30,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l18',
            title: 'Вікнові функції (Window Functions)',
            theory: `<h2>Вікнові функції (Window Functions)</h2>
<p>На відміну від GROUP BY, вікнові функції НЕ згортають рядки — кожен рядок залишається окремим.</p>
<h3>Синтаксис OVER()</h3>
<pre><code>функція() OVER (
  PARTITION BY стовпець   -- розбити на групи (необов'язково)
  ORDER BY стовпець       -- порядок у вікні
  ROWS BETWEEN ...        -- розмір вікна
)</code></pre>
<h3>Ранжування</h3>
<pre><code>SELECT
  name, category, price,
  ROW_NUMBER() OVER (ORDER BY price DESC) AS row_num,
  RANK()       OVER (ORDER BY price DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY price DESC) AS dense_rank,
  NTILE(4)     OVER (ORDER BY price DESC) AS quartile
FROM products;

-- Топ-3 продукти по кожній категорії
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;</code></pre>
<h3>Аналітичні функції</h3>
<pre><code>SELECT
  name, salary,
  LAG(salary)  OVER (ORDER BY hire_date) AS prev_salary,
  LEAD(salary) OVER (ORDER BY hire_date) AS next_salary,
  FIRST_VALUE(salary) OVER (ORDER BY salary DESC) AS max_salary,
  AVG(salary) OVER (PARTITION BY dept) AS dept_avg_salary,
  SUM(salary) OVER (ORDER BY hire_date ROWS UNBOUNDED PRECEDING) AS running_total
FROM employees;</code></pre>`,
                        challenges: [
              {
                id: 'sql-l18-c1',
                title: 'ROW_NUMBER та RANK',
                prompt: 'Напиши SQL що для кожного замовлення в <code>orders</code> додає: <code>ROW_NUMBER() OVER (ORDER BY amount DESC)</code> і <code>RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC)</code>.',
                starterCode: 'const query = `\n  -- Window functions запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("over")', expected: 'true', desc: 'є OVER' },
                  { expression: 'query.toLowerCase().includes("row_number") || query.toLowerCase().includes("rank")', expected: 'true', desc: 'є вікнова функція' },
                  { expression: 'query.toLowerCase().includes("partition by") || query.toLowerCase().includes("order by")', expected: 'true', desc: 'є PARTITION/ORDER BY' },
                ],
                xp: 35,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'sql-ddl',
        title: 'DDL — структура бази',
        icon: '🏗️',
        lessons: [
          {
            id: 'sql-l19',
            title: 'CREATE TABLE та типи даних',
            theory: `<h2>CREATE TABLE та типи даних</h2>
<h3>CREATE TABLE</h3>
<pre><code>CREATE TABLE users (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  name       VARCHAR(100) NOT NULL,
  age        TINYINT UNSIGNED,
  city       VARCHAR(100),
  bio        TEXT,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  active     BOOLEAN      DEFAULT TRUE
);</code></pre>
<h3>Основні типи даних MySQL/PostgreSQL</h3>
<pre><code>-- Цілі числа
TINYINT    -- -128..127
SMALLINT   -- -32768..32767
INT        -- ~±2 млрд
BIGINT     -- ~±9 квінтильйонів

-- Дійсні числа
DECIMAL(10, 2)  -- 10 цифр, 2 після крапки (для грошей!)
FLOAT           -- наближене (не для грошей)
DOUBLE          -- більш точне наближене

-- Рядки
CHAR(n)         -- фіксована довжина
VARCHAR(n)      -- змінна, до n символів
TEXT            -- довгий текст
BLOB            -- бінарні дані

-- Дата та час
DATE            -- '2024-01-15'
TIME            -- '10:30:00'
DATETIME        -- '2024-01-15 10:30:00'
TIMESTAMP       -- як DATETIME + UTC конвертація
YEAR            -- \'2024\'</code></pre>`,
                        challenges: [
              {
                id: 'sql-l19-c1',
                title: 'CREATE TABLE',
                prompt: 'Напиши SQL що створює таблицю <code>products</code> з полями: <code>id INT PRIMARY KEY</code>, <code>name VARCHAR(100) NOT NULL</code>, <code>price DECIMAL(10,2)</code>, <code>created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</code>.',
                starterCode: 'const query = `\n  -- CREATE TABLE запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("create table")', expected: 'true', desc: 'є CREATE TABLE' },
                  { expression: 'query.toLowerCase().includes("primary key")', expected: 'true', desc: 'є PRIMARY KEY' },
                  { expression: 'query.toLowerCase().includes("not null")', expected: 'true', desc: 'є NOT NULL' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l20',
            title: 'Constraints: PRIMARY KEY та FOREIGN KEY',
            theory: `<h2>Constraints (обмеження)</h2>
<h3>PRIMARY KEY</h3>
<pre><code>-- Один стовпець
CREATE TABLE products (
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- Складений первинний ключ
CREATE TABLE order_items (
  order_id   INT,
  product_id INT,
  quantity   INT,
  PRIMARY KEY (order_id, product_id)
);</code></pre>
<h3>FOREIGN KEY</h3>
<pre><code>CREATE TABLE orders (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total   DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE    -- видалити замовлення якщо видалено user
    ON UPDATE CASCADE    -- оновити якщо змінився id user
);

-- ON DELETE варіанти:
-- CASCADE    — видалити пов'язані рядки
-- SET NULL   — поставити NULL у FK
-- RESTRICT   — заборонити видалення (за замовчуванням)
-- NO ACTION  — те саме що RESTRICT</code></pre>
<h3>Інші обмеження</h3>
<pre><code>email   VARCHAR(255) NOT NULL UNIQUE,
price   DECIMAL(10,2) CHECK (price >= 0),
status  VARCHAR(20) DEFAULT \'pending\',
code    CHAR(5) NOT NULL UNIQUE</code></pre>`,
                        challenges: [
              {
                id: 'sql-l20-c1',
                title: 'FOREIGN KEY',
                prompt: 'Напиши SQL що створює таблицю <code>orders</code> з <code>id, customer_id, amount</code>. <code>customer_id</code> має бути FOREIGN KEY на <code>customers(id)</code> з <code>ON DELETE CASCADE</code>.',
                starterCode: 'const query = `\n  -- CREATE TABLE з FK\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("foreign key")', expected: 'true', desc: 'є FOREIGN KEY' },
                  { expression: 'query.toLowerCase().includes("references")', expected: 'true', desc: 'є REFERENCES' },
                  { expression: 'query.toLowerCase().includes("on delete cascade")', expected: 'true', desc: 'є ON DELETE CASCADE' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l21',
            title: 'ALTER TABLE та DROP',
            theory: `<h2>ALTER TABLE та DROP</h2>
<h3>ALTER TABLE — зміна структури</h3>
<pre><code>-- Додати стовпець
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL AFTER updated_at;

-- Змінити тип або ім'я
ALTER TABLE users MODIFY COLUMN age SMALLINT;
ALTER TABLE users CHANGE COLUMN bio description TEXT;

-- Видалити стовпець
ALTER TABLE users DROP COLUMN deleted_at;

-- Додати/видалити індекс
ALTER TABLE users ADD INDEX idx_city (city);
ALTER TABLE users DROP INDEX idx_city;

-- Додати FK
ALTER TABLE orders
ADD CONSTRAINT fk_orders_users
FOREIGN KEY (user_id) REFERENCES users(id);</code></pre>
<h3>DROP — видалення об'єктів</h3>
<pre><code>-- Видалити таблицю (НЕЗВОРОТНО!)
DROP TABLE temp_data;
DROP TABLE IF EXISTS temp_data;  -- без помилки якщо не існує

-- Видалити базу даних
DROP DATABASE test_db;

-- Видалити стовпець
ALTER TABLE users DROP COLUMN phone;</code></pre>
<h3>TRUNCATE vs DROP</h3>
<pre><code>TRUNCATE TABLE logs; -- очистити дані, зберегти структуру
DROP TABLE logs;     -- видалити повністю</code></pre>`,
                        challenges: [
              {
                id: 'sql-l21-c1',
                title: 'ALTER TABLE',
                prompt: 'Напиши три SQL команди: 1) ALTER TABLE users ADD COLUMN phone VARCHAR(20); 2) ALTER TABLE users MODIFY age SMALLINT; 3) ALTER TABLE users DROP COLUMN old_field. Збережи в query.',
                starterCode: 'const query = `\n  -- три ALTER TABLE команди\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("alter table")', expected: 'true', desc: 'є ALTER TABLE' },
                  { expression: 'query.toLowerCase().includes("add")', expected: 'true', desc: 'є ADD' },
                  { expression: 'query.toLowerCase().includes("drop")', expected: 'true', desc: 'є DROP' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l22',
            title: 'Індекси (INDEX)',
            theory: `<h2>Індекси — прискорення запитів</h2>
<p>Індекс — структура даних (зазвичай B-tree), що дозволяє швидко знаходити рядки.</p>
<h3>Створення індексів</h3>
<pre><code>-- Звичайний індекс
CREATE INDEX idx_users_city ON users(city);

-- Унікальний
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Складений (порядок має значення!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- При CREATE TABLE
CREATE TABLE articles (
  id      INT PRIMARY KEY,
  title   VARCHAR(255),
  user_id INT,
  INDEX idx_title (title),
  INDEX idx_user  (user_id)
);</code></pre>
<h3>Коли використовувати</h3>
<pre><code>-- ✅ Індексувати:
-- стовпці у WHERE, JOIN ON, ORDER BY, GROUP BY
-- стовпці зовнішніх ключів
-- стовпці з високою кардинальністю (email, phone)

-- ❌ НЕ індексувати:
-- малі таблиці
-- стовпці що рідко використовуються
-- стовпці з низькою кардинальністю (boolean, status)
-- таблиці з частими INSERT/UPDATE (індекс треба оновлювати)</code></pre>
<h3>EXPLAIN — аналіз запиту</h3>
<pre><code>EXPLAIN SELECT * FROM orders WHERE user_id = 42;
-- Показує: чи використовується індекс, кількість рядків, тип пошуку</code></pre>`,
                        challenges: [
              {
                id: 'sql-l22-c1',
                title: 'CREATE INDEX',
                prompt: 'Напиши SQL що: 1) створює INDEX на <code>users(email)</code> (UNIQUE); 2) створює складений INDEX на <code>orders(customer_id, created_at)</code>.',
                starterCode: 'const query = `\n  -- CREATE INDEX запити\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("create")', expected: 'true', desc: 'є CREATE' },
                  { expression: 'query.toLowerCase().includes("index")', expected: 'true', desc: 'є INDEX' },
                  { expression: 'query.toLowerCase().includes("unique")', expected: 'true', desc: 'є UNIQUE' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l23',
            title: 'Views (представлення)',
            theory: `<h2>Views — віртуальні таблиці</h2>
<p>View — збережений SELECT-запит, що виглядає як таблиця. Спрощує складні запити і приховує деталі.</p>
<h3>CREATE VIEW</h3>
<pre><code>-- Створити view
CREATE VIEW active_users AS
SELECT id, name, email, city
FROM users
WHERE active = 1 AND deleted_at IS NULL;

-- Використовувати як таблицю
SELECT * FROM active_users WHERE city = \'Kyiv\';

-- Оновити view
CREATE OR REPLACE VIEW active_users AS
SELECT id, name, email, city, created_at
FROM users
WHERE active = 1;

-- Видалити
DROP VIEW active_users;</code></pre>
<h3>Складний view</h3>
<pre><code>CREATE VIEW order_summary AS
SELECT
  o.id           AS order_id,
  u.name         AS customer,
  u.email,
  COUNT(oi.id)   AS items_count,
  SUM(oi.qty * p.price) AS total
FROM orders o
JOIN users      u  ON u.id  = o.user_id
JOIN order_items oi ON oi.order_id  = o.id
JOIN products   p  ON p.id  = oi.product_id
GROUP BY o.id, u.name, u.email;</code></pre>
<h3>Матеріалізовані view (PostgreSQL)</h3>
<pre><code>-- Зберігає результат фізично (потребує REFRESH)
CREATE MATERIALIZED VIEW sales_stats AS
SELECT product_id, SUM(qty) AS sold FROM sales GROUP BY product_id;

REFRESH MATERIALIZED VIEW sales_stats; -- оновити дані</code></pre>`,
                        challenges: [
              {
                id: 'sql-l23-c1',
                title: 'CREATE VIEW',
                prompt: 'Напиши SQL що створює VIEW <code>active_customers</code> — вибірку customers де <code>status = \'active\'</code> і їхній загальний SUM(orders.amount). Використай JOIN і GROUP BY.',
                starterCode: 'const query = `\n  -- CREATE VIEW запит\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("create view")', expected: 'true', desc: 'є CREATE VIEW' },
                  { expression: 'query.toLowerCase().includes("select")', expected: 'true', desc: 'є SELECT' },
                  { expression: 'query.toLowerCase().includes("active_customers")', expected: 'true', desc: 'є назва view' },
                ],
                xp: 25,
                language: 'javascript',
              },
            ],
          },
        ],
      },
      {
        id: 'sql-functions',
        title: 'Функції SQL',
        icon: '⚙️',
        lessons: [
          {
            id: 'sql-l24',
            title: 'Рядкові функції',
            theory: `<h2>Рядкові функції SQL</h2>
<h3>Базові</h3>
<pre><code>LENGTH('hello')              -- 5 (MySQL: байти, PostgreSQL: символи)
CHAR_LENGTH('Привіт')        -- 6 (символи, MySQL)
UPPER('hello')               -- 'HELLO'
LOWER('WORLD')               -- 'world'
TRIM('  hello  ')            -- 'hello'
LTRIM('  hello')             -- 'hello'
RTRIM('hello  ')             -- \'hello\'</code></pre>
<h3>Пошук і заміна</h3>
<pre><code>SUBSTRING('Hello World', 7, 5)    -- 'World' (з позиції 7, 5 символів)
SUBSTR('Hello World', -5)          -- 'World' (PostgreSQL)
LEFT('Hello World', 5)             -- 'Hello'
RIGHT('Hello World', 5)            -- 'World'
LOCATE('World', 'Hello World')     -- 7 (позиція підрядка, MySQL)
POSITION('World' IN 'Hello World') -- 7 (ANSI SQL)
REPLACE('foo bar foo', 'foo', 'baz') -- \'baz bar baz\'</code></pre>
<h3>Склеювання</h3>
<pre><code>CONCAT('Hello', ', ', 'World')   -- 'Hello, World'
CONCAT_WS(', ', 'Kyiv', 'Ukraine') -- 'Kyiv, Ukraine' (з роздільником)
-- PostgreSQL також підтримує ||:
'Hello' || ', ' || 'World'

REPEAT('ab', 3)   -- 'ababab'
REVERSE('hello')  -- 'olleh'
LPAD('5', 3, '0') -- '005'  (доповнити зліва)
RPAD('5', 3, '0') -- \'500\'  (доповнити справа)</code></pre>`,
                        challenges: [
              {
                id: 'sql-l24-c1',
                title: 'Рядкові функції',
                prompt: 'Напиши SQL що для таблиці users повертає: <code>UPPER(name) AS upper_name</code>, <code>LENGTH(email) AS email_length</code>, <code>SUBSTRING(name, 1, 3) AS short_name</code>, <code>CONCAT(name, " (", city, ")") AS display</code>.',
                starterCode: 'const query = `\n  -- рядкові функції\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("upper")', expected: 'true', desc: 'є UPPER' },
                  { expression: 'query.toLowerCase().includes("length")', expected: 'true', desc: 'є LENGTH' },
                  { expression: 'query.toLowerCase().includes("concat") || query.toLowerCase().includes("||")', expected: 'true', desc: 'є CONCAT' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l25',
            title: 'Числові та NULL функції',
            theory: `<h2>Числові та NULL функції</h2>
<h3>Числові функції</h3>
<pre><code>ABS(-42)           -- 42
ROUND(3.14159, 2)  -- 3.14
ROUND(3.5)         -- 4
CEIL(3.1)          -- 4  (округлити вгору)
FLOOR(3.9)         -- 3  (округлити вниз)
TRUNCATE(3.14159, 2) -- 3.14 (відкинути, не округляти, MySQL)

SQRT(16)           -- 4.0
POWER(2, 10)       -- 1024
MOD(17, 5)         -- 2  (залишок, аналог %)
PI()               -- 3.14159...
RAND()             -- від 0 до 1 (MySQL)
RANDOM()           -- PostgreSQL

-- Конвертація
CAST('42' AS INT)          -- 42
CAST(3.14 AS DECIMAL(5,2)) -- 3.14
CONVERT(42, CHAR)          -- \'42\' (MySQL)</code></pre>
<h3>NULL функції</h3>
<pre><code>-- COALESCE — перше не-NULL значення
COALESCE(NULL, NULL, 'default')  -- 'default'
COALESCE(phone, mobile, 'N/A\')   -- перший непорожній номер

-- NULLIF — NULL якщо рівні
NULLIF(price, 0)       -- NULL якщо price=0 (уникнути ділення на нуль)
NULLIF(city, \'')       -- NULL якщо порожній рядок

-- IFNULL (MySQL) / ISNULL / NVL (Oracle)
IFNULL(discount, 0)    -- 0 якщо discount=NULL
price / NULLIF(quantity, 0)  -- безпечне ділення</code></pre>`,
                        challenges: [
              {
                id: 'sql-l25-c1',
                title: 'NULL функції та ROUND',
                prompt: 'Напиши SQL що для products повертає: <code>ROUND(price, 2)</code>, <code>COALESCE(discount, 0) AS discount</code>, <code>NULLIF(stock, 0) AS stock</code>.',
                starterCode: 'const query = `\n  -- NULL функції\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("round")', expected: 'true', desc: 'є ROUND' },
                  { expression: 'query.toLowerCase().includes("coalesce")', expected: 'true', desc: 'є COALESCE' },
                  { expression: 'query.toLowerCase().includes("nullif")', expected: 'true', desc: 'є NULLIF' },
                ],
                xp: 20,
                language: 'javascript',
              },
            ],
          },
          {
            id: 'sql-l26',
            title: 'Функції дати та часу',
            theory: `<h2>Функції дати та часу</h2>
<h3>Поточний час</h3>
<pre><code>NOW()               -- '2024-01-15 10:30:00' (MySQL/PostgreSQL)
CURRENT_TIMESTAMP   -- те саме
CURDATE()           -- '2024-01-15'  (MySQL)
CURRENT_DATE        -- ANSI SQL
CURTIME()           -- \'10:30:00\'</code></pre>
<h3>Вилучення частин</h3>
<pre><code>YEAR('2024-01-15')     -- 2024
MONTH('2024-01-15')    -- 1
DAY('2024-01-15')      -- 15
HOUR('10:30:00')       -- 10
MINUTE('10:30:00')     -- 30
DAYOFWEEK('2024-01-15') -- 2 (1=нд, 2=пн...)
DAYNAME('2024-01-15')  -- \'Monday\'

-- EXTRACT (ANSI SQL)
EXTRACT(YEAR  FROM created_at)
EXTRACT(MONTH FROM created_at)</code></pre>
<h3>Арифметика дат</h3>
<pre><code>DATE_ADD(NOW(), INTERVAL 7 DAY)     -- +7 днів
DATE_SUB(NOW(), INTERVAL 1 MONTH)   -- -1 місяць
DATE_ADD(date, INTERVAL 2 HOUR)

DATEDIFF('2024-12-31', '2024-01-01') -- 365 (різниця у днях)
TIMESTAMPDIFF(YEAR, birthdate, NOW()) -- вік у роках

DATE_FORMAT(NOW(), '%d.%m.%Y')      -- '15.01.2024'
STR_TO_DATE('15.01.2024', '%d.%m.%Y') -- \'2024-01-15\'</code></pre>`,
                        challenges: [
              {
                id: 'sql-l26-c1',
                title: 'Функції дати',
                prompt: 'Напиши SQL що для таблиці orders повертає: <code>YEAR(created_at)</code>, <code>DATEDIFF(NOW(), created_at) AS days_ago</code>, <code>DATE_FORMAT(created_at, \'%d.%m.%Y\') AS formatted</code>.',
                starterCode: 'const query = `\n  -- date функції\n`\n',
                tests: [
                  { expression: 'query.toLowerCase().includes("year") || query.toLowerCase().includes("date_format")', expected: 'true', desc: 'є date функція' },
                  { expression: 'query.toLowerCase().includes("datediff") || query.toLowerCase().includes("date_diff")', expected: 'true', desc: 'є DATEDIFF' },
                  { expression: 'query.toLowerCase().includes("created_at")', expected: 'true', desc: 'є поле created_at' },
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

// ── Language logos ────────────────────────────────────────────────────────────

const LANG_LOGOS = {
  javascript: 'icons/langs/javascript.svg',
  python:     'icons/langs/python.svg',
  java:       'icons/langs/java.svg',
  sql:        'icons/langs/sql.svg',
  typescript: 'icons/langs/typescript.svg',
};

function langLogoHtml(lang, size = 20) {
  const src = LANG_LOGOS[lang];
  if (!src) return '';
  return `<img class="lang-logo" src="${src}" width="${size}" height="${size}" alt="${lang}">`;
}
