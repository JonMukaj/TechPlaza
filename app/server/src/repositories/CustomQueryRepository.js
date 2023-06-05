const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

class CustomQueryRepository {

async  executeCustomQuery() {
    try {
      // Execute your custom query using Sequelize's `query` method
      const result = await sequelize.query('SELECT * FROM "Users" ');
  
      // Extract and return the rows from the query result
      const rows = result[0];
      return rows;
    } catch (error) {
      throw new Error('Error executing custom query');
    }
  }
  

  
}
module.exports = CustomQueryRepository;