const { Router } = require('express')

const IngredientsController = require('../controllers/IngredientsController')

const ingredientsController = new IngredientsController()

const ingredientRouter = Router()

ingredientRouter.get('/', ingredientsController.index)

module.exports = ingredientRouter