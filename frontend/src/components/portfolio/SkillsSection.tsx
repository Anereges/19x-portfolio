'use client';

import { usePortfolioStore, useThemeStore } from '@/store/portfolioStore';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDocker, 
  FaAws, 
  FaGitAlt,
  FaShieldAlt,
  FaNetworkWired,
  FaLock,
  FaServer,
  FaCode,
  FaCloud,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiPostgresql, 
  SiRedis, 
  SiKubernetes, 
  SiLinux,
  SiNginx,
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiPrisma,
  SiGraphql,
  SiJest,
  SiWebpack
} from 'react-icons/si';
import { 
  GiCyberEye,
  GiPadlock,
  GiSecurityGate,
  GiRadarSweep,
  GiKey,
  GiNetworkBars,
  GiShield,
  GiSkullMask
} from 'react-icons/gi';
import { 
  MdSecurity, 
  MdVerified, 
  MdAnalytics,
  MdOutlineSecurity
} from 'react-icons/md';
import { BsShieldLock, BsShieldCheck } from 'react-icons/bs';

export const SkillsSection = () => {
  const { mode } = usePortfolioStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  // Grouped software skills by category
  const softwareSkillCategories = [
    {
      title: 'Frontend',
      icon: FaCode,
      skills: [
        { icon: FaReact, name: 'React', color: '#61DAFB' },
        { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
        { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
        { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
        { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
      ]
    },
    {
      title: 'Backend',
      icon: FaServer,
      skills: [
        { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
        { icon: SiExpress, name: 'Express.js', color: '#000000' },
        { icon: FaPython, name: 'Python', color: '#3776AB' },
        { icon: SiPrisma, name: 'Prisma', color: '#2D3748' },
        { icon: SiGraphql, name: 'GraphQL', color: '#E10098' },
      ]
    },
    {
      title: 'Database & Storage',
      icon: FaDatabase,
      skills: [
        { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
        { icon: SiRedis, name: 'Redis', color: '#DC382D' },
        { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: FaCloud,
      skills: [
        { icon: FaDocker, name: 'Docker', color: '#2496ED' },
        { icon: FaAws, name: 'AWS', color: '#FF9900' },
        { icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
        { icon: FaGitAlt, name: 'Git', color: '#F05032' },
        { icon: SiLinux, name: 'Linux', color: '#FCC624' },
        { icon: SiNginx, name: 'NGINX', color: '#009639' },
        { icon: SiJest, name: 'Jest', color: '#C21325' },
        { icon: SiWebpack, name: 'Webpack', color: '#8DD6F9' },
      ]
    }
  ];

  // Grouped cybersecurity skills by category
  const cyberSkillCategories = [
    {
      title: 'Security Monitoring & Detection',
      icon: GiRadarSweep,
      skills: [
        { icon: GiCyberEye, name: 'Threat Monitoring', color: '#00D4FF' },
        { icon: GiNetworkBars, name: 'Network Analysis', color: '#845EC2' },
        { icon: MdAnalytics, name: 'Security Analytics', color: '#FF6B6B' },
        { icon: GiSkullMask, name: 'Threat Intelligence', color: '#6C5B7B' },
      ]
    },
    {
      title: 'Infrastructure Security',
      icon: GiShield,
      skills: [
        { icon: FaShieldAlt, name: 'Security Hardening', color: '#FF6B6B' },
        { icon: SiLinux, name: 'Linux Security', color: '#FCC624' },
        { icon: FaDocker, name: 'Container Security', color: '#2496ED' },
        { icon: FaAws, name: 'Cloud Security', color: '#FF9900' },
        { icon: SiKubernetes, name: 'K8s Security', color: '#326CE5' },
        { icon: SiNginx, name: 'NGINX Security', color: '#009639' },
        { icon: FaServer, name: 'Server Hardening', color: '#FF6B35' },
      ]
    },
    {
      title: 'Access & Authentication',
      icon: GiKey,
      skills: [
        { icon: FaLock, name: 'Encryption', color: '#00C9A7' },
        { icon: GiPadlock, name: 'Access Control', color: '#FF9671' },
        { icon: BsShieldLock, name: 'IAM', color: '#4BC0C0' },
        { icon: MdVerified, name: 'MFA', color: '#845EC2' },
      ]
    },
    {
      title: 'Security Operations',
      icon: MdOutlineSecurity,
      skills: [
        { icon: GiSecurityGate, name: 'Security Audits', color: '#4BC0C0' },
        { icon: GiRadarSweep, name: 'Vuln Scanning', color: '#FF6B6B' },
        { icon: SiTypescript, name: 'Security Scripting', color: '#3178C6' },
        { icon: FaPython, name: 'Automation', color: '#3776AB' },
        { icon: BsShieldCheck, name: 'Compliance', color: '#00C9A7' },
      ]
    }
  ];

  const skillCategories = mode === 'software' ? softwareSkillCategories : cyberSkillCategories;

  return (
    <section className={`py-20 relative overflow-hidden ${
      isDark ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block mb-4"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${
              isDark ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-blue-50 to-purple-50'
            }`}>
              <span className="text-3xl">{mode === 'software' ? '💻' : '🔒'}</span>
            </div>
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {mode === 'software' ? (
              <>
                Tech Arsenal{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  & Tools
                </span>
              </>
            ) : (
              <>
                Security{' '}
                <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                  Expertise
                </span>
              </>
            )}
          </h2>
          
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {mode === 'software' 
              ? 'A curated collection of technologies I leverage to build scalable, modern applications'
              : 'Comprehensive security skills and tools to protect, monitor, and secure digital infrastructure'
            }
          </p>

          {/* Mode Indicator */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              mode === 'software' ? 'bg-blue-500' : 'bg-red-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {mode === 'software' ? '⚡ 15+ Technologies' : '🛡️ 18+ Security Domains'}
            </span>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-md`}>
                    <CategoryIcon className="text-xl text-blue-500" />
                  </div>
                  <h3 className={`text-xl font-semibold ${
                    isDark ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {category.title}
                  </h3>
                  <div className={`flex-1 h-px ${
                    isDark ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.skills.length}
                  </span>
                </div>

                {/* Skills Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: (categoryIndex * 0.1) + (skillIndex * 0.03)
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          y: -8,
                          scale: 1.05,
                          transition: { type: "spring", stiffness: 300 }
                        }}
                        className={`group relative p-5 rounded-2xl text-center transition-all duration-300 ${
                          isDark 
                            ? 'bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm' 
                            : 'bg-white/80 hover:bg-white backdrop-blur-sm'
                        } shadow-lg hover:shadow-2xl border ${
                          isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                        
                        {/* Icon Container */}
                        <div className="relative">
                          <div className={`inline-block p-3 rounded-xl mb-3 transition-all duration-300 ${
                            isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                          } group-hover:shadow-lg`}
                          style={{
                            boxShadow: `0 0 20px ${skill.color}15`
                          }}>
                            <Icon 
                              className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110" 
                              style={{ color: skill.color }} 
                            />
                          </div>
                          
                          <p className={`font-medium text-sm ${
                            isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                          } transition-colors duration-300`}>
                            {skill.name}
                          </p>
                          
                          {/* Animated Bottom Bar */}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-2/3"></div>
                        </div>

                        {/* Hover Tooltip */}
                        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          ✦
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full ${
            isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
          } shadow-lg border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <span className="text-2xl animate-bounce">
              {mode === 'software' ? '🚀' : '🛡️'}
            </span>
            <p className={`text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {mode === 'software' 
                ? 'Always learning and exploring new technologies'
                : 'Committed to staying ahead of emerging threats'
              }
            </p>
            <span className={`w-1 h-8 ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}></span>
            <span className={`text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {mode === 'software' ? 'v2.0' : 'v2.0'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};