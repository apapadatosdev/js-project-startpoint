const { Op } = require("sequelize");
const db = require('../models');
const Task = db.task;
const User = db.user;
const Category = db.category;

async function getList(page = 1, size = 10) {    
    let total = null;
    const data =  await Task.findAll();
    return {
        data: data,
        paging: {page, size, total}
    }
}

async function getOne(id) {
    const data = await Task.findByPk(id, {
        include: [
            {
                model: User, 
                as: 'assignees', 
                attributes: ['id', 'firstname', 'lastname'], 
                through: { attributes: []} 
            },
            {model: Category, attributes: ['id', 'title']},
        ]
    });
    return data;
}

async function createTask(createTaskDto, user) {
    const rslt = await Task.create({
        ...createTaskDto,
        created_by: user.id,
        updated_by: user.id
    });
    return rslt;
}

async function updateTask(taskId, updateTaskDto, user) {
    const recordToUpdate = await Task.findByPk(taskId);
    recordToUpdate.set({
        ...updateTaskDto,
        updated_by: user.id
    });
    await recordToUpdate.save();    
    return recordToUpdate;
}

async function updateStatus(taskId, newStatus, user) {
    let taskToUpdate = await Task.findByPk(taskId);
    if(taskToUpdate) {
        taskToUpdate.status = newStatus;
        taskToUpdate.updated_by = user.id;
    }
    await taskToUpdate.save();    
    return taskToUpdate;
}

async function setAssignees(taskId, assigneeIdArr, user) {
    let taskToUpdate = await Task.findByPk(taskId);
    taskToUpdate.updated_by = user.id;
    await taskToUpdate.save();    
    let assigneesToSet = await User.findAll({where: {
        id: {
            [Op.in]: assigneeIdArr,
        }
    }});
    let existingAssignees = await taskToUpdate.setAssignees(assigneesToSet);        
}


module.exports = {
    getList,
    getOne,
    createTask,
    updateTask,
    updateStatus,
    setAssignees
}