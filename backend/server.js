// server.js
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

// Connection to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Node API app is running on port 5000');
    });
  })
  .catch((error) => {
    console.log(error);
  });