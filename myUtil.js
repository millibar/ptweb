'use strict';


/**
 * Twitterのidを20桁に0埋めした後、2桁ずつに区切り、52で割った余りに基づき、10桁のアルファベットに変換する
 * @param {string} id 19桁程度の数値
 * @returns {string} 変換後の文字列
 */
const twitterIdToDbName = (id) => {
  const pdId = String(id).padStart(20, 0);
  const target = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let idStr = '';
  for (let i = 0; i < 10; i++) {
    const num = pdId.slice(2 * i, 2 * i + 2);
    const pos = Number(num) % 52;
    idStr += target[pos];
  }

  return idStr;

}




module.exports = {
  twitterIdToDbName
};