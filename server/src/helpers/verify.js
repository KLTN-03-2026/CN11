require("dotenv").config();
const jwt = require("jsonwebtoken");

class VerifyHelpers {
    verify(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(403).json({
                    error: 1,
                    message: "No token provided!",
                });
            }
            const token = authHeader.split(" ")[1];
           

            if (!token) {
                return res.status(403).json({
                    error: 1,
                    message: "No token provided!",
                });
            }
            
        
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({
                        error: 1,
                        message: "Invalid or expired token!",
                    });
                }
                req.user = user;
                next();
            });
        } catch (error) {
            return res.status(500).json({
                error: 1,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new VerifyHelpers();