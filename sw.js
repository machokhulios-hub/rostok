// Офлайн-кеш. При обновлении приложения меняется номер версии.
var C = 'rostok-v4-33';
var F = ['./', 'index.html', 'app.js?v=4.33', 'plan.js?v=4.33', 'courses.js?v=4.33', 'vitrina/index.html', 'vitrina/review.html', 'wordpress/guide.html', 'video/guide.html', 'video/tools.json', 'tree-mobile.css?v=4.33', 'sections.css?v=4.33', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'img/hero.jpg', 'growth-landscape.png', 'cover-rus.webp', 'cover-eng.webp', 'cover-code.webp', 'cover-ai.webp', 'cover-poem.webp', 'cover-music.webp', 'cover-book.webp'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(F); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x.indexOf('rostok-') === 0 && x !== C; }).map(function (x) { return caches.delete(x); })); }));
  self.clients.claim();
});
// Сначала сеть (чтобы новые уроки приходили сразу), без сети — из кеша.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return; // чужие адреса (Викитека, GitHub) кеш не трогает
  e.respondWith(fetch(e.request).then(function (r) {
    if (r.ok && new URL(e.request.url).origin === location.origin) { var cp = r.clone(); caches.open(C).then(function (c) { c.put(e.request, cp); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request).then(function (m) {
      if (m) return m;
      if (e.request.mode === 'navigate' || e.request.destination === 'document') return caches.match('index.html').then(function(page){return page || Response.error();});
      return Response.error();
    });
  }));
});
