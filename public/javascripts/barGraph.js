console.log('barGraph.js is loaded.');

import { ratioOfStep } from './big6.js';
import { idb } from './idb.js';

const drawGraph =  async (big6) => {
  const records = await idb.bulkGetAll(big6);
  const barWidth = 4; // 棒グラフの棒の幅
  const barGap = 1;   // 棒同士の間隔
  const maxWidth = (barWidth + barGap) * records.length;

  // SVG要素の幅を決める
  const div = document.getElementById('bar-graph');
  const w = Math.max(div.getBoundingClientRect().width, maxWidth);
  const h = div.getBoundingClientRect().height;
  const svg = document.querySelector('#bar-graph svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);

  const scores = records.map(record => ratioOfStep(big6, record));

  // 記録のない状態で記録を作り、それを削除したとき、「記録がありません」を消す
  const p = div.querySelector('p');
  if (p) {
    div.removeChild(p);
  }

  // 2回目以降に呼ばれたとき、すでにあるrect要素をすべて削除する
  while(svg.firstChild) {
    console.log('削除→', svg.firstChild )
    svg.removeChild(svg.firstChild);
  }

  if (scores.length) {
    for (let i = 0; i < scores.length; i++) {
      //console.log(`${records[i].dateInt} step: ${records[i].step}, score: ${scores[i]}`);
  
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const barHeight = h * scores[i];
      const x = (barWidth + barGap) * i;
      const y = h - barHeight;
  
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('class', `step${records[i].step}`);
      svg.appendChild(rect);
    }

  } else {
    const p = document.createElement('p');
    p.textContent = '記録がありません';
    div.appendChild(p);
  }

  
}

export { drawGraph };