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
    });
  }
  
  /**
   * サーバーにデータをPOSTして、twitterで認証済みか調べる
   * @returns {Promise} 解決すると{ status: "OK" }というJSONが返る
   */
  isAuthenticated() {
    return new Promise(resolve => {
      resolve(postData('/setting/authenticate'));
    });
  }
}

const fetcher = new Fetcher();

export { fetcher };