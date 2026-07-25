import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Get all users (admin only)
router.get('/', authorize('ADMIN'), userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// Delete user (admin only)
router.delete('/:id', authorize('ADMIN'), userController.deleteUser);

export default router;