// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
//
// let globalRoute;
//
// // Note: Ignore the error that Glitch raises about workbox being undefined.
// workbox.setConfig({
//   debug: false,
// });
//
// // const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName');
// const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('queue', {
//     maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
// });
// const broadcastUpdate = new workbox.broadcastUpdate.BroadcastCacheUpdate("broadcast-update-demo");
//
// // // Adding everything to cache
// // workbox.routing.registerRoute(
// //   /((?=([^a-z 0-9]))([^\s])*|)*/,
// //   new workbox.strategies.NetworkFirst({
// //     cacheName: workbox.core.cacheNames.precache,
// //     plugins: [
// //       broadcastUpdate,
// //     ],
// //   })
// // );
//
// // https://hearthstonejson.com/
// // https://api.hearthstonejson.com/v1/25770/all/cards.json
// // This is kinda slow 140ms - 600ms, try to bhSync for quicker speed
//
// // Precaching to allow for offline
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
//
// // workbox.precaching.precacheAndRoute(self.__precacheManifest,
// //   new workbox.strategies.NetworkOnly({
// //     plugins: [
// //       bgSyncPlugin,
// //       new workbox.expiration.CacheExpiration({
// //         maxAgeSeconds: 10, // 1 year
// //       })
// //     ],
// //   }),
// // );
//
// // Looks for network connect for data, if none, uses cached data
// workbox.routing.registerRoute(
//   'https://api.exchangeratesapi.io/latest',
//   new workbox.strategies.NetworkFirst(),
// );
//
// // Looks for network connect for data, if none, uses cached data
// workbox.routing.registerRoute(
//   'https://api.coindesk.com/v1/bpi/currentprice.json',
//   new workbox.strategies.NetworkFirst(),
// );
//
// // TODO: Future function. Used to finish REST requests once connection is remade
// // This is running, turn off wifi, click button, watch network tab, turn on button
// // Watch requests come in with new internet connection
//
// // GET
// workbox.routing.registerRoute(
//   'https://api.hearthstonejson.com/v1/25770/all/cards.json',
//   new workbox.strategies.NetworkFirst({
//     plugins: [bgSyncPlugin],
//   }),
// );
//
// // GET
// workbox.routing.registerRoute(
//   'https://api.coindesk.com/v1/bpi/currentprice/CNY.json',
//   new workbox.strategies.NetworkFirst({
//     plugins: [bgSyncPlugin],
//   }),
// );
// // POST
// workbox.routing.registerRoute(
//   'https://jsonplaceholder.typicode.com/posts',
//   new workbox.strategies.NetworkFirst({
//     plugins: [bgSyncPlugin],
//   }),
//   'POST'
// );
//
// // default page handler for offline usage,
// // where the browser does not how to handle deep links
// // it's a SPA, so each path that is a navigation should default to index.html
// workbox.routing.registerRoute(
//   ({ event }) => event.request.mode === 'navigate',
//   async () => {
//     const defaultBase = 'https://mflavin.github.io/test/';
//     const test = globalRoute || '/test/';
//     console.log('===update===');
//     console.log('globalRoute, ', globalRoute);
//     console.log('test, ', test);
//     return caches
//       .match(workbox.precaching.getCacheKeyForURL(test))
//       .then(response => {
//         console.log(response ? '===response===' : '===fetch(test)===');
//         return response || fetch(test);
//       })
//       .catch(err => {
//         console.log('===fetch(test)===');
//         return fetch(test);
//       });
//   }
// );
//
// // const cacheOnly = new workbox.strategies.CacheOnly();
// // const networkFirst = new workbox.strategies.NetworkFirst();
// //
// // workbox.routing.registerRoute(
// //   /\/test\/.*/,
// //   async args => {
// //     const offlineRequest = new Request('/test/offline');
// //     console.log('offlineRequest, ', offlineRequest);
// //     try {
// //       const response = await networkFirst.handle(args);
// //       console.log('response || await cacheOnly.handle({request: offlineRequest})');
// //       console.log(response || await cacheOnly.handle({request: offlineRequest}));
// //       return response || await cacheOnly.handle({request: offlineRequest});
// //     } catch (error) {
// //       return await cacheOnly.handle({request: offlineRequest})
// //     }
// //   }
// // );
//
// self.addEventListener('message', (event) => {
//   console.log('event, ', event);
//   console.log('event.data, ', event.data);
//   console.log('event.source.url, ', event.source.url);
//   globalRoute = event.data.VUE_APP_API_PATH;
// });
//
// // self.addEventListener('fetch', (event) => {
// //   console.log('fetch event, ', event);
// //   // We only want to call event.respondWith() if this is a navigation request
// //   // for an HTML page.
// //   if (event.request.mode === 'navigate') {
// //     event.respondWith((async () => {
// //       try {
// //         // First, try to use the navigation preload response if it's supported.
// //         const preloadResponse = await event.preloadResponse;
// //         if (preloadResponse) {
// //           return preloadResponse;
// //         }
// //
// //         const networkResponse = await fetch(event.request);
// //         return networkResponse;
// //       } catch (error) {
// //         // catch is only triggered if an exception is thrown, which is likely
// //         // due to a network error.
// //         // If fetch() returns a valid HTTP response with a response code in
// //         // the 4xx or 5xx range, the catch() will NOT be called.
// //         console.log('Fetch failed; returning offline page instead.', error);
// //
// //         const cache = await caches.open("workbox-precache-v2-https://mflavin.github.io/test/");
// //         const cachedResponse = await cache.match('offline');
// //         return cachedResponse;
// //       }
// //     })());
// //   }
// // });
//
// //This immediately deploys the service worker w/o requiring a refresh
// workbox.core.skipWaiting();
// workbox.core.clientsClaim();
//
// // // Hook into install event
// // self.addEventListener('install', (event) => {
// //   // Get API URL passed as query parameter to service worker
// //   const preInstallUrl = 'https://api.hearthstonejson.com/v1/25770/all/cards.json';
// //   // Fetch precaching URLs and attach them to the cache list
// //   const assetsLoaded = fetch(preInstallUrl);
// //   event.waitUntil(assetsLoaded);
// // });



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
    const defaultBase = globalRoute || '/';
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

// This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();
