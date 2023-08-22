const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
const DisheImageController = require('../controllers/DisheImageController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureAdminUser = require('../middlewares/ensureAdminUser')

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const disheImageController = new DisheImageController()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', ensureAdminUser, dishesController.create)
dishesRoutes.put('/:id', ensureAdminUser, dishesController.update)
dishesRoutes.delete('/:id', ensureAdminUser, dishesController.delete)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.patch('/image/:id', ensureAdminUser, upload.single('image'), disheImageController.update)

module.exports = dishesRoutes