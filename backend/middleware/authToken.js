var jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Check for token in cookies or in Authorization header
        const token = req.cookies?.user_token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token not provided",
                data: [],
                error: true,
                success: false,
            });
        }

        // Verifying the token
        jwt.verify(token, process.env.USER_TOKEN_SECRET_KEY, function(err, decoded) {
            // console.log(decoded)
            if (err) {
                console.error("JWT Verification Error:", err);
                

                return res.status(401).json({
                    message: "Invalid or expired token",
                    data: [],
                    error: true,
                    success: false,
                });
            }

            // Store decoded data (e.g., user ID and email) in request
             req.user = decoded; // Typically contains userId and other info
            //    req.userId = decoded.userId;
            next(); // Proceed to the next middleware
        });

    } catch (err) {
        console.error("Error during authentication:", err);
        res.status(401).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
