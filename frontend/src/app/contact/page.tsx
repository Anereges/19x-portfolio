'use client';

import { Navbar } from '@/components/layout/Navbar';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}