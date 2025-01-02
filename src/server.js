const connectDB = require('./config/dbConn');
const mongoose= require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Handling uncaught exception', err.message);
  process.exit(1);
});

const app = require('./app');


connectDB();

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
