const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'A user must have a firstname'],
      min: 2,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'A user must have a lastname'],
      min: 2,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'A user must have an email'],
    },
    password: {
      type: String,
      required: [true, 'A user must input a password'],
    },
    profilePicture: {
      type: String,
      default: 'welcome.png',
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
