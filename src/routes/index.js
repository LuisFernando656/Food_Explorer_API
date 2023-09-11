const { Router } = require('express')

const usersRoutes = require('./user.routes')
const dishesRoutes = require('./dishes.routes')
const ingredientsRoutes = require('./ingredients.routes')
const sessionsRouter = require('./sessions.routes')
const categoryRoutes = require('./category.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/sessions', sessionsRouter)
routes.use('/ingredients', ingredientsRoutes)
routes.use('/category', categoryRoutes)

module.exports = routes
