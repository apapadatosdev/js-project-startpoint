const passport = require('passport');
const passportJWT = require('passport-jwt');
const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.user;

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: authConfig.AUTH_SECRET_REFRESH,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true
    //token: ExtractJwt.fromHeader("Authentication")(),
};

module.exports = function() {
    const strategy = new Strategy(params, async function(req, payload, done) {
        const rawToken = req.headers.authorization.replace('Bearer ', '');
        const authUser = await User.findOne({where: { id: payload.sub, refreshtoken: rawToken }}); //.findByPk(payload.sub);

        if(!authUser) {
            return done(new Error('User not found.'), null);
        }
        else {
            return done(null, authUser);
        }
    });
    passport.use("jwtrefresh", strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwtrefresh", { session: false, failWithError: true })
        }
    }
}
