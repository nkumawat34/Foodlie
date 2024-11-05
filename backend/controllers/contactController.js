// /controllers/contactController.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Controller for handling contact form submissions
exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;
    console.log(process.env.EMAIL_USER)
  // Check if all fields are provided
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Add this line to ignore self-signed certificates
      },
  });

  // Email options
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submission successfully!' });
  } catch (error) {
    console.error('Error in Form submission', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
};
