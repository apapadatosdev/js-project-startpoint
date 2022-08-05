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
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    Event.associate = (db) => {
        Event.belongsTo(db.category, { foreignKey: 'categoryId' });
        Event.belongsTo(db.user, { foreignKey: 'hostId' });
        Event.belongsToMany(db.user, { through: db.eventattendee }); 
    };
    return Event;
}
