const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersController = new UsersController()

const userRouter = Router()

userRouter.post('/', usersController.create)

module.exports = userRouter