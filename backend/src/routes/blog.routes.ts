import { Router } from 'express';
import blogController from '../controllers/blog.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', blogController.getPosts);
router.get('/:slug', blogController.getPostBySlug);

// Admin routes (for creating, updating, deleting)
router.post('/', authenticate, authorize('ADMIN'), blogController.createPost);
router.put('/:id', authenticate, authorize('ADMIN'), blogController.updatePost);
router.delete('/:id', authenticate, authorize('ADMIN'), blogController.deletePost);

export default router;