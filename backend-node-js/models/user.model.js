module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        firstname: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        providerId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profilePhoto: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        refreshtoken: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        activationCode: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        isActivated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,            
        },
        activationDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        passwordResetCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        passwordResetCodeCreationDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        passwordResetDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },        
    });
    return User;
}