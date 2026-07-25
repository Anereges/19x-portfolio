'use client';

import { ProjectsList } from '@/components/projects/ProjectsList';
import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export const ProjectsSection = () => {
  const { mode } = usePortfolioStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(false);

  return (
    <section className={`py-20 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-5xl block mb-4">
            {mode === 'software' ? '🚀' : '🛡️'}
          </span>
          <h2 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {mode === 'software' ? 'Featured Projects' : 'Security Projects'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {mode === 'software'
              ? 'Exploring innovative solutions through code and creativity'
              : 'Building robust security tools to protect against modern threats'}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-md`}>
            <FaSearch className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`bg-transparent outline-none ${
                isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <button
            onClick={() => setFilterFeatured(!filterFeatured)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              filterFeatured
                ? 'bg-blue-500 text-white'
                : isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            } shadow-md`}
          >
            <FaFilter /> {filterFeatured ? 'All Projects' : 'Featured Only'}
          </button>
        </div>

        <ProjectsList searchTerm={searchTerm} filterFeatured={filterFeatured} />
      </div>
    </section>
  );
};