importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

// workbox.routing.registerRoute(
// 	({
// 		request
// 	}) => request.destination === 'script' ||
// 	request.destination === 'style',
// 	new workbox.strategies.StaleWhileRevalidate()
// );


const cacheFiles = [
  {
    revision: '032520210139',
    url: 'sw.js',
  },
	{
		revision: '032520210139',
    url: '/test/',
	}
];

self.__precacheManifest = cacheFiles.concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


const handler = workbox.precaching.createHandlerBoundToURL('/test/');
const navigationRoute = new workbox.routing.NavigationRoute(handler);
workbox.routing.registerRoute(navigationRoute);


// Cache page navigations (html) with a Network First strategy
workbox.routing.registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === 'navigate',
    // Use a Network First caching strategy
    new workbox.strategies.NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: 'pages',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
workbox.routing.registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    // Use a Stale While Revalidate caching strategy
    new workbox.strategies.StaleWhileRevalidate({
        // Put all cached files in a cache named 'assets'
        cacheName: 'assets',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Cache images with a Cache First strategy
workbox.routing.registerRoute(
    // Check to see if the request's destination is style for an image
    ({ request }) => request.destination === 'image',
    // Use a Cache First caching strategy
    new workbox.strategies.CacheFirst({
        // Put all cached files in a cache named 'images'
        cacheName: 'images',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
            // Don't cache more than 50 items, and expire them after 30 days
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            }),
        ],
    }),
);



// import { registerRoute } from 'workbox-routing';
// import {
//     NetworkFirst,
//     StaleWhileRevalidate,
//     CacheFirst,
// } from 'workbox-strategies';
//
// // Used for filtering matches based on status code, header, or both
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// // Used to limit entries in cache, remove entries after a certain period of time
// import { ExpirationPlugin } from 'workbox-expiration';
