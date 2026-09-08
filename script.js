/**
 * Shreedhar G D – Modern Junior Developer Portfolio
 * Vanilla JavaScript for UI Interactions & Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Dynamic Year ────────────────────────────────────────────────────────
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── 2. Sticky Navbar Blur & Shadow on Scroll ──────────────────────────────
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 16) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── 3. Mobile Navigation Menu ─────────────────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen && window.innerWidth <= 768 ? 'hidden' : '';
    };

    navToggle.addEventListener('click', () => toggleMenu());

    // Close mobile nav when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu(false);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });
  }

  // ── 4. Active Navigation Link Highlighting ─────────────────────────────────
  const sections = document.querySelectorAll('main section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            allNavLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ── 5. Scroll-Reveal Animations ───────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion is preferred or IntersectionObserver not available, show immediately
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ── 6. Copy Email to Clipboard ────────────────────────────────────────────
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    const originalText = copyBtn.textContent;
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const email = 'shreenikkil@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        copyBtn.textContent = 'Copied!';
        copyBtn.style.color = 'var(--accent-primary)';
        copyBtn.style.borderColor = 'var(--border-accent)';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  }

  // ── 7. Contact Form Handling ──────────────────────────────────────────────
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email-input').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        return;
      }

      // Friendly success response
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong>Thank you, ${name}!</strong> Your message has been prepared. Opening your default mail client to deliver directly to <em>shreenikkil@gmail.com</em>...
      `;

      // Open user's mail client with pre-filled content
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(
        `Hi Shreedhar,\n\n${message}\n\nBest regards,\n${name}\nEmail: ${email}`
      );
      window.location.href = `mailto:shreenikkil@gmail.com?subject=${subject}&body=${body}`;

      // Reset form
      contactForm.reset();

      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 6000);
    });
  }
});
