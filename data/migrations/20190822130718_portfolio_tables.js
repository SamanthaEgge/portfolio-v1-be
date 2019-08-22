
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
        .notNullable()
        .unique();
    })
    .createTable('blog', blog => {
      blog.increments();
      blog.string('blog_title', 255)
      blog.text('blog_summary')
        .notNullable()
      blog.date('blog_published')
        
      blog.integer('categories_id')
        .unsigned()
        .references('categories.id')
    })
    .createTable('features', feats => {
      feats.increments();
      feats.text('feature_title')
        .notNullable();
      feats.string('feature_photo')
        .notNullable();
      feats.text('feature_summary')
        .notNullable();
      feats.integer('categories_id')
        .unsigned()
        .references('categories.id')
      feats.integer('blog_id')
        .unsigned()
        .references('blog.id')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('schemes');
};
