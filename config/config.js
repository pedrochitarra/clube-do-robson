module.exports = {
  // url : 'postgres://***REMOVED***',
  database: 'dbsomkqc5dbqov',
  username: 'uhbrrgdkjrkcyc',
  password: '989864f0d9fb1999e3f74087518f9a9cf7f8bf4d675b74d16b25a0116eb3291a',
  host: 'ec2-3-222-127-167.compute-1.amazonaws.com',
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
