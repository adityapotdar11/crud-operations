const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const jwtAuthentication = async (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({
            code: 401,
            message: "Access denied!",
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({
            code: 401,
            message: "Access denied!",
        });
    }
};

module.exports = jwtAuthentication;
