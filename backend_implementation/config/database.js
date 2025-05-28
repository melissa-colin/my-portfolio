const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize(
  'u436612612_contnt_portfol', // Database name
  'u436612612_melissa',         // Username
  '123abc',                     // Password
  {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = { sequelize };
