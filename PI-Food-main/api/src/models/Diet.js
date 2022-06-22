const sequelize = require('sequelize');
const { DataTypes, UniqueConstraintError } = require('sequelize'); 

module.exports = (sequelize) => {
    sequelize.define('Diet', { //sequelize creates default primary key
        name: {
        type: DataTypes.STRING,
        allowNull: false
        }
    })
}
