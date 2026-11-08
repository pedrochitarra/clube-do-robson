const path = require('path')

// Postgres quando as variáveis do .env existem; senão, SQLite local gerado por
// scripts/dump_to_sqlite.py a partir do backup de 24/02/2021
const usePostgres = Boolean(process.env.database && process.env.host)

module.exports = usePostgres
  ? {
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
          rejectUnauthorized: false
        }
      }
    }
  : {
      dialect: 'sqlite',
      storage: process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'clubedorobson.sqlite'),
      logging: false
    }
