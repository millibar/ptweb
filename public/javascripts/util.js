console.log('util.js is loaded.');
import { fetcher } from './fetch.js';

/**
 * yyyymmdd形式の数値を['yyyy', 'mm', 'dd']にして返す
 * @param {number} dateInt yyyymmdd形式の数値
 * @returns {Array.<string>} ['yyyy', 'mm', 'dd']
 */
const splitDateInt = (dateInt) => {
    const yyyymmdd = String(dateInt);
    const yyyy = yyyymmdd.slice(0, 4);
    const mm = yyyymmdd.slice(4, 6);
    const dd = yyyymmdd.slice(-2);
    return [yyyy, mm, dd];
}

/**
 * 日付をyyyymmdd形式の数値に変換する
 * @param {Date} date Dateインスタンス
 * @returns {number} yyyymmdd形式の数値
 */
const toDateInt = (date) => {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // 0埋めして2桁にする
  const dd = String(date.getDate()).padStart(2, '0');
  return Number(`${yyyy}${mm}${dd}`);
}

/**
 * dateIntを起点に、過去days日分のdateIntを配列で返す
 * (20210402, 5) => [20210402, 20210401, 20210331, 20210330, 20210329] 
 * @param {number} dateInt 起点となる日付を表すyyyymmdd形式の数値
 * @param {number} days 〇日前を指定する
 * @returns {Array.<number>} dateIntの配列
 */
const makeDateIntList = (dateInt, days) => {
  const yyyymmdd = String(dateInt);
  const yyyy = yyyymmdd.slice(0, 4);
  const mm = yyyymmdd.slice(4, 6);
  const dd = yyyymmdd.slice(-2);

  const firstDate = new Date(yyyy, mm - 1, dd);
  const firstDateTime = firstDate.getTime(); // 1970/1/1 0:00からの経過ミリ秒
  const dateTimeList = [];
  for (let i = 0; i < days; i++) {
    const dayOffset = 3600 * 24 * 1000 * i;
    dateTimeList.push(firstDateTime - dayOffset);
  }

  const dateIntList = dateTimeList.map(dateTime => toDateInt(new Date(dateTime)));
  return dateIntList;
}

const activateButtonForiOs = () => {
  const nodeList = document.querySelectorAll('.button');
  const elements = Array.from(nodeList);
  for (const element of elements) {
    element.addEventListener('touchstart', () => {
      // iOSでは :active のつく要素に ontouchstart ハンドラーを追加しないとアクティブ時のスタイルの指定が効かない
    });
  }
}

/**
 * オンラインかどうか調べる
 * @returns {boolean} オンラインならtrue
 */
const isOnLine = async () => {
  let result = false;
  if (navigator.onLine) {
    console.log('navigator.onLine is true.');

    await fetcher.isOnLine().then(response => {
      if (response.status === 'OK') {
        console.log('オンラインです');
        result = true;
      } else {
        console.error('想定外のエラーです');
      }
    }).catch(error => {
      console.error(error);
    });
  } else {
    console.log('navigator.onLine is false.');
  }
  return result;
}


export { splitDateInt, toDateInt, makeDateIntList, activateButtonForiOs, isOnLine };