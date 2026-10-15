import React, { useState } from 'react';
import { X, Send, Briefcase, Check, Phone, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose }) => {
  const [roleType, setRoleType] = useState('Full-Time Software Engineer');
  const [company, setCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fbbf24', '#ffffff'],
    });
    setSent(true);

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `Hiring Opportunity: ${roleType} at ${company || 'Organization'}`
    )}&body=${encodeURIComponent(
      `Role: ${roleType}\nCompany: ${company}\nContact: ${contactEmail}\n\nProject / Role Details:\n${details}`
    )}`;

    window.open(mailtoUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8 text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-600/20 text-rose-500">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">Hire Gautam Kumar</h3>
              <p className="text-xs text-rose-400">Available for SDE Roles & Engineering Contracts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold font-display">Inquiry Dispatched!</h4>
            <p className="text-xs text-slate-300 mt-2">
              Thank you! Gautam has been notified and will get in touch immediately.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 rounded-xl transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Engagement Model / Role
              </label>
              <select
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500"
              >
                <option value="Full-Time Software Engineer">Full-Time Software Engineer (SDE)</option>
                <option value="Java Backend Developer">Java Backend Developer</option>
                <option value="AI / Full Stack Developer">AI / Full Stack Developer</option>
                <option value="Software Engineering Intern">Software Engineering Intern</option>
                <option value="Freelance / Contract Project">Freelance / Contract Project</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Tech"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="recruiter@acme.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Opportunity Summary
              </label>
              <textarea
                rows={3}
                required
                placeholder="Briefly describe the role, team stack, or project scope..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-lg shadow-rose-600/30 transition-all active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Hiring Inquiry</span>
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>{PERSONAL_INFO.phoneFormatted}</span>
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
