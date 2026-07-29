import { Router } from 'express';
import analyticsController from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public route - track visitor
router.post('/track', analyticsController.trackVisitor);

// Admin routes
router.get('/admin', authenticate, authorize('ADMIN'), analyticsController.getAnalytics);
router.get('/admin/sources', authenticate, authorize('ADMIN'), analyticsController.getSources);

export default router;