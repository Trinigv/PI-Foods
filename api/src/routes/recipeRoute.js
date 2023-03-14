const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const {
	filterFunction,
	getRecipeId,
	createRecipe,
} = require('../services/recipeServices.js');
//const { deleteRecipe } = require ...
const recipeRoute = Router();

//obtains all recipes and filters by name
recipeRoute.get('/', filterFunction);

//shows recipe by id
recipeRoute.get('/:id', getRecipeId);

//path to create recipe
recipeRoute.post('/create', createRecipe);

//recipeRoute.delete(/delte/:id, deleteRecipe);

module.exports = recipeRoute;
