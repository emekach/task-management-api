const User = require('./../models/userModel');
const jwt = require('./../middleware/jwt');
const { catchAsync } = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, username, password, passwordConfirm } = req.body;

  //   console.log(eq.body);
  const newUser = await User.create({
    email,
    username,
    password,
    passwordConfirm,
  });

  jwt.createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and Password cannot be empty', 404));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid credentials', 404));
  }

  jwt.createSendToken(user, 200, req, res);
});
