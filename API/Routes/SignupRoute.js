const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User'); // Import your User model
const JWT_SECRET = "your_secret_key"; // Make sure to replace this with a real secret key

// Signup route
router.post("/signup", async (req, res) => {
    try {
        console.log("Starting signup process");
        const { Username, fullName, email, password, termsAccepted } = req.body;
        console.log("Got user data:", { Username, fullName, email, password, termsAccepted });
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: email});
        console.log("Checking if user exists");
        if (existingUser) {
            console.log("User already exists");
            return res.status(409).json({
                message: "This email is already registered",
                AUTH: false
            });
        }

        console.log("Creating new user");
        const token = jwt.sign({ email }, JWT_SECRET);
        const HashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashing password:", HashedPassword);
        console.log("Token:", token);
        
        // Create new user
        const newUser = new User({
            username: Username,
            name: fullName,
            email: email.toLowerCase(),
            password: HashedPassword,
            token: token
        });

        console.log("About to save user");
        await newUser.save();
        console.log("User saved successfully");

        res.json({ token: newUser.token, AUTH: true, User: newUser });
    } catch (error) {
        console.log("Error details:", error);
        res.status(400).send("Failed to signup, please try again");
    }
});

module.exports = router;
