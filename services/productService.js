const Product = require('../models/product');

const productService = {
    //Create Product 
    createProduct: async (name, description, price, stock_quantity) => {
        const product = await Product.create({
            name,            
            description,    
            price,          
            stock_quantity  
        });
        return product;
    },

    //Get All Product
    getAllProducts: async () => {
        return await Product.findAll();
    },
    
    //Get Product By ID
    getProductById: async (id) => {
        return await Product.findByPk(id);
    },

    //Update Product By ID
    updateProduct: async (id, name, description, price, stock_quantity) => {
        const product = await Product.findByPk(id);
        if (!product) {
            return null;
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock_quantity = stock_quantity;
        await product.save();
        return product;
    },

    //Delete Product By ID
    deleteProduct: async (id) => {
        const product = await Product.findByPk(id);
        if (!product) {
            return null;
        }
        await product.destroy();
        return product;
    },
};

module.exports = productService;

