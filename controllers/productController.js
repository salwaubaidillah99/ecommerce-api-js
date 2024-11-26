const productService = require('../services/productService');
const response = require('../utils/response');

const productController = {

    //Create Product 
    create: async (req, res) => {
        try {
            const { name, description, price, stock_quantity } = req.body;
            if (!name || !price || !stock_quantity) {
                return res.status(400).json({ error: 'Name, price, and stock_quantity are required' });
            }

            const product = await productService.createProduct(name, description, price, stock_quantity);
            return response.success(res,
                'Product created successfully', product, 201);
        } catch (error) 
        {
            console.error(error);
            return response.error(res,
                'Internal Server Error: Failed to created user'); 
        }
    },

    //Select Product All
    getAll: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            if (!products || products.length === 0) {
                return response.error(res,
                    'No products found', 404);
            }

            return response.success(res, 
                'Products retrieved successfully', products);
        } catch (error) {
            console.error(error);
            return response.error(res, 
                'Internal Server Error: Failed to fetch products');
        }
    },

    // Get Product By ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return response.error(res, 
                    'Product ID is required', 400);
            }

            const product = await productService.getProductById(id);
            if (!product) {
                return response.error(res,
                    `Product with ID ${id} not found`, 404);
            }

            return response.success(res, 
                'Product retrieved successfully', product);
        } catch (error) {
            console.error(error);
            return response.error(res, 
                'Internal Server Error: Failed to fetch product');
        }
    },

    // Update Product By ID
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, stock_quantity } = req.body;
            if (!name || !price || !stock_quantity) {
                return response.error(res, 
                    'Name, price, and stock_quantity are required', 400);
            }

            const product = await productService.updateProduct(id, name, description, price, stock_quantity);
            if (!product) {
                return response.error(res, 
                    `Product with ID ${id} not found`, 404);
            }

            return response.success(res, 
                'Product updated successfully', product);
        } catch (error) {
            console.error(error);
            return response.error(res, 
                'Internal Server Error: Failed to update product');
        }
    },

    // Delete Product By ID
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return response.error(res, 
                    'Product ID is required', 400);
            }

            const deletedProduct = await productService.deleteProduct(id);
            if (!deletedProduct) {
                return response.error(res, 
                    `Product with ID ${id} not found`, 404);
            }

            return response.success(res, 
                'Product deleted successfully');
        } catch (error) {
            console.error(error);
            return response.error(res, 
                'Internal Server Error: Failed to delete product');
        }
    },
};
module.exports = productController;
