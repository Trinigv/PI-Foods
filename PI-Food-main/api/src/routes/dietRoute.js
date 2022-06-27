const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const { getDiets, uploadDiets } = require('../services/dietServices.js')

// antes de definir las rutas, creo las diets en la db
//uploadDiets()

const dietRoute = Router()

//dietRoute.get('/', getDiets)
dietRoute.get('/', uploadDiets)


module.exports = dietRoute