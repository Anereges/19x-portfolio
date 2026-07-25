'use client';

import { useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaMedium,
  FaEnvelope, FaArrowUp, FaHeart, FaCode, FaRocket,
  FaReact, FaNodeJs, FaPython, FaDocker, FaAws,
  FaDatabase, FaCloud, FaShieldAlt, FaLock, FaTerminal
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb,
  SiPostgresql, SiRedis, SiKubernetes, SiLinux,
  SiJavascript, SiExpress, SiPrisma
} from 'react-icons/si';
import Link from 'next/link';
import { useState } from 'react';

export const Footer = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/resume', label: 'Resume' },
  ];

  const techStack = [
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: FaReact, name: 'React', color: '#61DAFB' },
    { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: FaDocker, name: 'Docker', color: '#2496ED' },
    { icon: FaAws, name: 'AWS', color: '#FF9900' },
    { icon: SiRedis, name: 'Redis', color: '#DC382D' },
    { icon: SiKubernetes, name: 'K8s', color: '#326CE5' },
    { icon: FaShieldAlt, name: 'Security', color: '#FF6B6B' },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/yourusername', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: FaTwitter, href: 'https://twitter.com/yourusername', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: FaYoutube, href: 'https://youtube.com/@yourchannel', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: FaMedium, href: 'https://medium.com/@yourusername', label: 'Medium', color: 'hover:text-gray-400' },
    { icon: FaEnvelope, href: 'mailto:your@email.com', label: 'Email', color: 'hover:text-red-400' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
    }`}>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
              <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {isDark ? '💻' : '🚀'}
              </span>
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                Portfolio
              </span>
            </Link>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Crafting innovative software solutions with modern technologies and best practices.
            </p>
            <div className="flex gap-4">
              <span className={`text-xs px-3 py-1 rounded-full ${
                isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                💻 Software
              </span>
              <span className={`text-xs px-3 py-1 rounded-full ${
                isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                🔒 Security
              </span>
            </div>
            <button
              onClick={scrollToTop}
              className={`p-3 rounded-full transition-all ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaArrowUp className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className={`text-lg font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-all ${
                      isDark 
                        ? 'text-gray-400 hover:text-white hover:translate-x-1' 
                        : 'text-gray-600 hover:text-gray-900 hover:translate-x-1'
                    } inline-block`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-lg font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.slice(0, 8).map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`group relative flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      isDark ? 'bg-gray-800' : 'bg-gray-200'
                    }`}
                  >
                    <Icon className="w-3 h-3" style={{ color: tech.color }} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                      {tech.name}
                    </span>
                    {/* Tooltip */}
                    <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                      isDark ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                    }`}>
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
              <span className={`text-xs px-2 py-1 rounded-full ${
                isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'
              }`}>
                +{techStack.length - 8} more
              </span>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
              }`}>
                <FaCode className="inline mr-1" /> 15+ Projects
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
              }`}>
                <FaRocket className="inline mr-1" /> 5+ Years
              </span>
            </div>
          </motion.div>

          {/* Connect & Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={`text-lg font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Connect & Collaborate
            </h3>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full transition-all ${
                      isDark 
                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                    } ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>

            {/* Newsletter Subscription */}
            <div className={`p-4 rounded-xl ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'
            } backdrop-blur-sm`}>
              <p className={`text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                📬 Subscribe for Updates
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none transition ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } border`}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition ${
                    isSubscribed
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  {isSubscribed ? '✓ Subscribed' : 'Subscribe'}
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-500 mt-1"
                >
                  ✅ Thanks for subscribing!
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>© {currentYear} Portfolio Platform. </span>
              <span className="inline-flex items-center gap-1">
                Built with <FaHeart className="text-red-500 animate-pulse" /> 
                using Next.js, TypeScript, and Tailwind CSS
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                Deployed with Vercel
              </span>
              <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Designed with ❤️
              </span>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          className={`absolute -bottom-20 -left-20 text-8xl opacity-5 ${
            isDark ? 'text-blue-500' : 'text-blue-400'
          }`}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {'</>'}
        </motion.div>
        <motion.div
          className={`absolute -top-20 -right-20 text-8xl opacity-5 ${
            isDark ? 'text-purple-500' : 'text-purple-400'
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {'{}'}
        </motion.div>
      </div>
    </footer>
  );
};