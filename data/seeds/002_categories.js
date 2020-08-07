
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {category_name: 'life'},
        {category_name: 'react'},
        {category_name: 'backend'},
        {category_name: 'frontend'},
        {category_name: 'UI'},
        {category_name: 'project'},
        {category_name: 'databasedesign'},
        {category_name: 'tutorial'}
      ]);
    });
};
