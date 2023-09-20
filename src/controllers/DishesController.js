const knex = require('../database')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishesController {
  async create(req, res) {
    const {name, description, price, category_id, ingredients} = req.body
    const image = req.file.filename

    const diskStorage = new DiskStorage()  

    const filename = await diskStorage.saveFile(image)

    const [dish_id] = await knex('dishes').insert({ 
      name,
      description,
      price,
      category_id,
      image: filename
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return res.json()
  }

  async update(req, res) {
    const { name, description, price, category_id, ingredients } = req.body
    const { id } = req.params

    await knex('dishes')
    .where('id', id)
    .update({
      name,
      description,
      price,
      category_id,
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id: id,
      };
    });
    
    if(ingredientsInsert.length > 0){
      await knex('ingredients')
      .where('dish_id', id)
      .del()


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
   const ingredients = await knex('ingredients').where('dish_id', id).orderBy('name')

   return res.json({
    ...dishes,
    ingredients
   })
  }

  async index (req, res) {
    const { search } = req.query

    let dishes
    
    if(search) {
      const filterValue = `%${search}%`

      dishes = await knex('dishes')
      .where(function() {
        this.where('name', 'like', filterValue)
        .orWhereIn('id', function() {
          this.select('dish_id')
          .from('ingredients')
          .where('name', 'like', filterValue)
        })
      })
      .orderBy('name')
    }else{
      dishes = await knex('dishes')
      .whereLike('name', `%${search}%`)
      .orderBy('name')
    }

    const dishesWithIngredients = await Promise.all(dishes.map( async dish => {
      const disheIngredients = await knex('ingredients')
      .select('name')
      .where('dish_id', dish.id);

      return {
        ...dish,
        ingredients: disheIngredients.map(ingredient => ingredient.name)
      }
    }))

    return res.json(dishesWithIngredients)
  }
}

module.exports = DishesController