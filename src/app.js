const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined')); // Logging
app.use(bodyParser.json());

// Routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
console.log("JWT_SECRET:", process.env.JWT_SECRET);

module.exports = app;
