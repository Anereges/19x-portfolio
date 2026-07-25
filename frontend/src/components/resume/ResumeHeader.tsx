'use client';

import { Resume } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

interface ResumeHeaderProps {
  resume: Resume;
}

export const ResumeHeader = ({ resume }: ResumeHeaderProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className={`px-6 sm:px-8 lg:px-10 pt-8 pb-6 border-b ${
      isDark ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {resume.profileImage ? (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-lg">
              <img
                src={resume.profileImage}
                alt={`${resume.fullName} profile photo`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {resume.fullName?.charAt(0) || '?'}
            </div>
          )}
        </div>

        {/* Name and Title */}
        <div className="flex-1 min-w-0">
          <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {resume.fullName}
          </h1>
          <p className={`text-xl font-medium mt-1 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {resume.title}
          </p>
          <p className={`text-sm mt-2 max-w-2xl ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Building secure software, scalable backend systems, and practical cybersecurity solutions.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-3 text-sm">
            {resume.location && (
              <span className={`flex items-center gap-1.5 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaMapMarkerAlt className="text-blue-500 text-xs" />
                {resume.location}
              </span>
            )}
            {resume.email && (
              <a href={`mailto:${resume.email}`} className={`flex items-center gap-1.5 hover:text-blue-500 transition ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaEnvelope className="text-blue-500 text-xs" />
                {resume.email}
              </a>
            )}
            {resume.phone && (
              <a href={`tel:${resume.phone}`} className={`flex items-center gap-1.5 hover:text-blue-500 transition ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <FaPhone className="text-blue-500 text-xs" />
                {resume.phone}
              </a>
            )}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 mt-2.5">
            {resume.github && (
              <a
                href={resume.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-sm hover:text-blue-500 transition ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <FaGithub className="text-base" /> GitHub
              </a>
            )}
            {resume.linkedin && (
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-sm hover:text-blue-500 transition ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <FaLinkedin className="text-base" /> LinkedIn
              </a>
            )}
            {resume.website && (
              <a
                href={resume.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-sm hover:text-blue-500 transition ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <FaGlobe className="text-base" /> Portfolio
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};