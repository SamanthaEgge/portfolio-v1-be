
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments();
      users.string('email', 128)
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
    .createTable('skills', skill => {
      skill.increments()
    })
    .createTable('blog', blog => {
      blog.increments();
      blog.string('blog_title', 255)
      blog.text('blog_summary')
        .notNullable()
      blog.timestamp('blog_created', { useTz: true })
      blog.date('blog_published')
      blog.boolean('blog_publish')
        .defaultTo(false)
      blog.
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
      feats.boolean('feature_active')
        .defaultTo(false)
      feats.integer('feature_position')
        .unsigned()
      feats.integer('categories_id')
        .unsigned()
        .references('categories.id')
      feats.integer('blog_id')
        .unsigned()
        .references('blog.id')
      feats.integer('skill_id')
        .unsigned()
        .references('skill.id')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('schemes');
};
