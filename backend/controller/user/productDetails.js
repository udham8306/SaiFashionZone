const Product = require("../../models/productModel");

async function getProductDetailsController(req, res, next) {
    try {
        // Extract productId from request parameters
        const { productId } = req.params;

        // Check if productId exists in the request
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        // Fetch the product by its ID and populate the seller field if needed
        const product = await Product.findById(productId).populate("seller");

        // If product is not found, respond with 404
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        // Respond with the fetched product data
        res.status(200).json({
            data: product,
            message: "Product details fetched successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            message: error.message || "An error occurred while fetching product details",
            error: true,
            success: false,
        });
    }
}

module.exports = getProductDetailsController;
