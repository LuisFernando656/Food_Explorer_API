exports.up = knex => knex.schema.createTable('dishes', function (table) {
  table.increments('id').primary()
  table.string('name')
  table.text('description')
  table.decimal('price')
  table.text('image')
  table.integer('category_id').references('id').inTable('category').onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTableIfExists('dishes')