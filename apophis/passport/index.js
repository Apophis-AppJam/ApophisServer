const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const google = require('./googleStrategy')
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.UserIdx);
    });

    passport.deserializeUser((UserIdx, done) => {
        User.findOne({
                where: {
                    UserIdx
                }
            })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
};