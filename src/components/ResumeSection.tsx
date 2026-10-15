import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  Printer, 
  FileText,
  Mail,
  Phone,
  Github,
  Linkedin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenModal }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#e11d48', '#38bdf8', '#fbbf24', '#ffffff'],
    });

    // Create printable window or simulated download
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 400);
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
              <span>Curriculum Vitae</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Credentials & Coursework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              Professional Resume Preview
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Detailed technical history, academic milestones, and engineering capabilities formatted for hiring managers and recruiters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-lg shadow-rose-600/25 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing Document...' : 'Download Resume'}</span>
            </button>

            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-rose-500 rounded-xl transition-all"
            >
              <FileText className="w-4 h-4 text-rose-500" />
              <span>Expand Fullscreen</span>
            </button>
          </div>
        </motion.div>

        {/* Professional Resume Preview Card (Paper layout) with Motion Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 shadow-2xl relative max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100"
        >
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-rose-600 dark:text-rose-400 font-medium text-sm mt-1">
                  Java Developer · AI Developer · Future Software Engineer
                </p>
              </div>

              <div className="flex flex-col text-xs text-slate-600 dark:text-slate-400 font-mono gap-1">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-rose-500" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                  <span>{PERSONAL_INFO.phoneFormatted}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-rose-500" />
                  <span>github.com/{PERSONAL_INFO.githubUsername}</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Aspiring Software Development Engineer (SDE) and Computer Science student with a strong command of Java, Object-Oriented Programming, and Spring Boot. Actively engineering full-stack web applications and AI-driven solutions. Seeking opportunities to apply strong analytical capabilities to solve real-world problems.
            </p>
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Bachelor of Technology in Computer Science & Engineering
                </h4>
                <span className="text-xs font-mono text-slate-500">2023 – 2027</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Relevant Coursework: Data Structures & Algorithms, Object-Oriented Analysis & Design, Database Management Systems (DBMS), Operating Systems, Computer Networks, Software Engineering.
              </p>
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4">
              <Award className="w-4 h-4" />
              <span>Technical Skills</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Languages & Core:</span>
                <span className="text-slate-600 dark:text-slate-300">Java, JavaScript (ES6+), C++, HTML5, CSS3, SQL</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Frameworks & Libraries:</span>
                <span className="text-slate-600 dark:text-slate-300">Spring Boot, React, Tailwind CSS, Hibernate / JPA</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">AI & Prompt Engineering:</span>
                <span className="text-slate-600 dark:text-slate-300">LLM Integration, Prompt Engineering, Agentic Workflows</span>
              </div>

              <div className="p-3 rounded-lg border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Databases & Tools:</span>
                <span className="text-slate-600 dark:text-slate-300">MySQL, Firebase Firestore, Git, GitHub, RESTful APIs</span>
              </div>
            </div>
          </div>

          {/* Featured Key Projects */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-4">
              <Briefcase className="w-4 h-4" />
              <span>Highlighted Engineering Projects</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200/60 dark:border-white/5 hover:border-rose-500/30 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    KK Mobile Shop Portal & Repair Management
                  </h4>
                  <span className="text-xs font-mono text-slate-400">Web / Admin</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Engineered a complete mobile service portal for tracking customer repair status, managing repair inventory, and facilitating direct inquiry communications.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/60 dark:border-white/5 hover:border-rose-500/30 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Weather Forecast Web App with Dynamic Visualizer
                  </h4>
                  <span className="text-xs font-mono text-slate-400">JavaScript / REST</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Created a weather platform with real-time API connectivity, multi-day forecasting, interactive background conditions, and instant city search.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/60 dark:border-white/5 hover:border-rose-500/30 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    SparkFlow - Student Record Management System
                  </h4>
                  <span className="text-xs font-mono text-slate-400">Database / System</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Designed a scalable student record management architecture with optimized indexing, CRUD records, grade calculation, and fast query execution.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Card Action */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Verified Academic Credentials & Technical Portfolio
            </span>
            <button
              onClick={handleDownload}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print or Save as PDF</span>
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
