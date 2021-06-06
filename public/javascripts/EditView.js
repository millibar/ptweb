console.log('EditView.js is loaded.');

import { splitDateInt } from './util.js';

export class EditView {
  constructor() {
    this.form = document.querySelector('form');
  }

  /**
   * 編集フォームを表示する
   * @param {EditModel} editModel
   */
  showEditForm(editModel) {
    const yyyymmdd = splitDateInt(editModel.getDateInt());
    const span = this.form.querySelector('#date');
    span.textContent = `${yyyymmdd[0]}.${yyyymmdd[1]}.${yyyymmdd[2]}`;
    this.form.classList.add('appear');
    this.form.classList.remove('hidden');

    // オーバーレイ
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.setAttribute('id', 'overlay');
    body.appendChild(div);
  }

  /**
   * 編集フォームを非表示にする
   */
  hideEditForm() {
    this.form.classList.remove('appear');
    this.form.classList.add('hidden');

    const body = document.querySelector('body');
    const div = document.getElementById('overlay');
    body.removeChild(div);
  }

  /**
   * input要素の値を削除する
   */
  clearInputValues() {
    const keys = ['set1', 'set1Alt', 'set2', 'set2Alt', 'set3', 'set3Alt'];
    for (const key of keys) {
      const input = document.getElementById(key);
      input.value = '';
    }
  }

  /**
   * 現在の種目のための各ステップを、select要素の子にoption要素として作る
   * @param {EditModdl} editModel 
   */
  createOptionElement(editModel) {
    const selectElement = document.getElementById('step');
    const big6 = editModel.getBig6();
    
    // 前回生成したoption要素があればすべて取り除く
    const childElements = selectElement.querySelectorAll('option');
    for (let option of childElements) {
      if (option) {
        option.remove();
      }
    }

    Object.keys(big6).forEach(step => {
      const option = document.createElement('option');
      option.textContent = `STEP ${step}　${big6[step]['title']}`;
      option.setAttribute('value', step);

      if (editModel.getStep() === Number(step)) {
        option.selected = true;
      }
      selectElement.appendChild(option);
    });

  }
  
  /**
   * 現在の種目とステップに合わせて、SET1～3の入力可否とplaceholderを更新する
   * @param {EditModel} editModel 
   */
  updateSetInput(editModel) {
    for (let i = 1; i <=3; i++) {
      const setElement = document.getElementById(`set${i}`);
      const setAltElement = document.getElementById(`set${i}Alt`);

      setElement.setAttribute('placeholder', editModel.getPlaceholder());
      setAltElement.setAttribute('placeholder', editModel.getPlaceholderAlt());

      setAltElement.disabled = editModel.hasAltSet ? false : true;
      if (setAltElement.disabled) {
        setAltElement.value = '';
        const key = setAltElement.getAttribute('id');
        editModel.setData(key, '');
      }
    }
  }

  /**
   * 現在の種目とステップに合わせて、トレーニング・ゴールの文言を更新する
   * @param {EditModel} editModel 
   */
  updateGoalText(editModel) {
    for (let i = 1; i <= 3; i++ ) {
      const span = document.getElementById(`level${i}`);
      span.textContent = editModel.getLevel(i);
    }
  }
}