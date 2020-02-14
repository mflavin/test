// custom service-worker.js
if (workbox) {
    // adjust log level for displaying workbox logs
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

    // apply precaching. In the built version, the precacheManifest will
    // be imported using importScripts (as is workbox itself) and we can
    // precache this. This is all we need for precaching
    workbox.precaching.precacheAndRoute(self.__precacheManifest);

    // Make sure to return a specific response for all navigation requests.
    // Since we have a SPA here, this should be index.html always.
    // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
    workbox.routing.registerNavigationRoute('/index.html')

    // const ind = '/index.html';
    // // Example Data...
    // workbox.routing.registerNavigationRoute(
    //   ind,
    //   new workbox.strategies.NetworkFirst({
    //     cacheName: "homepage",
    //     plugins: [
    //       new workbox.expiration.Plugin({
    //         maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
    //       })
    //     ],
    //   })
    // );

    // Setup cache strategy for Google Fonts. They consist of two parts, a static one
    // coming from fonts.gstatic.com (strategy CacheFirst) and a more ferquently updated on
    // from fonts.googleapis.com. Hence, split in two registerroutes
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    )

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        })
    )

    workbox.routing.registerRoute(
        /^https:\/\/stackpath\.bootstrapcdn\.com/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'fontawesome',
        })
    );

    const test = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    // Example Data...
    workbox.routing.registerRoute(
      test,
      new workbox.strategies.NetworkFirst({
        cacheName: "currencies",
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 10 * 60 // 10 minutes
          })
        ],
      })
    );
}

// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  console.log('e.data: ', e.data);
  console.log('e.data.type: ', e.data.type);
    if (e.data.type === 'skipWaiting') {
      console.log('skipping...');
      self.skipWaiting();
    }
})
