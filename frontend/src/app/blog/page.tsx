'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SocialMediaBar } from '@/components/layout/SocialMediaBar';
import { BlogList } from '@/components/blog/BlogList';
import { useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaRocket, 
  FaNewspaper, 
  FaBrain, 
  FaShieldAlt, 
  FaCode 
} from 'react-icons/fa';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const categories = [
    { value: undefined, label: '✨ All', icon: FaRocket },
    { value: 'TECHNOLOGY', label: '💻 Technology', icon: FaBrain },
    { value: 'CYBERSECURITY', label: '🔒 Cybersecurity', icon: FaShieldAlt },
    { value: 'SOFTWARE', label: '⚡ Software', icon: FaCode },
  ];

  return (
    <main>
      <Navbar />
      <SocialMediaBar />
      
      <section className={`pt-24 pb-20 min-h-screen relative overflow-hidden ${
        isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full ${
            isDark ? 'bg-blue-500/10' : 'bg-blue-200/30'
          } blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-200/30'
          } blur-3xl animate-pulse delay-1000`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <div className={`p-4 rounded-full ${
                isDark ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'
              } shadow-xl`}>
                <FaNewspaper className="text-white text-3xl" />
              </div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${
                isDark 
                  ? 'from-blue-400 via-purple-400 to-pink-400' 
                  : 'from-blue-600 via-purple-600 to-pink-600'
              } bg-clip-text text-transparent`}
            >
              Blog & Insights
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              🚀 Exploring the frontiers of technology, cybersecurity, and innovation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6"
            >
              <blockquote className={`border-l-4 ${
                isDark ? 'border-blue-400 bg-gray-800/50' : 'border-blue-500 bg-white/50'
              } p-4 rounded-r-lg max-w-2xl mx-auto backdrop-blur-sm`}>
                <p className={`italic ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  &ldquo;The best way to predict the future is to build it.&rdquo;
                </p>
                <footer className={`text-sm mt-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  — Peter Drucker
                </footer>
              </blockquote>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-8 justify-center"
          >
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              isDark ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' : 'bg-white/80 backdrop-blur-sm shadow-lg'
            } transition-all hover:shadow-xl`}>
              <FaSearch className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <input
                type="text"
                placeholder="🔍 Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`bg-transparent outline-none w-48 ${
                  isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.value;
                return (
                  <motion.button
                    key={cat.label}
                    onClick={() => setSelectedCategory(cat.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                        : isDark 
                          ? 'bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:bg-gray-700 border border-gray-700' 
                          : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-50 shadow-md'
                    }`}
                  >
                    <Icon className={isActive ? 'text-white' : ''} size={18} />
                    <span>{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <BlogList category={selectedCategory} searchTerm={searchTerm} />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}