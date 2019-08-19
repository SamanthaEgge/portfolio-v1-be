module.exports = {
  development: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      database: 'portfoliov1',
      user:     "postgres",
      password: "AustinCityLimits"
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }, 
};
