const knex = require('../database')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DisheImageController {
  async update(req, res) {
    const { id } = req.params
    const imageFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const dishe = await knex('dishes').where('id', id).first()

    if(dishe.image) {
      await diskStorage.deleteFile(dishe.image)
    }

    const filename = await diskStorage.saveFile(imageFilename)
    dishe.image = filename

    await knex('dishes').update(dishe).where('id', id)

    return res.json(dishe)
  }
}

module.exports = DisheImageController
