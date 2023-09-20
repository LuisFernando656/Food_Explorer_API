exports.up = knex => knex.schema.createTable('ingredients', function (table) {
  table.increments('id').primary()
  table.string('name')
  table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTableIfExists('ingredients')