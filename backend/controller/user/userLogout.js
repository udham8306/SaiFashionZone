async function userLogout(req, res, next) {
    try {
        res.clearCookie("user_token") ; 
        res.json({
            message: "Logout successfully",  
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
  }
  
module.exports = userLogout;