
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('skills').del()
    .then(function () {
      // Inserts seed entries
      return knex('skills').insert([
        {skill_name: 'React'},
        {skill_name: 'React Native'},
        {skill_name: 'Redux'},
        {skill_name: 'Node'},
        {skill_name: 'PostgreSQL'},
        {skill_name: 'Express'},
        {skill_name: 'JavaScript'},
        {skill_name: 'Sass'},
        {skill_name: 'CSS'},
        {skill_name: 'Python'},
        {skill_name: 'TypeScript'}
      ]);
    });
};
