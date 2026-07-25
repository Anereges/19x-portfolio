'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const pathname = usePathname();
  const { mode, toggleMode } = usePortfolioStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠', emoji: '✨' },
    { href: '/projects', label: 'Projects', icon: '🚀', emoji: '💫' },
    { href: '/blog', label: 'Blog', icon: '📝', emoji: '🌟' },
    { href: '/about', label: 'About', icon: '👤', emoji: '🌊' },
    { href: '/contact', label: 'Contact', icon: '📬', emoji: '📬' },
  ];

  const modeOptions = [
    { value: 'software', label: 'Software', icon: '💻', color: 'from-blue-400 to-blue-600' },
    { value: 'cybersecurity', label: 'Security', icon: '🔒', color: 'from-emerald-400 to-emerald-600' },
  ];

  const currentMode = modeOptions.find(opt => opt.value === mode);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? isDark 
            ? 'bg-gray-900/98 shadow-2xl border-b border-gray-700/50' 
            : 'bg-white/98 shadow-2xl border-b border-gray-200/50'
          : isDark 
            ? 'bg-gray-900/80 backdrop-blur-xl' 
            : 'bg-white/80 backdrop-blur-xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo with Enhanced Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link href="/" className="relative group">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="text-2xl"
                >
                  {currentMode?.icon}
                </motion.div>
                <div className="relative">
                  <span className={`text-xl font-bold transition-all duration-300 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    🕵️19X Nexus
                  </span>
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${currentMode?.color}`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links - Desktop with Hover Effects */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${currentMode?.color} text-white shadow-lg`
                        : isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-base">{link.icon}</span>
                      {link.label}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-xs"
                        >
                          {link.emoji}
                        </motion.span>
                      )}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${currentMode?.color} opacity-10 -z-10`}
                        transition={{ type: 'spring', duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Controls with Enhanced Design */}
          <div className="flex items-center gap-3">
            {/* Mode Toggle - Desktop with Glowing Effect */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full p-1 shadow-inner">
              {modeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    if (mode !== option.value) toggleMode();
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    mode === option.value
                      ? `bg-gradient-to-r ${option.color} text-white shadow-lg shadow-${option.color.split(' ')[1]}/30`
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{option.icon}</span>
                    {option.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle with Rotation */}
            <motion.button
              onClick={toggleTheme}
              className={`relative p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 hover:from-yellow-400/30 hover:to-yellow-600/30' 
                  : 'bg-gradient-to-r from-purple-400/20 to-purple-600/20 hover:from-purple-400/30 hover:to-purple-600/30'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <span className="text-xl">{isDark ? '☀️' : '🌙'}</span>
            </motion.button>

            {/* Mobile Menu Button with Animation */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100/20 dark:hover:bg-gray-800/20 transition-all duration-300 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-gray-900'
                  }`}
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : {}}
                />
                <motion.span
                  className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-gray-900'
                  }`}
                  animate={isMobileMenuOpen ? { opacity: 0 } : {}}
                />
                <motion.span
                  className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-gray-900'
                  }`}
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : {}}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Enhanced Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <motion.div 
                className={`py-6 space-y-2 border-t ${
                  isDark ? 'border-gray-700/50' : 'border-gray-200/50'
                }`}
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${currentMode?.color} text-white shadow-lg`
                            : isDark 
                              ? 'hover:bg-gray-800/50 text-gray-300' 
                              : 'hover:bg-gray-100/50 text-gray-600'
                        }`}
                      >
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-medium">{link.label}</span>
                        {isActive && <span className="ml-auto">{link.emoji}</span>}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile Mode Switcher */}
                <motion.div 
                  className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className={`text-xs px-4 py-2 font-medium ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    ⚡ Switch Mode
                  </p>
                  <div className="flex gap-2 mt-2 px-4">
                    {modeOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        onClick={() => {
                          if (mode !== option.value) toggleMode();
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                          mode === option.value
                            ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                            : isDark 
                              ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' 
                              : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>{option.icon}</span>
                          {option.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};