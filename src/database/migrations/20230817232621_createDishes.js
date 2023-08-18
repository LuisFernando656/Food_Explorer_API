exports.up = knex => knex.schema.createTable('ingredients', function (table) {
  table.increments('id').primary()
  table.string('name')
  table.integer('dishe_id').references('id').inTable('dishes')
})

exports.down = knex => knex.schema.dropTableIfExists('ingredients')