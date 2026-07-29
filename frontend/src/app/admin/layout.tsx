'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useThemeStore } from '@/store/portfolioStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, FaProjectDiagram, FaBlog, FaUsers, 
  FaCog, FaSignOutAlt, FaPlus, FaUser, FaUserCircle, FaInfoCircle,
  FaChartLine  // Add this import
} from 'react-icons/fa';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: FaHome },
    { href: '/admin/projects', label: 'Projects', icon: FaProjectDiagram },
    { href: '/admin/blog', label: 'Blog Posts', icon: FaBlog },
    { href: '/admin/resume', label: 'Resume', icon: FaUser },
    { href: '/admin/about', label: 'About', icon: FaUserCircle },
    { href: '/admin/analytics', label: 'Analytics', icon: FaChartLine },
    { href: '/admin/users', label: 'Users', icon: FaUsers },
    { href: '/admin/settings', label: 'Settings', icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

  return (
    <div>
      <Navbar />
      
      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <aside className={`w-64 fixed h-full pt-16 ${
          isDark ? 'bg-gray-900 border-r border-gray-800' : 'bg-white border-r border-gray-200'
        }`}>
          <div className="p-4">
            <div className={`p-4 rounded-xl mb-6 ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <h3 className={`font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Admin Panel
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Manage your portfolio
              </p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition ${
                  isDark
                    ? 'text-red-400 hover:bg-red-900/20'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <FaSignOutAlt size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}