'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { blogApi } from '@/lib/api/blog';
import { BlogPost } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import { FaCalendar, FaEye, FaUser, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getPostBySlug(slug);
        if (response.success && response.data) {
          setPost(response.data);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Error loading post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading post...
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main>
        <Navbar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">😕</p>
            <h2 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {error || 'Post not found'}
            </h2>
            <Link href="/blog" className="text-blue-500 hover:text-blue-600 transition">
              ← Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const categoryColors: Record<string, string> = {
    TECHNOLOGY: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    CYBERSECURITY: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    SOFTWARE: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <main>
      <Navbar />
      
      <section className={`pt-24 pb-20 min-h-screen ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className={`inline-flex items-center gap-2 mb-6 ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          } transition`}>
            <FaArrowLeft /> Back to Blog
          </Link>

          <article className={`p-8 rounded-2xl shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                  {post.category}
                </span>
                {post.featured && (
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {post.title}
              </h1>

              <div className={`flex flex-wrap items-center gap-4 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span className="flex items-center gap-1">
                  <FaUser size={14} /> {post.author || 'Unknown'}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendar size={14} /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye size={14} /> {post.views || 0} views
                </span>
              </div>
            </div>

            {post.imageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
              </div>
            )}

            <div className={`prose prose-lg max-w-none ${
              isDark ? 'prose-invert' : ''
            }`}>
              {post.content ? post.content.split('\n').map((paragraph, index) => (
                <p key={index} className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {paragraph}
                </p>
              )) : (
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  No content available for this post.
                </p>
              )}
            </div>
          </article>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}