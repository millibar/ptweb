console.log('EditModel.js is loaded.');

import { EventEmitter } from './EventEmitter.js';
import { big6Obj } from './big6.js';
import { storage } from './storage.js';


export class EditModel extends EventEmitter {
  constructor(big6, data) {
    super();
    this.data = data; // { dateInt, step, set1, set1Alt, set2, set2Alt, set3, set3Alt }
    this.big6 = big6Obj[big6];
    this.big6Name = big6;
    this.level1 = '';
    this.level2 = '';
    this.level3 = '';
    this.hasAltSet = false;
    this.placeholder = '';
    this.placeholderAlt = '';

    // モデルにstepがあればその値、なければローカルストレージに保存された値、それもなければ1とする
    const step = this.getStep() ? this.getStep() : storage.getItem(big6);
    this.data['step'] = step ? step : 1;

    this.updateLevel();
    this.updateAltSet();
    this.updatePlaceholder();

  }

  getDateInt() {
    return this.data['dateInt'];
  }

  getData(key) {
    return this.data[key];
  }

  getBig6() {
    return this.big6;
  }

  getStep() {
    return Number(this.data['step']);
  }

  /**
   * 現在のステップにおけるトレーニング・ゴールの初心者～上級者の標準の文字列を返す
   * @param {number} n 1：初心者, 2：中級者, 3：上級者
   * @returns {string} 
   */
  getLevel(n) {
    switch (n) {
      case 1:
        return this.level1;
      case 2:
        return this.level2;
      case 3:
        return this.level3;
    }
    console.error('getLevel()の引数は1, 2, 3のいずれかでなければなりません.');
  }

  getPlaceholder() {
    return this.placeholder;
  }

  getPlaceholderAlt() {
    return this.placeholderAlt;
  }

  /**
   * EditModelの状態が更新されたときに呼び出されるリスナー関数を登録する
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

  setStep(n) {
    storage.setItem(this.big6Name, n);
    storage.save();
    this.data['step'] = n;
    this.updateLevel();
    this.updateAltSet();
    this.updatePlaceholder();
    this.emitChange();
  }

  setData(key, value) {
    this.data[key] = value;
    console.log(`${key}に${value}をセット`);
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

  updateLevel() {
    this.level1 = this.big6[this.getStep()]['level1'];
    this.level2 = this.big6[this.getStep()]['level2'];
    this.level3 = this.big6[this.getStep()]['level3'];
  }

  updateAltSet() {
    this.hasAltSet = this.big6[this.getStep()]['alt'];
  }

  updatePlaceholder() {
    this.placeholder = this.big6[this.getStep()]['placeholder'];
    this.placeholderAlt = this.big6[this.getStep()]['placeholderAlt'];
  }
}