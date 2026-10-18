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
  Linkedin,
  MapPin,
  Sparkles,
  Maximize2,
  Check,
  FileType,
  FileCode,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '../data/portfolioData';
import defaultPortrait from '../assets/images/gautam_yadav_portrait_1791782839559.jpg';
import { downloadResumePdf, downloadResumeHtml, downloadResumeTxt } from '../utils/resumeDownload';

interface ResumeSectionProps {
  onOpenModal: () => void;
  onOpenResumePage?: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenModal, onOpenResumePage }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [photoSrc] = useState<string>(() => {
    return localStorage.getItem('gautam_custom_photo') || defaultPortrait;
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#06b6d4', '#14b8a6', '#a855f7', '#ffffff'],
    });
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    triggerConfetti();
    try {
      await downloadResumePdf(photoSrc);
      setDownloadSuccess('Gautam_Kumar_Resume.pdf downloaded directly!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      console.error('PDF download error:', e);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadHtml = async () => {
    setDownloading(true);
    triggerConfetti();
    try {
      await downloadResumeHtml(photoSrc);
      setDownloadSuccess('Gautam_Kumar_Resume.html (with Photo) downloaded!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      console.error('HTML download error:', e);
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadTxt = () => {
    triggerConfetti();
    downloadResumeTxt();
    setDownloadSuccess('Gautam_Kumar_Resume.txt (ATS Format) downloaded!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn('Print blocked by browser sandbox, triggering direct PDF download instead:', e);
      handleDownloadPdf();
    }
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
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
              <span>Curriculum Vitae</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Professional Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display">
              Resume with Verified Portrait
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Executive curriculum vitae formatted for software engineering roles, academic review, and hiring managers.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {onOpenResumePage && (
              <button
                onClick={onOpenResumePage}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-teal-300 bg-slate-900/90 border border-teal-500/50 hover:border-teal-400 rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 active:scale-95"
                title="Switch to dedicated resume page only mode"
              >
                <Maximize2 className="w-4 h-4 text-teal-400" />
                <span>Resume Page Only</span>
              </button>
            )}

            {/* Primary Direct Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 hover:brightness-110 rounded-xl shadow-lg shadow-teal-500/25 transition-all active:scale-95 cursor-pointer"
              title="Directly download Gautam_Kumar_Resume.pdf to your device"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Generating PDF...' : 'Download Resume PDF'}</span>
            </button>

            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-300 bg-slate-900/90 border border-slate-700 hover:border-teal-400 rounded-xl transition-all"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Fullscreen Preview</span>
            </button>
          </div>
        </motion.div>

        {/* Multi-format Quick Download Toolbar */}
        <div className="max-w-4xl mx-auto mb-6 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Info className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Direct file download formats (saves immediately to your computer or phone):</span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 font-medium transition-all"
            >
              <FileType className="w-3.5 h-3.5" />
              <span>PDF (.pdf)</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-medium transition-all"
              title="Download standalone HTML resume with your photo included"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>HTML (.html with photo)</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition-all"
              title="Download ATS plain text resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Text (.txt ATS)</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition-all"
              title="Browser print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Download Success Toast Notice */}
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 flex items-center justify-between gap-3 text-sm font-semibold shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span>{downloadSuccess}</span>
            </div>
            <span className="text-xs text-emerald-300/80">Check your device's Downloads folder</span>
          </motion.div>
        )}

        {/* Professional Resume Card with Photo Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl glass-panel border border-teal-500/30 shadow-[0_0_50px_rgba(6,182,212,0.12)] relative max-w-4xl mx-auto bg-slate-950/90 text-slate-100"
        >
          
          {/* Executive Header with Gautam's Photo */}
          <div className="border-b border-slate-800 pb-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                
                {/* Photo container with executive styling */}
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-400 to-indigo-500 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-2 ring-teal-400/90 bg-slate-900 shadow-2xl">
                    <img
                      src={photoSrc}
                      alt={RESUME_DATA.fullName}
                      className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] transition-transform duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                    
                    {/* Verified Candidate Badge */}
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-slate-950/90 border border-teal-500/60 text-[9px] font-bold text-teal-300 flex items-center gap-1 shadow">
                      <Sparkles className="w-2.5 h-2.5 text-teal-400" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                    {RESUME_DATA.fullName}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-teal-400 mt-1">
                    {RESUME_DATA.title}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs sm:text-sm text-slate-300">
                    <a href={`mailto:${RESUME_DATA.contact.email}`} className="flex items-center gap-1.5 hover:text-teal-300 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-teal-400" />
                      <span>{RESUME_DATA.contact.email}</span>
                    </a>
                    <a href={`tel:${RESUME_DATA.contact.phone}`} className="flex items-center gap-1.5 hover:text-teal-300 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-teal-400" />
                      <span>{RESUME_DATA.contact.phone}</span>
                    </a>
                    <a 
                      href={`https://${RESUME_DATA.contact.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 hover:text-teal-300 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-teal-400" />
                      <span>{RESUME_DATA.contact.github}</span>
                    </a>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span>{RESUME_DATA.contact.location}</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Career Objective */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Career Objective</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
              {RESUME_DATA.objective}
            </p>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              <span>Education</span>
            </h4>
            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <span className="font-bold text-base sm:text-lg text-white">
                  {RESUME_DATA.education.degree}
                </span>
                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-md border border-teal-500/20 w-fit">
                  {RESUME_DATA.education.period}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mb-3">
                {RESUME_DATA.education.institution}
              </p>
              <div>
                <p className="text-xs font-semibold text-slate-300 mb-1.5">Relevant Coursework:</p>
                <div className="flex flex-wrap gap-1.5">
                  {RESUME_DATA.education.coursework.map((course, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Technical Skills</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESUME_DATA.skills.map((skillGroup, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 hover:border-teal-500/40 transition-colors"
                >
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>{skillGroup.category}</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2.5 py-1 text-xs rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlighted Engineering Projects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-teal-400" />
              <span>Highlighted Engineering Projects</span>
            </h4>
            <div className="space-y-4">
              {RESUME_DATA.projects.map((project, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80 hover:border-teal-500/30 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h5 className="font-bold text-base text-white group-hover:text-teal-300 transition-colors">
                      {project.title}
                    </h5>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700 w-fit">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Download Action Button at the bottom of the card */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Verified Candidate Resume · Gautam Kumar · All Rights Reserved
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloading ? 'Downloading...' : 'Download Resume PDF'}</span>
              </button>

              <button
                onClick={handleDownloadHtml}
                disabled={downloading}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-teal-400 rounded-xl transition-all"
              >
                <FileCode className="w-3.5 h-3.5 text-teal-400" />
                <span>Download HTML</span>
              </button>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
