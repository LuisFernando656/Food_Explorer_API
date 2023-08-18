exports.up = knex => knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.string('email')
    table.string('password')
    table.boolean('isAdmin').defaultTo(false)
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

exports.down = knex => knex.schema.dropTableIfExists('users')

