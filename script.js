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



// Typing Effect
const typingText = document.getElementById('typing-text');
const phrases = ['Full Stack Developer', 'Software Engineer', 'Cloud Engineer', 'Cricketer'];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIdx];
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIdx === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Cursor Glow
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// Tilt Effect
const tiltEls = document.querySelectorAll('.edu-card, .skill-card, .timeline-card, .achieve-card');
tiltEls.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    // Disabled for 2D retro feel
    // el.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateY(-2px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// Magnetic Buttons
const buttons = document.querySelectorAll('.btn, .theme-toggle, .contact-card');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Disabled magnetic sliding to prefer blocky CSS hover
  });

  btn.addEventListener('mouseleave', () => {
    // hover cleared via css
  });
});

// Start effects
type();

sections.forEach(s => sectionObserver.observe(s));
