importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true
});

// const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName');
const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('queue', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});
const broadcastUpdate = new workbox.broadcastUpdate.BroadcastCacheUpdate("broadcast-update-demo");

// Adding everything to cache
// workbox.routing.registerRoute(
//   /((?=([^a-z 0-9]))([^\s])*|)*/,
//   new workbox.strategies.NetworkFirst({
//     cacheName: workbox.core.cacheNames.precache,
//     plugins: [
//       broadcastUpdate,
//     ],
//   })
// );

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
  'https://api.coindesk.com/v1/bpi/currentprice/CNY.json',
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
);
// POST
workbox.routing.registerRoute(
  'https://jsonplaceholder.typicode.com/posts',
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

self.addEventListener('install', function(event) {
  // https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#the_first_service_worker
  // The install event is the first event a service worker gets, and it only happens once.
  self.skipWaiting();
  console.log('worker install');
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
});
