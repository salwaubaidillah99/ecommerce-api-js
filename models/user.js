const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Defining the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,  
    tableName: 'users', 
});

User.sync({ force: false }).then(() => {
    console.log('User table created or already exists.');
});

module.exports = User;
