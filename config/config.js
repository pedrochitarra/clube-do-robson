module.exports = {
  // url : 'postgres://***REMOVED***',
  database: 'da175l8b6ul1l5',
  username: '***REMOVED***',
  password: '***REMOVED***',
  host: '***REMOVED***',
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
