const express = require('express');
const router = express.Router();
const Task = require('../Models/Task'); // Import your Task model
const User = require('../Models/User');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_secret_key"; // Make sure to replace this with a real secret key
router.post('/CreateTask', async (req, res) => {
    try {
        const { Title, Description, Priority, Type, Due, userData } = req.body;
        console.log(userData);
        console.log(userData?.email);
        console.log(userData?.token);
        // Check if required fields are provided
        if (!Title || !Description || !Priority || !Type || !Due || !userData || !userData.email) {
            return res.status(400).json({ message: "All fields are required, including user email." });
        }

        // Find the user by email
        const user = await User.findOne({ email: userData.email });  // ✅ FIX: Use await
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
  // Decode the JWT to get user info
  const decoded = jwt.verify(userData.token, JWT_SECRET);
  const userId = decoded.id; // ✅ Extract user ID from JWT

  if (!userId) {
      return res.status(401).json({ message: "Invalid token: User ID missing" });
  }
        // Check if the task already exists for this user
        const existingTask = await Task.findOne({ TaskTitle: Title, userId: user._id }); // ✅ FIX: Search by userId
        if (existingTask) {
            return res.status(409).json({
                message: "There is already an existing task with the same title for this user.",
            });
        }

        // Create new task with userId reference
        const newTask = new Task({
            TaskTitle: Title,
            Task: Description,
            importance: Priority,
            type: Type,  
            Due: Due,
            userId: user._id,  // ✅ Store user reference
        });

        await newTask.save();
        res.json({ message: "Task Created successfully", task: newTask });

    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: "Failed to create task, please try again." });
    }
});

module.exports = router;
