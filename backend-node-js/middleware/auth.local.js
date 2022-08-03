const passport = require('passport');
const localStrategy = require('passport-local');
const authConfig = require('../config/auth.config');
const db = require('../models');
const User = db.user;

module.exports = function() {
    const strategy = new localStrategy(
        { usernameField: 'email' },
        async function(username, password, done) {
            try {
                const authUser = await User.findOne({where: { email: username }});                  
                if(!authUser) {
                    return done(null, false);
                }
                if(authUser.password !== password) {
                    return done(null, false);
                }
                return done(null, authUser);
            }
            catch(err) {
                return done(err);
            }        
        }
    );
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {            
            return passport.authenticate("local", { session: false, failWithError: true });                       
        }
    }
}
