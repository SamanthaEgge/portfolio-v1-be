exports.up = function(knex) {
  return knex.schema.table('blog', tbl => {
    tbl.string('blog_slug')
      .notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.table('blog', tbl => {
      tbl.dropColumn('blog_slug')
  });
};