const express = require('express');
const authController = require('./../controller/authController');
const { protect } = require('./../middleware/auth');

const router = express.Router();

router.post('/auth/register', authController.createUser);
router.post('/auth/login', authController.login);

router.route('/logout').post(protect, authController.logoutUser);

module.exports = router;
