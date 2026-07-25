import { Router } from 'express';
import aboutController from '../controllers/about.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public route
router.get('/public', aboutController.getPublicAbout);

// Admin routes
router.get('/admin', authenticate, authorize('ADMIN'), aboutController.getAdminAbout);
router.put('/admin', authenticate, authorize('ADMIN'), aboutController.upsertAbout);

export default router;