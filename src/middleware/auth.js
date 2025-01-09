const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');
const { catchAsync } = require('./../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'you are not authorised to access this page. Please Login',
        401,
      ),
    );
  }
  //   console.log(`secrest ${process.env.ACCESS_TOKEN_SECRET}`);
  //   console.log(`token ${token}`);

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET,
  );

  //   console.log(decoded);

  const currentUser = await User.findById(decoded?._id).select(
    '-password -refreshToken',
  );

  if (!currentUser || decoded.tokenVersion !== currentUser.tokenVersion) {
    return next(
      new AppError(
        'you are not authorised to access this page. Please Login',
        401,
      ),
    );
  }

  //   console.log(currentUser);

  req.user = currentUser;
  next();
});
