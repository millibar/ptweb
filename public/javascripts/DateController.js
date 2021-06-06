console.log('DateController.js is loaded.');

import { DateListModel, DateItemModel } from './DateModel.js';
import { DateListView, DateItemView } from './DateView.js';

import { makeDateIntList, toDateInt } from './util.js';

import { idb } from './idb.js';

export class DateController {
  /**
   * 日付選択画面のコントローラー。
   * @param {Object.<DateItemModel>} items 初期のDateItemの辞書
   */
  constructor(items) {
    this.dateListModel = new DateListModel(items);

    this.dateListView = new DateListView();
    this.dateItemView = new DateItemView();
  }

  init() {
    // 初期のDateItemをViewに追加する
    const dateItems = this.dateListModel.getDateItems();

    for (let dateItem of dateItems) {
      const dateItemElement = this.dateItemView.createElement(dateItem);
      this.dateListView.addElement(dateItemElement);
    }

    // DateListModelが変化するのは、いまのところ、addDateItemされたときだけ
    this.dateListModel.onChange(() => {
      // addDateItemされたときの処理
      if (this.dateListView.getCount() < this.dateListModel.getCount()) {
        const addedItem = this.dateListModel.getLastItem();
        const dateItemElement = this.dateItemView.createElement(addedItem);
        this.dateListView.addElement(dateItemElement);
      }

    });

    // もっと見るをクリックしたら、DateItemを末尾に10個追加する
    const next = document.getElementById('next');
    next.addEventListener('click', async () => {
      const lastItem = this.dateListModel.getLastItem();
      const lastDateInt = lastItem.getDateInt();
      const big6 = lastItem.getBig6();
      const dateIntList = makeDateIntList(lastDateInt, 10);
      dateIntList.shift(); // 先頭はlastDateIntと同じなので除く
      for (let dateInt of dateIntList) {
        let data = await idb.get(big6, dateInt);
        if (!data) {
          console.log('空のdataを用意します');
          data = { dateInt };
        }
        const dateItem = new DateItemModel(big6, data);
        this.dateListModel.addDateItem(dateItem);
      }
    });
  }

}