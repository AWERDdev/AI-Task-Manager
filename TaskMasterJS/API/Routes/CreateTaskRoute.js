const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User'); // Import your User model
const JWT_SECRET = "your_secret_key"; // Make sure to replace this with a real secret key



module.exports = router;