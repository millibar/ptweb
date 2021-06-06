'use strict';

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || 'modkhta63SvE68i3nuLnaxohR';
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || 'XITbP4g5Eu0rEmPQutH08MpFZw20cfEQB4k7o0htu44XFfOqwp';
const CALLBACK_URL = process.env.HEROKU_URL ? process.env.HEROKU_URL + 'auth/twitter/callback' : 'http://localhost:8000/auth/twitter/callback';
const SESSION_SECRET = 'hirothecat2021';

module.exports = {
  KEY: TWITTER_CONSUMER_KEY,
  CONSUMER_SECRET: TWITTER_CONSUMER_SECRET,
  URL: CALLBACK_URL,
  SESSION_SECRET: SESSION_SECRET
};