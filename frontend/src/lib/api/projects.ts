import { apiClient } from './client';
import { Project, ApiResponse } from '@/types';

export const projectsApi = {
  getProjects: async (params?: {
    category?: 'SOFTWARE' | 'CYBERSECURITY';
    featured?: boolean;
    search?: string;
    published?: boolean;
  }) => {
    const response = await apiClient.get<ApiResponse<Project[]>>('/projects', { params });
    return response.data;
  },

  getProjectBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<Project>>(`/projects/${slug}`);
    return response.data;
  },

  // Admin methods (these use the same /projects endpoints with authentication)
  createProject: async (data: Partial<Project>) => {
    const response = await apiClient.post<ApiResponse<Project>>('/projects', data);
    return response.data;
  },

  updateProject: async (id: number, data: Partial<Project>) => {
    const response = await apiClient.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data;
  },

  deleteProject: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/projects/${id}`);
    return response.data;
  },
};