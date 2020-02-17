importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: true
});

// START precaching

workbox.routing.registerRoute(
  /((?=([^a-z 0-9]))([^\s])*|)*/,
  new workbox.strategies.NetworkFirst({
    cacheName: workbox.core.cacheNames.precache,
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// END precaching

const myPlugin = {
  cacheDidUpdate: async ({cacheName, request, oldResponse, newResponse, event}) => {
    console.table({
      cacheName,
      request,
      oldResponse,
      newResponse,
      event,
    });
    // No return expected
    // Note: `newResponse.bodyUsed` is `true` when this is called,
    // meaning the body has already been read. If you need access to
    // the body of the fresh response, use a technique like:
    // const freshResponse = await caches.match(request, {cacheName});
  },
};

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin('myQueueName');
const bgUpdatePlugin = workbox;
console.log(bgUpdatePlugin);
console.log(myPlugin);

workbox.routing.registerRoute(
  'https://api.coindesk.com/v1/bpi/currentprice.json',
  new workbox.strategies.NetworkFirst({
    plugins: [
      bgSyncPlugin,
    ],
  }),
);

// workbox.routing.registerRoute(
//   '/index.html',
//   new workbox.strategies.NetworkFirst(),
// );

const {strategies} = workbox;
self.addEventListener('fetch', (event) => {
  const request = event.request;
  console.log('request: ', request);
  switch (event.request.url) {
    case 'https://api.coindesk.com/v1/bpi/currentprice.json':
      const networkOnly = new workbox.strategies.NetworkFirst();
      event.respondWith(networkOnly.handle({event, request}));
      break;
    case 'https://api.exchangeratesapi.io/latest':
      const networkFirst = new workbox.strategies.NetworkOnly();
      event.respondWith(networkFirst.handle({event, request}));
      break;
    default:
      console.log('unable to find URL?');
      console.log(request);
      console.log(event);
  }

});

//This immediately deploys the service worker w/o requiring a refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();
