var CACHE_NAME = 'aqt-cache-v1';
var urlsToCache = [
  // "index.html",
  // "views/main.html",
  // "views/fragments/navBar.html",
  // "views/fragments/footer.html",
  // "views/fragments/floating-button.html",
  // "manifest.json",
  // "css/aqtApp.css",
  // "vendor/materialize/dist/css/materialize.min.css",
  // "img/icons/icon-128.png",
  // "img/icons/icon-152.png",
  // "img/icons/icon-16.png",
  // "img/icons/icon-168.png",
  // "img/icons/icon-192.png",
  // "img/icons/icon-256.png",
  // "img/icons/icon-32.png",
  // "img/icons/icon-36.png",
  // "img/icons/icon-48.png",
  // "img/icons/icon-72.png",
  // "img/icons/icon-76.png",
  // "img/icons/icon-96.png",
  // "sw.js",
  // "js/app.js",
  // "js/config/route-config.js",
  // "vendor/angular/angular.js",
  // "vendor/angular-route/angular-route.js",
  // "vendor/jquery/dist/jquery.min.js",
  // "vendor/materialize/dist/js/materialize.min.js"
];

self.addEventListener('activate', function(event) {
  console.log('SW Ativo');

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('SW removeu:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cahe aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});
