const { Router } = require('express')

const DishesController = require('../controllers/DishesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const dishesController = new DishesController()

const dishesRoutes = Router()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', dishesController.create)
dishesRoutes.put('/:id', dishesController.update)
dishesRoutes.delete('/:id', dishesController.delete)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)

module.exports = dishesRoutes