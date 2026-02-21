document.addEventListener('DOMContentLoaded', () => {

  // ─── LANGUAGE SWITCHER ────────────────────────────────────────────────────
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (typeof applyTranslations === 'function') applyTranslations(lang);
    });
  });

  // Sync active lang btn on load
  const savedLang = localStorage.getItem('villa_lang') || 'en';
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === savedLang);
  });

  // ─── STICKY NAV ACTIVE STATE ON SCROLL ───────────────────────────────────
  const sections = document.querySelectorAll('.content-section');
  const navItems = document.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  // ─── NAV CLICK SCROLL ────────────────────────────────────────────────────
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.section);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── HERO CTA SCROLL ─────────────────────────────────────────────────────
  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      const nav = document.getElementById('nav');
      if (nav) nav.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ─── ACCORDION ───────────────────────────────────────────────────────────
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // open first accordion by default
  const firstAcc = document.querySelector('.accordion-item');
  if (firstAcc) firstAcc.classList.add('open');

  // ─── LOCAL TABS ──────────────────────────────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = document.getElementById('tab-' + tab);
      if (content) content.classList.add('active');
    });
  });

  // ─── SERVICE CARDS (ADD-ONS) ─────────────────────────────────────────────
  const serviceCards = document.querySelectorAll('.service-card');
  const selectedDisplay = document.getElementById('selectedServiceDisplay');
  const hiddenService = document.getElementById('hiddenService');

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const service = card.dataset.service;
      hiddenService.value = service;
      if (selectedDisplay) {
        selectedDisplay.textContent = '✓ ' + service;
        selectedDisplay.classList.add('selected');
      }
    });
  });

  // ─── ADD-ONS FORM ────────────────────────────────────────────────────────
  const form = document.getElementById('addonForm');
  const successMsg = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const service = data.get('service') || 'General request';
      const date = data.get('date');
      const notes = data.get('notes');

      const subject = encodeURIComponent(`Villa Lidija Add-on Request: ${service}`);
      const body = encodeURIComponent(
        `Guest: ${name}\nEmail: ${email}\nService: ${service}\nDate: ${date}\nNotes: ${notes}`
      );
      window.location.href = `mailto:villas@irundo.com?subject=${subject}&body=${body}`;

      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
      }
    });
  }

  // ─── HEADER HIDE ON SCROLL DOWN ──────────────────────────────────────────
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = current;
  }, { passive: true });

  // ─── FADE-IN ON SCROLL ────────────────────────────────────────────────────
  const fadeEls = document.querySelectorAll('.card, .checklist-item, .feature-item, .local-item, .contact-card');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el, i) => {
    el.style.animationDelay = `${(i % 4) * 0.08}s`;
    fadeObserver.observe(el);
  });

});
