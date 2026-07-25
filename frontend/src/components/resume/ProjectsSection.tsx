'use client';

import { useThemeStore } from '@/store/portfolioStore';

const projectsData = [
  {
    name: 'Incident Response System',
    description: 'Comprehensive incident response platform for security teams with real-time alerting and case management.',
    technologies: ['Node.js', 'React', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/example/irs',
    demo: 'https://demo.irs.com',
  },
  {
    name: 'Advanced Port Scanner',
    description: 'Powerful network port scanner with advanced features for security professionals and penetration testers.',
    technologies: ['Python', 'Scapy', 'Nmap', 'Docker'],
    github: 'https://github.com/example/port-scanner',
    demo: 'https://demo.portscanner.com',
  },
  {
    name: 'Life Management Dashboard',
    description: 'Personal dashboard for managing daily tasks, goals, habits, and analytics.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    github: 'https://github.com/example/life-dashboard',
    demo: 'https://demo.life-dashboard.com',
  },
  {
    name: 'Portfolio Platform',
    description: 'Full-stack dual-mode portfolio platform with dynamic mode switching and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'Prisma'],
    github: 'https://github.com/example/portfolio',
    demo: 'https://portfolio.example.com',
  },
];

export const ProjectsSection = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Featured Projects
      </h2>
      <div className="mt-4 space-y-4">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              isDark ? 'border-gray-800' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {project.name}
              </h3>
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm hover:text-blue-500 transition ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:text-blue-600 transition"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
            <p className={`text-sm mt-1 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.technologies.map((tech) => (
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
          </div>
        ))}
      </div>
    </section>
  );
};