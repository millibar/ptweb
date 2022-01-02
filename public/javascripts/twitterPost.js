console.log('twitterPost.js is loaded.');

/**
 * Twitterの投稿用ウィジェットを追加する
 * @param {string} prefillText ツイート文の初期値
 * @param {HTML Element} targetElement このHTML要素内にリンクとスクリプトを追加する
 */
const createTweetButton = (prefillText, targetElement) => {
  const a = document.createElement('a');
  const hrefValue ='https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw';

  a.setAttribute('href', hrefValue);
  a.className = 'twitter-hashtag-button';
  a.setAttribute('data-hashtags', 'プリズナートレーニング');
  a.setAttribute('data-text', prefillText);
  a.setAttribute('data-size', 'large');
  a.textContent = 'Tweet';

  targetElement.appendChild(a);
  
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  targetElement.appendChild(script);
}

export { createTweetButton };

