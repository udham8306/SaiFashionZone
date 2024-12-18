const Seller = require("../../models/sellerModel");
const jwt = require("jsonwebtoken");

// Controller function for seller sign-up
const sellerSignUp = async (req, res) => {
  try {
    const { name, email, password, shopName, phoneNumber, address } = req.body;

    // Ensure all fields are present
    if (!name || !email || !password || !shopName || !phoneNumber || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSeller = new Seller({
      name,
      email,
      password,
      shopName,
      phoneNumber,
      address,
    });
    await newSeller.save();
    res
      .status(201)
      .json({
        message: "Seller signed up successfully",
        success: true,
        error: false,
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: error.message, success: false, error: true });
    }
    res.status(500).json({ message: "Server error" });
  }
};
const sellerSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    // Check if the password matches
    const isMatch = await seller.comparePassword(password); // Ensure `comparePassword` is implemented in the Seller model
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const tokenPayload = { sellerId: seller._id, email: seller.email };
    const sellerToken = jwt.sign(
      tokenPayload,
      process.env.SELLER_TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Set token in cookies
    res.cookie("seller_token", sellerToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict", // Prevent CSRF attacks
    });

    // Respond with success message
    res.status(200).json({
      message: "Seller signed in successfully",
      data: {
        sellerId: seller._id,
        email: seller.email,
      },
      succes: true,
      error: false,
    });
  } catch (error) {
    console.error("Error signing in seller:", error);
    res.status(500).json({
      message: "Error signing in seller",
      succes: false,
      error: error.message,
    });
  }
};

module.exports = {
  sellerSignUp,
  sellerSignIn,
};
