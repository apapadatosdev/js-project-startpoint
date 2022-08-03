require('dotenv').config();

module.exports = {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_SECRET_REFRESH: process.env.AUTH_SECRET_REFRESH,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,    
}