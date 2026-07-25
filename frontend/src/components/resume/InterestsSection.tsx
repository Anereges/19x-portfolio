'use client';

import { Interest } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';

interface InterestsSectionProps {
  interests: Interest[];
}

export const InterestsSection = ({ interests }: InterestsSectionProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (!interests || interests.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Interests
      </h2>
      <div className="flex flex-wrap gap-2 mt-3">
        {interests.map((interest) => (
          <span
            key={interest.id}
            className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {interest.icon || '•'} {interest.name}
          </span>
        ))}
      </div>
    </section>
  );
};