
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users.string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128)
        .notNullable();
    })
    .createTable('categories', cats => {
      cats.increments();
      cats.text('category_name')
        .notNullable();
    })
    .createTable('features', feats => {
      feats.increments();

    })
    .createTable('blog', blog => {
      blog.increments();
      
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('schemes');
};
