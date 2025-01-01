const connectDB = require('./config/dbConn');

process.on('uncaughtException', () => {
  console.log('Handling uncaught exception');
  process.exit(1);
});

const app = require('./app');
const { default: mongoose } = require('mongoose');

connectDB();

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('connected to mongodb');
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
