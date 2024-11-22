const productService = require('../services/productService');

const productController = {

    //Create Product 
    create: async (req, res) => {
        try {
            const { name, description, price, stock_quantity } = req.body;
            //Validation input 
            if (!name || !price || !stock_quantity) {
                return res.status(400).json({ error: 'Name, price, and stock_quantity are required' });
            }
            const product = await productService.createProduct(name, description, price, stock_quantity);
            res.status(201).json({
                message: 'Product created successfully',
                product,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: Failed to create product' });
        }
    },

    //Select Product All
    getAll: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            if (!products || products.length === 0) {
                return res.status(404).json({ error: 'No products found' });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: Failed to fetch products' });
        }
    },

    //Select Product By ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            // Validasi id produk
            if (!id) {
                return res.status(400).json({ error: 'Product ID is required' });
            }

            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${id} not found` });
            }

            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: Failed to fetch product' });
        }
    },

    //Update Product By ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, stock_quantity } = req.body;

            if (!name || !price || !stock_quantity) {
                return res.status(400).json({ error: 'Name, price, and stock_quantity are required' });
            }

            const product = await productService.updateProduct(id, name, description, price, stock_quantity);
            if (!product) {
                return res.status(404).json({ error: `Product with ID ${id} not found` });
            }

            res.status(200).json({ message: 'Product updated successfully', product });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: Failed to update product' });
        }
    },

    //Delete Product By ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Product ID is required' });
            }

            const deletedProduct = await productService.deleteProduct(id);
            if (!deletedProduct) {
                return res.status(404).json({ error: `Product with ID ${id} not found` });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error: Failed to delete product' });
        }
    },
};

module.exports = productController;
