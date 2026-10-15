import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitFork, 
  Star, 
  ExternalLink, 
  Github, 
  RefreshCw, 
  Search, 
  Calendar, 
  Code2, 
  AlertCircle 
} from 'lucide-react';
import { GithubRepo } from '../types/portfolio';
import { PERSONAL_INFO, FALLBACK_REPOS } from '../data/portfolioData';

// Color map for programming languages
const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572a5',
  PHP: '#4f5d95',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
};

export const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);
    try {
      // Connect directly to GitHub REST API
      const res = await fetch(
        `https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=10`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!res.ok) {
        throw new Error(`GitHub API returned status ${res.status}`);
      }

      const data: GithubRepo[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setRepos(data);
        setIsLiveConnected(true);
      } else {
        // In case of empty public repos
        setRepos(FALLBACK_REPOS);
        setIsLiveConnected(false);
      }
    } catch (err: unknown) {
      console.warn('GitHub API fetch notice (using cached fallback):', err);
      // Fallback gracefully so page is never broken
      setRepos(FALLBACK_REPOS);
      setError('Live GitHub rate limit reached; displaying cached repository showcase.');
      setIsLiveConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Format date helper (e.g., "Updated Sep 29, 2026")
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Format clean project title
  const formatTitle = (name: string) => {
    return name
      .replace(/^-+|-+$/g, '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Distinct languages for filter
  const languages = ['All', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[]];

  // Filtered repositories
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLang =
      selectedLanguage === 'All' || repo.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Fade & Slide Up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
              <span>GitHub REST API Integration</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Live Synchronized Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              Latest 10 Public Repositories
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Synchronized directly from{' '}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-rose-600 dark:text-rose-400 font-semibold hover:underline"
              >
                @{PERSONAL_INFO.githubUsername}
              </a>
              . When a new repository is pushed to GitHub, it automatically populates here.
            </p>
          </div>

          {/* Controls: Live status, Refresh button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLiveConnected ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                {isLiveConnected ? 'Live API Connected' : 'Cached Showcase'}
              </span>
            </div>

            <button
              onClick={fetchRepositories}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:border-rose-500 rounded-xl transition-all active:scale-95 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-rose-500 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Repos</span>
            </button>
          </div>
        </motion.div>

        {/* Search & Filter Bar with Motion Fade */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 p-3 rounded-2xl glass-panel border border-slate-200 dark:border-white/10"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search repositories by name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedLanguage === lang
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/60 dark:bg-slate-800/40'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notice banner if rate limited */}
        {error && (
          <div className="mb-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                </div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Projects Cards Grid with Staggered Scroll Reveal */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, index) => {
                const langColor = repo.language ? languageColors[repo.language] || '#94a3b8' : '#94a3b8';
                const cleanTitle = formatTitle(repo.name);
                const hasLiveDemo = repo.homepage && repo.homepage.startsWith('http');

                return (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.55,
                      delay: (index % 3) * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative p-6 sm:p-7 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 tesla-card-hover flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Language & Updated Date */}
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: langColor }}
                          />
                          <span className="text-slate-700 dark:text-slate-300">
                            {repo.language || 'Codebase'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{formatDate(repo.updated_at)}</span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                        {cleanTitle}
                      </h3>

                      {/* Raw Repo Name */}
                      <div className="font-mono text-xs text-slate-400 dark:text-slate-500 mb-3 truncate">
                        {repo.name}
                      </div>

                      {/* Project Description */}
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                        {repo.description || 'Full-stack engineering implementation with modular component architecture, robust logic, and version control.'}
                      </p>
                    </div>

                    <div>
                      {/* Metrics Row: Stars, Forks */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/60 dark:border-white/5 mb-4">
                        <span className="flex items-center gap-1 font-mono tabular-nums">
                          <Star className="w-3.5 h-3.5 text-amber-500" />
                          <span>{repo.stargazers_count} stars</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 font-mono tabular-nums">
                          <GitFork className="w-3.5 h-3.5 text-slate-400" />
                          <span>{repo.forks_count} forks</span>
                        </span>
                      </div>

                      {/* Buttons: GitHub Repo + Live Demo */}
                      <div className="flex items-center gap-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
                        >
                          <Github className="w-3.5 h-3.5 text-rose-500" />
                          <span>GitHub Code</span>
                        </a>

                        <a
                          href={hasLiveDemo ? (repo.homepage as string) : repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                            hasLiveDemo
                              ? 'text-white bg-rose-600 hover:bg-rose-500 shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
                          }`}
                        >
                          <span>{hasLiveDemo ? 'Live Demo' : 'Inspect'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && filteredRepos.length === 0 && (
          <div className="p-12 text-center rounded-2xl glass-panel border border-slate-200 dark:border-white/10">
            <Code2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No matching repositories found
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or language filter.
            </p>
          </div>
        )}

        {/* View All on GitHub CTA with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-rose-600 dark:hover:bg-rose-500 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span>Explore All 35+ Repositories on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
