const jwt = require("jsonwebtoken");

function generateAccessToken(email) {
    return jwt.sign(email,
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "20m"});
}

module.exports = generateAccessToken;