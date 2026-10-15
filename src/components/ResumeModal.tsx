import React from 'react';
import { X, Download, Printer, Mail, Phone, Github, Linkedin, Award, GraduationCap, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#38bdf8', '#ffffff'],
    });
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-xs font-mono text-slate-300">Gautam_Kumar_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content / Printable Resume */}
        <div className="p-8 sm:p-12 text-slate-100 max-h-[80vh] overflow-y-auto bg-slate-900">
          
          <div className="border-b border-white/10 pb-6 mb-6">
            <h1 className="text-3xl font-extrabold font-display text-white">{PERSONAL_INFO.name}</h1>
            <p className="text-rose-400 font-medium text-sm mt-1">
              Java Developer | AI Developer | Full Stack Developer | Future Software Engineer
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mt-3">
              <span>Email: {PERSONAL_INFO.email}</span>
              <span>·</span>
              <span>Phone: {PERSONAL_INFO.phoneFormatted}</span>
              <span>·</span>
              <span>GitHub: @{PERSONAL_INFO.githubUsername}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                Executive Profile
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Motivated Computer Science student with comprehensive hands-on engineering experience in Java, Spring Boot microservices, modern React frontends, and AI agent architectures. Passionate about designing robust architectures, solving complex algorithmic challenges, and delivering high-performance digital products.
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                Education
              </h2>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center text-sm font-bold text-white">
                  <span>Bachelor of Technology in Computer Science & Engineering</span>
                  <span className="font-mono text-xs text-slate-400">2023 – 2027</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Focus: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Architecture, Web Technologies.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                Core Competencies & Tooling
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="font-bold text-white block mb-0.5">Languages:</span>
                  <span className="text-slate-300">Java, JavaScript (ES6+), C++, HTML5, CSS3, SQL</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="font-bold text-white block mb-0.5">Frameworks & Modern Stack:</span>
                  <span className="text-slate-300">Spring Boot, React, Tailwind CSS, REST APIs</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="font-bold text-white block mb-0.5">Databases & Cloud:</span>
                  <span className="text-slate-300">MySQL, Firebase Firestore, NoSQL, Git & GitHub</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="font-bold text-white block mb-0.5">AI & Innovations:</span>
                  <span className="text-slate-300">AI Chatbot Development, Prompt Engineering, Agent Workflows</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">
                Representative Software Projects
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="font-bold text-white block">KK Mobile Shop Management Portal</span>
                  <p className="text-slate-300 mt-0.5">
                    Production repair service portal featuring customer status lookup, catalog management, and administrative tracking. Built with HTML, CSS, JavaScript, and database integration.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="font-bold text-white block">Weather Forecast Visualizer</span>
                  <p className="text-slate-300 mt-0.5">
                    Real-time weather analytics application featuring glassmorphism design, multi-day forecasting, responsive canvas conditions, and REST API integration.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <span className="font-bold text-white block">SparkFlow - Student Record Management System</span>
                  <p className="text-slate-300 mt-0.5">
                    Comprehensive student database and academic performance tracking portal with optimized search indices and fast CRUD capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
