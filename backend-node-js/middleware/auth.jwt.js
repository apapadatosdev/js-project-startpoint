const passport = require('passport');
const passportJWT = require('passport-jwt');
const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.user;

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: authConfig.AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


module.exports = function() {
    const strategy = new Strategy(params, async function(payload, done) {
        const authUser = await User.findByPk(payload.sub);
        if(!authUser) {
            return done(new Error('User not found.'), null);
        }
        else {
            return done(null, authUser);
        }
    });
    passport.use("jwt",strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", { session: false, failWithError: true })
        }
    }
}
