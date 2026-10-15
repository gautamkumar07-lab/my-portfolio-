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

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleSelectService = (serviceName: string) => {
    setContactSubject(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
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
        <ResumeSection onOpenModal={() => setIsResumeOpen(true)} />

        {/* Contact & Social Section */}
        <Contact prefilledSubject={contactSubject} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Dock */}
      <FloatingDock />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <HireModal
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
      />

    </div>
  );
}
