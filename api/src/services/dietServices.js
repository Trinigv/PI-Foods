const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const sequelize = require('sequelize');

// const getDiets 
// obtener todas las diets de la db y devolver el objeto
const getDiets = async (req, res, next) => {
    try {
        const diet = [
            "gluten free",
            "dairy free",
            "paleolithic",
            "vegetarian",
            "lacto vegetarian",
            "ovo vegetarian",
            "lacto ovo vegetarian",
            "primal",
            "whole 30",
            "fodmap friendly",
            "ketogenic",
            "pescatarian",
            "vegan"
        ]
        for (let i = 0; i < diet.length; i++) {
             await Diet.findOrCreate({where: {name: diet[i]}});
        }
        const allDiets = await Diet.findAll()
        res.send(allDiets)
    } catch(e) {
        next(e)
    }
}

module.exports = { getDiets }
