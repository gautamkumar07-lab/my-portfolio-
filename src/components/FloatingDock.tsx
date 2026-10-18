import React from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FloatingDockProps {
  onOpenResumePage?: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onOpenResumePage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Quick contact links"
      className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel shadow-2xl border border-teal-500/30 bg-slate-950/85 backdrop-blur-xl"
    >
      {onOpenResumePage && (
        <button
          onClick={onOpenResumePage}
          title="Resume Page with Verified Photo"
          aria-label="View Resume Page"
          className="p-2.5 rounded-xl text-teal-400 hover:text-teal-200 hover:bg-teal-950/60 transition-all hover:-translate-y-1"
        >
          <FileText className="w-4 h-4" />
        </button>
      )}

      <a
        href={PERSONAL_INFO.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="p-2.5 rounded-xl text-slate-300 hover:text-teal-400 hover:bg-slate-900/60 transition-all hover:-translate-y-1"
      >
        <Github className="w-4 h-4" />
      </a>

      <a
        href={PERSONAL_INFO.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="p-2.5 rounded-xl text-slate-300 hover:text-teal-400 hover:bg-slate-900/60 transition-all hover:-translate-y-1"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <a
        href={`mailto:${PERSONAL_INFO.email}`}
        aria-label="Email"
        className="p-2.5 rounded-xl text-slate-300 hover:text-teal-400 hover:bg-slate-900/60 transition-all hover:-translate-y-1"
      >
        <Mail className="w-4 h-4" />
      </a>

      <a
        href={`tel:${PERSONAL_INFO.phone}`}
        aria-label="Call"
        className="p-2.5 rounded-xl text-slate-300 hover:text-teal-400 hover:bg-slate-900/60 transition-all hover:-translate-y-1"
      >
        <Phone className="w-4 h-4" />
      </a>

      <div className="w-px h-5 bg-slate-700/60 mx-1" />

      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="p-2.5 rounded-xl text-slate-300 hover:text-teal-400 hover:bg-slate-900/60 transition-all hover:-translate-y-1"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </aside>
  );
};
