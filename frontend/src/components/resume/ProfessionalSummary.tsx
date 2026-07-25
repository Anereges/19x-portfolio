'use client';

import { useThemeStore } from '@/store/portfolioStore';

interface ProfessionalSummaryProps {
  summary: string;
}

export const ProfessionalSummary = ({ summary }: ProfessionalSummaryProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Professional Summary
      </h2>
      <div className={`mt-3 text-base leading-relaxed ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <p>{summary}</p>
      </div>
    </section>
  );
};