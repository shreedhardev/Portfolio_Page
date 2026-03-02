// Sticky nav shadow on scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.edu-card, .skill-card, .timeline-card, .achieve-card, .contact-card, .hero-content, .hero-visual'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach(el => observer.observe(el));

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.fontWeight = '';
        });
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active && !active.classList.contains('nav-cta')) {
          active.style.color = 'var(--accent)';
        }
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));
