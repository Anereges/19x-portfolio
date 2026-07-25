import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

export class AuthController {
  // Register new user
  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password, firstName, lastName } = req.body;
    
    const result = await authService.register({
      email,
      username,
      password,
      firstName,
      lastName
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  });

  // Login user
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const result = await authService.login({
      email,
      password
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  });

  // Refresh token
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }

    const result = await authService.refreshToken(refreshToken);

    return res.status(200).json({
      success: true,
      data: result
    });
  });

  // Get current user
  getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await authService.getUserById(req.userId!);

    res.status(200).json({
      success: true,
      data: { user }
    });
  });

  // Logout (client-side will remove tokens)
  logout = asyncHandler(async (_req: AuthRequest, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  });
}

export default new AuthController();