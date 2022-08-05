const express = require('express');
const passport = require('passport');
const router = express.Router();
const authlocal = require('../middleware/auth.local')();
const authjwtrefresh = require('../middleware/auth.jwtrefresh')();
const authCtrl = require('../controllers/auth.controller');
const { loginValidation } = require('../middleware/auth.validation');

router.post("/login", authlocal.authenticate(), loginValidation, authCtrl.login);

router.post("/refreshtoken", authjwtrefresh.authenticate(), authCtrl.refreshtoken);

module.exports = router;