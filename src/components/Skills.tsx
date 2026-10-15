import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  Server, 
  Sparkles, 
  Terminal, 
  Atom, 
  Code, 
  Layout, 
  Network, 
  Database, 
  Flame, 
  GitBranch, 
  Github, 
  Cpu
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Coffee,
  Server,
  Sparkles,
  Terminal,
  Atom,
  Code,
  Layout,
  Network,
  Database,
  Flame,
  GitBranch,
  Github,
};

type CategoryFilter = 'All' | 'Backend & Core' | 'Frontend' | 'AI & Tools' | 'Database & Cloud';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');

  const categories: CategoryFilter[] = [
    'All',
    'Backend & Core',
    'Frontend',
    'AI & Tools',
    'Database & Cloud',
  ];

  const filteredSkills = activeCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Fade & Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
              <span>Technical Arsenal</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>13+ Core Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              Mastered technologies & engineering stacks.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Hands-on proficiency verified across production projects, academic implementations, and open-source contributions.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 rounded-xl max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skill Cards Grid with Scroll Reveal and Filter Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.iconName] || Cpu;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 group-hover:border-rose-500/40 transition-all duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                        {skill.level}%
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {skill.name}
                    </h3>
                    
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-4 min-h-[36px] line-clamp-2 leading-relaxed">
                      {skill.experience}
                    </div>
                  </div>

                  <div>
                    {/* Animated Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                      <span>{skill.category}</span>
                      <span className="font-medium text-slate-600 dark:text-slate-300">
                        {skill.level >= 90 ? 'Advanced' : 'Proficient'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Technology Footnote with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 p-5 rounded-2xl border border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Continually mastering next-generation Java frameworks, Agentic AI, and distributed systems.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Target: Full Stack & AI Systems Engineering</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
