
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
      feats.integer('blog_id')
        .unsigned()
        .references('blog.blog_id')
    })
    .createTable('skillPair', skillPair => {
      skillPair.increments('skill_pair_id')
      skillPair.integer('skill_id')
        .unsigned()
        .references('skills.skill_id')
        .notNullable()
      skillPair.integer('feat_id')
        .unsigned()
        .references('features.feat_id')
      skillPair.integer('blog_id')
        .unsigned()
        .references('blog.blog_id')
    })
    .createTable('categoriesPair', catPair => {
      catPair.increments('cat_pair_id')
      catPair.integer('cat_id')
        .unsigned()
        .references('categories.cat_id')
        .notNullable()
      catPair.integer('blog_id')
        .unsigned()
        .references('blog.blog_id')
      catPair.integer('feat_id')
        .unsigned()
        .references('features.feat_id')
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
