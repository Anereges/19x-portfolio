'use client';

import { Certification } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className={`text-lg font-semibold uppercase tracking-wider ${
        isDark ? 'text-blue-400' : 'text-blue-600'
      }`}>
        Certifications
      </h2>
      <div className="mt-3 space-y-2.5">
        {certifications.map((cert) => (
          <div key={cert.id} className={`p-3 rounded-lg border ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <h4 className={`text-sm font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {cert.name}
            </h4>
            <p className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {cert.issuer}
            </p>
            {cert.date && (
              <p className={`text-xs ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {new Date(cert.date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};