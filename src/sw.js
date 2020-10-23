importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

let globalRoute;

self.addEventListener('message', (event) => {
  globalRoute = event.data.VUE_APP_API_PATH;
});

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: false,
});

// TODO: https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
// Precaching to allow for offline
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each path that is a navigation should default to index.html
workbox.routing.registerRoute(
  ({ event }) => event.request.mode === 'navigate',
  async () => {
    // const defaultBase = globalRoute || '/';
    const defaultBase = '/test/';
    console.log('globalRoute, ', globalRoute);
    return caches
      .match(workbox.precaching.getCacheKeyForURL(defaultBase))
      .then(response => {
        return response || fetch(defaultBase);
      })
      .catch(err => {
        return fetch(defaultBase);
      });
  }
);

self.addEventListener('fetch', function(event) {
  const defaultBase = '/test/';
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches
                .match(workbox.precaching.getCacheKeyForURL(defaultBase))
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return cache.match('/offline.html');
            });
        }
      })
  );
});

// This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();


// https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68
