module.exports = {
  // url : 'REDACTED_POSTGRES_URL',
  database: 'dbsomkqc5dbqov',
  username: 'uhbrrgdkjrkcyc',
  $1: "REDACTED",
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
