const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${status} - ${duration}ms`);
    });
    next();
});

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
