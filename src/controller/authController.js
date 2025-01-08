const User = require('./../models/userModel');
const jwt = require('./../middleware/jwt');
const { catchAsync } = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, username, password, passwordConfirm } = req.body;

  //validation
  if (
    ['email', 'username', 'password', 'passwordConfirm'].some(
      (field) => field?.trim() === '',
    )
  ) {
    return next(new AppError('All Fields are required', 400));
  }

  // Passwords must match
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  // check if user exist
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return next(new AppError('User with email or username already exist', 409));
  }

  //   console.log(eq.body);
  const newUser = await User.create({
    email,
    username,
    password,
    passwordConfirm,
  });

  // Check if user creation was successful
  if (!newUser) {
    return next(new AppError('Failed to create user', 500));
  }

  // Remove sensitive fields
  newUser.password = undefined;
  newUser.refreshToken = undefined;

  jwt.createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and Password cannot be empty', 404));
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordCorrect(password))) {
    return next(new AppError('Invalid credentials', 404));
  }

  jwt.createSendToken(user, 200, req, res);
});
