console.log('idb.js loaded.');

import { storage } from './storage.js';

const handleError = (error) => {
  console.error(error);
}

/**
 * dbName: IndexedDBの名称
 * store: オブジェクトストアはBIG 6の６つ（pushup, squat, pullup, leg_raise, bridge, handstand）
 * 
 * 各オブジェクトストアのフィールド
 * dateInt：主キーとする。日付を表す8桁の数値　ex. 20210421
 * step：1～10。インデックスあり。
 * set1：数値
 * set1Alt：数値
 * set2：数値
 * set2Alt：数値
 * set3：数値
 * set3Alt：数値
 * updatedAt：レコードを保存した日の時刻値（Date.now()で求める1970/1/1 0:00からの経過ミリ秒） ex. 1619303303626 
 * deletedAt: レコードの削除フラグ。updatedAtと同じ値。
 */
class Idb {
  constructor(dbName) {
    this.init(dbName);
  }

  init(dbName) {
    this.db = new Dexie(dbName);
    this.dbName = dbName;

    this.db.version(1).stores({
      pushup: 'dateInt, step',
      squat: 'dateInt, step',
      pullup: 'dateInt, step',
      leg_raise: 'dateInt, step',
      bridge: 'dateInt, step',
      handstand: 'dateInt, step'
    });
  }

  /**
 * Dexieを使ってIndexedDBにデータを書き込む（主キーが同じなら上書き）
 * @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
 * @param {Object} data 書き込むデータ
 * @returns {Promise} 成功すれば主キーのdateIntが返る
 */
  put(store, data) {
    const record = Object.assign({ updatedAt: Date.now() }, data); // 引数のdataに影響を与えないように
    delete record.deletedAt;
    return new Promise(resolve => {
      switch (store) {
        case 'pushup':
          resolve(this.db.pushup.put(record).catch(handleError));
          break;
        case 'squat':
          resolve(this.db.squat.put(record).catch(handleError));
          break;
        case 'pullup':
          resolve(this.db.pullup.put(record).catch(handleError));
          break;
        case 'leg_raise':
          resolve(this.db.leg_raise.put(record).catch(handleError));
          break;
        case 'bridge':
          resolve(this.db.bridge.put(record).catch(handleError));
          break;
        case 'handstand':
          resolve(this.db.handstand.put(record).catch(handleError));
          break;
      }
      console.log(`IndexedDB(${this.dbName}_${store})に書き込み：`, record);
    });
  }

  /**
   * Dexieを使ってIndexedDBに複数のデータを一括で書き込む（主キーが同じなら上書き）
   * @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
   * @param {Array.<Object>} bulkData 書き込むデータの配列
   * @returns {Promise} 成功すれば最後に追加した主キー（dateInt）が返る
   */
  bulkPut(store, bulkData) {
    return new Promise(resolve => {
      switch (store) {
        case 'pushup':
          resolve(this.db.pushup.bulkPut(bulkData).catch(handleError));
          break;
        case 'squat':
          resolve(this.db.squat.bulkPut(bulkData).catch(handleError));
          break;
        case 'pullup':
          resolve(this.db.pullup.bulkPut(bulkData).catch(handleError));
          break;
        case 'leg_raise':
          resolve(this.db.leg_raise.bulkPut(bulkData).catch(handleError));
          break;
        case 'bridge':
          resolve(this.db.bridge.bulkPut(bulkData).catch(handleError));
          break;
        case 'handstand':
          resolve(this.db.handstand.bulkPut(bulkData).catch(handleError));
          break;
      }
      console.log(`IndexedDB(${this.dbName}_${store})に一括書き込み：${bulkData.length}件`);
    });
  }

  /**
 * Dexieを使ってIndexedDBからデータを読み出す
 * @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
 * @param {number} dateInt データの主キー
 * @param {boolean} includesDeleted 削除フラグのあるrecordを含む場合はtrue 
 * @returns {Object} record（recordのない日はundefined）
 */
  async get(store, dateInt, includesDeleted = false) {

    let record;
    switch (store) {
      case 'pushup':
        record = await this.db.pushup.get(dateInt).catch(handleError);
        break;
      case 'squat':
        record = await this.db.squat.get(dateInt).catch(handleError);
        break;
      case 'pullup':
        record = await this.db.pullup.get(dateInt).catch(handleError);
        break;
      case 'leg_raise':
        record = await this.db.leg_raise.get(dateInt).catch(handleError);
        break;
      case 'bridge':
        record = await this.db.bridge.get(dateInt).catch(handleError);
        break;
      case 'handstand':
        record = await this.db.handstand.get(dateInt).catch(handleError);
        break;
    }

    if (includesDeleted) {
      console.log(`IndexedDB(${this.dbName}_${store})から読み出し（削除済み含む）：`, record);
      return record;
    }
    console.log(`IndexedDB(${this.dbName}_${store})から読み出し（削除済み除く）：`, record);
    if (record && record.deletedAt) {
      return undefined;
    }
    return record;
  }

  /**
   * Dexieを使ってIndexedDBからデータを複数一括で読み出す。引数の配列と同じ要素数の配列を返す
   * @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
   * @param {Array.<number>} dateIntList データの主キーの配列
   * @param {boolean} includesDeleted 削除フラグのあるrecordを含む場合はtrue 
   * @returns {Array.<Object>} recordの配列（recordのない日はundefined）
   */
  async bulkGet(store, dateIntList, includesDeleted = false) {
    let records;
    switch (store) {
      case 'pushup':
        records = await this.db.pushup.bulkGet(dateIntList).catch(handleError);
        break;
      case 'squat':
        records = await this.db.squat.bulkGet(dateIntList).catch(handleError);
        break;
      case 'pullup':
        records = await this.db.pullup.bulkGet(dateIntList).catch(handleError);
        break;
      case 'leg_raise':
        records = await this.db.leg_raise.bulkGet(dateIntList).catch(handleError);
        break;
      case 'bridge':
        records = await this.db.bridge.bulkGet(dateIntList).catch(handleError);
        break;
      case 'handstand':
        records = await this.db.handstand.bulkGet(dateIntList).catch(handleError);
        break;
    }
    
    if (includesDeleted) {
      console.log(`IndexedDB(${this.dbName}_${store})から一括読み出し（削除済み含む）：`, records);
      return records;
    } else {
      const notDeletedOnly = records.map(record => { // このrecordはundefinedの可能性もある
        if (record && record.deletedAt) {
          return undefined;
        } else {
          return record;
        }
      });
      console.log(`IndexedDB(${this.dbName}_${store})から一括読み出し（削除済み除く）：`, notDeletedOnly);
      return notDeletedOnly;
    }
  }

  /**
 * Dexieを使ってIndexedDBからデータを削除する
 * @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
 * @param {number} dateInt データの主キー
 */
  del(store, dateInt) {
    switch (store) {
      case 'pushup':
        this.db.pushup.delete(dateInt).catch(handleError);
        break;
      case 'squat':
        this.db.squat.delete(dateInt).catch(handleError);
        break;
      case 'pullup':
        this.db.pullup.delete(dateInt).catch(handleError);
        break;
      case 'leg_raise':
        this.db.leg_raise.delete(dateInt).catch(handleError);
        break;
      case 'bridge':
        this.db.bridge.delete(dateInt).catch(handleError);
        break;
      case 'handstand':
        this.db.handstand.delete(dateInt).catch(handleError);
        break;
    }
    console.log(`IndexedDB(${this.dbName}_${store})から削除：`, dateInt);
  }

  /**
* Dexieを使ってIndexedDBのデータに削除フラグ（deletedAt）を書き込む
* @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
* @param {number} dateInt データの主キー
* @returns {Promise} 成功すれば主キーのdateIntが返る
*/
  async softDel(store, dateInt) {
    const record = await this.get(store, dateInt);
    if (!record) {
      console.log('有効なレコードがありません');
      return;
    }
    const today = Date.now();
    record.deletedAt = today;
    record.updatedAt = today;

    return new Promise(resolve => {
      switch (store) {
        case 'pushup':
          resolve(this.db.pushup.put(record).catch(handleError));
          break;
        case 'squat':
          resolve(this.db.squat.put(record).catch(handleError));
          break;
        case 'pullup':
          resolve(this.db.pullup.put(record).catch(handleError));
          break;
        case 'leg_raise':
          resolve(this.db.leg_raise.put(record).catch(handleError));
          break;
        case 'bridge':
          resolve(this.db.bridge.put(record).catch(handleError));
          break;
        case 'handstand':
          resolve(this.db.handstand.put(record).catch(handleError));
          break;
      }
      console.log(`IndexedDB(${this.dbName}_${store})に削除フラグを書き込み：`, record);
    });
  }

  /**
   * Dexieを使ってIndexedDBから対象のBIG6, stepのすべてのrecordの配列を返す
   * 削除フラグ（deletedAt）のあるレコードは含まない。
   * @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
   * @param {number} step 1～10
   * @returns {Array.<Object>}
   */
  async getAll(store, step) {
    let records = [];

    const add = (record) => {
      if (!record.deletedAt) {
        records.push(record);
      }
    }

    switch (store) {
      case 'pushup':
        await this.db.pushup.where('step').equals(step).each(add).catch(handleError);
        break;
      case 'squat':
        await this.db.squat.where('step').equals(step).each(add).catch(handleError);
        break;
      case 'pullup':
        await this.db.pullup.where('step').equals(step).each(add).catch(handleError);
        break;
      case 'leg_raise':
        await this.db.leg_raise.where('step').equals(step).each(add).catch(handleError);
        break;
      case 'bridge':
        await this.db.bridge.where('step').equals(step).each(add).catch(handleError);
        break;
      case 'handstand':
        await this.db.handstand.where('step').equals(step).each(add).catch(handleError);
        break;
    }
    console.log(`IndexedDB(${this.dbName}_${store})のstep ${step}をすべて読み出し：${records.length}件`);
    return records;
  }

  /**
   * Dexieを使ってIndexedDBから対象のBIG6のすべてのrecordの配列を返す
   * 削除フラグ（deletedAt）のあるレコードは含まない。
   * @param {string} store オブジェクトストアの名前（pushup, squat, pullup, leg_raise, bridge, handstand）
   * @returns {Array.<Object>}
   */
  async bulkGetAll(store) {
    let records = [];

    const add = (record) => {
      if (!record.deletedAt) {
        records.push(record);
      }
    }

    switch (store) {
      case 'pushup':
        await this.db.pushup.orderBy('dateInt').each(add).catch(handleError);
        break;
      case 'squat':
        await this.db.squat.orderBy('dateInt').each(add).catch(handleError);
        break;
      case 'pullup':
        await this.db.pullup.orderBy('dateInt').each(add).catch(handleError);
        break;
      case 'leg_raise':
        await this.db.leg_raise.orderBy('dateInt').each(add).catch(handleError);
        break;
      case 'bridge':
        await this.db.bridge.orderBy('dateInt').each(add).catch(handleError);
        break;
      case 'handstand':
        await this.db.handstand.orderBy('dateInt').each(add).catch(handleError);
        break;
    }
  
    console.log(`IndexedDB(${this.dbName}_${store})のレコードをすべて読み出し：${records.length}件`);
    return records;
  }

}




const dbName = storage.getItem('DB_NAME') || 'guest';

const idb = new Idb(dbName);


export { idb };
