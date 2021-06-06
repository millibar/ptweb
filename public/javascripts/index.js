console.log('index.js loaded.');

import { storage } from './storage.js';
import { idb } from './idb.js';
import { makeDateIntList, toDateInt } from './util.js';
import { getLevel } from './big6.js';

if (DB_NAME) {
  storage.setItem('DB_NAME', DB_NAME);
  storage.save();
  idb.init(DB_NAME);
}

if (USER_NAME) {
  storage.setItem('USER_NAME', USER_NAME);
  storage.save();
}

/**
 * svg要素のviewBoxの各値をプロパティとしてもつオブジェクトを返す
 * @param {svg} svg svg要素
 * @returns {object} svgのviewBoxの各プロパティを持つオブジェクト
 */
 function getVeiwBoxParams(svg) {
  const values = svg.getAttribute('viewBox').split(' ').map(value => Number(value)); // [0, 0, 100, 100]
  const viewBox = { x: values[0], y:values[1], width: values[2], height: values[3] };
  return viewBox;
}

/**
 * 対象のpolygonのpoints属性の値を2次元配列にして返す
 * @param {polygon} polygon 
 * @returns {Array.<number>} [[x1, y1], [x2, y2], ... [xn, yn]]
 */
function getPoints (polygon) {
  const points = polygon.getAttribute('points').replace(/, /g, ',')
                        .split(' ')
                        .map(s => s.split(',')
                        .map(s => Number(s)));
  return points;
}

/**
 * 対象のsvg要素内に、正n角形を作成する。
 * @param {svg} svg svg要素 
 * @param {number} n 多角形の頂点の数。六角形ならn=6
 * @param {number} r 多角形に外接する円の半径。svgのviewBoxのheightの半分を1としたときの相対値。
 * @param {string} className polygonに追加するclass名
 * @returns {polygon} svg内に生成したpolygon要素
 */
 function createPolygon(svg, n, r, className) {
  const viewBox = getVeiwBoxParams(svg);

  // 外接円の半径
  const R = viewBox.height / 2 * r;

  // 中心点0の座標
  const x0 = viewBox.width / 2;
  const y0 = viewBox.height / 2;

  // 正n角形の0時の頂点1の座標
  const x1 = x0;
  const y1 = y0 - R;

  // 各頂点の座標を'xi, yi'の形で格納する
  const points = [`${x1}, ${y1}`];

  // 回転角（ラジアン）
  const theta = 2 * Math.PI / n;

  // 点1を中心のまわりにtheta回転移動した点が点2
  for (let i = 1; i < n; i++) {
    const xi = (x1 - x0) * Math.cos(theta * i) - (y1 - y0) * Math.sin(theta * i) + x0;
    const yi = (x1 - x0) * Math.sin(theta * i) + (y1 - y0) * Math.cos(theta * i) + y0;
    points.push(`${xi}, ${yi}`);
  }

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  polygon.setAttribute('points', points.join(' '));
  polygon.setAttribute('class', className);
  return polygon;
}

/**
 * 対象のpolygonの各頂点にラベルとなるHTML要素を絶対配置する。
 * @param {polygon} polygon ラベルを追加するsvgの多角形
 * @param {NodeList} elements 多角形の各頂点のラベルとなるHTML要素のリスト
 */
function setLabel(polygon, elements) {

  const points = getPoints(polygon);

  const svg = polygon.parentNode;
  const viewBox = getVeiwBoxParams(svg);
  const r = svg.getBoundingClientRect().width / viewBox.width;
  
  for (let i = 0; i < points.length; i++) {
    const li = elements[i];
    // ラベルとなるli要素の幅と高さ
    const w = li.getBoundingClientRect().width;
    const h = li.getBoundingClientRect().height;

    // ラベルとなるli要素の矩形の左上の座標(x, y)
    const x = points[i][0] * r;
    const y = points[i][1] * r;

    let xOffset = 0;
    let yOffset = 0;

    // n = 6の場合に限る
    switch (i) {
      case 0:
        xOffset = -w/2;
        yOffset = -h - 3;
        break;
      case 1:
        xOffset = 3;
        yOffset = -h;
        break;
      case 2:
        xOffset = 3;
        break;
      case 3:
        xOffset = -w/2;
        yOffset = 3;
        break;
      case 4:
        xOffset = -w - 3;
        break;
      case 5:
        xOffset = -w - 3;
        yOffset = -h;
        break;
    }
    li.style.left = `${x + xOffset}px`;
    li.style.top = `${y + yOffset}px`;
    li.style.visibility = 'visible';
  }
}

/**
 * 対象のpolygonの各頂点を満点とするレーダーチャートを描画する。
 * @param {polygon} polygon レーダーチャートの外枠の多角形
 * @param {Array.<number>} scores レーダーチャートの各頂点の値の配列。真上から時計回り。各頂点10点満点、0点は原点。
 * @param {string} className レーダーチャートのpolygonに付加するclass名
 */
function drawScore(polygon, scores, className) {
  const svg = polygon.parentNode;
  const viewBox = getVeiwBoxParams(svg);

  // 中心の座標
  const x0 = viewBox.width / 2;
  const y0 = viewBox.height / 2;

  // 外枠の多角形の各頂点の座標
  const points = getPoints(polygon);

  // スコアの多角形の各頂点の座標を格納する
  const scorePoints = [];

  for (let i = 0; i < points.length; i++) {
    const r = scores[i] / 10;
    const xi = (points[i][0] - x0) * r + x0;
    const yi = (points[i][1] - y0) * r + y0;
    scorePoints.push(`${xi}, ${yi}`);
  }

  const score = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  score.setAttribute('points', scorePoints.join(' '));
  score.setAttribute('class', className);

  svg.appendChild(score);
}

/**
 * レーダーチャートを描く
 */
const radar = document.getElementById('radar');

const svg = radar.querySelector('svg');
const r = 0.65; // レーダーチャートの大きさ（1がsvgの縦幅いっぱい）

// レーダーチャートの外枠を描く
const outerHexagon = createPolygon(svg, 6, r, 'outer');
svg.appendChild(outerHexagon);

// レーダーチャートのラベルの位置を決める
const labelList = radar.querySelectorAll('li');
setLabel(outerHexagon, labelList);

// レーダーチャートの内枠を描く
for (let i = 1; i < 5; i++) {
  const innerHexagon = createPolygon(svg, 6, r * i/5, 'inner');
  svg.appendChild(innerHexagon);
}



/**
 * 対象のstepについて、BIG6のlevelを['pushup', 'squat', 'pullup', 'leg_raise', 'bridge', 'handstand']の順で配列に格納する
 * @param {number} step
 * @returns {Array.<number>} Promise
 */
async function getBig6StepLevels(step) {
  const big6Names = ['pushup', 'squat', 'pullup', 'leg_raise', 'bridge', 'handstand'];
  const stepLevels = [];
  for (const big6 of big6Names) {
    stepLevels.push(getStepLevel(big6, step));
  }
  return Promise.all(stepLevels);
}

/**
 * 対象のBIG6, stepの全データについて、それぞれgetLevelして、そのlevelが一定個以上あれば
 * そのstepはそのlevelを達成しているとみなす。一定個未満またはデータがなければ0
 * @param {string} big6 
 * @param {number} step 
 * @returns {number} 1 or 2 or 3 or 0
 */
async function getStepLevel(big6, step) {
  const dataList = await idb.getAll(big6, step);
  if (dataList.length === 0) {
    return 0;
  }
  const levels = [];
  for (const data of dataList) {
    const level = getLevel(big6, step, data);
    levels.push(level);
  }
  let level3 = 0;
  let level2 = 0;
  let level1 = 0;
  for (const level of levels) {
    switch (level) {
      case 3:
        level3 += 1;
        if (level3 > 5) return 3;
        break;
      case 2:
        level2 += 1;
        if (level2 > 5) return 2;
        break;
      case 1:
        level1 += 1;
        if (level1 > 1) return 1;
        break;
    }
  }
  return 0;
}


/**
 * レーダーチャートにスコアを追加する
 * pushup squat pullup leg_raise bridge handstandの順で10点満点の数値の配列を与える
 */
async function drawAllScore () {

  const startTime = performance.now();

  let stepLevels = [[0, 0, 0, 0, 0, 0]];
  for (let step = 1; step < 11; step++) {
    stepLevels.push(getBig6StepLevels(step));
  }
  const stepScores = await Promise.all(stepLevels);
  
  // 各stepのlevelについて、0ならひとつ前のstepのscoreを引き継ぐ、
  // 0でないなら、そのstepのlevelに応じたscore（小数点第1位まで）とする
  // step 1のlevel 3なら1点、step 2のlevel 1なら1.3点、level 2なら1.7点、level 3なら2点
  for (let step = 1; step < stepScores.length; step++) {
    let levels = stepScores[step];
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (level === 0) {
        levels[i] = stepScores[step - 1][i];
      } else {
        levels[i] = (step - 1) + Math.round(level * 10 / 3)/10;
      }
    }
  }
  
  for (let step = 1; step < stepScores.length; step++) {
    // ひとつ前とまったく同じなら描画しない
    if (stepScores[step].toString() === stepScores[step -1].toString()) {
      continue;
    }
    console.log(`step ${step}のグラフを描画します`);
    console.log('drawScore', stepScores[step]);
    drawScore(outerHexagon, stepScores[step], `score${step}`);
  }

  const endTime = performance.now();
  console.log('レーダーチャート描画時間', endTime - startTime);
}

drawAllScore();






/**
 * tableWidthからthWidthを除く長さの領域に、
 * 1マスの幅がminTdWidth以上となるtdを可能な限り多く持つ表を作る
 * @param {number} tableWidth 表の幅px
 * @param {number} thWidth 見出しの幅px
 * @param {number} minTdWidth １マスの最小幅px
 */
async function createDailyTable(tableWidth, thWidth, minTdWidth) {

  const startTime = performance.now();

  const days = Math.trunc((tableWidth - thWidth) / minTdWidth); // 表に表示する日数
  const cellWidth = (tableWidth - thWidth) / days; // 日数から決まる１マスの幅

  const big6Names = ['pushup', 'squat', 'pullup', 'leg_raise', 'bridge', 'handstand'];
  const big6Labels = ['PUSHUP', 'SQUAT', 'PULLUP', 'LEG RAISE', 'BRIDGE', 'HANDSTAND'];

  const table = document.getElementById('daily-table');
  const caption = table.querySelector('caption');
  caption.textContent = `最近の${days}日`;

  for (let row = 0; row < big6Names.length; row++) {
    const big6 = big6Names[row];
    const tr = document.createElement('tr');
    tr.classList.add(big6);

    const th = document.createElement('th');
    th.textContent = big6Labels[row];
    th.style.width = `${thWidth}px`;
    th.style.height = `${cellWidth}px`;

    tr.appendChild(th);

    const todayInt = toDateInt(new Date());
    const dateIntList = makeDateIntList(todayInt, days).reverse();
    const dataList = await idb.bulkGet(big6, dateIntList); // データのない日はundefined

    for (let col = 0; col < days; col++) {
      const td = document.createElement('td');
      td.style.width = `${cellWidth}px`;
      const data = dataList[col];
      if (data) {
        const step = data.step;
        const level = getLevel(big6, step, data);
        td.classList.add('has-data');
        td.classList.add(`level${level}`);
        td.classList.add(`step${step}`);
      }
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  const endTime = performance.now();
  console.log('テーブル作成時間', endTime - startTime);
}

const thWidth = 74;
const minTdWidth = 16;
const maxTableWidth = Math.min(500, document.body.clientWidth);

createDailyTable(maxTableWidth, thWidth, minTdWidth);

