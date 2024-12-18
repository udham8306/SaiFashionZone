const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
  try {
    const { email, password, name, mobile } = req.body;

    if (!email || !password || !name || !mobile) {
      throw new Error("All fields are required: email, password, name, and mobileNumber");
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Validate password length
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    // Check if a user with the provided email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Construct the user payload
    const payload = {
      name,
      email,
      mobile,
      password: hashedPassword,
    };

    // Save the user in the database
    const newUser = new userModel(payload);
    const savedUser = await newUser.save();

    // Send a success response
    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    // Send an error response
    res.status(400).json({
      message: err.message || "An unexpected error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
