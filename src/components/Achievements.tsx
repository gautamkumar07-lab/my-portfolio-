import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, GitFork, Cpu, Clock } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  CheckCircle2,
  GitFork,
  Cpu,
  Clock,
};

export const Achievements: React.FC = () => {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const frameRate = 1000 / 60; // 60fps
          const totalFrames = Math.round(duration / frameRate);
          let currentFrame = 0;

          const timer = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const nextCounts = ACHIEVEMENTS_DATA.map((item) =>
              Math.min(Math.round(item.targetNumber * easedProgress), item.targetNumber)
            );

            setCounts(nextCounts);

            if (currentFrame >= totalFrames) {
              clearInterval(timer);
              setCounts(ACHIEVEMENTS_DATA.map((item) => item.targetNumber));
            }
          }, frameRate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-slate-900/10 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <span>Engineering Mileage</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>Measurable Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Proven track record of development & growth.
          </h2>
        </div>

        {/* 4 Animated Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS_DATA.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Cpu;
            const currentCount = counts[index] || 0;
            return (
              <div
                key={item.label}
                className="p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Animated Number */}
                <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white tracking-tight mb-2">
                  {currentCount.toLocaleString()}
                  <span className="text-rose-500">{item.suffix}</span>
                </div>

                <div className="text-sm font-bold text-slate-800 dark:text-slate-200 font-display mb-1">
                  {item.label}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Ambient glow accent line */}
                <div className="absolute bottom-0 inset-x-8 h-0.5 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
