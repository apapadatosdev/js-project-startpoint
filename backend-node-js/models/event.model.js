module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("event", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        host: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    return Event;
}