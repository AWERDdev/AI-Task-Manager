const express = require('express');
const router = express.Router();
const Task = require('../Models/Task'); // Import your Task model

router.post('/CreateTask', async (req, res) => {
    try {
        const { Title, Description, Priority, Type,Due } = req.body;
        console.log(Title)
        console.log(Description)
        console.log(Priority)
        console.log(Type)
        console.log(Due)
        
        // Check if required fields are provided
        if (!Title || !Description || !Priority || !Type || !Due) {
            return res.status(400).json({ message: "All fields are required." });
        }

        console.log(Title, Description, Priority, Type , Due);

        // Check if the task already exists
        const existingTask = await Task.findOne({ TaskTitle: Title });
        if (existingTask) {
            return res.status(409).json({
                message: "There is already an existing task with the same title.",
            });
        }

        // Create new task with correct field names
        const newTask = new Task({
            TaskTitle: Title,
            Task: Description,
            importance: Priority,
            type: Type,  // Ensure lowercase `type` to match schema
            Due: Due,  
        });

        await newTask.save();
        res.json({ message: "Task Created successfully", task: newTask });

    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: "Failed to create task, please try again." });
    }
});

module.exports = router;
