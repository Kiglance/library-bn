const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function hashPassword(pass) {
  const salt = genSaltSync(10, 'b');
  return hashSync(pass, salt);
}

function comparePassword(plainPassword, hashedPassword) {
  return compareSync(plainPassword, hashedPassword);
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRETE, { expiresIn: '7days' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRETE);
}

module.exports = { hashPassword, comparePassword, generateToken, verifyToken };
