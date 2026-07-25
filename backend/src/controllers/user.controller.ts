import { Response } from 'express';
import userService from '../services/user.service';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

export class UserController {
  // Get all users (admin only)
  getAllUsers = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  });

  // Get user by ID
  getUserById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = parseInt(req.params.id as string);
    const user = await userService.getUserById(userId);

    res.status(200).json({
      success: true,
      data: user
    });
  });

  // Update user
  updateUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = parseInt(req.params.id as string);
    const { firstName, lastName, email } = req.body;

    const user = await userService.updateUser(userId, {
      firstName,
      lastName,
      email
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  });

  // Delete user (admin only)
  deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = parseInt(req.params.id as string);
    const result = await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: result.message
    });
  });
}

export default new UserController();