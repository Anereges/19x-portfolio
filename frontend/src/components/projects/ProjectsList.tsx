'use client';

import { useEffect, useState } from 'react';
import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { projectsApi } from '@/lib/api/projects';
import { Project } from '@/types';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaStar, 
  FaCode, 
  FaShieldAlt, 
  FaArrowRight,
  FaHeart
} from 'react-icons/fa';
import Link from 'next/link';

interface ProjectsListProps {
  searchTerm?: string;
  filterFeatured?: boolean;
  category?: string;
  limit?: number;
}

// Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

export const ProjectsList = ({ 
  searchTerm = '', 
  filterFeatured = false,
  category = 'all',
  limit
}: ProjectsListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());
  const { mode } = usePortfolioStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await projectsApi.getProjects({
          category: mode === 'software' ? 'SOFTWARE' : 'CYBERSECURITY',
          published: true,
        });
        
        if (response.success && response.data) {
          setProjects(response.data);
        } else {
          setError(response.message || 'Failed to load projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Unable to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [mode]);

  // Filter projects
  const filteredProjects = projects
    .filter((project) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        project.title?.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        project.technologies?.some(tech => tech.toLowerCase().includes(searchLower));
      
      const matchesFeatured = filterFeatured ? project.featured : true;
      
      let matchesCategory = true;
      if (category !== 'all') {
        const categoryMap: Record<string, string> = {
          'web': 'SOFTWARE',
          'mobile': 'SOFTWARE',
          'ai': 'SOFTWARE',
          'security': 'CYBERSECURITY',
        };
        const mappedCategory = categoryMap[category] || '';
        matchesCategory = project.category === mappedCategory;
      }
      
      return matchesSearch && matchesFeatured && matchesCategory;
    })
    .slice(0, limit);

  const toggleLike = (projectId: number) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <div className={`w-20 h-20 rounded-full border-4 border-t-transparent relative ${
            mode === 'software' 
              ? 'border-blue-500/30' 
              : 'border-emerald-500/30'
          }`}>
            <div className={`absolute inset-1 rounded-full border-4 border-t-transparent ${
              mode === 'software' 
                ? 'border-purple-500/30 animate-spin' 
                : 'border-teal-500/30 animate-spin'
            }`} />
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`mt-6 text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          Loading amazing projects...
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`w-48 h-1 mx-auto mt-3 rounded-full ${
            mode === 'software' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
          }`}
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="text-center py-20"
      >
        <div className="text-7xl mb-6 animate-bounce">😅</div>
        <h3 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Oops! Something went wrong
        </h3>
        <p className={`mb-8 text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {error}
        </p>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className={`px-8 py-4 rounded-xl font-semibold text-white shadow-lg relative overflow-hidden group ${
            mode === 'software' 
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500'
          }`}
        >
          <span className="relative z-10">Try Again</span>
          <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </motion.button>
      </motion.div>
    );
  }

  // Empty state
  if (filteredProjects.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="text-center py-20"
      >
        <div className="text-8xl mb-6">
          {searchTerm ? '🔍' : mode === 'software' ? '💻' : '🔒'}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block ml-2"
          >
            {searchTerm ? '👀' : '🚀'}
          </motion.div>
        </div>
        <h3 className={`text-3xl font-bold mb-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {searchTerm ? 'No matching projects found' : `No ${mode === 'software' ? 'software' : 'security'} projects yet`}
        </h3>
        <p className={`text-lg max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {searchTerm 
            ? 'Try adjusting your search terms or filters' 
            : `Check back later for exciting ${mode === 'software' ? 'software engineering' : 'cybersecurity'} projects.`}
        </p>
        {searchTerm && (
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className={`mt-6 px-8 py-3 rounded-xl text-sm font-semibold text-white shadow-lg ${
              mode === 'software' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
            }`}
          >
            Clear Filters
          </motion.button>
        )}
      </motion.div>
    );
  }

  // Main render
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${searchTerm}-${filterFeatured}-${category}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredProjects.map((project) => {
          const isLiked = likedProjects.has(project.id);
          const gradientFrom = project.category === 'SOFTWARE' ? 'from-blue-500' : 'from-emerald-500';
          const gradientTo = project.category === 'SOFTWARE' ? 'to-purple-500' : 'to-teal-500';
          
          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className={`group rounded-2xl overflow-hidden transition-all duration-500 ${
                isDark 
                  ? 'bg-gray-800/90 hover:bg-gray-800' 
                  : 'bg-white/90 hover:bg-white'
              } shadow-xl hover:shadow-2xl border ${
                isDark ? 'border-gray-700/50 hover:border-gray-600' : 'border-gray-200/50 hover:border-gray-300'
              } backdrop-blur-sm relative cursor-pointer`}
            >
              {/* Card content with Link - only on title and View Details */}
              <div className="block">
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`} />
                
                {/* Project Image/Icon with Gradient Background */}
                <div className={`h-52 flex items-center justify-center relative overflow-hidden ${
                  project.category === 'SOFTWARE'
                    ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30'
                    : 'bg-gradient-to-br from-emerald-500/30 to-teal-500/30'
                } group-hover:scale-105 transition-transform duration-700`}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5OTk5OTkiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzR2LTRoNHY0aC00em0wIDB2LTRoLTR2NGg0eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat opacity-20" />
                  </div>
                  
                  {/* Floating Orbs */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute w-32 h-32 rounded-full blur-3xl ${
                      project.category === 'SOFTWARE' 
                        ? 'bg-blue-500/20' 
                        : 'bg-emerald-500/20'
                    }`}
                  />
                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      x: [0, -10, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className={`absolute w-24 h-24 rounded-full blur-3xl ${
                      project.category === 'SOFTWARE' 
                        ? 'bg-purple-500/20' 
                        : 'bg-teal-500/20'
                    }`}
                  />
                  
                  {/* Main Icon */}
                  <motion.span 
                    className="text-8xl relative z-10"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {project.category === 'SOFTWARE' ? '💻' : '🔒'}
                  </motion.span>

                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div 
                      initial={{ x: 50, opacity: 0, scale: 0.5 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg shadow-yellow-500/30"
                    >
                      <FaStar className="text-white animate-pulse" />
                      Featured
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Tags */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <motion.span 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                        project.category === 'SOFTWARE'
                          ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/40 dark:to-purple-900/40 dark:text-blue-300'
                          : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/40 dark:to-teal-900/40 dark:text-emerald-300'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {project.category === 'SOFTWARE' ? (
                          <FaCode size={10} />
                        ) : (
                          <FaShieldAlt size={10} />
                        )}
                        {project.category === 'SOFTWARE' ? 'Software' : 'Security'}
                      </span>
                    </motion.span>
                    
                    {project.featured && (
                      <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-300 flex items-center gap-1.5">
                        <FaStar size={10} />
                        Top Pick
                      </span>
                    )}
                  </div>

                  {/* Title - with Link */}
                  <Link href={`/projects/${project.slug}`} className="block cursor-pointer">
                    <motion.h3 
                      whileHover={{ x: 5 }}
                      className={`text-xl font-bold mb-2 line-clamp-1 transition-colors ${
                        isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                      }`}
                    >
                      {project.title}
                    </motion.h3>
                  </Link>
                  
                  <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies?.slice(0, 4).map((tech, idx) => (
                      <motion.span 
                        key={idx} 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-700/50 text-gray-300 group-hover:bg-gray-700' 
                            : 'bg-gray-100/50 text-gray-600 group-hover:bg-gray-100'
                        } border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies && project.technologies.length > 4 && (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                          isDark ? 'bg-gray-700/30 text-gray-400' : 'bg-gray-100/50 text-gray-500'
                        }`}
                      >
                        +{project.technologies.length - 4}
                      </motion.span>
                    )}
                  </div>

                  {/* Links and Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
                    {/* View Details - with Link */}
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="group flex items-center gap-2 cursor-pointer"
                    >
                      <motion.span
                        whileHover={{ x: 8 }}
                        className={`text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                          project.category === 'SOFTWARE'
                            ? `text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300`
                            : `text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300`
                        }`}
                      >
                        View Details
                        <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    </Link>
                    
                    <div className="flex items-center gap-2">
                      {/* Like Button */}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleLike(project.id)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                        aria-label="Like project"
                      >
                        <FaHeart 
                          size={16} 
                          className={`transition-colors duration-300 ${
                            isLiked ? 'text-red-500 fill-red-500' : isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-400'
                          }`} 
                        />
                      </motion.button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                          aria-label="View GitHub repository"
                        >
                          <FaGithub size={18} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} />
                        </a>
                      )}
                      
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                          aria-label="View live demo"
                        >
                          <FaExternalLinkAlt size={15} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};