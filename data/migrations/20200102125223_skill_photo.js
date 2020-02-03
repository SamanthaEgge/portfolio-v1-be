exports.up = function(knex) {
    return knex.schema.table('skills', tbl => {       
      tbl.string('skill_photo')
        .notNullable()
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('skills', tbl => {
        tbl.dropColumn('skill_photo')
    });
  };
