'use client';

import { Navbar } from '@/components/layout/Navbar';
import { AboutSection } from '@/components/portfolio/AboutSection';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutSection />
      <Footer />
    </main>
  );
}