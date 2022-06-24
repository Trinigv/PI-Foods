const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const {API_URL_KEY, API_KEY} = process.env;


//---------Getting Recipes----------------------
const getAPI = async () => {
        const respuesta = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=5c5f422d76664bb1b4209279b5550ea1&number=100&addRecipeInformation=true'); 
        const washed = await respuesta.data.results?.map( el  => {
            return {
                id: el.id,
                title: el.title,
                healthScore: el.healthScore,
                sumary: el.summary,
                instructions: el.analyzedInstructions[0]?.steps.map(s => s.step ),
                diets: el.diets,
                image: el.image
            }
        })
        return washed; 
  };

//gets info from db without info yet
const getDatabaseInfo = async () => {
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

const allRecipes = async () => {
    const apiInfo = await getAPI(); //porque me da undefined?
    const dbInfo = await getDatabaseInfo();
    var totalRecipes = [...apiInfo, ...dbInfo] // INFO DATA + API DATA
    return(totalRecipes);
};

//-----------ROUTER FUNCTIONS---------------------

const filterFunction = async (req, res, next) => {
    const {title} = req.query;
    const recipes = await allRecipes(); 
 try {
    if(title){
        var recipeFiltered=  recipes.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
        res.send(recipeFiltered)
    } else {
        res.send(recipes)}
} catch(e) {
    next(e) }
};

const getRecipeId = async (req, res, next) => {
    let id = req.params.id;
    if(typeof id === 'number') { id = parseInt(id); }
    const recipes = await allRecipes();
    try {
        if(id) {
            var recipeId = recipes.filter(el => el.id == id); 
            recipeId.length ? res.send(recipeId) : res.status(404).send(`No se ha encontrado receta con id ${id}`)}
        } catch(e) {
        next(e) }
};

const addToDatabase = async (req, res, next) => {
    try {
    const { title, summary, healthScore, instructions, image} = req.body;
    if(!title || !summary) return res.status(404).json({err: 'Faltan datos obligatorios'})
    const newRecipe = await Recipe.create({title, summary, healthScore, instructions, image})
    res.status(201).json({newRecipe})
    } catch(e) {
        next(e)
    }
};

module.exports = { filterFunction, getRecipeId, addToDatabase, allRecipes}