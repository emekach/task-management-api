const User = require('./../models/userModel');
const jwt = require('./../middleware/jwt');

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //   console.log(eq.body);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  jwt.createSendToken(newUser, 201, req, res);
};
