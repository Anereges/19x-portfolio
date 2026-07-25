'use client';

import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaCode, FaShieldAlt, FaRocket, FaAward } from 'react-icons/fa';
import { CoderCharacter } from './CoderCharacter';
import { HackerCharacter } from './HackerCharacter';
import Link from 'next/link';

type Particle = {
  left: number;
  top: number;
  duration: number;
  delay: number;
  size?: number;
  xOffset?: number;
};

export const HeroSection = () => {
  const { mode } = usePortfolioStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const particles: Particle[] = [
    { left: 5, top: 10, duration: 8, delay: 0, size: 2, xOffset: 10 },
    { left: 10, top: 40, duration: 6, delay: 1, size: 3, xOffset: -8 },
    { left: 15, top: 75, duration: 10, delay: 2, size: 1, xOffset: 12 },
    { left: 20, top: 25, duration: 7, delay: 3, size: 4, xOffset: -15 },
    { left: 25, top: 60, duration: 9, delay: 1, size: 2, xOffset: 8 },
    { left: 30, top: 90, duration: 5, delay: 2, size: 3, xOffset: -10 },
    { left: 35, top: 15, duration: 8, delay: 0, size: 1, xOffset: 15 },
    { left: 40, top: 50, duration: 6, delay: 3, size: 2, xOffset: -12 },
    { left: 45, top: 80, duration: 10, delay: 1, size: 4, xOffset: 7 },
    { left: 50, top: 30, duration: 7, delay: 2, size: 2, xOffset: -9 },
    { left: 55, top: 65, duration: 9, delay: 0, size: 3, xOffset: 14 },
    { left: 60, top: 20, duration: 5, delay: 3, size: 1, xOffset: -11 },
    { left: 65, top: 55, duration: 8, delay: 1, size: 2, xOffset: 6 },
    { left: 70, top: 85, duration: 6, delay: 2, size: 3, xOffset: -13 },
    { left: 75, top: 35, duration: 10, delay: 0, size: 4, xOffset: 9 },
    { left: 80, top: 70, duration: 7, delay: 3, size: 2, xOffset: -7 },
    { left: 85, top: 10, duration: 9, delay: 1, size: 1, xOffset: 16 },
    { left: 90, top: 45, duration: 5, delay: 2, size: 3, xOffset: -14 },
    { left: 95, top: 75, duration: 8, delay: 0, size: 2, xOffset: 11 },
    { left: 8, top: 55, duration: 6, delay: 3, size: 4, xOffset: -6 },
    { left: 18, top: 85, duration: 10, delay: 1, size: 1, xOffset: 13 },
    { left: 28, top: 35, duration: 7, delay: 2, size: 3, xOffset: -10 },
    { left: 38, top: 70, duration: 9, delay: 0, size: 2, xOffset: 8 },
    { left: 48, top: 15, duration: 5, delay: 3, size: 4, xOffset: -12 },
    { left: 58, top: 45, duration: 8, delay: 1, size: 1, xOffset: 15 },
    { left: 68, top: 90, duration: 6, delay: 2, size: 3, xOffset: -9 },
    { left: 78, top: 25, duration: 10, delay: 0, size: 2, xOffset: 7 },
    { left: 88, top: 60, duration: 7, delay: 3, size: 4, xOffset: -14 },
    { left: 98, top: 35, duration: 9, delay: 1, size: 2, xOffset: 10 },
    { left: 12, top: 15, duration: 5, delay: 2, size: 3, xOffset: -8 },
  ];

  const floatingIcons = [
    { icon: FaCode, delay: 0, x: 10, y: -20 },
    { icon: FaShieldAlt, delay: 0.5, x: -15, y: 10 },
    { icon: FaRocket, delay: 1, x: 20, y: 15 },
    { icon: FaAward, delay: 1.5, x: -10, y: -25 },
  ];

  return (
    <section
      className={`relative min-h-screen overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}
    >
      {/* Character - Shows based on mode */}
      {mode === 'software' ? <CoderCharacter /> : <HackerCharacter />}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-10" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particles.map((particle, index) => (
            <motion.div
              key={index}
              className={`absolute rounded-full ${
                mode === 'software' 
                  ? `bg-blue-400 ${particle.size && particle.size > 2 ? 'shadow-lg shadow-blue-400/20' : ''}` 
                  : `bg-red-400 ${particle.size && particle.size > 2 ? 'shadow-lg shadow-red-400/20' : ''}`
              }`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size || 2,
                height: particle.size || 2,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, particle.xOffset || 0, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full py-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Floating Badge */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
              transition={{ duration: 0.3 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                mode === 'software'
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
              }`}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg"
              >
                ●
              </motion.span>
              {mode === 'software' ? 'Available for Projects' : 'Security Ready'}
              <motion.span
                animate={{ 
                  x: [-5, 5, -5],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <motion.span 
                  className="inline-block"
                  animate={{ 
                    x: [0, 10, 0],
                    color: isDark ? ['#ffffff', '#60a5fa', '#ffffff'] : ['#1f2937', '#3b82f6', '#1f2937']
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  I&apos;m a&nbsp;
                </motion.span>
                <motion.span
                  className={`inline-block bg-gradient-to-r ${
                    mode === 'software'
                      ? 'from-blue-500 via-purple-500 to-pink-500'
                      : 'from-red-500 via-orange-500 to-yellow-500'
                  } bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  {mode === 'software' ? 'Software Engineer' : 'Security Engineer'}
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-lg max-w-lg ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {mode === 'software'
                ? 'Building innovative solutions with cutting-edge technologies. Passionate about clean code, scalable architecture, and solving complex problems.'
                : 'Protecting digital assets through advanced security measures. Expert in threat analysis, vulnerability assessment, and security architecture.'}
            </motion.p>

            {/* Buttons - Resume now links to /resume */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`group px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 flex items-center gap-2 ${
                  mode === 'software'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25'
                    : 'bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-lg hover:shadow-red-500/25'
                }`}
              >
                View Projects
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.span>
              </motion.button>

              {/* Resume Button - Now links to /resume */}
              <Link href="/resume">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-full font-semibold border-2 transition-all duration-300 flex items-center gap-2 ${
                    isDark
                      ? 'border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                  }`}
                >
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaDownload />
                  </motion.span>
                  Resume
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
            >
              {[
                {
                  value: mode === 'software' ? '15+' : '30+',
                  label: mode === 'software' ? 'Projects' : 'Security Audits',
                  icon: FaCode,
                },
                {
                  value: mode === 'software' ? '5+' : '12',
                  label: mode === 'software' ? 'Years Experience' : 'CVEs Found',
                  icon: FaAward,
                },
                {
                  value: mode === 'software' ? '25+' : '50+',
                  label: mode === 'software' ? 'Technologies' : 'Systems Secured',
                  icon: FaRocket,
                },
                {
                  value: mode === 'software' ? '10+' : '6',
                  label: mode === 'software' ? 'Clients' : 'Certifications',
                  icon: FaShieldAlt,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  whileHover={{ 
                    scale: 1.05,
                    x: 10,
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.3 }
                  }}
                  className={`p-4 rounded-xl text-center cursor-pointer ${
                    isDark ? 'bg-gray-800/50 hover:bg-gray-800/70' : 'bg-white/50 hover:bg-white/70'
                  } backdrop-blur-sm border ${
                    isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                  } transition-all duration-300 group`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`text-2xl mb-1 ${
                      mode === 'software' ? 'text-blue-500' : 'text-red-500'
                    } group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon />
                  </motion.div>
                  <div
                    className={`text-2xl font-bold ${
                      mode === 'software' ? 'text-blue-500' : 'text-red-500'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            className="relative h-full min-h-[400px] flex items-center justify-center"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotate: [0, 2, -2, 0],
                transition: { duration: 0.5 }
              }}
              className={`text-center p-8 rounded-3xl ${
                isDark ? 'bg-gray-800/30' : 'bg-white/30'
              } backdrop-blur-sm border-2 ${
                isDark ? 'border-gray-700' : 'border-gray-300'
              } hover:border-opacity-100 transition-all duration-300 max-w-sm w-full relative overflow-hidden group`}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, #3b82f6, transparent 70%)',
                    'radial-gradient(circle at 80% 50%, #8b5cf6, transparent 70%)',
                    'radial-gradient(circle at 20% 50%, #3b82f6, transparent 70%)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Floating Icons */}
              {floatingIcons.map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute text-2xl ${mode === 'software' ? 'text-blue-400' : 'text-red-400'}`}
                  style={{
                    top: `${30 + (index * 15)}%`,
                    left: `${10 + (index * 20)}%`,
                  }}
                  animate={{
                    x: [0, item.x, 0],
                    y: [0, item.y, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut",
                  }}
                >
                  <item.icon />
                </motion.div>
              ))}

              <div className="relative z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-7xl mb-4"
                >
                  {mode === 'software' ? '💻' : '🔒'}
                </motion.div>

                <motion.p 
                  className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {mode === 'software'
                    ? 'Software Engineering Excellence'
                    : 'Cybersecurity Protection'}
                </motion.p>

                <motion.div 
                  className="flex justify-center gap-3 mt-4"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {['✨', '🚀', '💡'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="text-2xl"
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Horizontal loading bar */}
                <motion.div 
                  className="mt-6 h-1 rounded-full overflow-hidden bg-gray-700/30"
                >
                  <motion.div
                    className={`h-full rounded-full ${
                      mode === 'software' 
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' 
                        : 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500'
                    }`}
                    animate={{
                      width: ['0%', '100%', '0%'],
                      x: ['-100%', '0%', '100%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Wave with animation */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <motion.svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            x: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120H720H360H0Z"
            className={isDark ? 'fill-gray-900' : 'fill-white'}
          />
        </motion.svg>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};