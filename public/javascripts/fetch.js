console.log('fetch.js loaded');

/**
 * 
 * @param {string} url 
 * @param {Object} data 
 * @returns {JSON}
 */
async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

class Fetcher {
  /**
   * サーバーにデータをPOSTする
   * @param {string} big6 
   * @param {Object} data 
   */
  post(big6, data) {
    console.log(`${big6}にPOSTしました`, data);
    postData(`/big6/${big6}`, data).then(response => {
      switch(response.status) {
        case 'OK':
          console.log('サーバーのDBが正常に更新されました');
          break;
        case 'NG':
          console.log(response.message);
      }
    }).catch(error => {
      console.error(error);
    })
  }
  
  /**
   * サーバーにデータをPOSTして、twitterで認証済みか調べる
   * @returns {Promise} 解決すると{ status: "OK" }というJSONが返る
   */
  isAuthenticated() {
    return new Promise(resolve => {
      resolve(postData('/auth'));
    });
  }
  
  /**
   * サーバーにデータをPOSTして、BIG6のテーブルのレコード数を取得する
   * @param {string} big6
   * @returns {Promise} 解決するとサーバー上のDBからレコード数が返る
   */
  count(big6) {
    return new Promise(resolve => {
      resolve(postData(`/big6/${big6}/count`));
    });
  }

  /**
   * サーバーにデータをPOSTして、オンライン状態かどうか調べる
   * @returns {Promise} 解決すると{ status: "OK" }というJSONが返る
   */
  isOnLine() {
    return new Promise(resolve => {
      resolve(postData('/auth/isOnLine'));
    });
  }

  /**
   * サーバーにデータをPOSTして、サーバー上のDBのレコードとupdatedAtを比較し、
   * DBのほうが新しい、もしくはDBにしかないレコードがあれば、それらの配列を返す
   * @param {string} big6 
   * @param {Object} bulkData { dateInt: data }の辞書
   * @returns {Promise} 解決するとサーバー上のDBからレコードが配列で返る（空の配列もあり得る）
   */
  sync(big6, bulkData) {
    console.log(`${big6}に同期のためにPOSTしました:${Object.keys(bulkData).length}件`);
    return new Promise((resolve, reject) => {
      postData(`/big6/${big6}/sync`, bulkData).then(response => {
        switch(response.status) {
          case 'OK':
            resolve(response.data);
            break;
          case 'NG':
            reject(response.message);
        }
      }).catch(error => {
        console.error(error);
        reject(error);
      });
    });
  }
}

const fetcher = new Fetcher();

export { fetcher };