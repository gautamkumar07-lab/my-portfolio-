import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Layers, 
  FolderGit2, 
  GraduationCap, 
  Trophy, 
  Award, 
  Mail, 
  Send, 
  Sun, 
  Moon, 
  Menu, 
  X 
} from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onHireMeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme, onHireMeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracker
      const sections = ['home', 'about', 'skills', 'experience', 'services', 'projects', 'education', 'achievements', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#', icon: Home },
    { id: 'about', label: 'About', href: '#about', icon: User },
    { id: 'skills', label: 'Skills', href: '#skills', icon: Code },
    { id: 'experience', label: 'Experience', href: '#github', icon: Briefcase },
    { id: 'services', label: 'Services', href: '#services', icon: Layers },
    { id: 'projects', label: 'Projects', href: '#projects', icon: FolderGit2 },
    { id: 'education', label: 'Education', href: '#resume', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', href: '#achievements', icon: Trophy },
    { id: 'certs', label: 'Certs', href: '#resume', icon: Award },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-teal-500/20 py-2.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Mark: < GK /> Pill + GAUTAM DEV */}
          <a
            href="#"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-none"
          >
            {/* Glowing < GK /> Pill */}
            <div className="flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-teal-950/50 border border-teal-500/60 shadow-[0_0_15px_rgba(20,184,166,0.35)] group-hover:border-teal-400 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] transition-all">
              <span className="font-mono font-bold text-sm text-teal-400 tracking-wider">
                &lt; GK /&gt;
              </span>
            </div>

            {/* GAUTAM DEV */}
            <div className="flex flex-col text-left leading-none">
              <span className="font-display font-extrabold text-white text-base tracking-wider uppercase">
                GAUTAM
              </span>
              <span className="font-mono text-[10px] text-teal-400 font-semibold tracking-widest mt-0.5">
                DEV
              </span>
            </div>
          </a>

          {/* Navigation Links with Icons & Active Pill */}
          <nav className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-950/90 text-teal-300 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.35)]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Medium screen navigation fallback */}
          <nav className="hidden md:flex xl:hidden items-center gap-1">
            {navLinks.slice(0, 6).map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive ? 'text-teal-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action: Let's Talk button + Theme Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl border border-teal-500/30 bg-slate-900/80 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400 transition-all"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onHireMeClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-teal-300 bg-teal-950/60 hover:bg-teal-900/80 border border-teal-500/60 hover:border-teal-400 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Let's Talk</span>
              <Send className="w-3.5 h-3.5 text-teal-400" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-xl border border-teal-500/30 text-teal-400 bg-slate-900/80"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-slate-950/95 border border-teal-500/30 shadow-2xl backdrop-blur-xl animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-teal-300 hover:bg-teal-950/40 rounded-xl transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-teal-400" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onHireMeClick();
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-teal-300 bg-teal-950 border border-teal-500/50 rounded-xl shadow-md"
            >
              <span>Let's Talk</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
