module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
        title: {
        type: DataTypes.STRING,
        allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    });
    Task.associate = (db) => {
        Task.belongsTo(db.category, { foreignKey: 'categoryId' })        
        Task.belongsToMany(db.user, { through: db.taskassignee, as: 'assignees' }); 
    };    
    return Task;
}

