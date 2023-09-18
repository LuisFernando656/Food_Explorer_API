const knex = require('../database')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishImageController {
  async update(req, res) {
    const { id } = req.params
    const imageFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where('id', id).first()

    if(dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    const filename = await diskStorage.saveFile(imageFilename)
    dish.image = filename

    await knex('dishes').update(dish).where('id', id)

    return res.json(dish)
  }
}

module.exports = DishImageController
