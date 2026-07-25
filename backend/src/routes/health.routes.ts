import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint
router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Detailed health check
router.get('/details', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      platform: process.platform
    }
  });
});

export default router;