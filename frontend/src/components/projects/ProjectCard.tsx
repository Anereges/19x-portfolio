'use client';

import { Project } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`rounded-xl shadow-lg overflow-hidden transition-all cursor-pointer ${
        isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-2xl'
      }`}
    >
      {/* Project Image */}
      <div className={`h-48 flex items-center justify-center overflow-hidden relative ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        {project.imageUrl && !imageError ? (
          <>
            {/* Loading Spinner */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <span className="text-6xl">
            {project.category === 'SOFTWARE' ? '💻' : '🔒'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-3 py-1 rounded-full ${
            project.category === 'SOFTWARE'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }`}>
            {project.category === 'SOFTWARE' ? '💻 Software' : '🔒 Cybersecurity'}
          </span>
          {project.featured && (
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              ⭐ Featured
            </span>
          )}
        </div>

        <Link href={`/projects/${project.slug}`} className="block">
          <h3 className={`text-xl font-bold mb-2 line-clamp-1 transition-colors hover:text-blue-500 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {project.title}
          </h3>
        </Link>
        
        <p className={`text-sm mb-4 line-clamp-3 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies && project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className={`text-xs px-2 py-1 rounded ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              {tech}
            </span>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className={`text-xs px-2 py-1 rounded ${
              isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className={`text-sm font-medium transition flex items-center gap-1 ${
              project.category === 'SOFTWARE'
                ? 'text-blue-500 hover:text-blue-600'
                : 'text-green-500 hover:text-green-600'
            }`}
          >
            View Details →
          </Link>
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="View GitHub repository"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
                aria-label="View live demo"
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};