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
  'https://api.graphql.jobs/',
  async ({
    event
  }) => {
    return new workbox.strategies.StaleWhileRevalidate();
  },
  'POST'
);

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





// ================================================================================================= //


// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
// importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
// importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');
//
// var CACHE_NAME = 'main-cache-v1';
//
// // Init indexedDB using idb-keyval, https://github.com/jakearchibald/idb-keyval
// const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');
//
// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }
//
// // https://fakeql.com/
// // https://fireql.dev/?url=https://fakeql.com/graphql/2c2b275c9590905d5a618ca7235f381a
// workbox.routing.registerRoute(
//   'https://api.graphql.jobs/',
//   async ({
//     event
//   }) => {
//     return staleWhileRevalidate(event);
//   },
//   'POST'
// );
//
// // Return cached response when possible, and fetch new results from server in
// // the background and update the cache.
// self.addEventListener('fetch', async (event) => {
//   if (event.request.method === 'POST') {
//     event.respondWith(staleWhileRevalidate(event));
//   }
//
//   // TODO: Handles other types of requests.
// });
//
// async function staleWhileRevalidate(event) {
//   let promise = null;
//   let cachedResponse = await getCache(event.request.clone());
//   let fetchPromise = fetch(event.request.clone())
//     .then((response) => {
//       setCache(event.request.clone(), response.clone());
//       return response;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
// }
//
// async function serializeResponse(response) {
//   let serializedHeaders = {};
//   for (var entry of response.headers.entries()) {
//     serializedHeaders[entry[0]] = entry[1];
//   }
//   let serialized = {
//     headers: serializedHeaders,
//     status: response.status,
//     statusText: response.statusText
//   };
//   serialized.body = await response.json();
//   return serialized;
// }
//
// async function setCache(request, response) {
//   var key, data;
//   let body = await request.json();
//   let id = CryptoJS.MD5(body.query).toString();
//
//   var entry = {
//     query: body.query,
//     response: await serializeResponse(response),
//     timestamp: Date.now()
//   };
//   idbKeyval.set(id, entry, store);
// }
//
// async function getCache(request) {
//   let data;
//   try {
//     let body = await request.json();
//     let id = CryptoJS.MD5(body.query).toString();
//     data = await idbKeyval.get(id, store);
//     if (!data) return null;
//
//     // Check cache max age.
//     let cacheControl = request.headers.get('Cache-Control');
//     let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
//     if (Date.now() - data.timestamp > maxAge * 1000) {
//       console.log(`Cache expired. Load from API endpoint.`);
//       return null;
//     }
//
//     console.log(`Load response from cache.`);
//     return new Response(JSON.stringify(data.response.body), data.response);
//   } catch (err) {
//     return null;
//   }
// }
