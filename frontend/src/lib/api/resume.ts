import { apiClient } from './client';
import { ApiResponse, Resume, Experience, Education, Certification, Language, Interest } from '@/types';

// Define error response type
interface ErrorResponse {
  response?: {
    status?: number;
    data?: unknown;
  };
}

export const resumeApi = {
  // Public
  getPublicResume: async (): Promise<ApiResponse<Resume>> => {
    try {
      const response = await apiClient.get<ApiResponse<Resume>>('/resume/public');
      return response.data;
    } catch (error: unknown) {
      // Handle 404 gracefully - resume not found or not public
      const err = error as ErrorResponse;
      if (err.response?.status === 404) {
        return {
          success: false,
          error: 'Resume not found or not public'
        } as ApiResponse<Resume>;
      }
      throw error;
    }
  },

  // Admin
  getAdminResume: async (): Promise<ApiResponse<Resume>> => {
    try {
      const response = await apiClient.get<ApiResponse<Resume>>('/resume/admin');
      return response.data;
    } catch (error: unknown) {
      // Handle 404 gracefully - resume not found
      const err = error as ErrorResponse;
      if (err.response?.status === 404) {
        return {
          success: false,
          error: 'Resume not found'
        } as ApiResponse<Resume>;
      }
      throw error;
    }
  },

  upsertResume: async (data: Partial<Resume>): Promise<ApiResponse<Resume>> => {
    const response = await apiClient.put<ApiResponse<Resume>>('/resume/admin', data);
    return response.data;
  },

  // Experience
  addExperience: async (data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    const response = await apiClient.post<ApiResponse<Experience>>('/resume/admin/experience', data);
    return response.data;
  },

  updateExperience: async (id: number, data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    const response = await apiClient.put<ApiResponse<Experience>>(`/resume/admin/experience/${id}`, data);
    return response.data;
  },

  deleteExperience: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/resume/admin/experience/${id}`);
    return response.data;
  },

  // Education
  addEducation: async (data: Partial<Education>): Promise<ApiResponse<Education>> => {
    const response = await apiClient.post<ApiResponse<Education>>('/resume/admin/education', data);
    return response.data;
  },

  updateEducation: async (id: number, data: Partial<Education>): Promise<ApiResponse<Education>> => {
    const response = await apiClient.put<ApiResponse<Education>>(`/resume/admin/education/${id}`, data);
    return response.data;
  },

  deleteEducation: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/resume/admin/education/${id}`);
    return response.data;
  },

  // Certification
  addCertification: async (data: Partial<Certification>): Promise<ApiResponse<Certification>> => {
    const response = await apiClient.post<ApiResponse<Certification>>('/resume/admin/certification', data);
    return response.data;
  },

  deleteCertification: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/resume/admin/certification/${id}`);
    return response.data;
  },

  // Language
  addLanguage: async (data: Partial<Language>): Promise<ApiResponse<Language>> => {
    const response = await apiClient.post<ApiResponse<Language>>('/resume/admin/language', data);
    return response.data;
  },

  deleteLanguage: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/resume/admin/language/${id}`);
    return response.data;
  },

  // Interest
  addInterest: async (data: Partial<Interest>): Promise<ApiResponse<Interest>> => {
    const response = await apiClient.post<ApiResponse<Interest>>('/resume/admin/interest', data);
    return response.data;
  },

  deleteInterest: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/resume/admin/interest/${id}`);
    return response.data;
  },
};