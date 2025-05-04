const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY; 

function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function validateToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY); 
  } catch (error) {
    throw error;
  }
}

module.exports = { generateToken, validateToken };
