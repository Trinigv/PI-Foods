const { Router } = require('express');
const diets = require('./dietRoute.js')
const recipes = require('./recipeRoute')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//Modularization of Routes. 
router.use('/recipes', recipes)
router.use('/diets', diets)




module.exports = router;
