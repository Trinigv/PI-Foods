const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const {API_URL_KEY} = process.env;


//gets washed info from api and database 
const getAPIandDb = async (req, res) => {
    try { 
        const respuesta = await axios.get(API_URL_KEY); //when there is 304 error you should delete browsing data
        const washed = res.json(respuesta.data.results.map( el  => {
            return {
                id: el.id,
                title: el.title,
                healthScore: el.healthScore,
                sumary: el.summary,
                instructions: el.analyzedInstructions[0]?.steps.map( s => {
                    return {number: s.number, step: s.step}
                }),
                diets: el.diets
            }
        }))
        res.send(washed.concat(gettingDatabaseInfo()));
    } catch (e) {
        console.log(e);
    };
  };

//gets info from db without info yet
const gettingDatabaseInfo = async () => {
    var recipeDb = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes:[],
            },
        }
    });
    return recipeDb;
};



const filterFunction = async (req, res, next) => {
    res.send('Filter path is working')
};

const getRecipeId = async (req, res) => {
    res.send('Recipe by ID path is working')
}

const addToDatabase = async (req,res) => {
    res.send('Create recipe path')
}

module.exports = { getAPIandDb, filterFunction, getRecipeId, addToDatabase}