import { Request, Response } from 'express';
import projectService from '../services/project.service';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

export class ProjectController {
  // Get all projects (public)
  getProjects = asyncHandler(async (req: Request, res: Response) => {
    const { category, featured, published, search } = req.query;

    const projects = await projectService.getProjects({
      category: category as any,
      featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
      published: published === 'true' ? true : published === 'false' ? false : undefined,
      search: search as string
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  });

  // Get project by slug (public)
  getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const project = await projectService.getProjectBySlug(slug as string);

    res.status(200).json({
      success: true,
      data: project
    });
  });

  // Get project by ID (admin only)
  getProjectById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id as string);
    const project = await projectService.getProjectById(id);

    res.status(200).json({
      success: true,
      data: project
    });
  });

  // Create project (admin only)
  createProject = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { title, slug, description, category, technologies, githubUrl, demoUrl, imageUrl, featured, published } = req.body;

    const project = await projectService.createProject({
      title,
      slug,
      description,
      category,
      technologies,
      githubUrl,
      demoUrl,
      imageUrl,
      featured,
      published,
      createdById: req.userId!
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  });

  // Update project (admin only)
  updateProject = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id as string);
    const { title, slug, description, category, technologies, githubUrl, demoUrl, imageUrl, featured, published } = req.body;

    const project = await projectService.updateProject(id, {
      title,
      slug,
      description,
      category,
      technologies,
      githubUrl,
      demoUrl,
      imageUrl,
      featured,
      published
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  });

  // Delete project (admin only)
  deleteProject = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = parseInt(req.params.id as string);
    const result = await projectService.deleteProject(id);

    res.status(200).json({
      success: true,
      message: result.message
    });
  });
}

export default new ProjectController();