import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Sparkles,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  prefilledSubject?: string;
}

export const Contact: React.FC<ContactProps> = ({ prefilledSubject = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(prefilledSubject);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Update subject if prefilled changes
  React.useEffect(() => {
    if (prefilledSubject) {
      setSubject(`Inquiry regarding: ${prefilledSubject}`);
    }
  }, [prefilledSubject]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Trigger confetti
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#38bdf8', '#10b981', '#ffffff'],
    });

    setSubmitted(true);

    // Formulate direct mailto link as fallback
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || `Portfolio Inquiry from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <span>Direct Channels</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Let's build something remarkable together.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Interested in hiring me for software engineering roles, full-stack or AI projects, or have questions? Reach out directly via the form, email, or telephone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards & Social Links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Direct Cards */}
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Primary Email</span>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white hover:text-rose-500 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Direct Telephone / WhatsApp</span>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-xl font-bold font-mono text-slate-900 dark:text-white hover:text-rose-500 transition-colors"
                >
                  {PERSONAL_INFO.phoneFormatted}
                </a>
              </div>

              {/* Location & Availability Card */}
              <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Based in India · Open to Relocation & Remote</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Typical Response Time: &lt; 24 Hours</span>
                </div>
              </div>

            </div>

            {/* Social Media Section Requested */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-4">
                Connect on Social Networks
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Mail className="w-4 h-4" />
                  <span>Gmail</span>
                </a>

                <a
                  href={PERSONAL_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Professional Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 shadow-2xl relative">
              
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8">
                Fill in the details below and I'll get back to you promptly.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                    Thank you, {name}. Your message has been prepared for dispatch. I will review and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-6 px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/10 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Job Opportunity / Project Discussion"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your inquiry, project scope, or opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-lg shadow-rose-600/30 transition-all active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Gautam</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
