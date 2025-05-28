const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const { authenticate } = require('../middleware/auth');

// Public route to get profile
router.get('/', profileController.getProfile);

// Protected routes (require authentication)
router.put('/', authenticate, profileController.updateProfile);
router.post('/photo', authenticate, profileController.updateProfilePhoto);
router.post('/cv', authenticate, profileController.uploadCV);

module.exports = router;
