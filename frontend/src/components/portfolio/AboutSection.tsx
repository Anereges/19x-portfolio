'use client';

import { useEffect, useState } from 'react';
import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { aboutApi } from '@/lib/api/about';
import { About as AboutType } from '@/types';
import Link from 'next/link';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope,
  FaCode, FaShieldAlt, FaBrain, FaUsers, FaRocket, 
  FaTrophy, FaBook, FaGraduationCap, FaBriefcase,
  FaHeart, FaStar, FaFire, FaCrown, FaGem,
  FaArrowRight, FaMapMarkerAlt, FaPhone, FaGlobe,
  FaAward, FaMicroscope
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { IconType } from 'react-icons';

// Define proper types for icon maps
type IconMap = Record<string, IconType>;

const iconMap: IconMap = {
  FaCode,
  FaShieldAlt,
  FaBrain,
  FaUsers,
  FaRocket,
  FaTrophy,
  FaBook,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaStar,
  FaFire,
  FaCrown,
  FaGem,
  FaAward,
  FaMicroscope,
};

const colorMap: Record<string, string> = {
  'text-yellow-500': 'text-yellow-500',
  'text-purple-500': 'text-purple-500',
  'text-blue-500': 'text-blue-500',
  'text-green-500': 'text-green-500',
  'text-cyan-500': 'text-cyan-500',
  'text-amber-500': 'text-amber-500',
  'text-red-500': 'text-red-500',
  'text-pink-500': 'text-pink-500',
};

const getIcon = (iconName: string): IconType => {
  return iconMap[iconName] || FaCode;
};

const getColor = (colorName: string): string => {
  return colorMap[colorName] || 'text-yellow-500';
};

export const AboutSection = () => {
  const { mode } = usePortfolioStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [aboutData, setAboutData] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await aboutApi.getPublicAbout();
        if (response.success && response.data) {
          setAboutData(response.data);
        }
      } catch (error) {
        console.error('Error fetching about:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto" />
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center p-8">
          <p className="text-6xl mb-4">📄</p>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About content not available
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Please add about content in the admin panel.
          </p>
        </div>
      </div>
    );
  }

  // Get the appropriate icon component
  const getStrengthIcon = (iconName: string): IconType => {
    return getIcon(iconName);
  };

  const getAchievementIcon = (iconName: string): IconType => {
    return getIcon(iconName);
  };

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ===== PROFILE HEADER CARD ===== */}
        <div className={`relative overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            mode === 'software' ? 'bg-blue-500' : 'bg-emerald-500'
          }`} />
          <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
            mode === 'software' ? 'bg-purple-500' : 'bg-teal-500'
          }`} />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className={`absolute -inset-2 rounded-full bg-gradient-to-r ${
                    mode === 'software' 
                      ? 'from-blue-500 via-purple-500 to-pink-500' 
                      : 'from-emerald-500 via-teal-500 to-cyan-500'
                  } blur-xl opacity-60 animate-pulse`} />
                  <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    {aboutData.profileImage ? (
                      <img
                        src={aboutData.profileImage}
                        alt={aboutData.fullName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-6xl ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        {mode === 'software' ? '👨‍💻' : '🛡️'}
                      </div>
                    )}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 p-2 rounded-full bg-gradient-to-r ${
                    mode === 'software' 
                      ? 'from-blue-500 to-purple-500' 
                      : 'from-emerald-500 to-teal-500'
                  } shadow-xl`}>
                    <div className={`p-1.5 rounded-full ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                      <span className="text-sm">{mode === 'software' ? '💻' : '🔒'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {aboutData.fullName}
                  </h1>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    mode === 'software'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {mode === 'software' ? 'Software' : 'Security'}
                  </span>
                </div>
                
                <p className={`text-xl md:text-2xl font-medium mt-1 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {aboutData.title}
                </p>
                
                <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start text-sm">
                  {aboutData.location && (
                    <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <FaMapMarkerAlt className="text-blue-500" /> {aboutData.location}
                    </span>
                  )}
                </div>
                
                <p className={`mt-4 text-base leading-relaxed max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {aboutData.bio}
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                  {aboutData.githubUrl && (
                    <a href={aboutData.githubUrl} target="_blank" rel="noopener" 
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:scale-105 ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}>
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {aboutData.linkedinUrl && (
                    <a href={aboutData.linkedinUrl} target="_blank" rel="noopener" 
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:scale-105 ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}>
                      <FaLinkedin /> LinkedIn
                    </a>
                  )}
                  {aboutData.twitterUrl && (
                    <a href={aboutData.twitterUrl} target="_blank" rel="noopener" 
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:scale-105 ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}>
                      <FaTwitter /> Twitter
                    </a>
                  )}
                  {aboutData.leetcodeUrl && (
                    <a href={aboutData.leetcodeUrl} target="_blank" rel="noopener" 
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:scale-105 ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}>
                      <SiLeetcode /> LeetCode
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== STATS CARDS ===== */}
        {aboutData.stats && aboutData.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className={`p-6 rounded-2xl text-center transition-all hover:scale-105 ${
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'
              } shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== TWO COLUMN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* ===== LEFT COLUMN ===== */}
          <div className="space-y-8">
            
            {/* Journey Card */}
            {aboutData.journey && aboutData.journey.length > 0 && (
              <div className={`p-8 rounded-3xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">💡</span>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    My Journey
                  </h2>
                </div>
                <div className="space-y-4">
                  {aboutData.journey.map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl border-l-4 ${
                      mode === 'software' ? 'border-blue-500' : 'border-emerald-500'
                    } ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold ${
                          mode === 'software' ? 'text-blue-400' : 'text-emerald-400'
                        }`}>
                          {item.year}
                        </span>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Card */}
            {aboutData.skills && aboutData.skills.length > 0 && (
              <div className={`p-8 rounded-3xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🎯</span>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Core Skills
                  </h2>
                </div>
                <div className="space-y-4">
                  {aboutData.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {skill.icon} {skill.name}
                        </span>
                        <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`w-full h-2.5 rounded-full overflow-hidden ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            mode === 'software' 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="space-y-8">
            
            {/* Strengths Card */}
            {aboutData.strengths && aboutData.strengths.length > 0 && (
              <div className={`p-8 rounded-3xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">💪</span>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Key Strengths
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aboutData.strengths.map((item, index) => {
                    const Icon = getStrengthIcon(item.icon);
                    return (
                      <div key={index} className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <Icon className={`text-3xl mx-auto mb-2 ${
                          mode === 'software' ? 'text-blue-500' : 'text-emerald-500'
                        }`} />
                        <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h4>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Achievements Card */}
            {aboutData.achievements && aboutData.achievements.length > 0 && (
              <div className={`p-8 rounded-3xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🏆</span>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Achievements
                  </h2>
                  <span className={`ml-auto px-3 py-1 text-xs rounded-full ${
                    isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {aboutData.achievements.length} Awards
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aboutData.achievements.map((item, index) => {
                    const Icon = getAchievementIcon(item.icon);
                    const color = getColor(item.color);
                    return (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-105 ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <Icon className={`text-xl ${color}`} />
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Expertise Card */}
            {aboutData.expertise && aboutData.expertise.length > 0 && (
              <div className={`p-8 rounded-3xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🔬</span>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Expertise Areas
                  </h2>
                </div>
                <div className="space-y-4">
                  {aboutData.expertise.map((exp, index) => (
                    <div key={index} className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {exp.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.items.map((item, idx) => (
                          <span key={idx} className={`text-xs px-3 py-1 rounded-full ${
                            isDark 
                              ? 'bg-gray-600 text-gray-300' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ===== CALL TO ACTION ===== */}
        <div className={`mt-8 p-10 rounded-3xl shadow-2xl text-center relative overflow-hidden ${
          mode === 'software'
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600'
        }`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoNHY0aC00em0wIDB2LTRoLTR2NGg0eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat" />
          </div>
          <div className="relative z-10">
            <div className="text-5xl mb-4 animate-float">💼</div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Let s Work Together
            </h3>
            <p className="text-white/90 mb-8 max-w-lg mx-auto">
              {mode === 'software'
                ? "I'm always open to exciting projects and collaborations"
                : "I'm ready to help secure your systems and data"}
            </p>
            <Link href="/contact">
              <button className="group px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
                Contact Me
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};