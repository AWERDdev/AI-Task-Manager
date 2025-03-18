const express = require('express');
const cors = require('cors');
const connectDB = require('./DB'); // Import DB connection file

// Connect to MongoDB before starting the server
connectDB();

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
app.use(cors({
  origin: ['https://stockmarket-frontend-ebon.vercel.app', 'http://localhost:5173','http://localhost:5174','http://localhost:5173','http://localhost:5175'],
  credentials: true
}));

// API Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node API 👍👍' });
});

app.use('/api', require('./Routes/LoginRoute'));
app.use('/api', require('./Routes/SignupRoute'));
app.use('/api', require('./Routes/CreateTaskRoute'));
app.use('/api', require('./Routes/UserRoute'));


// Start Server with Error Handling
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on("error", (err) => {
  console.error("Server error:", err);
});
