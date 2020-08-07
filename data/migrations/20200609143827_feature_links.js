exports.up = function(knex) {
  return knex.schema.table('features', tbl => {
    tbl.string('feature_github')
    tbl.string('feature_website')
  });
};

exports.down = function(knex) {
  return knex.schema.table('features', tbl => {
      tbl.dropColumn('feature_github')
      tbl.dropColumn('feature_website')
  });
};
