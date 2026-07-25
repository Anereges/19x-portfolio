'use client';

import { useThemeStore } from '@/store/portfolioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
  FaCode,
  FaLaptopCode,
  FaRocket,
} from 'react-icons/fa';

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
  char: string;
}

export const CoderCharacter = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [showIntro, setShowIntro] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // Code phrases for typing animation
  const codePhrases = useMemo(
    () => [
      'console.log("Hello World!");',
      'const app = new App();',
      'npm run dev',
      'git push origin main',
      '{"success": true}',
    ],
    []
  );

  // Code characters
  const codeParticles = useMemo(
    () => [
      '{',
      '}',
      '()',
      '=>',
      'const',
      'let',
      'function',
      'return',
      'import',
      'export',
      'class',
      'new',
      'this',
      'await',
      'async',
    ],
    []
  );

  /*
   * Fixed animated code particles.
   *
   * Removed:
   * - particles useState
   * - setParticles
   * - Math.random()
   *
   * This avoids the red-line problem while
   * keeping the animated background.
   */
  const particles: Particle[] = useMemo(
    () => [
      {
        left: 5,
        top: 10,
        duration: 4,
        delay: 0,
        char: codeParticles[0],
      },
      {
        left: 12,
        top: 30,
        duration: 5,
        delay: 1,
        char: codeParticles[1],
      },
      {
        left: 18,
        top: 65,
        duration: 6,
        delay: 2,
        char: codeParticles[2],
      },
      {
        left: 25,
        top: 20,
        duration: 4,
        delay: 1,
        char: codeParticles[3],
      },
      {
        left: 32,
        top: 75,
        duration: 7,
        delay: 0,
        char: codeParticles[4],
      },
      {
        left: 40,
        top: 45,
        duration: 5,
        delay: 2,
        char: codeParticles[5],
      },
      {
        left: 48,
        top: 15,
        duration: 6,
        delay: 1,
        char: codeParticles[6],
      },
      {
        left: 55,
        top: 60,
        duration: 4,
        delay: 3,
        char: codeParticles[7],
      },
      {
        left: 62,
        top: 30,
        duration: 7,
        delay: 0,
        char: codeParticles[8],
      },
      {
        left: 70,
        top: 80,
        duration: 5,
        delay: 2,
        char: codeParticles[9],
      },
      {
        left: 78,
        top: 10,
        duration: 6,
        delay: 1,
        char: codeParticles[10],
      },
      {
        left: 85,
        top: 50,
        duration: 4,
        delay: 3,
        char: codeParticles[11],
      },
      {
        left: 92,
        top: 25,
        duration: 7,
        delay: 0,
        char: codeParticles[12],
      },
      {
        left: 15,
        top: 85,
        duration: 5,
        delay: 2,
        char: codeParticles[13],
      },
      {
        left: 45,
        top: 90,
        duration: 6,
        delay: 1,
        char: codeParticles[14],
      },
    ],
    [codeParticles]
  );

  // Typing effect for code
  useEffect(() => {
    const currentText =
      codePhrases[
        textIndex % codePhrases.length
      ];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Type characters
          setTypingText(
            currentText.substring(
              0,
              typingText.length + 1
            )
          );

          // Start deleting after text is complete
          if (
            typingText.length ===
            currentText.length
          ) {
            setTimeout(
              () => setIsDeleting(true),
              2000
            );
          }
        } else {
          // Delete characters
          setTypingText(
            currentText.substring(
              0,
              typingText.length - 1
            )
          );

          // Move to next phrase
          if (typingText.length === 0) {
            setIsDeleting(false);
            setTextIndex(
              (prev) => prev + 1
            );
          }
        }
      },
      isDeleting ? 30 : 80
    );

    return () => clearTimeout(timeout);
  }, [
    typingText,
    isDeleting,
    textIndex,
    codePhrases,
  ]);

  // Hide intro after 15 seconds
  useEffect(() => {
    const timer = setTimeout(
      () => setShowIntro(false),
      15000
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 max-w-[90vw] md:max-w-lg"
          initial={{
            opacity: 0,
            scale: 0.3,
            y: 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.3,
            y: 100,
          }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 15,
            duration: 1.2,
          }}
        >
          <div
            className={`relative p-6 rounded-2xl ${
              isDark
                ? 'bg-gray-800/95'
                : 'bg-white/95'
            } backdrop-blur-lg shadow-2xl border ${
              isDark
                ? 'border-blue-500/30'
                : 'border-blue-500/30'
            } overflow-hidden`}
          >
            {/* Animated Code Background */}
            <div className="absolute inset-0 opacity-5 overflow-hidden">
              {particles.map(
                (particle, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-mono text-blue-500 text-xs"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration:
                        particle.duration,
                      repeat: Infinity,
                      delay: particle.delay,
                    }}
                  >
                    {particle.char}
                  </motion.span>
                )
              )}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-start gap-4">

              {/* Coder Avatar */}
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-full h-full"
                >
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                  >
                    {/* Glow */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="url(#coderGlow)"
                      opacity="0.3"
                    >
                      <defs>
                        <radialGradient id="coderGlow">
                          <stop
                            offset="0%"
                            stopColor="#3B82F6"
                            stopOpacity="0.6"
                          />
                          <stop
                            offset="100%"
                            stopColor="#3B82F6"
                            stopOpacity="0"
                          />
                        </radialGradient>
                      </defs>
                    </circle>

                    {/* Body */}
                    <rect
                      x="75"
                      y="95"
                      width="50"
                      height="55"
                      rx="12"
                      fill="#3B82F6"
                    />

                    {/* Coding Arms */}
                    <motion.g
                      animate={{
                        rotate: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        transformOrigin:
                          '75px 105px',
                      }}
                    >
                      <rect
                        x="65"
                        y="100"
                        width="10"
                        height="30"
                        rx="5"
                        fill="#4B5563"
                      />

                      <rect
                        x="60"
                        y="95"
                        width="8"
                        height="15"
                        rx="4"
                        fill="#FCD34D"
                      />

                      <rect
                        x="125"
                        y="100"
                        width="10"
                        height="30"
                        rx="5"
                        fill="#4B5563"
                      />

                      <rect
                        x="132"
                        y="95"
                        width="8"
                        height="15"
                        rx="4"
                        fill="#FCD34D"
                      />
                    </motion.g>

                    {/* Keyboard */}
                    <rect
                      x="60"
                      y="155"
                      width="80"
                      height="12"
                      rx="4"
                      fill="#1F2937"
                    />

                    {Array.from({
                      length: 10,
                    }).map((_, index) => (
                      <rect
                        key={index}
                        x={65 + index * 7}
                        y="157"
                        width="4"
                        height="4"
                        rx="1"
                        fill="#4B5563"
                      />
                    ))}

                    {/* Head */}
                    <circle
                      cx="100"
                      cy="65"
                      r="30"
                      fill="#FCD34D"
                    />

                    {/* Hair */}
                    <path
                      d="M75 55 Q85 40 100 40 Q115 40 125 55"
                      stroke="#4B5563"
                      strokeWidth="6"
                      fill="none"
                    />

                    {/* Glasses */}
                    <rect
                      x="82"
                      y="60"
                      width="16"
                      height="12"
                      rx="4"
                      stroke="#8B5CF6"
                      strokeWidth="2.5"
                      fill="none"
                    />

                    <rect
                      x="102"
                      y="60"
                      width="16"
                      height="12"
                      rx="4"
                      stroke="#8B5CF6"
                      strokeWidth="2.5"
                      fill="none"
                    />

                    <line
                      x1="98"
                      y1="66"
                      x2="102"
                      y2="66"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                    />

                    {/* Eyes */}
                    <circle
                      cx="90"
                      cy="66"
                      r="3"
                      fill="#1F2937"
                    />

                    <circle
                      cx="110"
                      cy="66"
                      r="3"
                      fill="#1F2937"
                    />

                    {/* Smile */}
                    <path
                      d="M93 75 Q100 80 107 75"
                      stroke="#1F2937"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Headphones */}
                    <path
                      d="M70 65 Q65 55 75 45 Q100 35 125 45 Q135 55 130 65"
                      stroke="#4B5563"
                      strokeWidth="4"
                      fill="none"
                    />

                    <circle
                      cx="72"
                      cy="65"
                      r="8"
                      fill="#4B5563"
                    />

                    <circle
                      cx="128"
                      cy="65"
                      r="8"
                      fill="#4B5563"
                    />

                    {/* Code Symbols */}
                    <motion.text
                      x="30"
                      y="40"
                      className="text-xs font-mono fill-blue-400"
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    >
                      {'</>'}
                    </motion.text>

                    <motion.text
                      x="150"
                      y="30"
                      className="text-xs font-mono fill-purple-400"
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      {'{}'}
                    </motion.text>

                    <motion.text
                      x="20"
                      y="170"
                      className="text-xs font-mono fill-green-400"
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    >
                      {'=>'}
                    </motion.text>
                  </svg>
                </motion.div>
              </div>

              {/* Speech Bubble */}
              <div className="flex-1 min-w-[100px]">
                <div
                  className={`relative p-3 rounded-xl ${
                    isDark
                      ? 'bg-gray-700'
                      : 'bg-gray-100'
                  } border-l-4 border-blue-500`}
                >
                  {/* Speech Bubble Arrow */}
                  <div
                    className={`absolute -left-2 top-5 w-4 h-4 rotate-45 ${
                      isDark
                        ? 'bg-gray-700'
                        : 'bg-gray-100'
                    } border-l-4 border-blue-500`}
                  />

                  <div className="space-y-2">
                    <p
                      className={`text-sm font-bold ${
                        isDark
                          ? 'text-blue-400'
                          : 'text-blue-600'
                      }`}
                    >
                      💻 Software Engineer
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-xs">
                        $
                      </span>

                      <motion.p
                        className={`text-xs md:text-sm font-mono ${
                          isDark
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                        style={{
                          minHeight: '20px',
                        }}
                      >
                        {typingText}

                        <span className="animate-pulse">
                          ▌
                        </span>
                      </motion.p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-2 mt-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        <FaCode className="inline mr-1" />
                        15+ Projects
                      </span>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        <FaLaptopCode className="inline mr-1" />
                        5+ Years
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-1 mt-2 justify-end">
                  {Array.from({
                    length: 4,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === textIndex % 4
                          ? 'w-6 bg-blue-500'
                          : `w-2 ${
                              isDark
                                ? 'bg-gray-600'
                                : 'bg-gray-300'
                            }`
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() =>
                  setShowIntro(false)
                }
                className="absolute top-2 right-2 text-xs text-gray-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            {/* Code Decoration */}
            <motion.div
              className="absolute -bottom-4 -left-4 text-2xl opacity-20"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <FaCode />
            </motion.div>

            {/* Rocket Decoration */}
            <motion.div
              className="absolute -top-4 -right-4 text-2xl opacity-20"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <FaRocket />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};