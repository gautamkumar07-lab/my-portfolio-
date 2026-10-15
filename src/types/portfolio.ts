export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics?: string[];
}

export interface GithubUserProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface SkillItem {
  name: string;
  category: 'Backend & Core' | 'Frontend' | 'AI & Tools' | 'Database & Cloud';
  level: number; // 0 to 100
  experience: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  icon: string;
}

export interface AchievementItem {
  label: string;
  targetNumber: number;
  suffix: string;
  description: string;
  icon: string;
}
