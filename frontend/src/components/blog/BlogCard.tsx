'use client';

import { BlogPost } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import Link from 'next/link';
import { FaCalendar, FaEye, FaUser } from 'react-icons/fa';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const categoryColors: Record<string, string> = {
    TECHNOLOGY: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    CYBERSECURITY: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    SOFTWARE: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  const category = post.category || 'TECHNOLOGY';

  return (
    <article className={`rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 ${
      isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'
    }`}>
      <Link href={`/blog/${post.slug}`}>
        <div className={`h-48 flex items-center justify-center ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl">📝</span>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[category] || 'bg-gray-100 text-gray-700'}`}>
              {category}
            </span>
            {post.featured && (
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                ⭐ Featured
              </span>
            )}
          </div>

          <h3 className={`text-xl font-bold mb-2 line-clamp-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h3>
          
          <p className={`text-sm mb-4 line-clamp-2 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'No description available')}
          </p>

          <div className={`flex items-center justify-between text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaUser size={12} /> {post.author || 'Unknown'}
              </span>
              <span className="flex items-center gap-1">
                <FaCalendar size={12} /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <FaEye size={12} /> {post.views || 0}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};