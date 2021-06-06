console.log('setting.js is loaded.');

import { storage } from './storage.js';
import { fetcher } from './fetch.js';

const userName = storage.getItem('USER_NAME');

if (userName) {
  const li = document.getElementById('user-name');
  li.textContent = userName;
}

// twitterにサインイン済みのときのみ、HTMLを書き換える
fetcher.isAuthenticated().then(response => {
  console.log(response);
  switch(response.status) {
    case 'OK':
      //const section = document.querySelector('.data-manage');
      //section.classList.remove('hidden');

      const twitterIcon = document.getElementById('twitter-icon');
      twitterIcon.classList.add('active');

      const a = document.getElementById('auth');
      a.textContent = 'サインアウト';
      a.setAttribute('href', 'logout');

      break;
    case 'NG':
      console.log(response.message);
  }
});