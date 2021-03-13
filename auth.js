const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models').user; // sequelizeを懸け橋にしてDBからuserをとってくる

passport.use(new LocalStrategy({
    usernameField: 'email', // 普通はnameのところを、メールを用いた認証なのでemailとしている
    passwordField: 'password'
}, (email, password, done) =>  {
    // 以下でログイン実行
    User.findOne({
      where: {
        email: email
      }
    })
    .then(user => {

      if(user && bcrypt.compareSync(password, user.password)) {

        return done(null, user);  // ログイン成功

      }

      throw new Error();

    })
    .catch(error => { // エラー処理

      return done(null, false, { message: '認証情報と一致するレコードがありません。' });

    });

}));

// Session
passport.serializeUser((user, done) => {

  done(null, user);

});
passport.deserializeUser((user, done) => {

  done(null, user);

});

module.exports = passport;