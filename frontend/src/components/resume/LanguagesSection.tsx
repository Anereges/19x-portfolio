'use client';

import { Language } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';

interface LanguagesSectionProps {
  languages: Language[];
}

export const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (!languages || languages.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Languages
      </h2>
      <div className="mt-3 space-y-1.5">
        {languages.map((lang) => (
          <div key={lang.id} className="flex justify-between items-center text-sm">
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              {lang.name}
            </span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};