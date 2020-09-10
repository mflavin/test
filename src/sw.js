importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

// Is webpack bundling getting in the way there???
console.log('...test...');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true
});

// Precaching to allow for offline
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();
