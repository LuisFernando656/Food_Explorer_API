const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
const DishImageController = require('../controllers/DishImageController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureAdminUser = require('../middlewares/ensureAdminUser')

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishImageController = new DishImageController()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', ensureAdminUser, upload.single('image') ,dishesController.create)
dishesRoutes.put('/:id', ensureAdminUser, dishesController.update)
dishesRoutes.delete('/:id', ensureAdminUser, dishesController.delete)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.patch('/image/:id', ensureAdminUser, upload.single('image'), dishImageController.update) 

module.exports = dishesRoutes