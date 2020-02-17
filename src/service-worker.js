importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: false
});

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName');
const broadcastUpdate = new workbox.broadcastUpdate.BroadcastCacheUpdate("broadcast-update-demo");

// Adding everything to cache
workbox.routing.registerRoute(
  /((?=([^a-z 0-9]))([^\s])*|)*/,
  new workbox.strategies.NetworkFirst({
    cacheName: workbox.core.cacheNames.precache,
    plugins: [
      broadcastUpdate,
    ],
  })
);

// Precaching to allow for offline
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// TODO: Future function. Used to finish REST requests once connection is remade
workbox.routing.registerRoute(
  'https://api.exchangeratesapi.io/latest',
  new workbox.strategies.NetworkFirst({
    plugins: [
      bgSyncPlugin,
    ],
  }),
);

workbox.routing.registerRoute(
  'https://api.coindesk.com/v1/bpi/currentprice.json',
  new workbox.strategies.NetworkFirst({
    plugins: [
      bgSyncPlugin,
    ],
  }),
);

workbox.routing.registerRoute(
  'https://api.coindesk.com/v1/bpi/currentprice/CNY.json',
  new workbox.strategies.NetworkOnly({
    plugins: [
      bgSyncPlugin,
    ],
  }),
);

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();
