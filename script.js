/* =============================================
   KRUTHIKHA VISHALI — PORTFOLIO SCRIPTS v2
   Nav state · scroll reveal · active section · cursor · interactions
   ============================================= */

// ---- NAV SCROLL STATE ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.about-grid, .project-card, .research-item, .contact-inner, .section-heading, .section-label, .skill-group, .extra-item, .exploring-card, .extras-block, .hero-float-card, .hero-status'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// ---- STAGGER CARDS ----
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.skill-group').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.05}s`;
});
document.querySelectorAll('.extra-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});

// ---- SMOOTH ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---- PROJECT CARD TILT ----
document.querySelectorAll('.project-card:not(.project-card--featured)').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s';
  });
});

// ---- SUBTLE CURSOR (desktop only) ----
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(92,111,138,0.35);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.3s, background 0.2s;
    transform: translate(-50%, -50%);
    will-change: left, top;
    opacity: 0;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    cursor.style.opacity = '1';
  }, { passive: true });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });

  document.querySelectorAll('a, button, .project-card, .skill-tags span').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(3.5)';
      cursor.style.background = 'rgba(74,87,80,0.18)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'rgba(92,111,138,0.35)';
    });
  });
}

// ---- STAT COUNTER ANIMATION ----
function animateCounter(el) {
  const text = el.textContent;
  const num = parseFloat(text.replace(/[^0-9.]/g, ''));
  const suffix = text.replace(/[0-9.]/g, '');
  if (isNaN(num)) return;
  const duration = 1200;
  const start = performance.now();
  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = num * ease;
    el.textContent = (Number.isInteger(num) ? Math.round(val) : val.toFixed(2)) + suffix;
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-val').forEach(animateCounter);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.project-card').forEach(el => statObserver.observe(el));

