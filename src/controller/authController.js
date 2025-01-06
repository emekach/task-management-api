const User = require('./../models/userModel');
const jwt = require('./../middleware/jwt');

exports.createUser = async (req, res) => {
  const { email, username, password, passwordConfirm } = req.body;

  //   console.log(eq.body);
  const newUser = await User.create({
    email,
    username,
    password,
    passwordConfirm,
  });

  jwt.createSendToken(newUser, 201, req, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'field cannot be empty',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(400).json({
      message: 'incorrect details',
    });
  }

  jwt.createSendToken(user, 200, req, res);
};
