import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import jwtConfig from '../config/jwt.config';
import { UnauthorizedError, ValidationError, NotFoundError } from '../utils/errorHandler';
import logger from '../utils/logger';

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export class AuthService {
  // Register a new user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Check if user exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: data.email },
            { username: data.username }
          ]
        }
      });

      if (existingUser) {
        const field = existingUser.email === data.email ? 'Email' : 'Username';
        throw new ValidationError(`${field} already exists`, {});
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          role: 'ADMIN'
        }
      });

      // Generate tokens
      const tokens = this.generateTokens(user);

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      logger.info(`User registered: ${user.email}`);

      return {
        user: userWithoutPassword,
        tokens
      };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (!user) {
        throw new UnauthorizedError('Invalid email or password');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid email or password');
      }

      // Generate tokens
      const tokens = this.generateTokens(user);

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      logger.info(`User logged in: ${user.email}`);

      return {
        user: userWithoutPassword,
        tokens
      };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  // Refresh access token
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret) as { userId: number; email: string; role: string };
      
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions
      );

      return { accessToken };
    } catch (error) {
      logger.error('Refresh token error:', error);
      throw new UnauthorizedError('Invalid refresh token');
    }
  }

  // Get user by ID
  async getUserById(userId: number): Promise<Omit<User, 'password'>> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Generate tokens
  private generateTokens(user: User): { accessToken: string; refreshToken: string } {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    // Access token (short-lived)
    const accessToken = jwt.sign(
      payload, 
      jwtConfig.secret, 
      { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions
    );

    // Refresh token (long-lived)
    const refreshToken = jwt.sign(
      payload, 
      jwtConfig.refreshSecret, 
      { expiresIn: jwtConfig.refreshExpiresIn } as jwt.SignOptions
    );

    return { accessToken, refreshToken };
  }
}

export default new AuthService();