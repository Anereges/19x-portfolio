import { Response } from 'express';
import prisma from '../prisma/client';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

export class AdminController {
  // Get dashboard stats
  getStats = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const [projects, blogPosts, users] = await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.user.count(),
    ]);

    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    const recentPosts = await prisma.blogPost.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalProjects: projects,
        totalBlogPosts: blogPosts,
        totalUsers: users,
        totalViews: 0,
        recentProjects,
        recentPosts,
      }
    });
  });

  // Get all projects (admin)
  getProjects = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: projects
    });
  });

  // Get all blog posts (admin)
  getBlogPosts = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: posts
    });
  });

  // Get all users (admin)
  getUsers = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      }
    });

    res.status(200).json({
      success: true,
      data: users
    });
  });
}

export default new AdminController();