var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');

var session = require('express-session');
var passport = require('passport');




// モデルの読み込み
var User = require('./models/user');
var Pushup = require('./models/big6').Pushup;
var Squat = require('./models/big6').Squat;
var Pullup = require('./models/big6').Pullup;
var LegRaise = require('./models/big6').LegRaise;
var Bridge = require('./models/big6').Bridge;
var Handstand = require('./models/big6').Handstand;

User.sync().then(() =>{ 
  console.log('Userテーブルsync完了');
  return Pushup.sync();
}).then(() =>{ 
  console.log('Pushupテーブルsync完了');
  return Squat.sync();
}).then(() =>{ 
  console.log('Squatテーブルsync完了');
  return Pullup.sync();
}).then(() =>{ 
  console.log('Pullupテーブルsync完了');
  return LegRaise.sync();
}).then(() =>{ 
  console.log('LegRaiseテーブルsync完了');
  return Bridge.sync();
}).then(() =>{ 
  console.log('Bridgeテーブルsync完了');
  return Handstand.sync();
}).then(() => {
  console.log('Handstandテーブルsync完了');
})

/*
User.sync().then(() => {
  const Tables = [Pushup, Squat, Pullup, LegRaise, Bridge, Handstand];
  for (let Table of Tables) {
    Table.belongsTo(User, { foreignKey: 'userId' });
    Table.sync();
  }
});
*/

// Twitter認証用
var TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY = require('./secret').KEY;
var TWITTER_CONSUMER_SECRET = require('./secret').CONSUMER_SECRET;
var CALLBACK_URL = require('./secret').URL;
var SESSION_SECRET = require('./secret').SESSION_SECRET;

// 認証情報をセッションで管理
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret : TWITTER_CONSUMER_SECRET,
    callbackURL: CALLBACK_URL
  },
  function(token, tokenSecret, profile, done) {

    process.nextTick(function() {

      User.upsert({
        userId: profile.id,
        username: profile.username,
        updatedAt: new Date()
      }).then(() => {
        return done(null, profile);
      });
    });
  }
));



var indexRouter = require('./routes/index');
var big6Router = require('./routes/big6');
var logoutRouter = require('./routes/logout');
var settingRouter = require('./routes/setting');
var authRouter = require('./routes/auth');


var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッション用（Twitter認証で使う）
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/big6', big6Router);
app.use('/logout', logoutRouter);
app.use('/setting', settingRouter);
app.use('/auth', authRouter);



app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/auth', 
                                     failureRedirect: '/setting'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
