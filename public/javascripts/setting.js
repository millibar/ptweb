console.log('setting.js is loaded.');

import { storage } from './storage.js';
import { fetcher } from './fetch.js';
import { activateButtonForiOs } from './util.js';
import { sync } from './sync.js';


activateButtonForiOs();

const userName = storage.getItem('USER_NAME');
const a = document.getElementById('auth');

if (userName) {
  const li = document.getElementById('user-name');
  li.textContent = userName;
  a.textContent = 'サインインする';
}



const updateCahse = document.getElementById('update-chache');
updateCahse.addEventListener('click', () => {
  updateCahse.disabled = true;
  updateCahse.classList.remove('button');

  const swctrl = navigator.serviceWorker.controller;
  swctrl.postMessage({ 'command': 'clearCacheAll' });
  
  const body = document.querySelector('body');
  const div = document.createElement('div');
  div.textContent = 'キャッシュを更新しました';
  div.setAttribute('class', 'temp-alert');
  body.appendChild(div);

  setTimeout(() => {
    body.removeChild(div);
    swctrl.postMessage({ 'command': 'getCache' });
  }, 1000);
});

const syncButton = document.getElementById('sync');
syncButton.addEventListener('click', () => {
  syncButton.disabled = true;
  syncButton.classList.remove('button');

  const days = 180;
  const div = document.getElementById('sync-indicator')
  const span = document.getElementById('progress');
  const dt = document.querySelector('#sync-indicator dt');

  div.classList.remove('hidden');
  div.classList.add('apear');

  dt.textContent = 'PUSHUPを同期中...';

  sync('pushup', days).then(() => {// PUSHUP完了
    span.classList.add('pushup');
    dt.textContent = 'SQUATを同期中...';
    return sync('squat', days);
  }).then(() => { // SQUAT完了
    span.classList.remove('pushup');
    span.classList.add('squat');
    dt.textContent = 'PULLUPを同期中...';
    return sync('pullup', days);
  }).then(() => { // PULLUP完了
    span.classList.remove('squat');
    span.classList.add('pullup');
    dt.textContent = 'LEG RAISEを同期中...';
    return sync('leg_raise', days);
  }).then(() => { // LEG RAISE完了
    span.classList.remove('pullup');
    span.classList.add('leg_raise');
    dt.textContent = 'BRIDGEを同期中...';
    return sync('bridge', days);
  }).then(() => { // BRIDGE完了
    span.classList.remove('leg_raise');
    span.classList.add('bridge');
    dt.textContent = 'HANDSTANDを同期中...';
    return sync('handstand', days);
  }).then(() => { // HANDSTAND完了
    span.classList.remove('bridge');
    span.classList.add('handstand');
    dt.textContent = '完了';
    setTimeout(() => {
      div.classList.remove('apear');
      div.classList.add('hidden');
    }, 1000);
  }).catch(error => {
    console.error(error);
    dt.textContent = 'エラーが発生しました';
    setTimeout(() => {
      div.classList.remove('apear');
      div.classList.add('hidden');
    }, 1500);
  })

});

// twitterにサインイン済みのときのみ、HTMLを書き換える
fetcher.isAuthenticated().then(response => {
  switch(response.status) {
    case 'OK':
      //const section = document.querySelector('.data-manage');
      //section.classList.remove('hidden');

      const twitterIcon = document.getElementById('twitter-icon');
      twitterIcon.classList.add('active');

      a.textContent = 'サインアウトする';
      a.setAttribute('href', 'logout');

      syncButton.classList.remove('hidden');

      break;
    case 'NG':
      console.log(response.message);
  }
});