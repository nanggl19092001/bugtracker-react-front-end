"use strict";
require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;
function SignJWT(data) {
    return jwt.sign(data, secret);
}
function validateJWT(token) { }
module.exports = { SignJWT: SignJWT };
