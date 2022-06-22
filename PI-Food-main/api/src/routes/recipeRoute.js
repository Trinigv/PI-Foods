const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const {API_KEY} = process.env; //import key from .env;

const router = Router(); 

const gettingDataFromApi = async () => {
    try { //stores data from API
    const apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    if(apiData.data) {
     var formatData = apiData.data.results.map(re => {
        return {
            id: re.id,
            title: re.title,
            healthScore: re.healthScore,
            summary: re.summary,
            instructions: re.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step
                    }
                }),
            diets: re.diets
            }
        });
     return(formatData);
    } else { console.log('API ERROR') } //error from api (if there is no data)
    } catch(e) { 
        console.log(e)
    }
};

const gettingDatabaseInfo = async () => {
    let recipe = await Recipe.findAll({
        include:{
            model: Diet,
            atributes: ['name'],
            through: {
                atributes:[],
            },
        }
    });
    return recipe;
};

const getAllRecipes = async () =>{
    const apiInfo = await gettingDataFromApi();
    const databaseInfo = await gettingDatabaseInfo();
    const infoTotal = apiInfo.concat(databaseInfo);
    return infoTotal;
};



router.get('/', async (req,res)=>{
    const title = req.query.title;
    let recipesTotal = await getAllRecipes();
    if(title){
        let recipeTitle = await recipesTotal.filter(d=>d.title.toLowerCase().includes(title.toLowerCase()));
        if(recipeTitle.length){
            res.status(200).send(recipeTitle);
        }else{
            res.status(404).send('La receta no se ha encontrado');
        };
    }else{
        res.status(200).send(recipesTotal);
    }
});





module.exports = router