const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A user must have a firstname'],
      min: 2,
    },
    lastName: {
      type: String,
      required: [true, 'A user must have a lastname'],
      min: 2,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
    },
    password: {
      type: String,
      required: [true, 'A user must input a password'],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
