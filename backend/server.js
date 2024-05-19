// backend/server.js
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./services/mongoose');
const formRoutes = require('./routes/formRoutes');
const fetchRecordRoutes = require('./routes/fetchRecordRoutes')
const hrFetchRoutes = require('./routes/hrFetchRoutes');
const adminFetchRoutes = require('./routes/adminFetchRoutes');
const userFetchRoutes = require('./routes/fetchRecordUserRoute');
require('./db/conn');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// connectDB();

// Routes
app.use('/', formRoutes);
app.use('/api', fetchRecordRoutes);
app.use('/api',hrFetchRoutes);
app.use('/api',adminFetchRoutes);
app.use('/api',userFetchRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
