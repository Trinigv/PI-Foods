const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const {API_URL_KEY, API_KEY} = process.env;


//gets washed info from api and database 
const getAPI = async () => {

        const respuesta = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=0b291a2a4d644b278b204948d5df5e19&number=100&addRecipeInformation=true'); 
        const washed = await respuesta.data.results?.map( el  => {
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
    var totalRecipes = [...apiInfo, ...dbInfo]
    return(totalRecipes);
}

const filterFunction = async (req, res, next) => {
    const {title} = req.query;
    const recetas = await allRecipes(); 
 try {
    if(title){
        var recetasFiltradas =  recetas.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
        res.send(recetasFiltradas)
    } else {
        res.send(recetas)}
} catch(e) {
    next(e) }
};

const getRecipeId = async (req, res) => {
    res.send('Recipe by ID path is working')
}

const addToDatabase = async (req,res) => {
    res.send('Create recipe path')
}

module.exports = { getAPI, filterFunction, getRecipeId, addToDatabase, allRecipes}