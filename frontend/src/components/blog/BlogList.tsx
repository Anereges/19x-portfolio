'use client';

import { useEffect, useState } from 'react';
import { BlogPost } from '@/types';
import { blogApi } from '@/lib/api/blog';
import { BlogCard } from './BlogCard';
import { useThemeStore } from '@/store/portfolioStore';

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
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Loading posts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-4">📝</p>
        <h3 className={`text-2xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          No posts yet
        </h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          {searchTerm ? 'Try adjusting your search' : 'Check back later for new content'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};