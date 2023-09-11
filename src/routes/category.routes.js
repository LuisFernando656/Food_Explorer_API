const { Router } = require('express')

const CategoryController = require('../controllers/CategoryController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const categoryController = new CategoryController()

const categoryRouter = Router()

categoryRouter.get('/', ensureAuthenticated, categoryController.index)

module.exports = categoryRouter