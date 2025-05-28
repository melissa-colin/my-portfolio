const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles');
const { authenticate } = require('../middleware/auth');

// Public routes for viewing articles
router.get('/', articlesController.getArticles);
router.get('/:id', articlesController.getArticleById);
router.get('/slug/:slug', articlesController.getArticleBySlug);

// Protected routes for article management (require authentication)
router.post('/', authenticate, articlesController.createArticle);
router.put('/:id', authenticate, articlesController.updateArticle);
router.delete('/:id', authenticate, articlesController.deleteArticle);

module.exports = router;
