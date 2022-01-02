console.log('EditController.js is loaded.');

import { EditModel } from './EditModel.js';
import { EditView } from './EditView.js';
import { idb } from './idb.js';
import { fetcher } from './fetch.js';
import { drawGraph } from './barGraph.js';
import { toDateInt } from './util.js';


export class EditController {
  /**
   * 記録の編集フォームのコントローラー。
   * @param {string} big6 'pushup', 'squat', 'pullup', 'leg-raise', 'bridge', 'handstand'のいずれか
   */
  constructor(big6) {
    console.log('EditControllerを生成します');
    this.store = big6 // IndexedDBの読み書きするオブジェクトストア名
    this.editView = new EditView();
    this.editModel = null;

    this.dateItemView = null; 
  }

  setEditModel(data) {
    // editModelの値の変化は引数のdataにも影響する.これによって、DateItemModelの保持するdataも更新される
    this.editModel = new EditModel(this.store, data); 

    this.editView.showEditForm(this.editModel);
    this.editView.createOptionElement(this.editModel);
    this.editView.updateSetInput(this.editModel);
    this.editView.updateGoalText(this.editModel);

    // editModelの初期値をinput要素にセットする
    const keys = ['set1', 'set1Alt', 'set2', 'set2Alt', 'set3', 'set3Alt'];
    for (const key of keys) {
      const input = document.getElementById(key);
      const value = this.editModel.getData(key);
      if (value) {
        input.value = value;
      }
    }

    this.editModel.onChange(() => {
      console.log('onChange');
      this.editView.updateSetInput(this.editModel);
      this.editView.updateGoalText(this.editModel);
    });
  }

  removeEditModel() {
    this.editModel = null;
  }

  setDateItemView(dateItemView) {
    this.dateItemView = dateItemView;
  }

  removeDateItemView() {
    this.dateItemView = null;
  }

  /**
   * STEPのselect要素を切り替えたときに呼ばれるリスナー関数
   * @param {number} value select要素のvalue
   */
  handleSelectChange(value) {
    this.editModel.setStep(value);
  }

  /**
   * SET1～SET3のinput値を変化させたときに呼ばれるリスナー関数
   * @param {string} key 
   * @param {number} value input要素のvalue
   */
  handleInputChange(key, value) {
    if (value) {
      this.editModel.setData(key, value);
    } else {
      this.editModel.setData(key, '');
    }
  }

  /**
   * 保存ボタンが押されたときに呼ばれるリスナー関数
   * editModelのdataをIndexedDBに書き込む（すべて0ならレコードを削除する）
   */
  handleSave() {
    console.log('保存ボタンが押されました');
    const store = this.store;
    const data = Object.assign({}, this.editModel.data);
    const dateInt = this.editModel.getDateInt();

    // idbに書き込んだ後で、サーバーのDBに書き込み後のレコードをPOSTする
    const idbWriting = [];
    if (this.editModel.hasData()) {
      idbWriting.push(idb.put(store, data));
    } else {
      idbWriting.push(idb.softDel(store, dateInt));
    }
    Promise.race(idbWriting).then(async (key) => {
      if (key) {
        const record = await idb.get(store, key, true);
        fetcher.post(store, record);
      } else {
        console.log('レコードがないため、サーバーへの送信は不要です');
      }

      drawGraph(store); // 棒グラフの更新はidbWritingが完了してからにする！

      if (this.editModel.hasData() && dateInt === toDateInt(new Date())) {
        this.editView.showTweetButton(this.editModel);
      } else {
        console.log('データがない、または当日でない場合はTweetボタンは出さない');
      }
      this.removeEditModel();
    });

    this.editView.hideEditForm();
    this.editView.clearInputValues();

    this.dateItemView.updateElement(store, data);
    this.removeDateItemView();
  }

  /**
   * キャンセルボタンが押されたときに呼ばれるリスナー関数
   * フォームの値をクリアし、editModelを破棄する
   */
  handleCancel() {
    console.log('閉じるボタンが押されました');
    this.editView.hideEditForm();
    this.editView.clearInputValues();
    this.removeEditModel();
  }

  /**
   * 最初に1回だけ実行される。フォームのHTML要素にイベントリスナーを登録する
   */
  init() {
    console.log('フォームのHTML要素にイベントリスナーを登録します');

    // input要素の値が変わったらeditModelの値も変える
    const keys = ['set1', 'set1Alt', 'set2', 'set2Alt', 'set3', 'set3Alt'];
    for (const key of keys) {
      const input = document.getElementById(key);
      input.addEventListener('change', (event) => {
        if (!Number(event.target.value)) {
          console.log('数値以外が入力されました');
          event.target.value = '';
        } 
        const value = Number(input.value); // 値なしは0になる
        this.handleInputChange(key, value);
      });
    }

    // select要素の値が変わったらeditModelの値も変える
    const select = document.getElementById('step');
    select.addEventListener('change', () => {
      const options = select.querySelectorAll('option');
      const value = Array.from(options).filter(option => option.selected)[0].value;
      this.handleSelectChange(Number(value));
    });

    const save = document.getElementById('save');
    save.addEventListener('click', () => {
      this.handleSave();
    });

    const cancel = document.getElementById('cancel');
    cancel.addEventListener('click', () => {
      this.handleCancel();
    });
  }
}