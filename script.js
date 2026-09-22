/* ============================================================
   AHARÉ — Website JavaScript
   Handles: scroll-reveal, sticky nav, mobile menu, scroll-to-top
============================================================ */

// ── Scroll-Reveal (Intersection Observer) ──────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal so it stays visible
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Observe all reveal elements
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
  revealObserver.observe(el);
});

// ── Sticky Navigation ──────────────────────────────────────
const navbar = document.getElementById('navbar');

const navScrollHandler = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', navScrollHandler, { passive: true });
navScrollHandler(); // Run on load in case user refreshes mid-page

// ── Active Nav Link Highlighting ──────────────────────────
const sections = document.querySelectorAll('section[id], div[id="ingredients"]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          link.style.fontWeight = '';
        });
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) {
          activeLink.style.color = 'var(--maroon)';
        }
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => activeObserver.observe(s));

// ── Mobile Menu ────────────────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu   = document.getElementById('mobile-menu');
const mobileClose  = document.getElementById('mobile-close-btn');

function openMobile() {
  mobileMenu.classList.add('open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openMobile);
mobileClose.addEventListener('click', closeMobile);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMobile();
  }
});

// ── Smooth Scroll for anchor links ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Scroll to Top Button ───────────────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener(
  'scroll',
  () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  },
  { passive: true }
);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Video — hide overlay text when playing ─────────────────
const video        = document.getElementById('brand-video');
const videoOverlay = document.querySelector('.video-overlay-text');

if (video && videoOverlay) {
  video.addEventListener('play', () => {
    videoOverlay.style.transition = 'opacity 0.4s ease';
    videoOverlay.style.opacity = '0';
    videoOverlay.style.pointerEvents = 'none';
  });
  video.addEventListener('pause', () => {
    videoOverlay.style.opacity = '1';
    videoOverlay.style.pointerEvents = '';
  });
  video.addEventListener('ended', () => {
    videoOverlay.style.opacity = '1';
    videoOverlay.style.pointerEvents = '';
  });
}

// ── Hero badges staggered animation on load ────────────────
window.addEventListener('load', () => {
  const badges = document.querySelectorAll('.hero-badge');
  badges.forEach((badge, i) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(20px)';
    badge.style.transition = `opacity 0.5s ease ${0.8 + i * 0.12}s, transform 0.5s ease ${0.8 + i * 0.12}s`;
    // Trigger reflow
    badge.getBoundingClientRect();
    badge.style.opacity = '1';
    badge.style.transform = 'translateY(0)';
  });

  // Hero content stagger
  const heroContent = document.querySelector('.hero-eyebrow');
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-sub');
  const heroActions = document.querySelector('.hero-actions');

  [heroContent, heroTitle, heroSub, heroActions].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${0.2 + i * 0.15}s, transform 0.6s ease ${0.2 + i * 0.15}s`;
    el.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});
