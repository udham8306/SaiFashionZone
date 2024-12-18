const Cart = require("../../models/cartModel");
const Product = require("../../models/productModel");
const User = require("../../models/userModel");
const Seller = require("../../models/sellerModel");

async function addToCartController(req, res, next) {
    try {
        const { productId, quantity, userId } = req.body;

        // Step 1: Validate input
        if (!productId || !quantity || !userId) {
            return res.status(400).json({
                message: "Product ID, Quantity, and User ID are required",
                error: true,
                success: false,
            });
        }

        // Step 2: Verify Product existence
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        // Step 3: Verify User existence
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // Step 4: Verify Seller existence
        const seller = await Seller.findById(product.seller);
        if (!seller) {
            return res.status(404).json({
                message: "Seller not found",
                error: true,
                success: false,
            });
        }

        // Step 5: Check Quantity Validity
        if (quantity < 1 || quantity > product.inStockValue) {
            return res.status(400).json({
                message: "Invalid quantity. Must be between 1 and the available stock.",
                error: true,
                success: false,
            });
        }

        // Step 6: Check if Product already exists in Cart
        const existingCartItem = await Cart.findOne({ user: userId, product: productId });

        if (existingCartItem) {
            // Update quantity if product is already in the cart
            existingCartItem.quantity += quantity;

            // Ensure updated quantity does not exceed stock
            if (existingCartItem.quantity > product.inStockValue) {
                return res.status(400).json({
                    message: "Updated quantity exceeds available stock.",
                    error: true,
                    success: false,
                });
            }

            await existingCartItem.save();

            return res.status(200).json({
                message: "Product quantity updated in cart.",
                error: false,
                success: true,
                data: existingCartItem,
            });
        } else {
            // Step 7: Add a new product to the cart
            const newCartItem = new Cart({
                user: userId,
                product: productId,
                seller: product.seller,
                quantity: quantity,
            });

            await newCartItem.save();

            return res.status(201).json({
                message: "Product added to cart successfully.",
                error: false,
                success: true,
                data: newCartItem,
            });
        }

    } catch (error) {
        // Step 8: Error handling
        console.error("Error adding product to cart:", error);
        return res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false,
        });
    }
}

module.exports = addToCartController;
