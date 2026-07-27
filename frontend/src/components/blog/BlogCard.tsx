'use client';

import { BlogPost } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import Link from 'next/link';
import { 
  FaCalendar, 
  FaEye, 
  FaUser, 
  FaArrowRight,
  FaBrain,
  FaShieldAlt,
  FaCode
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IconBaseProps } from 'react-icons';

interface BlogCardProps {
  post: BlogPost;
}

// Maps defined outside component to avoid recreation
const categoryColors: Record<string, string> = {
  TECHNOLOGY: 'from-blue-500 to-cyan-400',
  CYBERSECURITY: 'from-green-500 to-emerald-400',
  SOFTWARE: 'from-purple-500 to-pink-400',
};

const categoryIcons: Record<string, React.ComponentType<IconBaseProps>> = {
  TECHNOLOGY: FaBrain,
  CYBERSECURITY: FaShieldAlt,
  SOFTWARE: FaCode,
};

// Helper function to get author name
const getAuthorName = (post: BlogPost): string => {
  if (post.createdBy) {
    return `${post.createdBy.firstName} ${post.createdBy.lastName}`;
  }
  return post.author || 'Unknown';
};

export const BlogCard = ({ post }: BlogCardProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const category = post.category || 'TECHNOLOGY';
  const Icon = categoryIcons[category] || FaUser;
  const gradientColor = categoryColors[category] || 'from-gray-500 to-gray-400';
  const authorName = getAuthorName(post);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className={`group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
        isDark ? 'bg-gray-800/90 backdrop-blur-sm border border-gray-700' : 'bg-white/90 backdrop-blur-sm shadow-xl'
      } hover:shadow-2xl`}
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          {post.imageUrl ? (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${gradientColor}`}>
              <Icon className="text-white text-6xl opacity-50" />
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-gray-900' : 'from-gray-900/40'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientColor} text-white text-xs font-medium shadow-lg`}>
              <Icon size={14} />
              {category}
            </span>
          </div>

          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium shadow-lg flex items-center gap-1">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r ${gradientColor} group-hover:bg-clip-text transition-all duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h3>
          
          <p className={`text-sm mb-4 line-clamp-2 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'No description available')}
          </p>

          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span className="flex items-center gap-1">
                <FaUser size={12} className="text-blue-400" /> 
                {authorName}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendar size={12} className="text-purple-400" /> 
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`flex items-center gap-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <FaEye size={12} className="text-green-400" /> 
                {post.views || 0}
              </span>
              <motion.span 
                whileHover={{ x: 5 }}
                className={`flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}
              >
                Read <FaArrowRight size={10} />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};