module.exports = {
  // url : 'REDACTED_POSTGRES_URL',
  database: 'da175l8b6ul1l5',
  username: 'sscnjaewpvbmny',
  $1: "REDACTED",
  host: 'ec2-3-231-48-230.compute-1.amazonaws.com',
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
