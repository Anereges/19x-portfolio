'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { blogApi } from '@/lib/api/blog';
import { BlogPost } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import { 
  FaCalendar, 
  FaEye, 
  FaUser, 
  FaArrowLeft, 
  FaBookOpen, 
  FaShare, 
  FaHeart,
  FaBrain,
  FaShieldAlt,
  FaCode
} from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconBaseProps } from 'react-icons';

// Map category to icon component - defined outside to avoid recreation
const categoryIconMap: Record<string, React.ComponentType<IconBaseProps>> = {
  TECHNOLOGY: FaBrain,
  CYBERSECURITY: FaShieldAlt,
  SOFTWARE: FaCode,
};

const categoryColorMap: Record<string, string> = {
  TECHNOLOGY: 'from-blue-500 to-cyan-400',
  CYBERSECURITY: 'from-green-500 to-emerald-400',
  SOFTWARE: 'from-purple-500 to-pink-400',
};

const categoryColors: Record<string, string> = {
  TECHNOLOGY: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white',
  CYBERSECURITY: 'bg-gradient-to-r from-green-500 to-emerald-400 text-white',
  SOFTWARE: 'bg-gradient-to-r from-purple-500 to-pink-400 text-white',
};

// Helper function to get author name
const getAuthorName = (post: BlogPost): string => {
  if (post.createdBy) {
    return `${post.createdBy.firstName} ${post.createdBy.lastName}`;
  }
  return post.author || 'Unknown';
};

// Helper function to get category color
const getCategoryColor = (category: string): string => {
  return categoryColorMap[category] || 'from-gray-500 to-gray-400';
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
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
        <div className={`pt-24 min-h-screen flex items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-center"
          >
            <div className="inline-block rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              📖 Loading your article...
            </p>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main>
        <Navbar />
        <div className={`pt-24 min-h-screen flex items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-6xl mb-4">😕</p>
            <h2 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {error || 'Post not found'}
            </h2>
            <Link href="/blog" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all">
              <FaArrowLeft /> Back to Blog
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  const CategoryIcon = categoryIconMap[post.category] || FaBookOpen;
  const gradientColor = getCategoryColor(post.category);
  const authorName = getAuthorName(post);

  return (
    <main>
      <Navbar />
      
      <section className={`pt-24 pb-20 min-h-screen relative overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full ${
            isDark ? 'bg-blue-500/5' : 'bg-blue-200/20'
          } blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full ${
            isDark ? 'bg-purple-500/5' : 'bg-purple-200/20'
          } blur-3xl animate-pulse delay-1000`}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl ${
              isDark ? 'bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700' : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:shadow-lg'
            } transition-all`}>
              <FaArrowLeft /> Back to Blog
            </Link>
          </motion.div>

          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-3xl shadow-2xl ${
              isDark ? 'bg-gray-800/90 backdrop-blur-sm border border-gray-700' : 'bg-white/90 backdrop-blur-sm shadow-xl'
            }`}
          >
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`text-xs px-4 py-2 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'} flex items-center gap-2`}>
                  <CategoryIcon size={16} />
                  {post.category}
                </span>
                {post.featured && (
                  <span className="text-xs px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white flex items-center gap-2">
                    ⭐ Featured
                  </span>
                )}
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {post.title}
              </motion.h1>

              <div className={`flex flex-wrap items-center gap-6 text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="flex items-center gap-2">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${gradientColor} text-white`}>
                    <FaUser size={12} />
                  </div>
                  {authorName}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendar className="text-blue-400" /> 
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </span>
                <span className="flex items-center gap-2">
                  <FaEye className="text-purple-400" /> 
                  {post.views || 0} views
                </span>
              </div>
            </div>

            {post.imageUrl && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8 rounded-2xl overflow-hidden shadow-xl"
              >
                <img src={post.imageUrl} alt={post.title} className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            )}

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`prose prose-lg max-w-none ${
                isDark ? 'prose-invert prose-headings:text-white prose-p:text-gray-300' : 'prose-headings:text-gray-900 prose-p:text-gray-700'
              } prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-blue-400`}
            >
              {post.content ? (
                <div className="space-y-4">
                  {post.content.split('\n').map((paragraph, index) => (
                    <motion.p 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.05) }}
                      className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              ) : (
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  No content available for this post.
                </p>
              )}
            </motion.div>

            {/* Engagement Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                      liked 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                        : isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FaHeart className={liked ? 'text-white' : 'text-red-500'} />
                    {liked ? 'Liked' : 'Like'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-all`}
                  >
                    <FaShare /> Share
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    💬 Join the conversation
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.article>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}