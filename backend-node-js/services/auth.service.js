const jwt = require('jsonwebtoken');
const authconfig = require('../config/auth.config')

function getTokenForUser(loggedInUser) {
    const payload = {
        email: loggedInUser.email,
        sub: loggedInUser.id        
    };
    const token = jwt.sign(payload, authconfig.AUTH_SECRET, { expiresIn: authconfig.JWT_EXPIRATION });
    return token;
}

function getRefreshTokenForUser(loggedInUser) {
    const payload = {
        email: loggedInUser.email,
        sub: loggedInUser.id        
    };
    const refreshtoken = jwt.sign(payload,  authconfig.AUTH_SECRET_REFRESH, {expiresIn: authconfig.JWT_REFRESH_EXPIRATION});
    return refreshtoken
}

module.exports = {
    getTokenForUser,
    getRefreshTokenForUser
}