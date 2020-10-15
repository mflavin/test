importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true
});

// const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName');
const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('queue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
});
const broadcastUpdate = new workbox.broadcastUpdate.BroadcastCacheUpdate("broadcast-update-demo");

// // Adding everything to cache
// workbox.routing.registerRoute(
//   /((?=([^a-z 0-9]))([^\s])*|)*/,
//   new workbox.strategies.NetworkFirst({
//     cacheName: workbox.core.cacheNames.precache,
//     plugins: [
//       broadcastUpdate,
//     ],
//   })
// );

// https://hearthstonejson.com/
// https://api.hearthstonejson.com/v1/25770/all/cards.json
// This is kinda slow 140ms - 600ms, try to bhSync for quicker speed

// Precaching to allow for offline
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// workbox.precaching.precacheAndRoute(self.__precacheManifest,
//   new workbox.strategies.NetworkOnly({
//     plugins: [
//       bgSyncPlugin,
//       new workbox.expiration.CacheExpiration({
//         maxAgeSeconds: 10, // 1 year
//       })
//     ],
//   }),
// );

// Looks for network connect for data, if none, uses cached data
workbox.routing.registerRoute(
  'https://api.exchangeratesapi.io/latest',
  new workbox.strategies.NetworkFirst(),
);

// Looks for network connect for data, if none, uses cached data
workbox.routing.registerRoute(
  'https://api.coindesk.com/v1/bpi/currentprice.json',
  new workbox.strategies.NetworkFirst(),
);

// TODO: Future function. Used to finish REST requests once connection is remade
// This is running, turn off wifi, click button, watch network tab, turn on button
// Watch requests come in with new internet connection

// GET
workbox.routing.registerRoute(
  'https://api.hearthstonejson.com/v1/25770/all/cards.json',
  new workbox.strategies.NetworkFirst({
    plugins: [bgSyncPlugin],
  }),
);

// GET
workbox.routing.registerRoute(
  'https://api.coindesk.com/v1/bpi/currentprice/CNY.json',
  new workbox.strategies.NetworkFirst({
    plugins: [bgSyncPlugin],
  }),
);
// POST
workbox.routing.registerRoute(
  'https://jsonplaceholder.typicode.com/posts',
  new workbox.strategies.NetworkFirst({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

// default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each path that is a navigation should default to index.html
workbox.routing.registerRoute(
  ({ event }) => event.request.mode === 'navigate',
  async () => {
    const defaultBase = 'https://mflavin.github.io/test/article';
    console.log('defaultBase, ', defaultBase);
    return caches
      .match(workbox.precaching.getCacheKeyForURL(defaultBase))
      .then(response => {
          console.log('response, ', response);
          return response || fetch(defaultBase);
      })
      .catch(err => {
        console.log('err, ', err);
        console.log('catch detch');
        return fetch(defaultBase);
      });
  }
);

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Hook into install event
self.addEventListener('install', (event) => {
  // Get API URL passed as query parameter to service worker
  const preInstallUrl = 'https://api.hearthstonejson.com/v1/25770/all/cards.json';
  // Fetch precaching URLs and attach them to the cache list
  const assetsLoaded = fetch(preInstallUrl);
  event.waitUntil(assetsLoaded);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          console.log('response, ', response);
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          console.log('else if');
          return 'https://mflavin.github.io/test/offline';
          // TODO: PUSH THROUGH offline.html
          // workbox.precaching.precacheAndRoute
        }
      });
    })
  );
});
