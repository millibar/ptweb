console.log('storage.js is loaded.');

/**
 * { 
 *  DB_NAME: 'guest' or 'twitterのuser.idを10桁の文字列に変換した値',
 *  USER_NAME: twitterのusername,
 *  canTweet: 0 or 1,
 *  pushup: PUSHUPで最後に選択したステップ,
 *  squat:
 *  pullup:
 *  leg_rage:
 *  bridge:
 *  handstand:
 * }
 */
class Storage {
  /**
   * ローカルストレージへの読み書き
   * @param {string} appName アプリの名称
   */
  constructor(appName) {
    this.app = appName;
    this.storage = localStorage;
    this.data = JSON.parse(this.storage[this.app] || '{}');
    console.log('ローカルストレージから読み出し');
    console.log(this.data);
  }

  /**
   * キーkeyに対応する値を取り出す
   * @param {string} key 
   * @returns 
   */
  getItem(key) {
    return this.data[key];
  }

  /**
   * キーkeyに対応する値valueを一時的に保存する。
   * save()が呼ばれるまでは、ローカルストレージにデータは保存されない
   * @param {string} key 
   * @param {string} value 
   */
  setItem(key, value) {
    this.data[key] = value;
  }

  /**
   * 一時的に保存されたkey-value形式のデータをローカルストレージに保存する
   */
  save() {
    console.log('ローカルストレージへ書き込み');
    console.log(this.data);
    this.storage[this.app] = JSON.stringify(this.data);
  }
}

const storage = new Storage('pt');

export { storage };