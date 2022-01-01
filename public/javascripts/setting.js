console.log('setting.js is loaded.');

import { storage } from './storage.js';
import { fetcher } from './fetch.js';
import { activateButtonForiOs, isOnLine } from './util.js';
import { sync } from './sync.js';
import { idb } from './idb.js';


activateButtonForiOs();
const userName = storage.getItem('USER_NAME');
const auth = document.getElementById('auth');
const logout = document.getElementById('logout');
const recordsCloud = document.getElementById('records-cloud');
const recordsDB = document.getElementById('records-db');
const twitterIcon = document.getElementById('twitter-icon');

const big6Names = ['pushup', 'squat', 'pullup', 'leg_raise', 'bridge', 'handstand'];


/**
 * idbのレコード数を取得して画面上のレコード数を更新する
 */
function updateRecordCountIdb() {
  let dbCount = 0;
  for (const big6 of big6Names) {
    idb.bulkGetAll(big6).then(records => {
      dbCount += records.length;
      recordsDB.textContent = dbCount;
    }).catch(error => {
      console.error(`レコード数の取得に失敗：${error}`);
    });
  }
}

/**
 * Web上のデータベースのレコード数を取得して画面上のレコード数を更新する
 */
function updateRecordCountCloud() {
  let cloudCount = 0;
  for (const big6 of big6Names) {
    fetcher.count(big6).then(response => {
      switch(response.status) {
        case 'OK':
          cloudCount += response.data;
          recordsCloud.textContent = cloudCount;
  
          break;
        case 'NG':
          console.error(response.message);
      }
    });
  }
}


updateRecordCountIdb();

// Twitterアカウント連携済みの場合
if (userName) {
  const li = document.getElementById('user-name');
  li.textContent = userName;
  auth.querySelector('span').textContent = 'Twitterでサインインする';
  twitterIcon.classList.remove('hidden');
}

// オンラインのとき
isOnLine().then(result => {
  if (result) {
    // 「データ管理」セクションを表示する
    const dataManageArea = document.querySelector('.data-manage');
    dataManageArea.classList.remove('hidden');
  
    // Twitterにサインイン中のとき
    fetcher.isAuthenticated().then(response => {
      switch(response.status) {
        case 'OK':
          // twitterアイコンをアクティブにする
          twitterIcon.classList.add('active');
  
          //「Web上のデータベースと同期する」のボタンを表示する
          syncButton.classList.remove('hidden');
  
          // クラウドアイコンを表示する
          const cloudIcon = document.getElementById('cloud-icon');
          cloudIcon.classList.remove('hidden');
  
          // Web上のデータベースのレコード数を取得して表示を更新する
          updateRecordCountCloud();
  
          break;
        case 'NG':
          console.log(response.message);
          //「Twitterでアカウント連携する」のリンクを表示する
          auth.classList.remove('hidden');
      }
    });

    if (userName) {
      logout.classList.remove('hidden');
    }
  }
}).catch(error => {
  console.error(error);
});

// 「アカウント連携を解除する」をクリックしたとき
logout.addEventListener('click', () => {
  storage.setItem('DB_NAME', null);
  storage.setItem('USER_NAME', null);
  storage.save();
});


const updateCache = document.getElementById('update-cache');
updateCache.addEventListener('click', () => {
  updateCache.disabled = true;
  updateCache.classList.remove('button');

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
    updateRecordCountCloud();
    updateRecordCountIdb();
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

