const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe } = require('../db.js'); //require data from db
var YOUR_API_KEY = '5c5f422d76664bb1b4209279b5550ea1'

const router = Router(); 

router.get('/', async(req, res, next) => {

    const gettingDataFromApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=5c5f422d76664bb1b4209279b5550ea1&number=100&addRecipeInformation=true`)
    if(gettingDataFromApi) {
        res.send(gettingDataFromApi.data.results)
    } else {
        res.json({data: 'this is not working'})
    } 
})

module.exports = router