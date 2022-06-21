const sequelize = require('sequelize');
const { DataTypes, UniqueConstraintError } = require('sequelize'); 

module.exports = (sequelize) => {
    sequelize.define('Diet', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //to define my own PK
        unique: true,
        allowNull: false
        }, 
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },

    })
}
