require('dotenv').config()

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
