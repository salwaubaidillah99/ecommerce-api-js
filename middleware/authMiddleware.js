const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/sequelize');

const authMiddleware = {
    authenticate: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token is required' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; 
            next();
        } catch (error) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
    },

    authorizeAdmin: (req, res, next) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: Admins only' });
        }
        next();
    },
};

module.exports = authMiddleware;
