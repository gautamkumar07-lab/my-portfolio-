import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Award, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  ExternalLink,
  Maximize2,
  Sparkles,
  Check,
  FileCode,
  FileType
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESUME_DATA } from '../data/portfolioData';
import defaultPortrait from '../assets/images/gautam_yadav_portrait_1791782839559.jpg';
import { downloadResumePdf, downloadResumeHtml, downloadResumeTxt } from '../utils/resumeDownload';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumePage?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onOpenResumePage }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [photoSrc] = useState<string>(() => {
    return localStorage.getItem('gautam_custom_photo') || defaultPortrait;
  });

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#14b8a6', '#06b6d4', '#ffffff'],
    });
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    triggerConfetti();
    try {
      await downloadResumePdf(photoSrc);
      setDownloadSuccess('Gautam_Kumar_Resume.pdf downloaded!');
      setTimeout(() => setDownloadSuccess(null), 3500);
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
      setDownloadSuccess('Gautam_Kumar_Resume.html downloaded!');
      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch (e) {
      console.error('HTML download error:', e);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    triggerConfetti();
    try {
      window.print();
    } catch (e) {
      console.warn('Print blocked by sandbox, downloading PDF instead:', e);
      handleDownloadPdf();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-teal-500/40 rounded-3xl shadow-[0_0_50px_rgba(20,184,166,0.2)] overflow-hidden my-8 ring-1 ring-white/10">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300">Gautam_Kumar_Resume.pdf</span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {onOpenResumePage && (
              <button
                onClick={() => {
                  onClose();
                  onOpenResumePage();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-300 bg-slate-800/80 hover:bg-slate-700/80 border border-teal-500/30 rounded-lg transition-all"
                title="View Full Standalone Resume Page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Resume Page Mode</span>
              </button>
            )}

            {/* Direct Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:brightness-110 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
              title="Directly download PDF to your device"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              disabled={downloading}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-cyan-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-cyan-500/30"
              title="Download standalone HTML with photo"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>HTML</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-slate-700"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/40 px-6 py-2.5 text-xs text-emerald-200 flex items-center justify-between">
            <span className="flex items-center gap-2 font-semibold">
              <Check className="w-4 h-4 text-emerald-400" />
              {downloadSuccess}
            </span>
            <span className="text-emerald-300/80">Saved to Downloads</span>
          </div>
        )}

        {/* Modal Content / Printable Resume with Gautam's Photo */}
        <div className="p-6 sm:p-10 text-slate-100 max-h-[80vh] overflow-y-auto bg-slate-950">
          
          {/* Header with Photo */}
          <div className="border-b border-slate-800 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
              
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Photo container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-teal-400/80 ring-offset-2 ring-offset-slate-950 shadow-xl shrink-0">
                  <img
                    src={photoSrc}
                    alt={RESUME_DATA.fullName}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/90 text-[8px] font-bold text-teal-300 border border-teal-500/60">
                    Verified
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
                    {RESUME_DATA.fullName}
                  </h1>
                  <p className="text-teal-400 font-semibold text-xs sm:text-sm mt-1">
                    {RESUME_DATA.title}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-teal-400" />
                      {RESUME_DATA.contact.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-teal-400" />
                      {RESUME_DATA.contact.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Github className="w-3.5 h-3.5 text-teal-400" />
                      {RESUME_DATA.contact.github}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      {RESUME_DATA.contact.location}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Career Objective */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
              Career Objective
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
              {RESUME_DATA.objective}
            </p>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </h2>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-sm text-white">{RESUME_DATA.education.degree}</span>
                <span className="text-xs font-mono text-teal-400 font-bold">{RESUME_DATA.education.period}</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">{RESUME_DATA.education.institution}</p>
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-slate-200">Relevant Coursework: </span>
                <span>{RESUME_DATA.education.coursework.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RESUME_DATA.skills.map((skillGroup, idx) => (
                <div key={idx} className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block mb-1">
                    {skillGroup.category}
                  </span>
                  <p className="text-xs text-slate-300">{skillGroup.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Highlighted Engineering Projects</span>
            </h2>
            <div className="space-y-3">
              {RESUME_DATA.projects.map((proj, idx) => (
                <div key={idx} className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs sm:text-sm text-white">{proj.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Need offline copy? Download in direct file format below:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all"
              >
                <Download className="w-3 h-3" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={handleDownloadHtml}
                disabled={downloading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-slate-700"
              >
                <FileCode className="w-3 h-3 text-cyan-400" />
                <span>HTML (Photo)</span>
              </button>
              <button
                onClick={downloadResumeTxt}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-slate-700"
              >
                <span>ATS Text</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
