
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
      users.increments('user_id');
      users.string('email', 128)
        .notNullable()
        .unique();
      users.string('password', 128)
        .notNullable();
    })
    .createTable('categories', cats => {
      cats.increments('cat_id');
      cats.text('category_name')
        .notNullable()
        .unique();
    })
    .createTable('skills', skill => {
      skill.increments('skill_id')
      skill.text('skill_name')
        .notNullable()
        .unique();
    })
    .createTable('blog', blog => {
      blog.increments('blog_id');
      blog.string('blog_title', 255)
      blog.text('blog_summary')
        .notNullable()
      blog.timestamp('blog_created', { useTz: true })
        .defaultTo(knex.fn.now())
      blog.date('blog_published')
      blog.boolean('blog_publish')
        .defaultTo(false)
      blog.
      blog.integer('categories_id')
        .unsigned()
        .references('categories.cat_id')
    })
    .createTable('features', feats => {
      feats.increments('feat_id');
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
        .references('categories.cat_id')
      feats.integer('blog_id')
        .unsigned()
        .references('blog.blog_id')
      feats.integer('skill_id')
        .unsigned()
        .references('skill.skill_id')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('features')
    .dropTableIfExists('blog')
    .dropTableIfExists('skills')
    .dropTableIfExists('categories')
    .dropTableIfExists('users')
};
