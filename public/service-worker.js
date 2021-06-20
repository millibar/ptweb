/*
Copyright 2021 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const cacheName = 'v202106201640';

const precacheResources = [
     '/',
     '/setting',
     '/big6/pushup',
     '/big6/squat',
     '/big6/pullup',
     '/big6/leg_raise',
     '/big6/bridge',
     '/big6/handstand',
     '/stylesheets/style.css',
     '/javascripts/big6.js',
     '/javascripts/DateController.js',
     '/javascripts/DateModel.js',
     '/javascripts/DateView.js',
     '/javascripts/dexie.min.js',
     '/javascripts/edit-and-date.js',
     '/javascripts/EditController.js',
     '/javascripts/EditModel.js',
     '/javascripts/EditView.js',
     '/javascripts/EventEmitter.js',
     '/javascripts/fetch.js',
     '/javascripts/idb.js',
     '/javascripts/index.js',
     '/javascripts/setting.js',
     '/javascripts/storage.js',
     '/javascripts/sync.js',
     '/javascripts/util.js'
];


self.addEventListener('install', (event) => {
     console.log('[Service Worker] install event!');
     event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
     console.log('[Service Worker] activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
     console.log('[Service Worker] Fetch intercepted for:', event.request.url);
     event.respondWith(
       caches.match(event.request).then((cachedResponse) => {
         if (cachedResponse) {
           return cachedResponse;
         }
         return fetch(event.request);
       }),
     );
});


//メッセージ受信時の処理
self.addEventListener('message', (event) => {
     switch (event.data['command']) {
          case 'clearCacheAll':
               event.waitUntil(caches.keys().then(names => {
                    for (let name of names) {
                         console.log('[Service Worker] cache is deleted:', name);
                         caches.delete(name);
                    }
               }));
               break;
          case 'getCache':
               console.log('[Service Worker] cache is added:', cacheName);
               event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
               break;
     }
});