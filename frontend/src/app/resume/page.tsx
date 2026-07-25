'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { resumeApi } from '@/lib/api/resume';
import { Resume as ResumeType } from '@/types';
import { useThemeStore } from '@/store/portfolioStore';
import { ResumeHeader } from '@/components/resume/ResumeHeader';
import { ResumeActions } from '@/components/resume/ResumeActions';
import { ProfessionalSummary } from '@/components/resume/ProfessionalSummary';
import { SkillsSection } from '@/components/resume/SkillsSection';
import { ExperienceSection } from '@/components/resume/ExperienceSection';
import { EducationSection } from '@/components/resume/EducationSection';
import { ProjectsSection } from '@/components/resume/ProjectsSection';
import { CertificationsSection } from '@/components/resume/CertificationsSection';
import { ExpertiseSection } from '@/components/resume/ExpertiseSection';
import { LanguagesSection } from '@/components/resume/LanguagesSection';
import { InterestsSection } from '@/components/resume/InterestsSection';

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await resumeApi.getPublicResume();
        if (response.success && response.data) {
          setResume(response.data);
        } else {
          setError('Resume not available');
        }
      } catch (err) {
        setError('Unable to load resume');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading resume...
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !resume) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">📄</div>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Resume Not Available
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              The resume is currently not public or has not been created yet.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
          <ResumeHeader resume={resume} />
          <ResumeActions />
          
          <div className="px-6 sm:px-8 lg:px-10 py-6 space-y-8 print:space-y-6">
            <ProfessionalSummary summary={resume.summary} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ExperienceSection experiences={resume.experiences} />
                <ProjectsSection />
                <EducationSection educations={resume.educations} />
              </div>
              <div className="space-y-8">
                <ExpertiseSection />
                <SkillsSection />
                <CertificationsSection certifications={resume.certifications} />
                <LanguagesSection languages={resume.languages} />
                <InterestsSection interests={resume.interests} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6 print:hidden">
          Resume updated {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}