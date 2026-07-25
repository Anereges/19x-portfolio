'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AdminAccess = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+A
      if (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        
        // Check if already on login page
        if (window.location.pathname === '/login') {
          return;
        }
        
        // Check if already logged in (has token)
        const token = localStorage.getItem('accessToken');
        if (token) {
          router.push('/admin');
        } else {
          router.push('/login');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return null;
};