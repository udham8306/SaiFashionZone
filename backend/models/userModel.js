const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Optionally make the name required
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true, // Ensure the mobile number is required
  
    },
    password: {
      type: String,
      required: true, // Ensure the password is required
    },

    role: {
      type: String,
      default: "GENERAL",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
