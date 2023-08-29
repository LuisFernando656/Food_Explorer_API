exports.up = knex => knex.schema.createTable('category', function (table) {
  table.increments('id').primary()
  table.string('name')
})

exports.down = knex => knex.schema.dropTableIfExists('category')
