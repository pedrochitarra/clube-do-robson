// WINDOWS
/* const env = require('../.env.json')
module.exports = {
  // url : 'postgres://sscnjaewpvbmny:920150653076e2d6eaa77be1292c6102c23f0c38c5d9642058e21b254bb3d3e1@ec2-3-231-48-230.compute-1.amazonaws.com:5432/da175l8b6ul1l5?sslmode=require',
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
} */

// PRODUCTION
module.exports = {
  // url : 'postgres://sscnjaewpvbmny:920150653076e2d6eaa77be1292c6102c23f0c38c5d9642058e21b254bb3d3e1@ec2-3-231-48-230.compute-1.amazonaws.com:5432/da175l8b6ul1l5?sslmode=require',
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
