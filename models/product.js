const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Defining the Product model
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,  
    tableName: 'products', 
});


Product.sync({ force: false }).then(() => {
    console.log('Product table created or already exists.');
});

module.exports = Product;