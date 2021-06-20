console.log('sync.js is loaded');

import { idb } from './idb.js';
import { fetcher } from './fetch.js';
import { makeDateIntList, toDateInt } from './util.js';

/**
 * サーバー上のDBにdays日分のトレーニングの記録をPOSTし、サーバーから返ってきた値をIndexed DBに保存する
 * @param {string} big6 
 * @param {number} days 今日を起点に何日前まで同期の対象とするか
 * @param {Promise} 成功すれば、最後に追加したdateInt、書き込む必要がなければ0
 */
function sync(big6, days) {
  const todayInt = toDateInt(new Date());
  const dateIntList = makeDateIntList(todayInt, days);

  return idb.bulkGet(big6, dateIntList, true).then(records => {
    const bulkData = {}; // dateInt: data の辞書
    for (let i = 0; i < dateIntList.length; i++) {
      const dateInt = dateIntList[i];
      if (records[i]) {
        bulkData[dateInt] = records[i];
      } else {
        bulkData[dateInt] = null;
      }
    }
    return new Promise(resolve => { resolve(bulkData);});
  })
  .then(bulkData => {
    return fetcher.sync(big6, bulkData);
  })
  .then(response => {
    if (response.length) {
      return idb.bulkPut(big6, response); // 最後に追加したdateIntが返る
    } else {
      console.log(`直近${days}日間について、サーバー上のDBと端末内のIndexed DBのレコードに差異はありません`);
      return 0;
    };
  })
  .catch(error => {
    console.log(error);
  });
}

export { sync };