const { Router } = require('express');
const { axios } = require('axios');
const { Diet, Recipe } = require('../db');
const recipeRoute = require('./recipeRoute');
const dietRoute = require('./dietRoute');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use('/recipes', recipeRoute);
router.use('/diets', dietRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
