const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicture: {
      type: String,
      default: 'welcome.png',
    },
  },
  {
    timestamps: true,
  },
);

// compare hashed password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
