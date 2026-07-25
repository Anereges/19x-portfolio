'use client';

import { Experience } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Professional Experience
      </h2>
      <div className="mt-4 space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-4 border-l-2 border-blue-500/30">
            <div className="flex flex-wrap items-start justify-between gap-1">
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {exp.position}
              </h3>
              <span className={`text-sm whitespace-nowrap ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {new Date(exp.startDate).getFullYear()} – {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'N/A'}
              </span>
            </div>
            <p className={`text-sm font-medium ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {exp.company} • {exp.location || 'Remote'}
            </p>
            <ul className={`mt-3 space-y-1.5 text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {exp.description.split('\n').map((item, idx) => (
                item.trim() && (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">▹</span>
                    <span>{item.trim()}</span>
                  </li>
                )
              ))}
            </ul>
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs px-2 py-0.5 rounded ${
                      isDark
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};