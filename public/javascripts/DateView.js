console.log('DateView.js is loaded.');

import { DateItemModel } from './DateModel.js';
import { editController } from './edit-and-date.js';
import { splitDateInt } from './util.js';

export class DateListView {
  constructor() {
    this.conatainer = document.getElementById('date-list');
  }
  /**
   * 日付のリストの末尾にli要素を追加する
   * @param {Element} li li要素
   */
  addElement(li) {
    this.conatainer.appendChild(li);
  }

  /**
   * 日付のリストの個数を返す
   * @returns {number}
   */
  getCount() {
    const nodeList = this.conatainer.querySelectorAll('li');
    return nodeList.length;
  }
}

export class DateItemView {
  
  /**
   * dateItemに対応する文字列を返す. dataのない日は日付のみを返す
   * @param {DateItemModel} dateItem 
   * @returns {string}
   */
  createContent(dateItem) {
    const data = dateItem.getData();
    const yyyymmdd = splitDateInt(dateItem.getDateInt());
    let text = `${yyyymmdd[0]}/${yyyymmdd[1]}/${yyyymmdd[2]}`;

    if (dateItem.hasData()) {
      text += ` STEP${data.step}`;
    }
    return text;
  }

  /**
   * dateItemに対応するHTML要素を返す
   * @param {DateItemModel} dateItem 
   * @returns {Element} li要素
   */
  createElement(dateItem) {
    const li = document.createElement('li');

    const text = this.createContent(dateItem);

    if (dateItem.hasData()) {
      li.classList.add('has-data');
    }

    li.textContent = text;
    li.setAttribute('id', `date${dateItem.getDateInt()}`);

    li.addEventListener('click', () => {
      const data = dateItem.getData();
      console.log('日付が選択されました。editModelに渡されるdataは', data);
      editController.setEditModel(data);
      editController.setDateItemView(new DateItemView());
    });

    return li;
  }

  /**
   * dataの情報をもとに、HTMLの内容を更新する
   * @param {string} big6
   * @param {Object} data
   */
  updateElement(big6, data) {
    console.log('表示を更新します')
    const dateItem = new DateItemModel(big6, data);
    const li = document.getElementById(`date${dateItem.getDateInt()}`);

    const text = this.createContent(dateItem);

    if (dateItem.hasData()) {
      li.classList.add('has-data');
    } else {
      li.classList.remove('has-data');
    }

    li.textContent = text;
  }
}