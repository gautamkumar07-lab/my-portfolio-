// Gautam Kumar - Premium Portfolio Script
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('theme', current);
    });
  }

  // Animated Typing Effect
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Java Developer',
      'AI Developer',
      'Full Stack Developer',
      'Future Software Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(type, 400);
          return;
        }
      }
      setTimeout(type, isDeleting ? 45 : 85);
    }
    type();
  }

  // GitHub REST API Integration
  const repoContainer = document.getElementById('github-repos-container');
  if (repoContainer) {
    fetch('https://api.github.com/users/gautamkumar07-lab/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(repos => {
        if (!Array.isArray(repos)) return;
        repoContainer.innerHTML = '';
        repos.forEach(repo => {
          const card = document.createElement('div');
          card.className = 'glass-panel tesla-card';
          card.style.padding = '24px';
          card.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:12px;color:var(--text-muted)">
              <span>${repo.language || 'Codebase'}</span>
              <span>⭐ ${repo.stargazers_count}</span>
            </div>
            <h3 style="font-size:18px;font-weight:700;margin-bottom:8px;">${repo.name}</h3>
            <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;line-height:1.5;">
              ${repo.description || 'Full-stack engineering implementation with modular component architecture and robust logic.'}
            </p>
            <div style="display:flex;gap:8px;">
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding:8px 14px;font-size:11px;flex:1;text-align:center;">
                View Code
              </a>
              ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:8px 14px;font-size:11px;">Demo</a>` : ''}
            </div>
          `;
          repoContainer.appendChild(card);
        });
      })
      .catch(err => console.warn('GitHub API fetch failed:', err));
  }

  // Contact Form Dispatch
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value || 'Portfolio Inquiry';
      const msg = document.getElementById('form-message').value;

      const mailto = `mailto:gautamkumar543796@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`)}`;
      window.open(mailto, '_blank');
      alert(`Thank you, ${name}! Your email client has been opened to dispatch your message to Gautam Kumar.`);
    });
  }
});
