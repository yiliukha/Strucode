const CACHE = 'strucode-mobile-v1';
const ASSETS = [
  '/mobile/',
  '/mobile/index.html',
  '/mobile/css/style.css',
  '/mobile/js/app.js',
  '/mobile/js/sandbox.js',
  '/mobile/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Don't intercept external CDN requests or API calls
  const url = e.request.url;
  if (url.includes('emkc.org') || url.includes('googleapis.com') ||
      url.includes('esm.sh') || url.includes('generativelanguage.google')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
