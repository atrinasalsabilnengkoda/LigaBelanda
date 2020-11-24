const CACHE_NAME="LigaBelanda";
const urlToCache=[
    '/',
    // html
    'index.html',
    '/pages/nav.html',
    '/pages/standings.html',
    '/pages/clubs.html',
    '/pages/favorite.html',
    '/pages/matches.html',
    // img
    '/images/icon.png',
    '/images/preloader.gif',
    '/images/maskable_icon.png',
    '/images/like.png',
    '/images/apple-touch-icon.png',
    // css
    '/css/clubs.css',
    '/css/standings.css',
    '/css/materialize.css',
    '/css/materialize.min.css',
    '/css/favorite.css',
    '/css/detailPage.css',
    '/css/matches.css',
    // js
    '/js/app.js',
    '/js/standings.js',
    '/js/clubs.js',
    '/js/detailTeam.js',
    '/js/favorite.js',
    '/js/idb.js',
    '/js/materialize.min.js',
    '/js/registerSw.js',
    '/js/matches.js',
    'sw.js',
    'push.js',
    'manifest.json',
];


// simpan data ke cache
self.addEventListener("install",function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(urlToCache);
    })
    .catch(err=>{
      console.log(err);
    })
  )
})



self.addEventListener("fetch", function (event) {
  if (event.request.url.includes("football-data.org")) {
    event.respondWith(async function () {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) return cachedResponse;
      const networkResponse = await fetch(event.request);
      event.waitUntil(
        cache.put(event.request, networkResponse.clone())
      );
      return networkResponse;
    }());
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});




self.addEventListener('activate',function(event){
  event.waitUntil(
    caches.keys()
    .then(cacheNames=>{
      return Promise.all(
        cacheNames.map(cacheName=>{
          if(!cacheName===CACHE_NAME){
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})


self.addEventListener('push',event=>{
    const options={
        body:event.data.text()
    }
  
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
  })