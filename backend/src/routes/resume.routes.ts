import { Router } from 'express';
import resumeController from '../controllers/resume.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/public', resumeController.getPublicResume);

// Admin routes
router.get('/admin', authenticate, authorize('ADMIN'), resumeController.getAdminResume);
router.put('/admin', authenticate, authorize('ADMIN'), resumeController.upsertResume);

// Experience routes
router.post('/admin/experience', authenticate, authorize('ADMIN'), resumeController.addExperience);
router.put('/admin/experience/:id', authenticate, authorize('ADMIN'), resumeController.updateExperience);
router.delete('/admin/experience/:id', authenticate, authorize('ADMIN'), resumeController.deleteExperience);

// Education routes
router.post('/admin/education', authenticate, authorize('ADMIN'), resumeController.addEducation);
router.put('/admin/education/:id', authenticate, authorize('ADMIN'), resumeController.updateEducation);
router.delete('/admin/education/:id', authenticate, authorize('ADMIN'), resumeController.deleteEducation);

// Certification routes
router.post('/admin/certification', authenticate, authorize('ADMIN'), resumeController.addCertification);
router.delete('/admin/certification/:id', authenticate, authorize('ADMIN'), resumeController.deleteCertification);

// Language routes
router.post('/admin/language', authenticate, authorize('ADMIN'), resumeController.addLanguage);
router.delete('/admin/language/:id', authenticate, authorize('ADMIN'), resumeController.deleteLanguage);

// Interest routes
router.post('/admin/interest', authenticate, authorize('ADMIN'), resumeController.addInterest);
router.delete('/admin/interest/:id', authenticate, authorize('ADMIN'), resumeController.deleteInterest);

export default router;