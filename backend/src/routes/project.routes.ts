import { Router } from 'express';
import projectController from '../controllers/project.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateCreateProject, validateUpdateProject, handleValidationErrors } from '../utils/validation';

const router = Router();

// Public routes
router.get('/', projectController.getProjects);
router.get('/:slug', projectController.getProjectBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validateCreateProject,  // Use validateCreateProject for CREATE
  handleValidationErrors,
  projectController.createProject
);

router.get('/id/:id', authenticate, authorize('ADMIN'), projectController.getProjectById);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validateUpdateProject,  // Use validateUpdateProject for UPDATE
  handleValidationErrors,
  projectController.updateProject
);

router.delete('/:id', authenticate, authorize('ADMIN'), projectController.deleteProject);

export default router;