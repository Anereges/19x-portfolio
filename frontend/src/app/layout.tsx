'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisitor } from '@/lib/analytics/tracker';
import { useThemeStore } from '@/store/portfolioStore';
import { AdminAccess } from '@/components/layout/AdminAccess';
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Track page view
    const page = pathname === '/' ? 'home' : pathname.replace('/', '');
    trackVisitor(page, pathname);
  }, [pathname]);

  return (
    <html lang="en" className={isDark ? 'dark' : ''}>
      <body className="antialiased">
        <AdminAccess />
        {children}
      </body>
    </html>
  );
}