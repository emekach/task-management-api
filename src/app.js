require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');

const globalErrorHandler = require('./middleware/errorHandler');

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

// Parse JSON payloads with a size limit of 30MB
app.use(express.json({ limit: '15kb' }));

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true, limit: '15kb' }));

// serve static files
//console.log(path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api/v1/users', authRouter);
app.use('/api/v1/tasks', taskRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'failed',
  });
});

app.use(globalErrorHandler);
module.exports = app;
