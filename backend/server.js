const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Import User model
const authRoutes = require('./routes/auth'); // Import authentication routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON data

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Authentication middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from Authorization header
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Example of a protected route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'You have access to this protected route!', user: req.user });
});

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
