const Product = require("../../models/productModel");

async function allProductsController(req, res, next) {
    try {
        // Fetch all products and populate the seller information
        const products = await Product.find().populate("seller");

        // Respond with the products data
        res.status(200).json({
            data: products,
            message: "All Products Fetched Successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: error.message || "An error occurred while fetching products",
            error: true,
            success: false,
        });
    }
}

module.exports = allProductsController;
