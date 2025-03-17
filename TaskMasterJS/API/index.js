const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'your-secret-key';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ' http://localhost:5173', // Change this to match your frontend
  credentials: true, // Allow cookies/authentication
}));

app.use((req, res, next) => {
  const allowedOrigins = [
      'https://stockmarket-frontend-ebon.vercel.app',
      'http://localhost:5173',

      'https://stockmarket-backend.vercel.app'
  ];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
      return res.status(200).end();
  }
  next();
});
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/TaskMaster', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 5,
  family: 4
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true }, // Ensure emails are lowercase
  Password: { type: String, required: true },
  token: { type: String }
});

const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
  res.json({Message:'Welcome to Node API👍👍'});
});


app.post("/signup", async (req, res) => {
  try {
      console.log("Starting signup process");
      const { Username, fullName, email, password, termsAccepted } = req.body;
      console.log("Got user data:", { Username, fullName, email, password, termsAccepted });

      const existingUser = await User.findOne({ email: email }); // Convert to lowercase
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
      
      const newUser = new User({
          username: Username,
          name: fullName,
          email: email.toLowerCase(), // Store in lowercase
          Password: HashedPassword,
          token: token
      });

      console.log("About to save user");
      await newUser.save();
      console.log("User saved successfully");

      res.json({ token: newUser.token, AUTH: true, User:newUser});
  } catch (error) {
      console.log("Error details:", error);
      res.status(400).send("Failed to signup, please try again");
  }
});

app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      // Ensure email is lowercase
      const user = await User.findOne({ email: email});
      console.log("Checking if user exists");
      if (!user) {
        console.log("User not found");
          return res.status(401).json({ 
              message: "Invalid credentials, please enter the correct email and password",
              AUTH: false 
          });
      }

      const isValidPassword = await bcrypt.compare(password, user.Password);
      console.log("Checking if password is valid");
      if (isValidPassword) {
          res.json({ 
              token: user.token, 
              message: "Login successful",
              AUTH: true
          });
      } else {
        console.log("Invalid credentials");
          res.status(401).json({ 
              message: "Invalid credentials, please enter the correct email and password",
              AUTH: false 
          });
      }
  } catch (error) {
    console.log("Error details:", error);
      res.status(400).json({ 
          message: "Error logging in",
          error: error.message,
          AUTH: false
      });
  }
});
app.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).select("-Password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: "Invalid token", error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});