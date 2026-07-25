'use client';

import { useThemeStore } from '@/store/portfolioStore';

const skillsData = {
  'Programming Languages': ['Python', 'JavaScript', 'TypeScript'],
  'Backend': ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'WebSockets'],
  'Frontend': ['React', 'Next.js', 'Vue.js', 'Tailwind CSS'],
  'Databases': ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'SQLAlchemy', 'Mongoose'],
  'Cybersecurity': ['Linux', 'Blue Team', 'Incident Response', 'Threat Hunting', 'Security Monitoring', 'Detection Engineering', 'Network Security'],
  'DevOps / Cloud': ['Git', 'GitHub', 'Docker', 'CI/CD', 'Cloud Deployment'],
};

export const SkillsSection = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Core Skills
      </h2>
      <div className="mt-3 space-y-4">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category}>
            <h3 className={`text-sm font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {category}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-xs rounded-full ${
                    isDark
                      ? 'bg-gray-800 text-gray-300 border border-gray-700'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};