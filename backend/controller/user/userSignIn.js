const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
async function userSignInController(req, res) {
  
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please enter a valid email");
    }
    if (!password) {
      throw new Error("Please enter a valid password");
    }

    const user = await userModel.findOne({ email });
      
    // console.log(user); // Should return the user document if it exists
    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id : user._id,
        email : user.email,
      };
      const user_token = await jwt.sign(tokenData, process.env.USER_TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 *12,
      });
      
      const tokenOptions = {
        httpOnly: true,
        secure: true,
        
      };
      
      res.cookie("user_token" , user_token ,tokenOptions).json({
        data: user_token,
        success: true,
        error: false,
        message: "login in successful",
       
      })
    } 
    else 
    {
      throw new Error("Incorrect password");
    }

    
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
