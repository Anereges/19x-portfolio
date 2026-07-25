'use client';

import { Navbar } from '@/components/layout/Navbar';
import { ProjectsSection } from '@/components/portfolio/ProjectsSection';
import { Footer } from '@/components/layout/Footer';

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <ProjectsSection />
      <Footer />
    </main>
  );
}