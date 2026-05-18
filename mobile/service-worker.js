const CACHE = 'mobile-v7';
const ASSETS = ['/', '/index.html', '/css/style.css', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('emkc.org') || e.request.url.includes('generativelanguage.googleapis.com')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
