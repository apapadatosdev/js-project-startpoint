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
            type: DataTypes.STRING,
            allowNull: false
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Task;
}

