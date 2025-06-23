const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    family: 4 // 👈 Force IPv4
  }
});

// Authenticate and Sync the Database
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    return sequelize.sync(); // Ensure all models are synced
  })
  .then(() => {
    console.log('✅ All models were synchronized successfully.');
  })
  .catch((err) => console.error('❌ Error connecting to the DB: ' + err));

module.exports = sequelize;


