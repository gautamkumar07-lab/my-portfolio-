import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Server, 
  Bot, 
  Briefcase, 
  Flame, 
  Building2, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Server,
  Bot,
  Briefcase,
  Flame,
  Building2,
};

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <span>Specialized Offerings</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Solutions & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            End-to-end software services crafted for impact.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            From modern responsive user interfaces to resilient Java backends and intelligent AI pipelines, I deliver production-ready software solutions with clean architecture and reliable execution.
          </p>
        </motion.div>

        {/* 6 Services Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Monitor;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: (index % 3) * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                      Key Deliverables
                    </span>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Stack Unboxed Metadata */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 mb-6">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {service.techStack.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {tIdx < service.techStack.length - 1 && (
                            <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* CTA: Request Service */}
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white rounded-xl transition-all duration-200 group/btn"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
