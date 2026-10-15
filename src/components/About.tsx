import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Cpu, Brain, Layers, Zap, Rocket, CheckCircle2 } from 'lucide-react';
import { ABOUT_PILLARS, PERSONAL_INFO } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Cpu,
  Brain,
  Layers,
  Zap,
  Rocket,
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Fade In & Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <span>Engineering Narrative</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Mindset & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Engineering scalable code with academic rigor & entrepreneurial passion.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            I am a Computer Science student and software engineer who thrives at the intersection of robust backend architectures and next-generation artificial intelligence. From structuring object-oriented Java microservices to engineering prompt pipelines and responsive user interfaces, I build software that delivers real-world performance.
          </p>
        </motion.div>

        {/* The 6 Core Pillars Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_PILLARS.map((pillar, index) => {
            const IconComponent = iconMap[pillar.icon] || Cpu;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-7 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Index */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {pillar.role}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Subtle bottom detail */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Core Competency
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Gautam Kumar</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Philosophy Spotlight Card with Fade & Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 p-8 sm:p-10 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 relative overflow-hidden bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-slate-950 text-white"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-mono">
                The Engineering Standard
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 font-display">
                "Writing clean, modular code is not an afterthought — it is the cornerstone of scalable engineering."
              </h3>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether implementing low-level data structures in Java, configuring Spring Boot microservices, or orchestrating autonomous AI agent prompts, every line is crafted for maintainability, zero-latency throughput, and production resilience.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 sm:border-l sm:border-white/10 sm:pl-8">
              <div className="text-xs text-slate-400">Primary Contact</div>
              <div className="text-base font-bold text-white font-mono">{PERSONAL_INFO.email}</div>
              <div className="text-xs text-slate-400">Phone / WhatsApp</div>
              <div className="text-base font-bold text-rose-400 font-mono">{PERSONAL_INFO.phoneFormatted}</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
