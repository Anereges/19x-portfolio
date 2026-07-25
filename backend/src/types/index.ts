import { User, Project } from '@prisma/client';
import { Request } from 'express';

// User response (excluding password)
export type UserResponse = Omit<User, 'password'>;

// Request with authenticated user
export interface AuthRequest extends Request {
  user?: User;
  userId?: number;
  userRole?: string;
}

// Project with creator info
export interface ProjectWithCreator extends Project {
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Project filters
export interface ProjectFilters {
  category?: 'SOFTWARE' | 'CYBERSECURITY';
  featured?: boolean;
  published?: boolean;
  search?: string;
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// JWT Payload
export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

// Login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Register request
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Create project request
export interface CreateProjectRequest {
  title: string;
  slug: string;
  description: string;
  category: 'SOFTWARE' | 'CYBERSECURITY';
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
}

// Update project request
export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}