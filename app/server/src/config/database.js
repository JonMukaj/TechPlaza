const { Sequelize } = require('sequelize');
 require('dotenv').config();
 console.log("DB_NAME is: " + process.env.DB_NAME)
//console.log(require('dotenv').config());
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOSTNAME,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = sequelize;
