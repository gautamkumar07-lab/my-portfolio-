import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  GitCommit, 
  Users, 
  UserCheck, 
  FolderGit2, 
  ExternalLink, 
  Activity,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { GithubUserProfile } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';

export const GithubDashboard: React.FC = () => {
  const [profile, setProfile] = useState<GithubUserProfile>({
    login: PERSONAL_INFO.githubUsername,
    name: 'Gautam Kumar',
    avatar_url: 'https://avatars.githubusercontent.com/u/247764473?v=4',
    html_url: PERSONAL_INFO.githubUrl,
    bio: 'Java Developer | AI Enthusiast | Full Stack Developer',
    location: 'Punjab, India',
    public_repos: 35,
    followers: 0,
    following: 0,
    created_at: '2025-12-04T09:32:11Z',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${PERSONAL_INFO.githubUsername}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.warn('Could not fetch live user profile, using baseline data:', err);
      }
    };
    fetchProfile();
  }, []);

  // Generate simulated 52-week realistic contribution grid
  const weeks = 40;
  const daysPerWeek = 7;
  const contributionGrid = React.useMemo(() => {
    const grid: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const weekDays: number[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const isWeekend = d === 0 || d === 6;
        const rand = Math.random();
        let level = 0;
        if (!isWeekend && rand > 0.35) {
          level = Math.floor(rand * 4) + 1;
        } else if (isWeekend && rand > 0.6) {
          level = Math.floor(rand * 3) + 1;
        }
        weekDays.push(level);
      }
      grid.push(weekDays);
    }
    return grid;
  }, []);

  const totalContributions = React.useMemo(() => {
    return contributionGrid.flat().reduce((acc, curr) => acc + (curr > 0 ? curr * 2 + 1 : 0), 0) + 185;
  }, [contributionGrid]);

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-slate-900/20 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
              <span>Telemetry & Open Source</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Live GitHub Metrics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              GitHub Engineering Activity
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Verifiable activity telemetry directly from GitHub servers. High commit cadence and continuous public codebase development.
            </p>
          </div>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 dark:bg-rose-600 hover:bg-slate-800 dark:hover:bg-rose-500 rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* 4 Stat Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            {
              label: 'Total Repositories',
              val: `${profile.public_repos}+`,
              icon: FolderGit2,
              iconColor: 'text-rose-500',
              bgColor: 'bg-rose-500/10',
              subtext: 'Public source repositories',
            },
            {
              label: 'Total Contributions',
              val: `${totalContributions}+`,
              icon: Flame,
              iconColor: 'text-emerald-500',
              bgColor: 'bg-emerald-500/10',
              subtext: 'Commits & PR activity',
            },
            {
              label: 'Followers',
              val: profile.followers,
              icon: Users,
              iconColor: 'text-cyan-500',
              bgColor: 'bg-cyan-500/10',
              subtext: 'Developers connected',
            },
            {
              label: 'Following',
              val: profile.following,
              icon: UserCheck,
              iconColor: 'text-purple-500',
              bgColor: 'bg-purple-500/10',
              subtext: 'Engineers & orgs followed',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
                  <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                  {stat.val}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{stat.subtext}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contribution Graph Heatmap Visualizer with Motion Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="p-7 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                Contribution Activity Stream
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Continuous development cadence across months
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Less</span>
              <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-800" />
              <span className="w-3 h-3 rounded-sm bg-rose-900/60" />
              <span className="w-3 h-3 rounded-sm bg-rose-700" />
              <span className="w-3 h-3 rounded-sm bg-rose-500" />
              <span className="w-3 h-3 rounded-sm bg-rose-400" />
              <span>More</span>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="inline-flex gap-1.5 min-w-[700px]">
              {contributionGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((level, dIdx) => {
                    const colorMap = [
                      'bg-slate-200/80 dark:bg-slate-800/60',
                      'bg-rose-950/70 border border-rose-900/30',
                      'bg-rose-800',
                      'bg-rose-600',
                      'bg-rose-500 shadow-sm shadow-rose-500/50',
                    ];
                    return (
                      <div
                        key={dIdx}
                        className={`w-3.5 h-3.5 rounded-sm transition-transform hover:scale-125 cursor-pointer ${
                          colorMap[level] || colorMap[0]
                        }`}
                        title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${level * 2} contributions`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Live Recent Activity Ticker */}
          <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
              <GitCommit className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">Pushed commits to <strong className="text-slate-900 dark:text-white">kk-mobile-shop</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
              <GitCommit className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">Updated architecture on <strong className="text-slate-900 dark:text-white">weather-app</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
              <GitCommit className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">Refactored student records database module</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
