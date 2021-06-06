console.log('DateModel.js is loaded.');

import { EventEmitter } from './EventEmitter.js';


export class DateListModel extends EventEmitter {
  /**
   * DateItemを格納する辞書
   * @param {Object.<DateItemModel>} items 
   */
  constructor(items) {
    super();
    this.items = items;
  }

  /**
   * DateItemの個数を返す
   * @returns {number}
   */
  getCount() {
    return Object.keys(this.items).length;
  }

  /**
   * DateItemの配列を返す
   * @returns {Array.<DateItemModel}
   */
  getDateItems() {
    const keys = Object.keys(this.items).reverse();
    return keys.map(dateInt => this.items[dateInt]);
  }

  /**
   * 末尾のDateItemを返す
   * @returns {DateItemModel}
   */
  getLastItem() {
    const last = Object.keys(this.items).reverse().pop();
    return this.items[last];
  }

  /**
   * dateIntに対応するDateItemを返す
   * @param {number} dateInt 
   * @returns {DateItemModel}
   */
  getDateItem(dateInt) {
    return this.items[dateInt];
  }

  /**
   * DateListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener 
   */
  onChange(listener) {
    this.addEventListener('change', listener);
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    this.emit('change');
  }

  /**
   * DateItemを追加する
   * @param {DateItemModel} dateItem 
   */
  addDateItem(dateItem) {
    const dateInt = dateItem.getDateInt();
    this.items[dateInt] = dateItem;
    this.emitChange();
  }

}

export class DateItemModel {
  /**
   * 
   * @param {string} big6 
   * @param {Object} data 
   */
  constructor(big6, data) {
    this.big6 = big6;
    this.data = data;
  }

  /**
   * set1, set1Alt, set2, set2Alt, set3, set3Altのどれかに値があればtrueを返す
   * @returns {boolean}
   */
   hasData() {
    if (this.data['set1'] || this.data['set1Alt'] ||
        this.data['set2'] || this.data['set2Alt'] ||
        this.data['set3'] || this.data['set3Alt'] ) {
      return true;
    } else {
      return false;
    }
  }

  getDateInt() {
    return this.data['dateInt'];
  }

  getBig6() {
    return this.big6;
  }

  getData() {
    return this.data;
  }
}