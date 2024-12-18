const Cart = require("../../models/cartModel");
const Product = require("../../models/productModel");
const User = require("../../models/userModel");
const Seller = require("../../models/sellerModel");

async function getCartItemsController(req, res, next) {
    try {
        const  userId  = req.user._id; // Extract the userId from request parameters

        // Validate input data
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false,
            });
        }

        // Fetch all cart items for the user and populate the references
        const cartItems = await Cart.find({ user: userId })
            .populate({
                path: "product", // Populate the product reference
                model: Product,
                select: "name price sellingPrice imgFiles category description" // Select necessary fields
            })
            .populate({
                path: "seller", // Populate the seller reference
                model: Seller,
                select: "name contactInfo" // Select necessary fields
            })
            .populate({
                path: "user", // Populate the user reference
                model: User,
                select: "name email" // Select necessary fields
            });

        // If no cart items are found, respond with a 404
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({
                message: "No cart items found for this user",
                error: true,
                success: false,
            });
        }

        // Respond with the fetched cart items
        res.status(200).json({
            data: cartItems,
            message: "Cart items fetched successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({
            message: error.message || "An error occurred while fetching cart items",
            error: true,
            success: false,
        });
    }
}

module.exports = getCartItemsController;
