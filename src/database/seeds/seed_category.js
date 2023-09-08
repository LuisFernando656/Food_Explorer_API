exports.seed = async function(knex) {
  await knex('category').del()
  await knex('category').insert([
    {id: 1, name: 'Pratos Principais'},
    {id: 2, name: 'Refeições'},
    {id: 3, name: 'Sobremesas'},
    {id: 4, name: 'Bebidas'}
  ]);
};
