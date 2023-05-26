require('dotenv').config('../.env');

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOSTNAME,
  port: process.env.MYSQL_PORT,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 300,
    min: 1,
    acquire: 30000,
    idle: 10000
  }
}
