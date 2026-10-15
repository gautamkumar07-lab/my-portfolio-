import React from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const FloatingDock: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Quick contact links"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel shadow-2xl border border-slate-200/80 dark:border-white/10"
    >
      <a
        href={PERSONAL_INFO.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-1"
      >
        <Github className="w-4 h-4" />
      </a>

      <a
        href={PERSONAL_INFO.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-1"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <a
        href={`mailto:${PERSONAL_INFO.email}`}
        aria-label="Email"
        className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-1"
      >
        <Mail className="w-4 h-4" />
      </a>

      <a
        href={`tel:${PERSONAL_INFO.phone}`}
        aria-label="Call"
        className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-1"
      >
        <Phone className="w-4 h-4" />
      </a>

      <div className="w-px h-5 bg-slate-300 dark:bg-white/10 mx-1" />

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-1"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </aside>
  );
};
