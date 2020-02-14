/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env browser */
'use strict';

// import { Workbox } from "workbox-window";

if ('serviceWorker' in navigator) {
  // Delay registration until after the page has loaded, to ensure that our
  // precaching requests don't degrade the first visit experience.
  // See https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration
  window.addEventListener('load', function() {

    /*
    const wb = new Workbox("service-worker.js");
    wb.register();

    // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
    console.log('controlling controlling controlling');
    wb.addEventListener("controlling", event => {
        window.location.reload();
    });

    // Send a message telling the service worker to skip waiting.
    // This will trigger the `controlling` event handler above.
    console.log('SKIP_WAITING SKIP_WAITING SKIP_WAITING');
    wb.messageSW({ type: "skipWaiting" });
    */

    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
      const app = document.getElementById('app').__vue__;
      // Watches to see if route changed then checks for new code
      // TODO: Test this a bit more, make sure it doesn't mess up with form submits or similar page actions
      app.$watch('$route.path', () => {
        console.log('Update...');
        reg.update();
      });
      // updatefound is fired if service-worker.js changes.
      reg.onupdatefound = function() {
        // The updatefound event implies that reg.installing is set; see
        // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and the fresh content will
                // have been added to the cache.
                // It's the perfect time to display a "New content is available; please refresh."
                // message in the page's interface.
                console.log('New or updated content is available.');
                reg.waiting.postMessage({ type: 'skipWaiting' });
                reg.unregister().then(() => {
                  console.log('successful');
                  window.location.reload(true);
                });
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a "Content is cached for offline use." message.
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              // reg.unregister().then(() => {
              //   console.error('The installing service worker became redundant.');
              //   window.location.reload(true);
              // });
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  });
}
