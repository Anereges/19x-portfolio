import { apiClient } from './client';
import { ApiResponse, Project, BlogPost, User, AdminStats } from '@/types';

export const adminApi = {
  // Dashboard Stats
  getStats: async () => {
    const response = await apiClient.get<ApiResponse<AdminStats>>('/admin/stats');
    return response.data;
  },

  // Projects - GET from admin, CRUD from projects
  getProjects: async () => {
    const response = await apiClient.get<ApiResponse<Project[]>>('/admin/projects');
    return response.data;
  },

  // Projects CRUD - Use /projects endpoint
  createProject: async (data: Partial<Project>) => {
    // Ensure technologies is an array
    const payload = {
      ...data,
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
    };
    const response = await apiClient.post<ApiResponse<Project>>('/projects', payload);
    return response.data;
  },

  updateProject: async (id: number, data: Partial<Project>) => {
    const payload = {
      ...data,
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
    };
    const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, payload);
    return response.data;
  },

  deleteProject: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/projects/${id}`);
    return response.data;
  },

  // Blog Posts
  getBlogPosts: async () => {
    const response = await apiClient.get<ApiResponse<BlogPost[]>>('/blog');
    return response.data;
  },

  createBlogPost: async (data: Partial<BlogPost>) => {
    const response = await apiClient.post<ApiResponse<BlogPost>>('/blog', data);
    return response.data;
  },

  updateBlogPost: async (id: number, data: Partial<BlogPost>) => {
    const response = await apiClient.put<ApiResponse<BlogPost>>(`/blog/${id}`, data);
    return response.data;
  },

  deleteBlogPost: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/blog/${id}`);
    return response.data;
  },

  // Users
  getUsers: async () => {
    const response = await apiClient.get<ApiResponse<User[]>>('/admin/users');
    return response.data;
  },

  updateUser: async (id: number, data: Partial<User>) => {
    const response = await apiClient.put<ApiResponse<User>>(`/admin/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/admin/users/${id}`);
    return response.data;
  },
};