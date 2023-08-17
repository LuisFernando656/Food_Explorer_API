const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const userRouter = Router()

userRouter.post('/', usersController.create)
userRouter.put('/:id', usersController.update)

module.exports = userRouter