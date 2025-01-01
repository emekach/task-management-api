const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // console.log(process.env.DATABASE_URI);
    const DB = process.env.DATABASE_URI.replace(
      '<db_password>',
      process.env.DATABASE_PASSWORD,
    );
    await mongoose.connect(DB, {});
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
