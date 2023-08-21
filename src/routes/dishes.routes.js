const { Router } = require('express')

const DishesController = require('../controllers/DishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureAdminUser = require('../middlewares/ensureAdminUser')

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', ensureAdminUser, dishesController.create)
dishesRoutes.put('/:id', ensureAdminUser, dishesController.update)
dishesRoutes.delete('/:id', ensureAdminUser, dishesController.delete)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)

module.exports = dishesRoutes