const Product = require('../../models/productModel');
const Seller = require('../../models/sellerModel');

const createProductController = async (req, res) => {
    try {
        // Extract product data from the request body
        const {
            name,
            price,
            sellingPrice,
            category,
            productId,
            sizes,
            inStockValue,
            soldStockValue,
            description,
            specifications,  // specifications is already an object
            imgFiles, // The image URLs should be passed in the request body
        } = req.body;

        const sellerId = req.seller.sellerId;

        // Check if the seller exists
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({
                message: 'Seller not found',
                error: true,
                success: false,
            });
        }

        // Ensure imgUrls is an array
        if (!Array.isArray(imgFiles)) {
            return res.status(400).json({
                message: 'Invalid image URLs format. It should be an array of strings.',
                error: true,
                success: false,
            });
        }

        // Create a new product document
        const newProduct = new Product({
            name,
            price,
            sellingPrice,
            imgFiles,
            category,
            sizes,
            productId,
            inStockValue,
            soldStockValue,
            description,
            specifications: specifications || {}, // Directly assign the specifications (default to empty object)
            seller: sellerId,
        });

        // Save the new product to the database
        await newProduct.save();

        // Send a response with the newly created product
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
            success: true,
            error: false,
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            message: 'Error creating product',
            error: error.message,
            success: false,
        });
    }
};

module.exports = createProductController;
