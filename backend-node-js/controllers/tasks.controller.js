const taskSvc = require('../services/tasks.service');

async function get(req, res, next) {
    try{
        res.json( await taskSvc.getList() );
    }
    catch (err) {
        console.error(`Error while getting task list`, err.message);
        next(err);
    }
}


module.exports = {
    get,
}