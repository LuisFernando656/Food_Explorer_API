const { Router } = require('express')

const DishesController = require('../controllers/DishesController')

const dishesController = new DishesController()

const disheRouter = Router()

disheRouter.post('/', dishesController.create)
disheRouter.put('/:id', dishesController.update)

module.exports = disheRouter