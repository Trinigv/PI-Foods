const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const sequelize = require('sequelize');

// const getDiets 
// obtener todas las diets de la db y devolver el objeto


// uploadDiets no es llamada por ninguna ruta y solamente crea las diets en la db
const uploadDiets = async (req, res) => {
    const diet = [
        'gluten free',
        'ketogenic', 
        'vegetarian', 
        'lacto vegetarian',
        'ovo vegetarian', 
        'vegan', 
        'pescetarian', 
        'paleo', 
        'primal', 
        'low fodmap', 
        'whole30'
    ]
    for (let i = 0; i < diet.length; i++) {
         await Diet.findOrCreate({where: {name: diet[i]}});
    }
   res.send(diet)
}; 

module.exports = { uploadDiets }
