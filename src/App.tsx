/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { GithubDashboard } from './components/GithubDashboard';
import { Services } from './components/Services';
import { Achievements } from './components/Achievements';
import { ResumeSection } from './components/ResumeSection';
import { ResumeModal } from './components/ResumeModal';
import { ResumePage } from './components/ResumePage';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';
import { HireModal } from './components/HireModal';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const [viewMode, setViewMode] = useState<'portfolio' | 'resume'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#resume-page' || hash === '#resume-only' || hash === '#cv') {
        return 'resume';
      }
    }
    return 'portfolio';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isHireOpen, setIsHireOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-theme');
    }
  }, [isDark]);

  // Synchronize hash routing for resume page mode
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#resume-page' || hash === '#resume-only' || hash === '#cv') {
        setViewMode('resume');
      } else if (hash === '' || hash === '#') {
        setViewMode('portfolio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const openResumePage = () => {
    setViewMode('resume');
    window.location.hash = 'resume-page';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToPortfolio = () => {
    setViewMode('portfolio');
    if (window.location.hash === '#resume-page' || window.location.hash === '#resume-only') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setContactSubject(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in dedicated Resume Page mode ("resume page only with my photo"):
  if (viewMode === 'resume') {
    return (
      <div className={`min-h-screen relative selection:bg-teal-500 selection:text-slate-950 ${
        isDark ? 'bg-[#040812] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}>
        <ResumePage
          onBack={backToPortfolio}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative selection:bg-rose-600 selection:text-white ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sleek initial load telemetry screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Interactive Particle Backdrop Canvas */}
      <ParticleCanvas isDark={isDark} />

      {/* Background Grid Accent */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

      {/* Navigation Header */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onHireMeClick={() => setIsHireOpen(true)}
        onOpenResumePage={openResumePage}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenResumePage={openResumePage}
          onHireMe={() => setIsHireOpen(true)}
        />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section (Live GitHub API) */}
        <Projects />

        {/* GitHub Dashboard (Live Stats & Contribution Activity) */}
        <GithubDashboard />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* Achievements Section (Animated Counters) */}
        <Achievements />

        {/* Resume Preview & Download Section */}
        <ResumeSection 
          onOpenModal={() => setIsResumeOpen(true)} 
          onOpenResumePage={openResumePage}
        />

        {/* Contact & Social Section */}
        <Contact prefilledSubject={contactSubject} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Dock */}
      <FloatingDock onOpenResumePage={openResumePage} />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onOpenResumePage={openResumePage}
      />

      <HireModal
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
      />

    </div>
  );
}
