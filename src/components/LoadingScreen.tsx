import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('SYSTEM INITIALIZATION');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 15) + 10;
        if (next > 40 && next < 70) {
          setStage('CONNECTING GITHUB REST API');
        } else if (next >= 70 && next < 100) {
          setStage('MOUNTING PORTFOLIO FRAMEWORK');
        } else if (next >= 100) {
          setStage('SYSTEMS ONLINE');
        }
        return Math.min(next, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500">
      <div className="w-full max-w-xs px-6 flex flex-col items-center">
        {/* Monogram */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center font-mono font-bold text-xl shadow-2xl shadow-rose-600/40 mb-6 animate-pulse">
          GK
        </div>

        {/* Name */}
        <h1 className="font-display font-extrabold text-lg tracking-wider uppercase mb-1">
          Gautam Kumar
        </h1>
        <p className="text-[11px] font-mono text-rose-400 mb-8 tracking-widest uppercase">
          {stage}
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mb-3 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full text-[10px] font-mono text-slate-500">
          <span>PORTFOLIO OS</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
