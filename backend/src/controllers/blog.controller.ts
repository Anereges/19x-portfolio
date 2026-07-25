import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

export class BlogController {
  // Get all published posts (public)
  getPosts = asyncHandler(async (req: Request, res: Response) => {
    const { category, featured, search } = req.query;
    
    const where: any = { published: true };
    if (category) where.category = category as string;
    if (featured === 'true') where.featured = true;
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { content: { contains: search as string } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        imageUrl: true,
        author: true,
        featured: true,
        views: true,
        createdAt: true,
        createdBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    res.status(200).json({ 
      success: true, 
      count: posts.length, 
      data: posts 
    });
  });

  // Get single post by slug (public)
  getPostBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ 
        success: false, 
        error: 'Slug is required' 
      });
    }

    const post = await prisma.blogPost.update({
      where: { slug: slug as string },
      data: { views: { increment: 1 } },
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ 
        success: false, 
        error: 'Post not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: post 
    });
  });

  // Create post (admin only)
  createPost = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { 
      title, slug, content, excerpt, category, 
      imageUrl, author, featured, published 
    } = req.body;

    // Validate required fields
    if (!title || !slug || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title, slug, and content are required'
      });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || '',
        category: category || 'TECHNOLOGY',
        imageUrl: imageUrl || null,
        author: author || 'Admin',
        featured: featured || false,
        published: published || false,
        createdById: req.userId!
      }
    });

    res.status(201).json({ 
      success: true, 
      message: 'Post created successfully', 
      data: post 
    });
  });

  // Update post (admin only)
  updatePost = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { 
      title, slug, content, excerpt, category, 
      imageUrl, author, featured, published 
    } = req.body;

    const postId = parseInt(id as string);
    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid post ID'
      });
    }

    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: { 
        title,
        slug,
        content,
        excerpt,
        category,
        imageUrl,
        author,
        featured,
        published
      }
    });

    res.status(200).json({ 
      success: true, 
      message: 'Post updated successfully', 
      data: post 
    });
  });

  // Delete post (admin only)
  deletePost = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    
    const postId = parseInt(id as string);
    if (isNaN(postId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid post ID'
      });
    }

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { id: postId }
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    await prisma.blogPost.delete({ 
      where: { id: postId } 
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Post deleted successfully' 
    });
  });
}

export default new BlogController();