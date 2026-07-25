// Project Types
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: 'SOFTWARE' | 'CYBERSECURITY';
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  createdBy?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Blog Post Types
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: 'TECHNOLOGY' | 'CYBERSECURITY' | 'SOFTWARE';
  imageUrl?: string;
  author: string;
  featured: boolean;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

// Social Media Types
export interface SocialMedia {
  id: number;
  platform: 'YOUTUBE' | 'TELEGRAM' | 'INSTAGRAM' | 'TWITTER' | 'GITHUB' | 'LINKEDIN';
  name: string;
  url: string;
  icon?: string;
  followers: number;
  active: boolean;
  order: number;
}

// User Types
export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'EDITOR';
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// API Response Types - Using generic with default
export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

// Admin Stats Types
export interface AdminStats {
  totalProjects: number;
  totalBlogPosts: number;
  totalUsers: number;
  totalViews: number;
  recentProjects: Project[];
  recentPosts: BlogPost[];
}

export interface DashboardStats {
  projects: number;
  blogPosts: number;
  users: number;
  views: number;
}

// Portfolio Store Types
export interface PortfolioState {
  mode: 'software' | 'cybersecurity';
  setMode: (mode: 'software' | 'cybersecurity') => void;
  toggleMode: () => void;
}

export interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// ============ RESUME TYPES ============

export interface Resume {
  id: number;
  userId: number;
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary: string;
  profileImage?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  languages: Language[];
  interests: Interest[];
}

export interface Experience {
  id: number;
  resumeId: number;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: number;
  resumeId: number;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: number;
  resumeId: number;
  name: string;
  issuer: string;
  date?: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  logo?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  id: number;
  resumeId: number;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Interest {
  id: number;
  resumeId: number;
  name: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ============ ABOUT TYPES ============

export interface About {
  id: number;
  userId: number;
  fullName: string;
  title: string;
  bio: string;
  location?: string;
  profileImage?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  leetcodeUrl?: string;
  journey: JourneyItem[];
  skills: SkillItem[];
  achievements: AchievementItem[];
  stats: StatItem[];
  strengths: StrengthItem[];
  expertise: ExpertiseItem[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  desc: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

export interface AchievementItem {
  icon: string;
  text: string;
  color: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export interface StrengthItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

export interface ExpertiseItem {
  category: string;
  items: string[];
}