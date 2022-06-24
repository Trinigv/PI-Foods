const { Router } = require('express');
const axios = require('axios'); //require data from API
const { Recipe, Diet, Op } = require('../db.js'); //require data from db
const { uploadDiets } = require('../services/dietServices.js')

const dietRoute = Router()

dietRoute.get('/', uploadDiets)


module.exports = dietRoute