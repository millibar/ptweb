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
   * dateItemに対応するHTML要素の配列を返す. dataのない日は日付のみを返す
   * @param {DateItemModel} dateItem 
   * @returns {Array.<HTML Element>}
   */
  createContent(dateItem) {
    const data = dateItem.getData();
    const yyyymmdd = splitDateInt(dateItem.getDateInt());
    let dateText = `${yyyymmdd[0]}.${yyyymmdd[1]}.${yyyymmdd[2]}`;
    let stepText = '';
    let valueText = '';

    if (dateItem.hasData()) {
      stepText += ` STEP ${data.step}`;
      if (data.set1) {
        valueText += String(data.set1);
      }
      if (data.set1Alt) {
        valueText += ',';
        valueText += String(data.set1Alt);
      }
      if (data.set2) {
        valueText += ' ';
        valueText += String(data.set2);
      }
      if (data.set2Alt) {
        valueText += ',';
        valueText += String(data.set2Alt);
      }
      if (data.set3) {
        valueText += ' ';
        valueText += String(data.set3);
      }
      if (data.set3Alt) {
        valueText += ',';
        valueText += String(data.set3Alt);
      }
    }
    const dateSpan = document.createElement('span');
    dateSpan.textContent = dateText;
    dateSpan.setAttribute('class', 'date');

    const stepSpan = document.createElement('span');
    stepSpan.textContent = stepText;
    stepSpan.setAttribute('class', 'step');

    const valueSpan = document.createElement('span');
    valueSpan.textContent = valueText;
    valueSpan.setAttribute('class', 'value');

    return [dateSpan, stepSpan, valueSpan];
  }

  /**
   * dateItemに対応するHTML要素を返す
   * @param {DateItemModel} dateItem 
   * @returns {Element} li要素
   */
  createElement(dateItem) {
    const li = document.createElement('li');

    const NodeList = this.createContent(dateItem);

    if (dateItem.hasData()) {
      li.classList.add('has-data');
    }
    for (let element of NodeList) {
      li.appendChild(element);
    }
    
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
    li.innerHTML = '';

    const NodeList = this.createContent(dateItem);
    for (let element of NodeList) {
      li.appendChild(element);
    }

    if (dateItem.hasData()) {
      li.classList.add('has-data');
    } else {
      li.classList.remove('has-data');
    }
  }
}