const express = require('express');
const router = express.Router();
const authjwt = require('../middleware/auth.jwt')();
const tasksCtrl = require('../controllers/tasks.controller');
const { createTaskValidation } = require('../middleware/tasks.validation');



router.get('/', authjwt.authenticate(), tasksCtrl.getList);
router.get('/:id', authjwt.authenticate(), tasksCtrl.getOne);
router.post('/', authjwt.authenticate(), createTaskValidation, tasksCtrl.post);
router.patch('/:id', authjwt.authenticate(), createTaskValidation, tasksCtrl.patch);
router.post('/updatestatus/:id', authjwt.authenticate(), createTaskValidation, tasksCtrl.updateStatus);
router.post('/updateassignees/:id', authjwt.authenticate(), tasksCtrl.setAssignees);

module.exports = router;