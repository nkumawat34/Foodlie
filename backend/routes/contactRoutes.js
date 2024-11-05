// /routes/contactRoutes.js
const express = require('express');
const { sendContactEmail } = require('../controllers/contactController');

const router = express.Router();

// Define the route for handling contact form submissions
router.post('/contact', sendContactEmail);

module.exports = router;
