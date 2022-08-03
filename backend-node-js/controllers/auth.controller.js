const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const authSvc = require('../services/auth.service');




async function login(req, res, next) {
    const loggedInUser = await User.findOne({where: { email: req.body.email }});    
    const token = authSvc.getTokenForUser(loggedInUser);    
    const refreshToken = authSvc.getRefreshTokenForUser(loggedInUser);
    await User.update({refreshtoken: refreshToken}, {where: {id: loggedInUser.id}});
    res.json({
        token,
        refreshToken
    });
}

async function refreshtoken(req, res, next) {
    //const loggedInUser = await User.findOne({where: { refreshtoken: req.body.refreshtoken }});
    const token = authSvc.getTokenForUser(req.user);
    res.json({
        token,        
    });
}


module.exports = {
    login,
    refreshtoken
}