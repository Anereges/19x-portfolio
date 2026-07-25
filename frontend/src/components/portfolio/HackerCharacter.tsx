'use client';

import { useThemeStore } from '@/store/portfolioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import {
  FaShieldAlt,
  FaSkull,
  FaTerminal,
  FaLock,
} from 'react-icons/fa';

interface MatrixChar {
  left: number;
  top: number;
  duration: number;
  delay: number;
  char: string;
}

export const HackerCharacter = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const [showIntro, setShowIntro] = useState(true);
  const [hackText, setHackText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // Hacker phrases
  const hackPhrases = useMemo(
    () => [
      '> sudo rm -rf /*',
      '> Access Granted 🔓',
      '> Scanning Port 8080...',
      '> Firewall Bypassed',
      '> System Secured ✅',
    ],
    []
  );

  // Matrix characters
  const chars = useMemo(
    () => [
      '0',
      '1',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'x',
      'y',
      'z',
    ],
    []
  );

  /*
   * Fixed Matrix characters.
   *
   * Removed:
   * - useState for matrixChars
   * - setMatrixChars
   * - Math.random()
   *
   * This keeps the Matrix animation working
   * without the red-line errors.
   */
  const matrixChars: MatrixChar[] = useMemo(
    () => [
      { left: 5, top: 10, duration: 5, delay: 0, char: chars[0] },
      { left: 10, top: 30, duration: 6, delay: 1, char: chars[1] },
      { left: 15, top: 60, duration: 4, delay: 2, char: chars[2] },
      { left: 20, top: 80, duration: 7, delay: 1, char: chars[3] },
      { left: 25, top: 20, duration: 5, delay: 3, char: chars[4] },
      { left: 30, top: 50, duration: 6, delay: 0, char: chars[5] },
      { left: 35, top: 75, duration: 4, delay: 2, char: chars[6] },
      { left: 40, top: 15, duration: 7, delay: 1, char: chars[7] },
      { left: 45, top: 40, duration: 5, delay: 3, char: chars[8] },
      { left: 50, top: 70, duration: 6, delay: 0, char: chars[9] },
      { left: 55, top: 25, duration: 4, delay: 2, char: chars[10] },

      { left: 60, top: 55, duration: 7, delay: 1, char: chars[0] },
      { left: 65, top: 85, duration: 5, delay: 3, char: chars[1] },
      { left: 70, top: 35, duration: 6, delay: 0, char: chars[2] },
      { left: 75, top: 65, duration: 4, delay: 2, char: chars[3] },
      { left: 80, top: 10, duration: 7, delay: 1, char: chars[4] },
      { left: 85, top: 45, duration: 5, delay: 3, char: chars[5] },
      { left: 90, top: 75, duration: 6, delay: 0, char: chars[6] },
      { left: 95, top: 25, duration: 4, delay: 2, char: chars[7] },
      { left: 8, top: 55, duration: 7, delay: 1, char: chars[8] },
    ],
    [chars]
  );

  // Matrix-like typing effect
  useEffect(() => {
    const currentText =
      hackPhrases[textIndex % hackPhrases.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Type text one character at a time
        setHackText(
          currentText.substring(
            0,
            hackText.length + 1
          )
        );

        // Wait after completing the phrase
        if (hackText.length === currentText.length) {
          setTimeout(
            () => setIsDeleting(true),
            2000
          );
        }
      } else {
        // Delete text one character at a time
        setHackText(
          currentText.substring(
            0,
            hackText.length - 1
          )
        );

        // Move to next phrase
        if (hackText.length === 0) {
          setIsDeleting(false);
          setTextIndex(
            (prev) => prev + 1
          );
        }
      }
    }, isDeleting ? 20 : 60);

    return () => clearTimeout(timeout);
  }, [
    hackText,
    isDeleting,
    textIndex,
    hackPhrases,
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
            } backdrop-blur-lg shadow-2xl border border-red-500/30 overflow-hidden`}
          >
            {/* Matrix Rain Background */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
              {matrixChars.map(
                (char, index) => (
                  <motion.div
                    key={index}
                    className="absolute font-mono text-green-500 text-xs"
                    style={{
                      left: `${char.left}%`,
                      top: `${char.top}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: char.duration,
                      repeat: Infinity,
                      delay: char.delay,
                    }}
                  >
                    {char.char}
                  </motion.div>
                )
              )}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-start gap-4">
              {/* Hacker Avatar */}
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, -3, 3, 0],
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
                      fill="url(#hackerGlow)"
                      opacity="0.3"
                    >
                      <defs>
                        <radialGradient id="hackerGlow">
                          <stop
                            offset="0%"
                            stopColor="#EF4444"
                            stopOpacity="0.6"
                          />
                          <stop
                            offset="100%"
                            stopColor="#EF4444"
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
                      fill="#1F2937"
                    />

                    <rect
                      x="78"
                      y="98"
                      width="44"
                      height="49"
                      rx="10"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                    />

                    {/* Hacking Arms */}
                    <motion.g
                      animate={{
                        rotate: [-3, 3, -3],
                      }}
                      transition={{
                        duration: 0.6,
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
                        fill="#374151"
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
                        fill="#374151"
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

                    {/* Terminal */}
                    <rect
                      x="65"
                      y="152"
                      width="70"
                      height="10"
                      rx="3"
                      fill="#0a0a0a"
                    />

                    <text
                      x="68"
                      y="160"
                      className="text-[8px] font-mono fill-green-400"
                    >
                      {hackText
                        ? '>' +
                          hackText.substring(
                            0,
                            15
                          )
                        : '>_'}

                      <animate
                        attributeName="opacity"
                        values="1;0;1"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                    </text>

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
                      stroke="#1F2937"
                      strokeWidth="6"
                      fill="none"
                    />

                    {/* Hacker Mask */}
                    <rect
                      x="78"
                      y="48"
                      width="44"
                      height="30"
                      rx="6"
                      fill="#1F2937"
                      opacity="0.9"
                    />

                    {/* Mask Details */}
                    <rect
                      x="82"
                      y="55"
                      width="12"
                      height="8"
                      rx="3"
                      fill="#10B981"
                      opacity="0.6"
                    />

                    <rect
                      x="106"
                      y="55"
                      width="12"
                      height="8"
                      rx="3"
                      fill="#10B981"
                      opacity="0.6"
                    />

                    {/* Glowing Eyes */}
                    <circle
                      cx="90"
                      cy="60"
                      r="4"
                      fill="#10B981"
                    />

                    <circle
                      cx="110"
                      cy="60"
                      r="4"
                      fill="#10B981"
                    />

                    <circle
                      cx="90"
                      cy="60"
                      r="2"
                      fill="#000"
                    />

                    <circle
                      cx="110"
                      cy="60"
                      r="2"
                      fill="#000"
                    />

                    {/* Hoodie */}
                    <path
                      d="M70 45 Q70 35 80 30 Q100 25 120 30 Q130 35 130 45"
                      stroke="#1F2937"
                      strokeWidth="8"
                      fill="none"
                    />

                    <path
                      d="M72 40 Q100 30 128 40"
                      stroke="#1F2937"
                      strokeWidth="6"
                      fill="none"
                    />

                    {/* Hacker Symbols */}
                    <motion.text
                      x="25"
                      y="35"
                      className="text-lg fill-red-400"
                      animate={{
                        opacity: [0, 1, 0],
                        rotate: [0, 20, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    >
                      {'🖥️'}
                    </motion.text>

                    <motion.text
                      x="155"
                      y="30"
                      className="text-lg fill-red-400"
                      animate={{
                        opacity: [0, 1, 0],
                        rotate: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    >
                      {'🔐'}
                    </motion.text>

                    <motion.text
                      x="20"
                      y="180"
                      className="text-lg fill-red-400"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    >
                      {'⚡'}
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
                  } border-l-4 border-red-500`}
                >
                  {/* Bubble Arrow */}
                  <div
                    className={`absolute -left-2 top-5 w-4 h-4 rotate-45 ${
                      isDark
                        ? 'bg-gray-700'
                        : 'bg-gray-100'
                    } border-l-4 border-red-500`}
                  />

                  <div className="space-y-2">
                    <p
                      className={`text-sm font-bold ${
                        isDark
                          ? 'text-red-400'
                          : 'text-red-600'
                      }`}
                    >
                      🔒 Security Engineer
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
                        {hackText || '>_'}
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
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        <FaShieldAlt className="inline mr-1" />
                        30+ Audits
                      </span>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        <FaSkull className="inline mr-1" />
                        12 CVEs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-1 mt-2 justify-end">
                  {[0, 1, 2, 3].map(
                    (index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index ===
                          textIndex % 4
                            ? 'w-6 bg-red-500'
                            : `w-2 ${
                                isDark
                                  ? 'bg-gray-600'
                                  : 'bg-gray-300'
                              }`
                        }`}
                      />
                    )
                  )}
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

            {/* Terminal Decoration */}
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
              <FaTerminal />
            </motion.div>

            {/* Lock Decoration */}
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
              <FaLock />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};