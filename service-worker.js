// service-worker.js
// ============================
// Service Worker for PWA/offline support
// Caches core files for offline availability and improves load speed

const CACHE_NAME = 'lni-cache-v1'; // Change version to force cache update
const CACHE_FILES = [
  '/',                 // Root
  '/index.html',
  '/style.css',
  '/app.js',
  // Add more as needed (e.g., images, manifest) for full offline experience
];

// Install event: cache all core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_FILES);
    })
  );
});

// Fetch event: serve from cache if available, else fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});

// Activate event: Clean up old caches if any
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});
