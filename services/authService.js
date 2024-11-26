const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/sequelize'); // Import JWT_SECRET

const authService = {
    //Register User
    register: async (name, email, password) => {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log(`New user created: ${newUser.email}`);
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        };
    },


    //Login User
    login: async (email, password) => {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        // Gunakan JWT_SECRET untuk membuat token
        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
        return {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            token
        };
    }
};

module.exports = authService;
