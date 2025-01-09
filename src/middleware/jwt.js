// const jwt = require('jsonwebtoken');
// const AppError = require('../utils/appError');

// exports.signToken = (id) => {
//   return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// exports.createSendToken = (user, statusCode, req, res, next) => {
//   const token = this.signToken(user._id);

//   let cookieOptions;
//   try {
//     cookieOptions = {
//       expires: new Date(
//         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
//       ),
//       // secure: req.secure || req.headers('x-forwarded-proto') === 'https',
//       httpOnly: true,
//     };
//     if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//     res.cookie('jwt', token, cookieOptions);
//   } catch (error) {
//     throw next(new AppError('Invalid cookie options: ' + error.message, 500));
//   }

//   res.status(statusCode).json({
//     status: 'success',
//     token,
//     data: {
//       user,
//     },
//   });
// };
