const jwt = require("jsonwebtoken");

function generateRefreshToken(email) {
    return jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "20m"
    });
}

module.exports = generateRefreshToken;