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

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('queue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
});

workbox.routing.registerRoute(
  'https://run.mocky.io/v3/98d8ddc2-36e3-4884-b019-9b00120b287e',
  new workbox.strategies.StaleWhileRevalidate(),
);

workbox.routing.registerRoute(
  'https://api.coindesk.com/v1/bpi/currentprice.json',
  new workbox.strategies.StaleWhileRevalidate(),
);

// https://medium.com/@jono/cache-graphql-post-requests-with-service-worker-100a822a388a
workbox.routing.registerRoute(
  '/api',
  new workbox.strategies.StaleWhileRevalidate(),
  'POST'
);

// workbox.routing.registerRoute(
//   'https://graphqlzero.almansi.me/api',
//   new workbox.strategies.StaleWhileRevalidate(),
//   'POST'
// );

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
    console.log('globalRoute, ', globalRoute);
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

// This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();


// https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68
