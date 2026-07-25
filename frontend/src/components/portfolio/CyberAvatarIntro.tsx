'use client';

import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaGithub, FaLinkedin, FaShieldAlt } from 'react-icons/fa';

export const CyberAvatarIntro = () => {
  const { mode } = usePortfolioStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [isWalking, setIsWalking] = useState(true);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(true);

  const cyberIntro = [
    { text: "Hello! I'm a Security Engineer 🔒", delay: 1000 },
    { text: "I protect systems and data 🛡️", delay: 3000 },
    { text: "Security is not a product, it's a process 🔐", delay: 5000 },
    { text: "Stay secure, stay safe! ⚡", delay: 7000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeechIndex((prev) => {
        if (prev < cyberIntro.length - 1) {
          return prev + 1;
        } else {
          setShowSpeech(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full max-w-4xl mx-auto p-8 rounded-3xl ${
      isDark ? 'bg-gray-800/50' : 'bg-white/50'
    } backdrop-blur-xl border ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    } shadow-2xl overflow-hidden`}>
      
      {/* Background Gradient - Cyber Theme */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Avatar Container */}
          <div className="relative w-64 h-64 flex-shrink-0">
            <div className="absolute inset-0 rounded-full blur-2xl bg-red-500/30 animate-pulse" />
            
            <motion.div
              animate={isWalking ? {
                x: [0, 100, 0, -100, 0],
                y: [0, -10, 0, -10, 0],
                rotate: [0, 3, 0, -3, 0],
              } : { x: 0, y: 0, rotate: 0 }}
              transition={isWalking ? {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              } : { duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  className="absolute bottom-0 w-32 h-4 bg-black/20 rounded-full blur-sm"
                  animate={{ scale: isWalking ? [1, 0.8, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                />
                
                {/* Cyber Avatar SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Body */}
                  <motion.g
                    animate={isWalking ? { y: [-2, 2, -2] } : { y: 0 }}
                    transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                  >
                    {/* Legs */}
                    <motion.g
                      animate={isWalking ? {
                        rotate: [-10, 10, -10],
                      } : { rotate: 0 }}
                      transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                      style={{ transformOrigin: '100px 160px' }}
                    >
                      <rect x="70" y="145" width="20" height="35" rx="10" fill="#4B5563" />
                      <rect x="110" y="145" width="20" height="35" rx="10" fill="#4B5563" />
                    </motion.g>

                    <ellipse cx="80" cy="180" rx="15" ry="8" fill="#1F2937" />
                    <ellipse cx="120" cy="180" rx="15" ry="8" fill="#1F2937" />

                    {/* Body - Cyber Red */}
                    <rect x="75" y="85" width="50" height="60" rx="15" fill="#EF4444" />

                    {/* Arms */}
                    <motion.g
                      animate={isWalking ? {
                        rotate: [-15, 15, -15],
                      } : { rotate: 0 }}
                      transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                      style={{ transformOrigin: '75px 95px' }}
                    >
                      <rect x="65" y="90" width="12" height="40" rx="6" fill="#4B5563" />
                      <rect x="123" y="90" width="12" height="40" rx="6" fill="#4B5563" />
                    </motion.g>

                    <circle cx="71" cy="130" r="8" fill="#FCD34D" />
                    <circle cx="129" cy="130" r="8" fill="#FCD34D" />
                  </motion.g>

                  {/* Head - Fixed: removed transformOrigin */}
                  <motion.g
                    animate={isWalking ? { rotate: [-3, 3, -3] } : { rotate: 0 }}
                    transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                    style={{ transformOrigin: '100px 60px' }}
                  >
                    <circle cx="100" cy="60" r="35" fill="#FCD34D" />
                    <path d="M70 50 Q85 35 100 35 Q115 35 130 50" stroke="#4B5563" strokeWidth="8" fill="none" />
                    <path d="M72 45 Q100 30 128 45" stroke="#4B5563" strokeWidth="6" fill="none" />

                    {/* Eyes */}
                    <ellipse cx="88" cy="60" rx="4" ry="5" fill="#1F2937" />
                    <ellipse cx="112" cy="60" rx="4" ry="5" fill="#1F2937" />
                    <circle cx="89" cy="58" r="1.5" fill="white" />
                    <circle cx="113" cy="58" r="1.5" fill="white" />

                    {/* Cyber Glasses */}
                    <rect x="78" y="52" width="44" height="16" rx="6" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
                    <line x1="84" y1="52" x2="84" y2="68" stroke="#10B981" strokeWidth="1" opacity="0.4" />
                    <line x1="116" y1="52" x2="116" y2="68" stroke="#10B981" strokeWidth="1" opacity="0.4" />

                    {/* Shield Badge */}
                    <text x="100" y="25" textAnchor="middle" fontSize="20">🛡️</text>
                  </motion.g>

                  <text x="100" y="195" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold" className="select-none">
                    🔒 SECURITY
                  </text>
                </svg>
              </div>
            </motion.div>

            <button
              onClick={() => setIsWalking(!isWalking)}
              className={`absolute bottom-0 right-0 p-2 rounded-full ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition`}
            >
              {isWalking ? <FaPause size={12} /> : <FaPlay size={12} />}
            </button>
          </div>

          {/* Speech Bubble - Cyber Theme */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {showSpeech && (
                <motion.div
                  key={speechIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className={`relative p-6 rounded-2xl ${
                    isDark ? 'bg-gray-700' : 'bg-white'
                  } shadow-xl border-l-4 border-red-500`}
                >
                  <div className={`absolute -left-3 top-8 w-6 h-6 rotate-45 ${
                    isDark ? 'bg-gray-700' : 'bg-white'
                  } border-l-4 border-red-500`} style={{ borderLeftColor: 'inherit' }} />

                  <div className="relative z-10">
                    <p className={`text-lg md:text-xl font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {cyberIntro[speechIndex]?.text || ''}
                    </p>
                    <div className="flex gap-1 mt-4">
                      {cyberIntro.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === speechIndex
                              ? 'w-8 bg-red-500'
                              : `w-4 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <motion.a
                whileHover={{ scale: 1.2, y: -3 }}
                href="#"
                className={`p-2 rounded-full ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                } transition`}
              >
                <FaGithub className={isDark ? 'text-gray-300' : 'text-gray-700'} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -3 }}
                href="#"
                className={`p-2 rounded-full ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                } transition`}
              >
                <FaLinkedin className="text-blue-600" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, y: -3 }}
                href="#"
                className={`p-2 rounded-full ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                } transition`}
              >
                <FaShieldAlt className="text-red-500" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Tags - Cyber Theme */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
            🛡️ Certified Ethical Hacker
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            🔐 30+ Security Audits
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            🔒 Security Engineer
          </span>
        </div>
      </div>
    </div>
  );
};