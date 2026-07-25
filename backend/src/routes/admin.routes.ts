import { Router } from 'express';
import adminController from '../controllers/admin.controller';
import blogController from '../controllers/blog.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(authorize('ADMIN'));

// Dashboard
router.get('/stats', adminController.getStats);

// Projects
router.get('/projects', adminController.getProjects);

// Blog Posts (add these routes)
router.get('/blog', blogController.getPosts);
router.post('/blog', blogController.createPost);
router.put('/blog/:id', blogController.updatePost);
router.delete('/blog/:id', blogController.deletePost);

// Users
router.get('/users', adminController.getUsers);

export default router;