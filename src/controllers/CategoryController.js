const  knex  = require("../database")

class CategoryController {
  async index( req, res) {

    const category = await knex('category')
    .groupBy('id')

    return res.json(category)
  }
}

module.exports = CategoryController