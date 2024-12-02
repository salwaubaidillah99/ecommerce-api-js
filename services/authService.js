const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const moment = require('moment');
const UserToken = require('../models/usertoken');
const { JWT_SECRET } = require('../config/sequelize'); 

const authService = {
    //Register User
    register: async (name, email, password, role ) => {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log(`Email ${email} already exists.`);
            throw new Error('Email is already registered');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
        });

        console.log(`New user created: ${newUser.email}`);
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
    },


    //Login User
    login: async (email, password) => {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ user_id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
        const expiredAt = new Date();
        expiredAt.setDate(expiredAt.getDate() + 30);

        await UserToken.create({
            user_id: user.id,
            token: token,
            expiredAt: expiredAt
        });

        return {
            user_id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        };
    }
};

module.exports = authService;
