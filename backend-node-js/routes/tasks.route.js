const express = require('express');
const router = express.Router();
const authjwt = require('../middleware/auth.jwt')();
const tasksCtrl = require('../controllers/tasks.controller');

router.get('/', authjwt.authenticate(), tasksCtrl.get);

module.exports = router;