/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each path that is a navigation should default to index.html
workbox.routing.registerRoute(
  ({
    event
  }) => event.request.mode === 'navigate',
  async () => {
    // const defaultBase = globalRoute || '/';
    const defaultBase = '/test/';
    return caches
      .match(workbox.precaching.getCacheKeyForURL(defaultBase))
      .then(response => {
        console.log('fetch(defaultBase), ', fetch(defaultBase));
        return response || fetch(defaultBase);
      })
      .catch(err => {
        return fetch(defaultBase);
      });
  }
);

workbox.core.setCacheNameDetails({ prefix: 'amplify-datastore' });
// workbox.core.skipWaiting();
// workbox.core.clientsClaim();

const cacheFiles = [
  {
    revision: '032520210139',
    url: 'sw.js',
  },
];

self.__precacheManifest = cacheFiles.concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
