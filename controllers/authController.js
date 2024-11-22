const authService = require('../services/authService');

const authController = {

    //Register User
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            //Validation input 
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Name, email, and password are required' });
            }

            const newUser = await authService.register(name, email, password);
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: Failed to register user' });
        }
    },

    //Login User 
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            //Validation input
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            const token = await authService.login(email, password);
            res.status(200).json({
                message: 'Login successful',
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = authController;
