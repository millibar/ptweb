console.log('edit-and-date.js is loaded.');

import { makeDateIntList, toDateInt } from './util.js';
import { DateItemModel } from './DateModel.js';
import { DateController } from './DateController.js';
import { EditController } from './EditController.js'
import { idb } from './idb.js';


/**
 * 日付のリストを作る
 * @param {string} big6 IndexedDBのオブジェクトストア名
 * @param {number} days 日付の数
 */
async function createDateList(big6, days) {
  // 今日を起点にdays日分のDateItemを作る
  const todayInt = toDateInt(new Date());
  const dateIntList = makeDateIntList(todayInt, days);

  const dataList = await idb.bulkGet(big6, dateIntList);

  const dateItems = {};
  for (let i = 0; i < dataList.length; i++) {
    const dateInt = dateIntList[i];
    let data = dataList[i];
    if (!data) {
      console.log('空のdataを用意します');
      data = { dateInt };
    }
    const dateItem = new DateItemModel(big6, data);
    dateItems[dateInt] = dateItem;
  }

  const dateController = new DateController(dateItems);
  dateController.init();
}

createDateList(big6, 10);

const editController = new EditController(big6);
editController.init();

export { editController }; // DateViewで使う
