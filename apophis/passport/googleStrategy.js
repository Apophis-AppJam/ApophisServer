const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const {
    User
} = require('../models');
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    }, function (request, accessToken, refreshToken, profile, done) {
        console.log('profile: ', profile);
        var user = profile;

        done(null, user);
    }));
};
