const jwt = require('jsonwebtoken');
const Seller = require('../models/sellerModel'); // Assuming you have a Seller model

const authSeller = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.seller_token || req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
      return res.status(401).json({
        message: 'Authentication token is required',
        data: [],
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.SELLER_TOKEN_SECRET_KEY, function (err, decoded) {
      console.log(decoded)
      if (err) {
        console.error("JWT Verification Error:", err);
       
        return res.status(401).json({
          message: "Invalid or expired token",
          data: [],
          error: true,
          success: false,
        });
      }

      // Store decoded data (e.g., seller ID) in the request object
      req.seller = decoded; // Typically contains sellerId and other info
      next(); // Proceed to the next middleware
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({
      message: 'An error occurred during authentication',
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = authSeller;
