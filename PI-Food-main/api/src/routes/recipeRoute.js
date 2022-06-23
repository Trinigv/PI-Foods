const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const {API_KEY} = process.env;
const { getAPIandDb, filterFunction, getRecipeId, addToDatabase } = require('../services/recipeServices.js');

const recipeRoute = Router(); 

//shows data from API and db
recipeRoute.get('/all', getAPIandDb);

//filters by name 
recipeRoute.get('/', filterFunction);

//shows recipe by id 
recipeRoute.get('/:id', getRecipeId);

//path to create recipe
recipeRoute.post('/create', addToDatabase)





module.exports = recipeRoute;




