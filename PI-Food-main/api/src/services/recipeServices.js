const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const { API_KEY_5 } = process.env; 


//----------------GETTING RECIPES----------------------
const getAPI = async () => {
        const respuesta = await axios.get(API_KEY_5); 
        const washed = await respuesta.data.results?.map( el  => {
            return {
                id: el.id,
                title: el.title,
                healthScore: el.healthScore,
                summary: el.summary,
                instructions: el.analyzedInstructions[0]?.steps.map(s => s.step ),
                dishtypes: el.dishtypes,
                diets: el.diets,
                image: el.image
            }
        })
        return washed; 
};

//gets info from db
const getDatabaseInfo = async () => { //falta agregar try catch?
    var recipeDb = await Recipe.findAll({
        include: {
        model: Diet,
        attributes: ['name', 'id'],
        through: {
            attributes: []
        }
    }
    });
    return recipeDb;
};

const allRecipes = async () => {
    const apiInfo = await getAPI(); 
    const dbInfo = await getDatabaseInfo();
    var totalRecipes = apiInfo.concat(dbInfo) // INFO DATA + API DATA
    return(totalRecipes);
};

//------------------ROUTER FUNCTIONS--------------------

const filterFunction = async (req, res, next) => {
    const {title} = req.query;
    const recipes = await allRecipes(); 
 try {
    if(title){
        var recipeFiltered = await recipes.filter(el => el.title.toLowerCase().includes(title.toLowerCase()))
        recipeFiltered.length ? res.send(recipeFiltered) : res.send('No se ha encontrado la receta')
    } else {
        res.send(recipes)}
} catch(e) {
    next(e) }
};

const getRecipeId = async (req, res, next) => {
    let id = req.params.id;
    if(typeof id === 'number') { id = parseInt(id); } //0500 -> 500
    const recipes = await allRecipes();
    try {
        if(id) {
            var recipeId = recipes.filter(el => el.id == id); 
            recipeId.length ? res.send(recipeId[0]) : res.status(404).send(`No se ha encontrado receta con id ${id}`)}
        } catch(e) {
        next(e) }
};

const createRecipe = async (req, res, next) => {
    const { title, summary, healthScore, instructions, image, diets } = req.body;
    if(!title || !summary) return res.status(404).json({err: 'Faltan datos obligatorios'})
    try {
    const newRecipe = await Recipe.create({title, summary, healthScore, instructions, image})
    const allDiets = await Diet.findAll({where: {name: diets}})
    newRecipe.addDiet(allDiets); 
    res.status(201).json({newRecipe})
    } catch(e) {
        next(e)
    }
};

/*cons deleteRecipe(id) = async (req, res, next) => {
    const id = req.paramd.id;
    try{
    if(!id) { res.send('Send an id')}
    var recipeToDelete = await Recipe.destroy( { where:{id} })
    res.send('Recipe deleted)
    } catch (e) {
        next(e)
    }

}*/


module.exports = { filterFunction, getRecipeId, createRecipe, allRecipes }