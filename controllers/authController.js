const authService = require('../services/authService');
const response = require('../utils/response');

const authController = {

    // Register User
    register: async (req, res) => {
        try {
            const { name, email, password, role = 'user' } = req.body;
            if (!name || !email || !password) {
                return response.validationError(res, 
                    'Name, email, and password are required');
            }

            const newUser = await authService.register(name, email, password, role);
            return response.success(res, 
                'User registered successfully', newUser, 201);
        } 
        catch (error) {
            if (error.message === 'Email is already registered') {
                return response.error(res, error.message, 400);
            }
            console.error(error);
            return response.error(res, 
                'Internal Server Error: Failed to register user');
        }
    },

    // Login User
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return response.validationError(res, 
                    'Email and password are required');
            }

            const user = await authService.login(email, password);
            return response.success(res, 
                'Login successful', user);
        } 
        catch (error) {
            console.error(error);
            return response.error(res, error.message, 400);
        }
    },
};

module.exports = authController;
