import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Phone, 
  FileText, 
  Download 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PhotoCard } from './PhotoCard';

interface HeroProps {
  onOpenResume: () => void;
  onHireMe: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onHireMe }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        {/* Split Grid: Left Column Typography, Right Column PhotoCard from screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Exactly matches user's screenshot */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill Badge: open to internships & SDE roles */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/80 border border-teal-500/40 text-teal-300 font-mono text-xs font-medium shadow-[0_0_15px_rgba(20,184,166,0.25)] mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>open to internships &amp; SDE roles</span>
            </div>

            {/* Headline matching screenshot: Hi, I'm / Gautam / Kumar */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4 font-display">
              <span className="text-white block">Hi, I'm</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 block">
                Gautam
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 block">
                Kumar
              </span>
            </h1>

            {/* Subtitle from screenshot */}
            <div className="text-sm sm:text-base font-medium text-slate-300 mb-3 flex items-center flex-wrap gap-2">
              <span>B.Tech CSE Student</span>
              <span className="text-teal-400">•</span>
              <span>Software Developer</span>
              <span className="text-teal-400">•</span>
              <span>Programmer</span>
            </div>

            {/* Description from screenshot */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed mb-8">
              Building skills, solving problems, and creating impactful software through code, creativity and continuous learning.
            </p>

            {/* Buttons from screenshot */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              {/* Primary: View My Projects → with vibrant glowing cyan gradient */}
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:from-[#00e1ec] hover:to-[#389bfe] rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.55)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all active:scale-98 whitespace-nowrap"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary: Contact Me (dark glass button) */}
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-500/60 rounded-xl shadow-lg transition-all active:scale-98 whitespace-nowrap"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Icons Dock from screenshot */}
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/60 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-md"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/60 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-md"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                title="Email"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/60 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-md"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                title="Phone"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/60 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-md"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                title="Resume"
                className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/60 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-md"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: PhotoCard with circular avatar and 4 floating badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhotoCard />
          </div>

        </div>

        {/* Telemetry Metrics strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-white">
              35+
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              Public Repositories
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-teal-400">
              1,400+
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              Hours of Code Logged
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-purple-400">
              13+
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              Technologies Mastered
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-400">
              100%
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              Commitment &amp; Problem Solving
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
