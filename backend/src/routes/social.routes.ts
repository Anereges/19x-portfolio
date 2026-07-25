import { Router } from 'express';
import socialController from '../controllers/social.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public route
router.get('/', socialController.getSocialLinks);

// Admin routes
router.post('/', authenticate, authorize('ADMIN'), socialController.createSocialLink);
router.put('/:id', authenticate, authorize('ADMIN'), socialController.updateSocialLink);
router.delete('/:id', authenticate, authorize('ADMIN'), socialController.deleteSocialLink);

export default router;