import prisma from '../prisma/client';
import { NotFoundError } from '../utils/errorHandler';
import logger from '../utils/logger';

export interface CreateProjectData {
  title: string;
  slug: string;
  description: string;
  category: 'SOFTWARE' | 'CYBERSECURITY';
  technologies: string[] | string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
  createdById: number;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

export class ProjectService {
  // Helper function to safely parse technologies
  private safeParseTechnologies(techData: any): string[] {
    try {
      if (!techData) return [];
      
      // If it's already an array, return it
      if (Array.isArray(techData)) return techData;
      
      // If it's a string, try to parse it as JSON
      if (typeof techData === 'string') {
        // Check if it looks like a JSON array
        if (techData.startsWith('[') && techData.endsWith(']')) {
          const parsed = JSON.parse(techData);
          return Array.isArray(parsed) ? parsed : [];
        }
        // If it's a comma-separated string
        return techData.split(',').map(t => t.trim()).filter(Boolean);
      }
      
      return [];
    } catch (error) {
      // If parsing fails, return empty array or try to extract from string
      logger.warn('Failed to parse technologies:', { techData, error });
      if (typeof techData === 'string') {
        // Try to extract technologies from invalid JSON by removing problematic characters
        try {
          // Remove any invalid JSON characters and try to parse again
          const cleaned = techData.replace(/[^a-zA-Z0-9, ]/g, '').trim();
          if (cleaned) {
            return cleaned.split(',').map(t => t.trim()).filter(Boolean);
          }
        } catch (e) {
          // If all fails, return empty array
        }
      }
      return [];
    }
  }

  // Get all projects with filters
  async getProjects(filters: {
    category?: 'SOFTWARE' | 'CYBERSECURITY';
    featured?: boolean;
    published?: boolean;
    search?: string;
  }) {
    try {
      const where: any = {};

      if (filters.category) {
        where.category = filters.category;
      }

      if (filters.featured !== undefined) {
        where.featured = filters.featured;
      }

      if (filters.published !== undefined) {
        where.published = filters.published;
      }

      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search } },
          { description: { contains: filters.search } }
        ];
      }

      const projects = await prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      // Parse JSON technologies with safe parsing
      return projects.map(project => ({
        ...project,
        technologies: this.safeParseTechnologies(project.technologies)
      }));
    } catch (error) {
      logger.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Get project by slug
  async getProjectBySlug(slug: string) {
    try {
      const project = await prisma.project.findUnique({
        where: { slug },
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      if (!project) {
        throw new NotFoundError('Project');
      }

      return {
        ...project,
        technologies: this.safeParseTechnologies(project.technologies)
      };
    } catch (error) {
      logger.error('Error fetching project:', error);
      throw error;
    }
  }

  // Get project by ID
  async getProjectById(id: number) {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      if (!project) {
        throw new NotFoundError('Project');
      }

      return {
        ...project,
        technologies: this.safeParseTechnologies(project.technologies)
      };
    } catch (error) {
      logger.error('Error fetching project:', error);
      throw error;
    }
  }

  // Create project
  async createProject(data: CreateProjectData) {
    try {
      // Check if slug exists
      const existingProject = await prisma.project.findUnique({
        where: { slug: data.slug }
      });

      if (existingProject) {
        throw new Error('Project with this slug already exists');
      }

      // Handle technologies - convert to JSON string
      let technologiesArray: string[] = [];
      if (typeof data.technologies === 'string') {
        technologiesArray = data.technologies.split(',').map(t => t.trim()).filter(Boolean);
      } else if (Array.isArray(data.technologies)) {
        technologiesArray = data.technologies;
      }

      const project = await prisma.project.create({
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          category: data.category,
          technologies: JSON.stringify(technologiesArray),
          githubUrl: data.githubUrl,
          demoUrl: data.demoUrl,
          imageUrl: data.imageUrl,
          featured: data.featured || false,
          published: data.published !== undefined ? data.published : true,
          createdById: data.createdById
        },
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      logger.info(`Project created: ${project.title}`);

      return {
        ...project,
        technologies: technologiesArray
      };
    } catch (error) {
      logger.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project
  async updateProject(id: number, data: UpdateProjectData) {
    try {
      // Check if project exists
      const existingProject = await prisma.project.findUnique({
        where: { id }
      });

      if (!existingProject) {
        throw new NotFoundError('Project');
      }

      // Check if slug is being changed and is unique
      if (data.slug && data.slug !== existingProject.slug) {
        const slugExists = await prisma.project.findUnique({
          where: { slug: data.slug }
        });
        if (slugExists) {
          throw new Error('Project with this slug already exists');
        }
      }

      // Handle technologies - convert to JSON string
      let technologiesArray: string[] | undefined = undefined;
      if (data.technologies !== undefined) {
        if (typeof data.technologies === 'string') {
          technologiesArray = data.technologies.split(',').map(t => t.trim()).filter(Boolean);
        } else if (Array.isArray(data.technologies)) {
          technologiesArray = data.technologies;
        }
      }

      const project = await prisma.project.update({
        where: { id },
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          category: data.category,
          technologies: technologiesArray !== undefined ? JSON.stringify(technologiesArray) : undefined,
          githubUrl: data.githubUrl,
          demoUrl: data.demoUrl,
          imageUrl: data.imageUrl,
          featured: data.featured,
          published: data.published
        },
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      logger.info(`Project updated: ${project.title}`);

      return {
        ...project,
        technologies: technologiesArray !== undefined ? technologiesArray : this.safeParseTechnologies(project.technologies)
      };
    } catch (error) {
      logger.error('Error updating project:', error);
      throw error;
    }
  }

  // Delete project
  async deleteProject(id: number) {
    try {
      // Check if project exists
      const existingProject = await prisma.project.findUnique({
        where: { id }
      });

      if (!existingProject) {
        throw new NotFoundError('Project');
      }

      await prisma.project.delete({
        where: { id }
      });

      logger.info(`Project deleted: ${existingProject.title}`);
      return { message: 'Project deleted successfully' };
    } catch (error) {
      logger.error('Error deleting project:', error);
      throw error;
    }
  }

  // Get projects by category
  async getProjectsByCategory(category: 'SOFTWARE' | 'CYBERSECURITY') {
    return this.getProjects({ category, published: true });
  }
}

export default new ProjectService();