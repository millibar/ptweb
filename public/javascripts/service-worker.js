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

const cacheName = 'v202106121501';

const precacheResources = [
     '../',
     '../setting',
     '../big6/pushup',
     '../big6/squat',
     '../big6/pullup',
     '../big6/leg_raise',
     '../big6/bridge',
     '../big6/handstand',
     '../stylesheets/style.css',
     'big6.js',
     'DateController.js',
     'DateModel.js',
     'DateView.js',
     'dexie.min.js',
     'edit-and-date.js',
     'EditController.js',
     'EditModel.js',
     'EditView.js',
     'EventEmitter.js',
     'fetch.js',
     'idb.js',
     'index.js',
     'setting.js',
     'storage.js',
     'util.js'
];

self.addEventListener('install', (event) => {
     console.log('Service worker install event!');
     event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
     console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
     console.log('Fetch intercepted for:', event.request.url);
     event.respondWith(
       caches.match(event.request).then((cachedResponse) => {
         if (cachedResponse) {
           return cachedResponse;
         }
         return fetch(event.request);
       }),
     );
});
