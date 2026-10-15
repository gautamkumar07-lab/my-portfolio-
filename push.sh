#!/usr/bin/env bash
# Script to push to Gautam Kumar's GitHub repository
echo "============================================"
echo "Pushing Gautam Kumar Portfolio to GitHub"
echo "============================================"

# Ensure branch is main
git branch -M main

# Prompt for Personal Access Token (PAT) if not authenticated
if [ -z "$GITHUB_TOKEN" ]; then
  read -s -p "Enter your GitHub Personal Access Token (classic with 'repo' scope): " GITHUB_TOKEN
  echo ""
fi

if [ -n "$GITHUB_TOKEN" ]; then
  git remote set-url origin "https://${GITHUB_TOKEN}@github.com/gautamkumar07-lab/gautam-portfolio.git"
  git push -u origin main
  # Clean up token from remote url for security
  git remote set-url origin "https://github.com/gautamkumar07-lab/gautam-portfolio.git"
  echo "✅ Push successful to https://github.com/gautamkumar07-lab/gautam-portfolio"
else
  echo "Push failed: No token provided."
fi
