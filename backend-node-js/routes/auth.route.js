const express = require('express');
const passport = require('passport');
const router = express.Router();
const authlocal = require('../middleware/auth.local')();
const authjwtrefresh = require('../middleware/auth.jwtrefresh')();
const authCtrl = require('../controllers/auth.controller');

router.post("/login", authlocal.authenticate(), authCtrl.login);

router.post("/refreshtoken", authjwtrefresh.authenticate(), authCtrl.refreshtoken);

module.exports = router;