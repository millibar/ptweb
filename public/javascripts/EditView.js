console.log('EditView.js is loaded.');

import { splitDateInt, isOnLine } from './util.js';
import { createTweetButton } from './twitterPost.js';

export class EditView {
  constructor() {
    this.form = document.querySelector('form');
  }

  /**
   * 下のボタンを押せないように画面上をdiv要素で覆う
   */
  overlayOn() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.setAttribute('id', 'overlay');
    body.appendChild(div);
  }

  overlayOff() {
    const body = document.querySelector('body');
    const div = document.getElementById('overlay');
    body.removeChild(div);
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

    this.overlayOn();
  }

  /**
   * 編集フォームを非表示にする
   */
  hideEditForm() {
    this.form.classList.remove('appear');
    this.form.classList.add('hidden');

    this.overlayOff();
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

  /**
   * Tweetボタンを表示する
   * @param {EditModel} editModel
   */
  showTweetButton(editModel) {
    const big6Names = {
      'pushup': 'プッシュアップ',
      'squat': 'スクワット',
      'pullup': 'プルアップ', 
      'leg_raise': 'レッグレイズ',
      'bridge': 'ブリッジ',
      'handstand': 'ハンドスタンド・プッシュアップ'
    };

    const big6 = big6Names[editModel.big6Name];
    const step = editModel.getStep();
    const title = editModel.big6[step]['title'];

    let prefillText = `${big6}\n`;
    prefillText += `STEP${step} ${title}\n`;

    const data = editModel.data;
    const dataList = [[data.set1, data.set1Alt], [data.set2, data.set2Alt], [data.set3, data.set3Alt]];

    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i][0] || dataList[i][1]) {
        prefillText += `\nSET${i + 1}：`;
        
        if (dataList[i][0]) {
          prefillText += `${dataList[i][0]}`;
          prefillText += editModel.getPlaceholder() ? `（${editModel.getPlaceholder()}）` : '';
        }

        if (dataList[i][1]) {
          prefillText += `${dataList[i][1]}`;
          prefillText += editModel.getPlaceholderAlt() ? `（${editModel.getPlaceholderAlt()}）` : '';
        }
      }
    }
    prefillText += '\n';

    // editModelの扱いを非同期処理の中で行うと完了前にeditModelが消される可能性があるので、isOnlineの外で済ませておく
    isOnLine().then(result => {
      if (result) {
        this.overlayOn();

        console.log(prefillText);
        const tweetButtonArea = document.getElementById('tweet-button-area');
        const container = document.querySelector('.container');
        
        createTweetButton(prefillText, container);
        const span = document.createElement('span');
        span.textContent = '閉じる';
        container.appendChild(span);

        span.addEventListener('click', () => {
          this.discardTweetButton();
        });

        tweetButtonArea.classList.add('appear');
      } else {
        console.log('オフラインなのでTwitterへの投稿はしません');
      }
    }).catch(error => {
      console.error(`Twitterへの投稿に失敗：${error}`);
    });
  }

  /**
   * Tweetボタンのダイアログを削除する
   */
  discardTweetButton() {
    
    const tweetButtonArea = document.getElementById('tweet-button-area');
    tweetButtonArea.classList.remove('appear');

    const container = document.querySelector('.container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    this.overlayOff();
  }
}