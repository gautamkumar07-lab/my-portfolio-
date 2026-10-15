import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Instagram, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-12 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/5">
          {/* Brand & Wordmark */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-rose-500 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md shadow-rose-600/30">
              GK
            </span>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-slate-900 dark:text-white text-base">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Java & AI Systems Developer
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-500/40 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-500/40 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-500/40 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-500/40 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-500/40 transition-all ml-2"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} Gautam Kumar. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with Java rigor, modern React, and uncompromised precision.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
