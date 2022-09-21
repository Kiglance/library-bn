require('dotenv').config();

module.exports = {
  development: {
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    username: process.env.POSTGRESS_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  test: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  production: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
};
