const { Sequelize } = require('sequelize');
const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const { database, username, password, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    logging: (msg) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${msg}`);
    },
});

sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch((error) => console.error('Unable to connect to the database:', error));

const JWT_SECRET = 'your_secure_secret';

module.exports = { sequelize, JWT_SECRET };

