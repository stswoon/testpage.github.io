const cacheName = 'HowOldAreYouCache';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './main.js',
		'./favicon.ico',
		'./style.css'
      ]);
    })
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file if so it will serve the cached file
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});