const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    imgFiles: [String], // Array to hold image URLs
    category: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    inStockValue: { type: Number, required: true },
    sizes : [String], //Array of size
    soldStockValue: { type: Number, required: true },
    description: { type: String, required: true },
    specifications: { // Add specifications field
        type: Object, // Use an object to store key-value pairs
        default: {}, // Default to an empty object
    },
    rating: { type: Number, default: 0 }, // Rating for the product
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Seller', // Reference to the Seller model
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
