// authRoutes.js

const express = require('express');
const router = express.Router();

// Importing the exported functions from authController.js
const authController = require('../controllers/UserController');

// Using the imported functions in your routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
