const express = require('express');
const cors = require('cors');
const connectDB = require('./DB');

// Connect to MongoDB before starting the server
connectDB();

const app = express();
const port = process.env.PORT || 3500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
app.use(cors({
  origin: ['https://stockmarket-frontend-ebon.vercel.app', 'http://localhost:5173','http://localhost:5174','http://localhost:5175'],
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
app.use('/api', require('./Routes/UpdateRoute'));


// app.post("/PYData",async(req,res)=>{
//   const response = await fetch(`http://127.0.0.1:8000/message`,{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({message:"hello this is main node JS server talking"}),
//   })
//   const data  = await response.json()
//   console.log(data)
// })


// Start Server with Error Handling
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on("error", (err) => {
  console.error("Server error:", err);
});