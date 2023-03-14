const sequelize = require('sequelize');
const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
    sequelize.define('Diet', { //sequelize creates default primary key
        name: {
        type: DataTypes.STRING,
        allowNull: false
        }
    },{timestamps: false})
}
