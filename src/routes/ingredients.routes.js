const { Router } = require('express')

const IngredientsController = require('../controllers/IngredientsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const ingredientsController = new IngredientsController()

const ingredientRouter = Router()

ingredientRouter.get('/', ensureAuthenticated, ingredientsController.index)

module.exports = ingredientRouter