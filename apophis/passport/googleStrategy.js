const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const {
    User
} = require('../models');
module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
                clientID: process.env['GOOGLE_CLIENT_ID'],
                clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
                callbackURL: process.env['GOOGLE_CALLBACK'],
            },
            function (accessToken, refreshToken, profile, done) {
                done(null, profile)
            }
        )
    )
};
