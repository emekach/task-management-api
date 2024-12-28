const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const globalErrorHandler = require('./middleware/errorHandler');

// const whitelist = ['https://www.yoursite.com'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by cors'));
//     }
//   },
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use(cors());
// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Parse JSON payloads with a size limit of 30MB
app.use(express.json({ limit: '30mb' }));

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.get('/', (req, res) => {
  res.send('Hello');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'failed',
  });
});

app.use(globalErrorHandler);
module.exports = app;
