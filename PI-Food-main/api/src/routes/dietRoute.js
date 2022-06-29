const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const { getDiets } = require('../services/dietServices.js')

// antes de definir las rutas, creo las diets en la db


const dietRoute = Router()


dietRoute.get('/', getDiets)


module.exports = dietRoute