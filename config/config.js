// WINDOWS
const env = require('../.env.json')
module.exports = {
  // url : 'REDACTED_POSTGRES_URL',
  database: env.database,
  username: env.username,
  password: env.password,
  host: env.host,
  port: 5432,
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  }
}

/*
// PRODUCTION
module.exports = {
  // url : 'REDACTED_POSTGRES_URL',
  database: process.env.database,
  username: process.env.username,
  password: process.env.password,
  host: process.env.host,
  port: 5432,
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  }
}
*/
