
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('skills').del()
    .then(function () {
      // Inserts seed entries
      return knex('skills').insert([
        {skill_name: 'React',
          skill_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png'},
        {skill_name: 'React Native',
          skill_photo: 'value'},
        {skill_name: 'Redux',
          skill_photo: 'value'},
        {skill_name: 'Node',
          skill_photo: 'value'},
        {skill_name: 'PostgreSQL',
          skill_photo: 'value'},
        {skill_name: 'Express',
          skill_photo: 'value'},
        {skill_name: 'JavaScript',
          skill_photo: 'value'},
        {skill_name: 'Sass',
          skill_photo: 'value'},
        {skill_name: 'CSS',
          skill_photo: 'value'}
      ]);
    });
};
