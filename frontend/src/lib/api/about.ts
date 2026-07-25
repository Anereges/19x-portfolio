import { apiClient } from './client';
import { ApiResponse, About } from '@/types';

export const aboutApi = {
  // Public
  getPublicAbout: async () => {
    const response = await apiClient.get<ApiResponse<About>>('/about/public');
    return response.data;
  },

  // Admin
  getAdminAbout: async () => {
    const response = await apiClient.get<ApiResponse<About>>('/about/admin');
    return response.data;
  },

  upsertAbout: async (data: Partial<About>) => {
    const response = await apiClient.put<ApiResponse<About>>('/about/admin', data);
    return response.data;
  },
};