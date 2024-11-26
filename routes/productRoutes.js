const express = require('express');
const productController = require('../controllers/productController');
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
router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
