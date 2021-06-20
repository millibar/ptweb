console.log('auth.js loaded.');
import { idb } from './idb.js';

import { storage } from './storage.js';

if (DB_NAME) {
  storage.setItem('DB_NAME', DB_NAME);
  storage.save();
  idb.init(DB_NAME);
}

if (USER_NAME) {
  storage.setItem('USER_NAME', USER_NAME);
  storage.save();
}

location.href = '/';
