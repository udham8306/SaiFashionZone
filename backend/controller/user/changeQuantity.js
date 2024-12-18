const mongoose = require('mongoose');
const User   = require("../../models/userModel")
const CartItem = require("../../models/cartModel"); // Assuming you have a cartItem model

async function quantityController(req, res, next) {
    try {
        const { cartItemId, quantity } = req.body;

        if (!cartItemId || quantity === undefined) {
            return res.status(400).json({ message: 'cartItemId and quantity are required' });
        }

        // Find the cart item by ID and update its quantity
        const updatedCartItem = await CartItem.findByIdAndUpdate(
            cartItemId,
            { $set: { quantity } }, // Set the new quantity value
            { new: true } // Return the updated document
        );

        if (!updatedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({ message: 'Quantity updated successfully', updatedCartItem });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = quantityController;
