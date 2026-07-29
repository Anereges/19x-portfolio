'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SocialMediaBar } from '@/components/layout/SocialMediaBar';
import { projectsApi } from '@/lib/api/projects';
import { Project } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaCode, FaShieldAlt, FaTag } from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await projectsApi.getProjectBySlug(slug);
        if (response.success && response.data) {
          setProject(response.data);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Error loading project');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  // Handle back button for mobile
  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/projects');
    }
  };

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto" />
            <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading project...
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-6xl mb-4">😕</p>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {error || 'Project not found'}
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              The project you are looking for does not exist or has been removed.
            </p>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition touch-manipulation"
            >
              <FaArrowLeft /> Go Back
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <SocialMediaBar />
      
      <section className={`pt-24 pb-20 min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button - Mobile Friendly */}
          <button
            onClick={handleGoBack}
            className={`inline-flex items-center gap-2 mb-6 transition px-4 py-2.5 rounded-lg touch-manipulation ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FaArrowLeft /> Back
          </button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {/* Image */}
            {project.imageUrl && (
              <div className="mb-6 md:mb-8 rounded-xl overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
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

              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.title}
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h2 className={`text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <FaCode className="text-blue-500" /> Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className={`px-3 py-1.5 rounded-full text-xs sm:text-sm ${
                      isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links - Mobile Friendly with larger tap targets */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg transition touch-manipulation ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  <FaGithub size={18} /> View on GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition touch-manipulation"
                >
                  <FaExternalLinkAlt size={16} /> Live Demo
                </a>
              )}
            </div>

            {/* Created Date */}
            <div className={`mt-6 text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <FaCalendar className="inline mr-1.5" />
              Created: {new Date(project.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </motion.article>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}