const express = require('express');
const router = express.Router();
const expertiseController = require('../controllers/expertise');
const { authenticate } = require('../middleware/auth');

// Public routes for viewing expertise
router.get('/', expertiseController.getAllExpertise);
router.get('/:id', expertiseController.getExpertiseById);

// Protected routes for expertise management (require authentication)
router.post('/', authenticate, expertiseController.createExpertise);
router.put('/:id', authenticate, expertiseController.updateExpertise);
router.delete('/:id', authenticate, expertiseController.deleteExpertise);
router.put('/order', authenticate, expertiseController.updateExpertiseOrder);

module.exports = router;
