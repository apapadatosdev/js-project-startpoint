const db = require('../models');
const Task = db.task;

async function getList(page = 1, size = 10) {    
    let total = null;
    const data =  await Task.findAll();
    return {
        data: data,
        paging: {page, size, total}
    }
}


module.exports = {
    getList
}