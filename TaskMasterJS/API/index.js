const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/TaskMaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
app.get('/', (req, res) => {
  res.json({Message:'Welcome to Node API👍👍'});
});

app.post("/ReciveData",(req,res)=>{
console.log("route has been Called");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});