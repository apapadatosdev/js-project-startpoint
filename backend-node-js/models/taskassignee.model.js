module.exports = (sequelize, DataTypes) => {
    const TaskAssignee = sequelize.define("taskassignee", {
        
        // taskId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //       model: Task,
        //       key: 'id'
        //     }
        // },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: User,
        //         key: 'id'
        //       }
        // }
    });
    return TaskAssignee;
}