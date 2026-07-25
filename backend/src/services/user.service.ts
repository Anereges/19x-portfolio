import prisma from '../prisma/client';
import { NotFoundError } from '../utils/errorHandler';
import logger from '../utils/logger';

export class UserService {
  // Get all users (admin only)
  async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return users;
    } catch (error) {
      logger.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  }

  // Update user
  async updateUser(userId: number, data: { firstName?: string; lastName?: string; email?: string }) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      logger.info(`User updated: ${user.email}`);
      return user;
    } catch (error) {
      logger.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user (admin only)
  async deleteUser(userId: number) {
    try {
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new NotFoundError('User');
      }

      // Delete user
      await prisma.user.delete({
        where: { id: userId }
      });

      logger.info(`User deleted: ${user.email}`);
      return { message: 'User deleted successfully' };
    } catch (error) {
      logger.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default new UserService();