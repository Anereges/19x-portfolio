'use client';

import { Education } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';

interface EducationSectionProps {
  educations: Education[];
}

export const EducationSection = ({ educations }: EducationSectionProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (!educations || educations.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Education
      </h2>
      <div className="mt-4 space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="relative pl-4 border-l-2 border-green-500/30">
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {edu.degree} in {edu.field}
            </h3>
            <p className={`text-sm font-medium ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              {edu.institution} • {edu.location || 'Remote'}
            </p>
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {new Date(edu.startDate).getFullYear()} – {edu.current ? 'Present' : edu.endDate ? new Date(edu.endDate).getFullYear() : ''}
            </p>
            {edu.description && (
              <p className={`mt-2 text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};