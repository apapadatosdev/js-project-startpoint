module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });    
    return Category;
}