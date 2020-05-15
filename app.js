const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/terms/english', require('./routes/english'));
app.use('/api/terms/other', require('./routes/other'));
app.use('/api/languages', require('./routes/languages'));

module.exports = app;
