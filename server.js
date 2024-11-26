const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./sawgger/swagger');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { sequelize  } = require('./config/sequelize');

// Load environment variables
dotenv.config();

// Create express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
sequelize.authenticate();

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
