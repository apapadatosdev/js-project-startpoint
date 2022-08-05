module.exports = (sequelize, DataTypes) => {
    const EventAttendee = sequelize.define("eventattendee", {
        // eventId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //       model: Event,
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
    return EventAttendee;
}