const CartItem = require("../../models/cartModel"); // Import the CartItem model

async function removeCartItemController(req, res) {
    try {
        const { cartItemId } = req.body; // Get cart item ID from request body

        // Validate if cartItemId exists
        if (!cartItemId) {
            return res.status(400).json({ message: 'cartItemId is required' });
        }

        // Find and remove the cart item
        const deletedCartItem = await CartItem.findByIdAndDelete(cartItemId);

        if (!deletedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({
            message: 'Item removed successfully',
            deletedCartItem,
        });
    } catch (error) {
        console.error('Error while removing item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = removeCartItemController;
