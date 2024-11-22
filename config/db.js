const { Sequelize } = require('sequelize');

// Setup connection to PostgreSQL
const sequelize = new Sequelize('ecommerce_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

const JWT_SECRET = 'your_secure_secret';
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB, JWT_SECRET };
