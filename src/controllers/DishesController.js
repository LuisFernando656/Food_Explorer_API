const knex = require('../database')
const AppError = require('../utils/AppError')

class DishesController {
  async create(req, res) {
    const {name, description, price, category, ingredients} = req.body

    const [dishe_id] = await knex('dishes').insert({
      name,
      description,
      price,
      category,
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dishe_id,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return res.json()
  }

  async update(req, res) {
    const { name, description, price, category, ingredients } = req.body
    const { id } = req.params

    
    await knex('dishes')
    .where('id', id)
    .update({
      name,
      description,
      price,
      category,
    })

    await knex('ingredients')
    .where('dishe_id', id)
    .del()

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dishe_id: id,
      };
    });
  
      if(!ingredientsInsert.lenght){
        await knex('ingredients').insert(ingredientsInsert);
      }else{
        throw new AppError('Adicione os ingredientes')
      }

    return res.json()
  }
}

module.exports = DishesController