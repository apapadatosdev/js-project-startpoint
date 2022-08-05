const { validationResult } = require('express-validator')
const taskSvc = require('../services/tasks.service');

async function getList(req, res, next) {
    try{
        const rslt = await taskSvc.getList();
        res.json(rslt);
    }
    catch (err) {
        console.error(`Error while getting task list`, err.message);
        next(err);
    }
}

async function getOne(req, res, next) {
    try{
        const id = req.params.id;
        let rslt = await taskSvc.getOne(id);
        
        res.json(rslt);
    }
    catch (err) {
        console.error(`Error while getting task list`, err.message);
        next(err);
    }
}

async function post(req, res, next) {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }

        let createTaskDto = req.body;        
        const rslt = await taskSvc.createTask(createTaskDto,req.user);
        res.json(rslt);
    }
    catch (err) {
        console.error(`Error while getting task list`, err.message);
        next(err);
    }
}

async function patch(req, res, next) {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }

        const id = req.params.id;
        const updateTaskDto = req.body;
        const rslt = await taskSvc.updateTask(id, updateTaskDto, req.user);
        res.json(rslt);
    }
    catch (err) {
        console.error(`Error while getting task list`, err.message);
        next(err);
    }
}

async function updateStatus(req, res, next) {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }

        const id = req.params.id;
        const targetStatus = req.body.status;
        const rslt = await taskSvc.updateStatus(id, targetStatus, req.user);
        res.json(rslt);
    }
    catch (err) {
        console.error(`Error while getting task list`, err.message);
        next(err);
    }
}

async function setAssignees(req, res, next) {
    try{
        const id = req.params.id;
        const assigneeIdArr = req.body;
        await taskSvc.setAssignees(id, assigneeIdArr, req.user);   
        res.json();
    }
    catch (err) {
        console.error(`Error while getting task list`, err.message);
        next(err);
    }
}


module.exports = {
    getList,
    getOne,
    post,
    patch,
    updateStatus,
    setAssignees
}