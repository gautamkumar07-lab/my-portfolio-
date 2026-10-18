import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  MapPin, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Copy, 
  Check, 
  ExternalLink, 
  Sun, 
  Moon, 
  CheckCircle2, 
  ShieldCheck, 
  Share2,
  FileCode,
  FileType,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '../data/portfolioData';
import defaultPortrait from '../assets/images/gautam_yadav_portrait_1791782839559.jpg';
import { downloadResumePdf, downloadResumeHtml, downloadResumeTxt } from '../utils/resumeDownload';

interface ResumePageProps {
  onBack: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({ onBack, isDark, toggleTheme }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [photoSrc] = useState<string>(() => {
    return localStorage.getItem('gautam_custom_photo') || defaultPortrait;
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#14b8a6', '#06b6d4', '#a855f7', '#ffffff'],
    });
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    triggerConfetti();
    try {
      await downloadResumePdf(photoSrc);
      setDownloadSuccess('Gautam_Kumar_Resume.pdf downloaded successfully!');
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      console.error('Error generating PDF:', e);
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
      console.error('Error downloading HTML:', e);
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
    triggerConfetti();
    try {
      window.print();
    } catch (e) {
      console.warn('Browser print blocked, using direct PDF download instead:', e);
      handleDownloadPdf();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Gautam Kumar - Executive Resume',
        text: 'Resume of Gautam Kumar - Java Developer, AI Developer, Future Software Engineer',
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy(window.location.href, 'link');
    }
  };

  return (
    <div className={`min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300 print:p-0 print:bg-white print:text-black ${
      isDark ? 'bg-[#040812] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Top Floating Control Bar (Hidden when printing) */}
      <header className="max-w-4xl mx-auto mb-6 print:hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl glass-panel bg-slate-950/80 border border-teal-500/30 shadow-xl backdrop-blur-xl">
          
          {/* Back to Portfolio CTA */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-teal-400 rounded-xl transition-all shadow-sm active:scale-95 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </button>

          {/* Action Toolbar */}
          <div className="flex items-center flex-wrap gap-2 justify-end">
            
            {/* Direct PDF Download button */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 hover:brightness-110 rounded-xl shadow-lg shadow-teal-500/25 transition-all active:scale-95 cursor-pointer"
              title="Download Gautam_Kumar_Resume.pdf directly to your computer or phone"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            {/* Direct HTML Resume Download */}
            <button
              onClick={handleDownloadHtml}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 rounded-xl transition-all active:scale-95 cursor-pointer"
              title="Download standalone HTML resume with photo embedded"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Download HTML</span>
              <span className="md:hidden">HTML</span>
            </button>

            {/* Direct ATS Text Resume Download */}
            <button
              onClick={handleDownloadTxt}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all active:scale-95 cursor-pointer"
              title="Download ATS plain text resume (.txt)"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>ATS Text</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all cursor-pointer"
              title="Print document or Save via system dialog"
            >
              <Printer className="w-4 h-4 text-teal-400" />
            </button>

            {/* Share / Link Button */}
            <button
              onClick={handleShare}
              className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all cursor-pointer"
              title="Share or Copy Resume Link"
            >
              {copied === 'link' ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-teal-400" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
            </button>
          </div>
        </div>

        {/* Download Success Toast Notice */}
        {downloadSuccess && (
          <div className="mt-3 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{downloadSuccess}</span>
            </div>
            <span className="text-[11px] text-emerald-300/80">Saved to Downloads</span>
          </div>
        )}
      </header>

      {/* Standalone Executive Resume Document Sheet */}
      <main className="max-w-4xl mx-auto">
        <article className={`p-8 sm:p-12 lg:p-16 rounded-3xl transition-all duration-300 shadow-2xl relative print:shadow-none print:border-none print:p-0 print:rounded-none ${
          isDark 
            ? 'bg-slate-950/95 border border-teal-500/30 shadow-[0_0_60px_rgba(20,184,166,0.12)] text-slate-100 ring-1 ring-white/5' 
            : 'bg-white border border-slate-300 shadow-xl text-slate-900'
        }`}>
          
          {/* Top Decorative Header Accent (Screen Only) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 rounded-t-3xl print:hidden" />

          {/* =========================================================
              EXECUTIVE HEADER WITH GAUTAM'S VERIFIED PORTRAIT PHOTO
              ========================================================= */}
          <header className="border-b border-slate-800 print:border-slate-300 pb-8 mb-8">
            <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8">
              
              {/* Text Information Column */}
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-teal-400 bg-teal-950/60 border border-teal-500/30 mb-3 print:hidden">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span>VERIFIED APPLICANT DOSSIER</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white print:text-black">
                  {RESUME_DATA.fullName}
                </h1>

                <p className="mt-2 text-base sm:text-lg font-semibold text-teal-400 print:text-teal-700">
                  {RESUME_DATA.title}
                </p>

                {/* Direct Contact Icons & Links */}
                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300 print:text-slate-700">
                  <button
                    onClick={() => handleCopy(RESUME_DATA.contact.email, 'email')}
                    className="inline-flex items-center gap-1.5 hover:text-teal-300 transition-colors group cursor-pointer"
                    title="Click to copy email"
                  >
                    <Mail className="w-3.5 h-3.5 text-teal-400 print:text-black" />
                    <span>{RESUME_DATA.contact.email}</span>
                    {copied === 'email' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 print:hidden" />
                    )}
                  </button>

                  <span className="text-slate-600 print:hidden">•</span>

                  <button
                    onClick={() => handleCopy(RESUME_DATA.contact.phone, 'phone')}
                    className="inline-flex items-center gap-1.5 hover:text-teal-300 transition-colors group cursor-pointer"
                    title="Click to copy phone"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-400 print:text-black" />
                    <span>{RESUME_DATA.contact.phone}</span>
                    {copied === 'phone' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 print:hidden" />
                    )}
                  </button>

                  <span className="text-slate-600 print:hidden">•</span>

                  <a
                    href={`https://${RESUME_DATA.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-teal-300 transition-colors group"
                  >
                    <Github className="w-3.5 h-3.5 text-teal-400 print:text-black" />
                    <span>{RESUME_DATA.contact.github}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 print:hidden" />
                  </a>

                  <span className="text-slate-600 print:hidden">•</span>

                  <span className="inline-flex items-center gap-1.5 text-slate-400 print:text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 print:text-black" />
                    <span>{RESUME_DATA.contact.location}</span>
                  </span>
                </div>
              </div>

              {/* Verified Portrait Photo */}
              <div className="shrink-0 relative group">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-teal-400 via-cyan-400 to-indigo-500 opacity-70 blur-md group-hover:opacity-100 transition-all duration-300 print:hidden" />
                
                <div className="relative w-32 h-36 sm:w-36 sm:h-44 rounded-2xl overflow-hidden ring-4 ring-teal-400/80 ring-offset-2 ring-offset-slate-950 bg-slate-900 shadow-2xl print:ring-2 print:ring-black print:w-28 print:h-32">
                  <img
                    src={photoSrc}
                    alt={RESUME_DATA.fullName}
                    className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02] transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Executive Badge Sheen */}
                  <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-center print:hidden">
                    <span className="text-[10px] font-bold text-teal-300 tracking-wider uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-teal-400" />
                      <span>Verified Photo</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </header>

          {/* =========================================================
              SECTION 1: CAREER OBJECTIVE
              ========================================================= */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-400 print:text-teal-800 mb-3 flex items-center gap-2 border-b border-teal-500/30 print:border-teal-800 pb-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 print:bg-black" />
              <span>Career Objective</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 print:text-slate-800 leading-relaxed font-sans">
              {RESUME_DATA.objective}
            </p>
          </section>

          {/* =========================================================
              SECTION 2: EDUCATION
              ========================================================= */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-400 print:text-teal-800 mb-3 flex items-center gap-2 border-b border-teal-500/30 print:border-teal-800 pb-1.5">
              <GraduationCap className="w-4 h-4 text-teal-400 print:text-black" />
              <span>Education</span>
            </h2>

            <div className="bg-slate-900/50 print:bg-transparent p-5 rounded-2xl border border-slate-800/80 print:border-none print:p-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base sm:text-lg font-bold text-white print:text-black">
                  {RESUME_DATA.education.degree}
                </h3>
                <span className="text-xs font-mono font-bold text-teal-400 print:text-black bg-teal-950/50 print:bg-transparent border border-teal-500/30 print:border-none px-2.5 py-0.5 rounded-full w-fit">
                  {RESUME_DATA.education.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 print:text-slate-600 mt-1">
                {RESUME_DATA.education.institution}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-800/60 print:border-slate-300">
                <span className="text-xs font-semibold text-slate-200 print:text-black">Relevant Coursework: </span>
                <span className="text-xs text-slate-300 print:text-slate-700">
                  {RESUME_DATA.education.coursework.join(', ')}
                </span>
              </div>
            </div>
          </section>

          {/* =========================================================
              SECTION 3: TECHNICAL SKILLS
              ========================================================= */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-400 print:text-teal-800 mb-3 flex items-center gap-2 border-b border-teal-500/30 print:border-teal-800 pb-1.5">
              <Award className="w-4 h-4 text-teal-400 print:text-black" />
              <span>Technical Skills</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESUME_DATA.skills.map((skillGroup, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/40 print:bg-transparent p-4 rounded-xl border border-slate-800/80 print:border-none print:p-0"
                >
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300 print:text-black flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 print:text-black" />
                    <span>{skillGroup.category}</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/90 print:bg-slate-100 text-slate-200 print:text-slate-900 border border-slate-700/60 print:border-slate-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              SECTION 4: HIGHLIGHTED ENGINEERING PROJECTS
              ========================================================= */}
          <section className="mb-8">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-400 print:text-teal-800 mb-3 flex items-center gap-2 border-b border-teal-500/30 print:border-teal-800 pb-1.5">
              <Briefcase className="w-4 h-4 text-teal-400 print:text-black" />
              <span>Highlighted Engineering Projects</span>
            </h2>

            <div className="space-y-4">
              {RESUME_DATA.projects.map((proj, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/40 print:bg-transparent p-5 rounded-2xl border border-slate-800/80 print:border-b print:border-slate-300 print:p-0 print:pb-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-teal-400 print:text-black font-bold text-sm">
                        0{idx + 1}.
                      </span>
                      <h3 className="font-bold text-base text-white print:text-black">
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-teal-300 print:hidden"
                          title="View Repository"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs font-mono text-teal-400 bg-teal-950/50 border border-teal-500/30 px-2.5 py-0.5 rounded-full print:border-slate-400 print:text-slate-800 print:bg-slate-100">
                      {proj.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================
              DOCUMENT FOOTER / VERIFICATION FOOTNOTE
              ========================================================= */}
          <footer className="pt-6 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 print:text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-black" />
              <span>Verified Developer Portfolio · Gautam Kumar (gautamkumar07-lab)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="text-teal-400 hover:text-teal-300 font-bold underline underline-offset-4 flex items-center gap-1 print:hidden cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume PDF</span>
              </button>
            </div>
          </footer>

        </article>
      </main>

    </div>
  );
};
