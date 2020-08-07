exports.up = function(knex) {
  return knex.schema.table('features', tbl => {
    tbl.string('feature_photo')
      .notNullable()
  });
};

exports.down = function(knex) {
  return knex.schema.table('features', tbl => {
      tbl.dropColumn('feature_photo')
  });
};