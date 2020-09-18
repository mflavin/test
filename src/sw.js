importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true,
});

// Precaching to allow for offline
workbox.precaching.precacheAndRoute(self.__precacheManifest, ['/index.html', '/about/']);

// This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();
