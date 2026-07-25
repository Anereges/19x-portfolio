'use client';

import { useThemeStore } from '@/store/portfolioStore';

const expertiseData = {
  cybersecurity: [
    'Blue Team Operations',
    'Incident Response',
    'Threat Hunting',
    'Security Monitoring',
    'Detection Engineering',
    'Cloud Security'
  ],
  software: [
    'Backend Development',
    'API Development',
    'Full-Stack Development',
    'Database Systems',
    'Secure Software Development'
  ]
};

export const ExpertiseSection = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Technical Focus
      </h2>
      <div className="mt-3 space-y-4">
        <div>
          <h3 className={`text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Cybersecurity
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {expertiseData.cybersecurity.map((item) => (
              <span
                key={item}
                className={`text-xs px-2.5 py-1 rounded ${
                  isDark
                    ? 'bg-red-900/20 text-red-400 border border-red-900/30'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className={`text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Software Engineering
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {expertiseData.software.map((item) => (
              <span
                key={item}
                className={`text-xs px-2.5 py-1 rounded ${
                  isDark
                    ? 'bg-blue-900/20 text-blue-400 border border-blue-900/30'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};