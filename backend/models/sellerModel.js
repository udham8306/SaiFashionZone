const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Seller schema definition
const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, // Storing the URL or file path
        default: "https://cdn-icons-png.flaticon.com/512/4515/4515443.png" // Default value if no picture is provided
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Hash password before saving the seller document
sellerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password during login
sellerSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
