require('dotenv').config();

module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

   development: {
    database: 'unity_dev',
    username: 'postgres',
    password: 'ileana2121',
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  test: {
    database: 'unity_test',
    username: 'postgres',
    password: 'ileana2121',
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  production: {
    database: 'unity_dev',
    username: 'postgres',
    password: 'ileana2121',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
}

