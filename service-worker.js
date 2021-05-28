importScripts("/precache-manifest.11f192aede1ad45b92fcf7b5bcb7a72f.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// workbox.routing.registerNavigationRoute('/');

workbox.core.setCacheNameDetails({ prefix: 'amplify-datastore' });
workbox.core.skipWaiting();
workbox.core.clientsClaim();

const cacheFiles = [
  {
    revision: '032520210139',
    url: 'service-worker.js',
  },
];

self.__precacheManifest = cacheFiles.concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

