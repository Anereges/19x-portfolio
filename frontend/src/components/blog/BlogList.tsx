'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import { blogApi } from '@/lib/api/blog';
import { BlogCard } from './BlogCard';
import { useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { FaRocket, FaSadCry } from 'react-icons/fa';

interface BlogListProps {
  category?: string;
  searchTerm?: string;
}

export const BlogList = ({ category, searchTerm = '' }: BlogListProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getPosts({
          category,
          search: searchTerm || undefined,
        });
        if (response.success && response.data) {
          setPosts(response.data);
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        setError('Error loading blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"
          ></motion.div>
        </div>
        <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          📚 Loading amazing articles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-4">😅</div>
        <p className={`text-lg font-semibold ${isDark ? 'text-red-400' : 'text-red-500'}`}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
        >
          🔄 Try Again
        </button>
      </motion.div>
    );
  }

  if (posts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="text-7xl mb-4">🔍</div>
        <h3 className={`text-2xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          No posts found
        </h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          {searchTerm 
            ? `No results for "${searchTerm}"` 
            : 'Check back later for new content'}
        </p>
        {searchTerm && (
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Clear Search
          </button>
        )}
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </motion.div>
  );
};