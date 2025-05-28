const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');
const { authenticate } = require('../middleware/auth');

// Public route for submitting contact messages
router.post('/', contactController.submitMessage);

// Protected routes for contact message management (admin only)
router.get('/', authenticate, contactController.getAllMessages);
router.get('/:id', authenticate, contactController.getMessageById);
router.put('/:id/status', authenticate, contactController.updateMessageStatus);
router.delete('/:id', authenticate, contactController.deleteMessage);

module.exports = router;
