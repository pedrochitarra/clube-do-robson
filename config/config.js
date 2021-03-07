
const env = require('../.env.json')
module.exports = {
  // url : 'postgres://***REMOVED***',
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
