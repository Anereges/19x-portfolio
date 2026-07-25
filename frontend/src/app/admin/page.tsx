'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api/admin';
import { useThemeStore } from '@/store/portfolioStore';
import { Project, BlogPost, AdminStats } from '@/types';
import { 
  FaProjectDiagram, FaBlog, FaUsers, FaEye,
  FaPlus, FaEdit, FaTrash 
} from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminApi.getStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Projects', value: stats?.totalProjects || 0, icon: FaProjectDiagram, color: 'blue' },
    { title: 'Blog Posts', value: stats?.totalBlogPosts || 0, icon: FaBlog, color: 'green' },
    { title: 'Users', value: stats?.totalUsers || 0, icon: FaUsers, color: 'purple' },
    { title: 'Total Views', value: stats?.totalViews || 0, icon: FaEye, color: 'orange' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Dashboard
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Welcome back! Here is what is happening with your portfolio.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                  <Icon className={`text-${stat.color}-500 text-2xl`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Projects
          </h2>
          <div className="space-y-4">
            {stats?.recentProjects?.map((project: Project) => (
              <div key={project.id} className={`flex items-center justify-between p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div>
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>
                    {project.title}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {project.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition">
                    <FaEdit />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/projects" className="mt-4 inline-block text-blue-500 hover:text-blue-600">
            View All →
          </Link>
        </div>

        {/* Recent Blog Posts */}
        <div className={`p-6 rounded-xl shadow-lg ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Blog Posts
          </h2>
          <div className="space-y-4">
            {stats?.recentPosts?.map((post: BlogPost) => (
              <div key={post.id} className={`flex items-center justify-between p-3 rounded-lg ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div>
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>
                    {post.title}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {post.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition">
                    <FaEdit />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/blog" className="mt-4 inline-block text-blue-500 hover:text-blue-600">
            View All →
          </Link>
        </div>
      </div>
    </div>
  );
}