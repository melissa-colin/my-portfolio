const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const { authenticate } = require('../middleware/auth');

// Public routes for viewing projects
router.get('/', projectsController.getProjects);
router.get('/:id', projectsController.getProjectById);

// Protected routes for project management (require authentication)
router.post('/', authenticate, projectsController.createProject);
router.put('/:id', authenticate, projectsController.updateProject);
router.delete('/:id', authenticate, projectsController.deleteProject);

// Protected routes for project images
router.post('/:id/images', authenticate, projectsController.uploadProjectImage);
router.delete('/:id/images/:imageId', authenticate, projectsController.deleteProjectImage);
router.put('/:id/images/order', authenticate, projectsController.updateProjectImageOrder);

module.exports = router;
