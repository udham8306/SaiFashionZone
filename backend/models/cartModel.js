const mongoose = require("mongoose");

// Define the Cart Schema
const CartSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number, // Quantity of the product in the cart
      required: true,
      min: 1, // The quantity must be at least 1
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
      ref: "Product",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Seller model
      ref: "Seller",
      required: true,
    },
  },
  { timestamps: true }
); // This will automatically add createdAt and updatedAt fields

// Create the Cart model
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
