const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST route for submitting contact form data
router.post('/contact', contactController.submitContactForm);

module.exports = router;