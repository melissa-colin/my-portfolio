const express = require('express');
const router = express.Router();
const languageController = require('../controllers/language');
const { authenticate } = require('../middleware/auth');

// Public route to get languages
router.get('/', languageController.getLanguages);
router.get('/:id', languageController.getLanguageById);

// Protected routes (require authentication)
router.post('/', authenticate, languageController.createLanguage);
router.put('/:id', authenticate, languageController.updateLanguage);
router.delete('/:id', authenticate, languageController.deleteLanguage);
router.put('/:id/set-default', authenticate, languageController.setDefaultLanguage);

module.exports = router;
