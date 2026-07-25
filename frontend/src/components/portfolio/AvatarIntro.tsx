'use client';

import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export const AvatarIntro = () => {
  const { mode } = usePortfolioStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [isWalking, setIsWalking] = useState(true);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);

  // Different intros for each mode
  const softwareIntro = [
    { text: "Hi there! I'm a Software Engineer 👋", delay: 1000 },
    { text: "I build scalable web applications 💻", delay: 3000 },
    { text: "Full-stack development is my passion 🚀", delay: 5000 },
    { text: "Let's create something amazing together! ✨", delay: 7000 },
  ];

  const cyberIntro = [
    { text: "Hello! I'm a Security Engineer 🔒", delay: 1000 },
    { text: "I protect systems and data 🛡️", delay: 3000 },
    { text: "Security is not a product, it's a process 🔐", delay: 5000 },
    { text: "Stay secure, stay safe! ⚡", delay: 7000 },
  ];

  const introTexts = mode === 'software' ? softwareIntro : cyberIntro;

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeechIndex((prev) => {
        if (prev < introTexts.length - 1) {
          return prev + 1;
        } else {
          setShowSpeech(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [introTexts.length]);

  return (
    <div className={`relative w-full max-w-4xl mx-auto p-8 rounded-3xl ${
      isDark ? 'bg-gray-800/50' : 'bg-white/50'
    } backdrop-blur-xl border ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    } shadow-2xl overflow-hidden`}>
      
      {/* Background Gradient */}
      <div className={`absolute inset-0 opacity-20 ${
        mode === 'software'
          ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
          : 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500'
      }`} />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Avatar Container */}
          <div className="relative w-72 h-72 flex-shrink-0">
            {/* Glowing Background */}
            <div className={`absolute inset-0 rounded-full blur-2xl ${
              mode === 'software' ? 'bg-blue-500/30' : 'bg-red-500/30'
            } animate-pulse`} />
            
            {/* Avatar Body */}
            <motion.div
              animate={isWalking ? {
                x: [0, 80, 0, -80, 0],
                y: [0, -8, 0, -8, 0],
                rotate: [0, 2, 0, -2, 0],
              } : {
                x: 0,
                y: 0,
                rotate: 0,
              }}
              transition={isWalking ? {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              } : { duration: 0.5 }}
              className="relative w-full h-full"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Shadow */}
                <motion.div
                  className="absolute bottom-4 w-40 h-4 bg-black/20 rounded-full blur-sm"
                  animate={{
                    scaleX: isWalking ? [1, 0.7, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                />
                
                {/* Human Avatar SVG */}
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Body / Torso */}
                  <motion.g
                    animate={isWalking ? { y: [-2, 2, -2] } : { y: 0 }}
                    transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                  >
                    {/* Neck */}
                    <rect x="138" y="155" width="24" height="20" rx="4" fill="#FCD34D" />
                    
                    {/* Torso - Professional Shirt */}
                    <rect x="120" y="170" width="60" height="70" rx="12" fill={mode === 'software' ? '#3B82F6' : '#EF4444'} />
                    {/* Shirt collar */}
                    <path d="M135 170 L150 180 L165 170" stroke="#1F2937" strokeWidth="1.5" fill="none" />
                    {/* Shirt buttons */}
                    <circle cx="150" cy="185" r="2" fill="#1F2937" opacity="0.5" />
                    <circle cx="150" cy="200" r="2" fill="#1F2937" opacity="0.5" />
                    <circle cx="150" cy="215" r="2" fill="#1F2937" opacity="0.5" />

                    {/* Arms */}
                    <motion.g
                      animate={isWalking ? {
                        rotate: [-15, 15, -15],
                      } : { rotate: 0 }}
                      transition={{ duration: 0.6, repeat: isWalking ? Infinity : 0 }}
                      style={{ transformOrigin: '120px 180px' }}
                    >
                      {/* Left Arm */}
                      <rect x="105" y="175" width="16" height="45" rx="8" fill="#4B5563" />
                      <rect x="107" y="215" width="12" height="12" rx="6" fill="#FCD34D" />
                      {/* Left hand fingers */}
                      <line x1="110" y1="227" x2="108" y2="232" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
                      <line x1="113" y1="227" x2="113" y2="232" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
                      <line x1="116" y1="227" x2="118" y2="232" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
                    </motion.g>

                    {/* Right Arm */}
                    <motion.g
                      animate={isWalking ? {
                        rotate: [15, -15, 15],
                      } : { rotate: 0 }}
                      transition={{ duration: 0.6, repeat: isWalking ? Infinity : 0 }}
                      style={{ transformOrigin: '180px 180px' }}
                    >
                      <rect x="179" y="175" width="16" height="45" rx="8" fill="#4B5563" />
                      <rect x="181" y="215" width="12" height="12" rx="6" fill="#FCD34D" />
                      {/* Right hand fingers */}
                      <line x1="184" y1="227" x2="182" y2="232" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
                      <line x1="187" y1="227" x2="187" y2="232" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
                      <line x1="190" y1="227" x2="192" y2="232" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
                    </motion.g>

                    {/* Legs */}
                    <motion.g
                      animate={isWalking ? {
                        rotate: [-12, 12, -12],
                      } : { rotate: 0 }}
                      transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                      style={{ transformOrigin: '135px 240px' }}
                    >
                      {/* Left Leg */}
                      <rect x="135" y="235" width="22" height="40" rx="8" fill="#1F2937" />
                      {/* Left Shoe */}
                      <ellipse cx="146" cy="277" rx="14" ry="6" fill="#111827" />
                      <ellipse cx="146" cy="275" rx="10" ry="4" fill="#374151" />
                    </motion.g>

                    <motion.g
                      animate={isWalking ? {
                        rotate: [12, -12, 12],
                      } : { rotate: 0 }}
                      transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                      style={{ transformOrigin: '165px 240px' }}
                    >
                      {/* Right Leg */}
                      <rect x="147" y="235" width="22" height="40" rx="8" fill="#1F2937" />
                      {/* Right Shoe */}
                      <ellipse cx="158" cy="277" rx="14" ry="6" fill="#111827" />
                      <ellipse cx="158" cy="275" rx="10" ry="4" fill="#374151" />
                    </motion.g>
                  </motion.g>

                  {/* Head */}
                  <motion.g
                    animate={isWalking ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
                    transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
                    style={{ transformOrigin: '150px 120px' }}
                  >
                    {/* Head shape */}
                    <ellipse cx="150" cy="120" rx="55" ry="58" fill="#FCD34D" />
                    
                    {/* Hair */}
                    <path d="M100 115 Q105 75 130 65 Q150 60 170 65 Q195 75 200 115" fill="#4B5563" />
                    <path d="M105 110 Q120 70 150 65 Q180 70 195 110" fill="#4B5563" />
                    <path d="M98 115 Q100 95 110 85" stroke="#4B5563" strokeWidth="3" fill="none" />
                    <path d="M202 115 Q200 95 190 85" stroke="#4B5563" strokeWidth="3" fill="none" />
                    
                    {/* Side hair */}
                    <path d="M98 115 Q95 130 100 145" stroke="#4B5563" strokeWidth="4" fill="none" />
                    <path d="M202 115 Q205 130 200 145" stroke="#4B5563" strokeWidth="4" fill="none" />

                    {/* Eyebrows */}
                    <path d="M125 105 Q130 100 140 102" stroke="#4B5563" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M160 102 Q170 100 175 105" stroke="#4B5563" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                    {/* Eyes */}
                    <motion.g>
                      {/* Left Eye */}
                      <ellipse cx="135" cy="112" rx="10" ry="7" fill="white" />
                      <ellipse cx="135" cy="112" rx="6" ry="6" fill="#1F2937" />
                      <ellipse cx="135" cy="112" rx="3" ry="3" fill="#111827" />
                      <circle cx="133" cy="110" r="2" fill="white" opacity="0.8" />
                      {/* Eye blink */}
                      {isBlinking && (
                        <rect x="125" y="105" width="20" height="14" rx="2" fill="#FCD34D" />
                      )}
                    </motion.g>

                    <motion.g>
                      {/* Right Eye */}
                      <ellipse cx="165" cy="112" rx="10" ry="7" fill="white" />
                      <ellipse cx="165" cy="112" rx="6" ry="6" fill="#1F2937" />
                      <ellipse cx="165" cy="112" rx="3" ry="3" fill="#111827" />
                      <circle cx="163" cy="110" r="2" fill="white" opacity="0.8" />
                      {/* Eye blink */}
                      {isBlinking && (
                        <rect x="155" y="105" width="20" height="14" rx="2" fill="#FCD34D" />
                      )}
                    </motion.g>

                    {/* Nose */}
                    <path d="M150 118 L148 126 Q150 130 152 126 Z" fill="#E5B88A" />
                    
                    {/* Mouth - Smile */}
                    <path d="M140 135 Q150 145 160 135" stroke="#D9776A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    
                    {/* Glasses (Software Mode) */}
                    {mode === 'software' && (
                      <>
                        <rect x="122" y="107" width="22" height="14" rx="4" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.7" />
                        <rect x="156" y="107" width="22" height="14" rx="4" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.7" />
                        <line x1="144" y1="114" x2="156" y2="114" stroke="#8B5CF6" strokeWidth="2" opacity="0.7" />
                        <line x1="122" y1="111" x2="115" y2="108" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.7" />
                        <line x1="178" y1="111" x2="185" y2="108" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.7" />
                      </>
                    )}

                    {/* Cyber Glasses (Cybersecurity Mode) */}
                    {mode === 'cybersecurity' && (
                      <>
                        <rect x="120" y="105" width="60" height="18" rx="6" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.5" />
                        <line x1="130" y1="105" x2="130" y2="123" stroke="#10B981" strokeWidth="1" opacity="0.3" />
                        <line x1="170" y1="105" x2="170" y2="123" stroke="#10B981" strokeWidth="1" opacity="0.3" />
                      </>
                    )}

                    {/* Ears */}
                    <ellipse cx="95" cy="120" rx="6" ry="10" fill="#FCD34D" />
                    <ellipse cx="205" cy="120" rx="6" ry="10" fill="#FCD34D" />

                    {/* Blush */}
                    <ellipse cx="125" cy="128" rx="8" ry="4" fill="#FCA5A5" opacity="0.3" />
                    <ellipse cx="175" cy="128" rx="8" ry="4" fill="#FCA5A5" opacity="0.3" />
                  </motion.g>

                  {/* Mode Badge */}
                  <rect x="120" y="285" width="60" height="14" rx="4" fill={mode === 'software' ? '#3B82F6' : '#EF4444'} />
                  <text x="150" y="295" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold" className="select-none">
                    {mode === 'software' ? '💻 SOFTWARE' : '🔒 SECURITY'}
                  </text>
                </svg>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="absolute -bottom-2 right-0 flex gap-2">
              <button
                onClick={() => setIsWalking(!isWalking)}
                className={`p-2 rounded-full ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                } transition shadow-lg`}
              >
                {isWalking ? <FaPause size={12} /> : <FaPlay size={12} />}
              </button>
            </div>
          </div>

          {/* Speech Bubble */}
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
                  } shadow-xl`}
                >
                  {/* Speech bubble tail */}
                  <div className={`absolute -left-3 top-8 w-6 h-6 rotate-45 ${
                    isDark ? 'bg-gray-700' : 'bg-white'
                  }`} />

                  <div className="relative z-10">
                    <p className={`text-lg md:text-xl font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {introTexts[speechIndex]?.text || ''}
                    </p>
                    <div className="flex gap-1 mt-4">
                      {introTexts.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === speechIndex
                              ? `w-8 ${mode === 'software' ? 'bg-blue-500' : 'bg-red-500'}`
                              : `w-4 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Links */}
            <div className="flex gap-3 mt-4 justify-center md:justify-start">
              {[
                { icon: FaGithub, color: 'text-gray-700 dark:text-gray-300' },
                { icon: FaLinkedin, color: 'text-blue-600' },
                { icon: FaTwitter, color: 'text-blue-400' },
                { icon: FaEnvelope, color: 'text-red-500' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, y: -3 }}
                    className={`p-2 rounded-full ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    } transition`}
                  >
                    <Icon className={social.color} size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Tags */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          <span className={`text-xs px-3 py-1 rounded-full ${
            mode === 'software'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
              : 'bg-red-500/20 text-red-400 border border-red-500/20'
          }`}>
            {mode === 'software' ? '⚡ 5+ Years Experience' : '🛡️ Certified Ethical Hacker'}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            {mode === 'software' ? '🚀 15+ Projects' : '🔐 30+ Security Audits'}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full ${
            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          }`}>
            {mode === 'software' ? '💻 Full-Stack Developer' : '🔒 Security Engineer'}
          </span>
        </div>
      </div>
    </div>
  );
};