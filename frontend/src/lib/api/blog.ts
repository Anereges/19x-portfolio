import { apiClient } from './client';
import { BlogPost, ApiResponse } from '@/types';

export const blogApi = {
  // Get all published posts
  getPosts: async (params?: {
    category?: string;
    featured?: boolean;
    search?: string;
  }) => {
    const response = await apiClient.get<ApiResponse<BlogPost[]>>('/blog', { params });
    return response.data;
  },

  // Get single post by slug
  getPostBySlug: async (slug: string) => {
    const response = await apiClient.get<ApiResponse<BlogPost>>(`/blog/${slug}`);
    return response.data;
  },

  // Create post (admin only)
  createPost: async (data: Partial<BlogPost>) => {
    const response = await apiClient.post<ApiResponse<BlogPost>>('/blog', data);
    return response.data;
  },

  // Update post (admin only)
  updatePost: async (id: number, data: Partial<BlogPost>) => {
    const response = await apiClient.put<ApiResponse<BlogPost>>(`/blog/${id}`, data);
    return response.data;
  },

  // Delete post (admin only)
  deletePost: async (id: number) => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/blog/${id}`);
    return response.data;
  },
};