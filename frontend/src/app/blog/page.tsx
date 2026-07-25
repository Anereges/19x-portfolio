'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SocialMediaBar } from '@/components/layout/SocialMediaBar';
import { BlogList } from '@/components/blog/BlogList';
import { useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const categories = [
    { value: undefined, label: 'All' },
    { value: 'TECHNOLOGY', label: '💻 Technology' },
    { value: 'CYBERSECURITY', label: '🔒 Cybersecurity' },
    { value: 'SOFTWARE', label: '⚡ Software' },
  ];

  return (
    <main>
      <Navbar />
      <SocialMediaBar />
      
      <section className={`pt-24 pb-20 min-h-screen ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-5xl block mb-4">📝</span>
            <h1 className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Blog & Insights
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Exploring technology, cybersecurity, and software development
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-md`}>
              <FaSearch className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`bg-transparent outline-none ${
                  isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === cat.value
                      ? 'bg-blue-500 text-white'
                      : isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'
                  } shadow-md`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <BlogList category={selectedCategory} searchTerm={searchTerm} />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}