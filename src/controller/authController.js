const User = require('./../models/userModel');
const jwt = require('./../middleware/jwt');
const { catchAsync } = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new AppError(
      `Error generating tokens: ${error.message || 'Internal Server Error'}`,
      500,
    );
  }
};

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

  const createdUser = await User.findById(newUser._id).select(
    '-password -refreshToken',
  );

  if (!createdUser) {
    return next(
      new AppError('Something went wrong, failed to create account', 500),
    );
  }
  //   jwt.createSendToken(createdUser, 201, req, res);
  return res.status(201).json({
    message: 'user created successfully',
    user: createdUser,
  });
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

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken',
  );

  if (!loggedInUser) {
    return next(new AppError('Failed to log in user', 404));
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    //sameSite: 'Strict',
  };

  //   console.log(
  //     'Access Token Max Age:',
  //     Number(process.env.JWT_EXPIRES_IN) * 60 * 1000,
  //   );
  //   console.log(
  //     'Refresh Token Max Age:',
  //     Number(process.env.JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000,
  //   );

  return res
    .status(200)
    .cookie('accessToken', accessToken, {
      ...options,
      maxAge: process.env.JWT_EXPIRES_IN * 60 * 1000,
    })
    .cookie('refreshToken', refreshToken, {
      ...options,
      maxAge: process.env.JWT_REFRESH_EXPIRES_IN * 24 * 60 * 60 * 1000,
    })
    .json({
      message: 'user logged in successful',
      user: {
        accessToken,
        refreshToken,
        loggedInUser,
      },
    });
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const incomingRefreshToken = '';
});
