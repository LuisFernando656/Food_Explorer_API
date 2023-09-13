const knex = require('../database')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishesController {
  async create(req, res) {
    const {name, description, price, category_id, ingredients} = req.body
    const image = req.file.filename

    const diskStorage = new DiskStorage()  

    const filename = await diskStorage.saveFile(image)

    const [dishe_id] = await knex('dishes').insert({ 
      name,
      description,
      price,
      category_id,
      image: filename
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

  async delete(req, res) {
    const { id } = req.params

    await knex('dishes').where('id', id).delete()

    return res.json()
  }

  async show (req, res) {
   const { id } = req.params

   const dishes = await knex('dishes').where('id', id).first()
   const ingredients = await knex('ingredients').where('dishe_id', id).orderBy('name')

   return res.json({
    ...dishes,
    ingredients
   })
  }

  async index (req, res) {
    const { name, ingredients } = req.query

    let dishes
    
    if(ingredients) {
      const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

      dishes = await knex('ingredients')
      .select([
        'dishes.id',
        'dishes.name'
      ])
      .whereLike('dishes.name', `%${name}%`)
      .whereIn('ingredients.name', filterIngredients)
      .innerJoin('dishes', 'dishes.id', 'ingredients.dishe_id')
      .orderBy('dishes.name')
    }else{
      dishes = await knex('dishes')
      .whereLike('name', `%${name}%`)
      .orderBy('name')
    }

    const dishesWithIngredients = await Promise.all(dishes.map( async dishe => {
      const disheIngredients = await knex('ingredients')
      .select('name')
      .where('dishe_id', dishe.id);

      return {
        ...dishe,
        ingredients: disheIngredients.map(ingredient => ingredient.name)
      }
    }))

    return res.json(dishesWithIngredients)
  }
}

module.exports = DishesController