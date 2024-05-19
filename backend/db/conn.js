const mongoose = require('mongoose');

const DB = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));