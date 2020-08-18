module.exports = {
  "type": process.env.DB_TYPE,
  "username": process.env.USERNAME,
  "password": process.env.PASSWORD,
  "host": process.env.HOST,
  "port": process.env.DB_PORT,
  "database": process.env.DATABASE,
  "entities": ['dist/**/*.entity.js'],
  "migrations": ["dist/database/migrations/*.js"],
  "migrationsRun": true,
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}