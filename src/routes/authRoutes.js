const express = require('express');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/auth/register', authController.createUser);

module.exports = router;
