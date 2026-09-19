/* ==========================================================================
   PORTFOLIO SPATIAL — script.js
   Script commun à index.html et project.html. Aucune dépendance externe.
   Respecte prefers-reduced-motion et les écrans tactiles (le curseur
   personnalisé et la traînée sont désactivés).

   Dépend de js/i18n.js (chargé avant) et, pour la grille de projets,
   de js/projects-data.js.
   ========================================================================== */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const useCustomCursor = isFinePointer && !reduceMotion;

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Petits utilitaires partagés ---------------------------------------- */
  const t = (key) => (window.I18N ? window.I18N.t(key) : key);
  const pick = (field) => (window.I18N ? window.I18N.pick(field) : (field && field.en) || '');

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const CATEGORY = {
    academic: { labelKey: 'ui.catAcademic', cls: 'label-academic' },
    personal: { labelKey: 'ui.catPersonal', cls: 'label-personal' },
    extracurricular: { labelKey: 'ui.catExtracurricular', cls: 'label-extracurricular' },
  };

  const ARROW_SVG = '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 9 9 2M4 2h5v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Exposé pour la page projet (js/project-page.js)
  window.PortfolioUtils = { escapeHtml, CATEGORY, ARROW_SVG };

  /* ---------------------------------------------------------------------
     1. Champ d'étoiles (canvas) — une instance par section
     --------------------------------------------------------------------- */
  class Starfield {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {{density:number, parallax:number, shootingStars:boolean}} opts
     */
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.density = opts.density ?? 0.00012; // étoiles par pixel²
      this.parallax = opts.parallax ?? 12; // amplitude px du déplacement souris
      this.shootingStars = opts.shootingStars ?? false;
      this.stars = [];
      this.comets = [];
      this.mouseX = 0.5;
      this.mouseY = 0.5;
      this.nextCometAt = 0;
      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });
      if (isFinePointer) {
        window.addEventListener('mousemove', (e) => {
          this.mouseX = e.clientX / window.innerWidth - 0.5;
          this.mouseY = e.clientY / window.innerHeight - 0.5;
        }, { passive: true });
      }
      this.scheduleComet();
      if (reduceMotion) this.drawStatic();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = rect.width;
      this.h = rect.height;
      this.canvas.width = this.w * dpr;
      this.canvas.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(this.w * this.h * this.density);
      this.stars = Array.from({ length: count }, () => ({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        r: Math.random() * 1.3 + 0.3,
        depth: Math.random() * 0.7 + 0.3,
        twSpeed: Math.random() * 0.015 + 0.004,
        twPhase: Math.random() * Math.PI * 2,
      }));
      if (reduceMotion) this.drawStatic();
    }

    scheduleComet() {
      if (!this.shootingStars || reduceMotion) return;
      this.nextCometAt = performance.now() + 5000 + Math.random() * 9000;
    }

    maybeSpawnComet(now) {
      if (!this.shootingStars || reduceMotion) return;
      if (now < this.nextCometAt) return;
      const startX = Math.random() * this.w * 0.6 + this.w * 0.2;
      this.comets.push({
        x: startX, y: -10,
        vx: -2.6, vy: 3.2,
        life: 1,
      });
      this.scheduleComet();
    }

    drawStatic() {
      const { ctx } = this;
      ctx.clearRect(0, 0, this.w, this.h);
      ctx.fillStyle = 'rgba(244,243,239,0.8)';
      this.stars.forEach((s) => {
        ctx.globalAlpha = 0.35 + s.depth * 0.4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    update(now) {
      if (reduceMotion) return;
      const { ctx } = this;
      ctx.clearRect(0, 0, this.w, this.h);

      const offX = this.mouseX * this.parallax;
      const offY = this.mouseY * this.parallax;

      this.stars.forEach((s) => {
        const tw = 0.55 + Math.sin(now * s.twSpeed + s.twPhase) * 0.45;
        ctx.globalAlpha = Math.max(0, tw) * (0.35 + s.depth * 0.5);
        ctx.fillStyle = '#f4f3ef';
        ctx.beginPath();
        ctx.arc(s.x + offX * s.depth, s.y + offY * s.depth, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      this.maybeSpawnComet(now);
      this.comets.forEach((c) => {
        c.x += c.vx; c.y += c.vy; c.life -= 0.012;
        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * 9, c.y - c.vy * 9);
        grad.addColorStop(0, `rgba(244,243,239,${c.life})`);
        grad.addColorStop(1, 'rgba(244,243,239,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * 9, c.y - c.vy * 9);
        ctx.stroke();
      });
      this.comets = this.comets.filter((c) => c.life > 0 && c.y < this.h + 20);
    }
  }

  const starfields = [];
  const heroCanvas = document.getElementById('stars-canvas');
  if (heroCanvas) starfields.push(new Starfield(heroCanvas, { density: 0.00022, parallax: 18, shootingStars: true }));
  const tlCanvas = document.getElementById('stars-canvas-2');
  if (tlCanvas) starfields.push(new Starfield(tlCanvas, { density: 0.00009, parallax: 8, shootingStars: false }));
  const contactCanvas = document.getElementById('stars-canvas-3');
  if (contactCanvas) starfields.push(new Starfield(contactCanvas, { density: 0.00016, parallax: 14, shootingStars: true }));

  /* ---------------------------------------------------------------------
     2. Curseur personnalisé + traînée de particules
     --------------------------------------------------------------------- */
  let cursorDot, cursorRing, trailCanvas, trailCtx, trailPoints = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let ring = { x: mouse.x, y: mouse.y };
  const TRAIL_MAX_AGE = 260; /* ms — durée de vie du trait, comme une encre qui sèche */

  if (useCustomCursor && document.querySelector('.cursor-dot')) {
    document.body.classList.add('has-custom-cursor');
    cursorDot = document.querySelector('.cursor-dot');
    cursorRing = document.querySelector('.cursor-ring');
    trailCanvas = document.getElementById('trail-canvas');
    trailCtx = trailCanvas.getContext('2d');
    cursorDot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    cursorRing.style.transform = `translate(${ring.x}px, ${ring.y}px)`;

    /* Le buffer du canvas est mappé 1:1 sur les pixels CSS (pas de mise à l'échelle
       DPR) : ça évite tout écart d'arrondi entre les coordonnées de la souris
       (clientX/Y, en pixels CSS) et le tracé, qui doit rester pile sous le curseur. */
    const resizeTrail = () => {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    };
    resizeTrail();
    window.addEventListener('resize', resizeTrail, { passive: true });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      cursorDot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;

      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      document.body.classList.toggle('cursor-on-light', Boolean(hoveredElement && hoveredElement.closest('.pd-section, .projects-section, .commitments-section, .timeline-card')));

      trailPoints.push({ x: mouse.x, y: mouse.y, t: performance.now() });
      if (trailPoints.length > 60) trailPoints.shift();
    }, { passive: true });

    window.addEventListener('mousedown', () => cursorRing.classList.add('is-down'));
    window.addEventListener('mouseup', () => cursorRing.classList.remove('is-down'));

    const hoverSelector = 'a, button, .project-card, [data-nav]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelector)) cursorRing.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelector)) cursorRing.classList.remove('is-hover');
    });
  }

  function updateCursorRing() {
    if (!cursorRing) return;
    ring.x += (mouse.x - ring.x) * 0.18;
    ring.y += (mouse.y - ring.y) * 0.18;
    cursorRing.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
  }

  function updateTrail(now) {
    if (!trailCtx) return;
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

    trailPoints = trailPoints.filter((p) => now - p.t < TRAIL_MAX_AGE);
    if (trailPoints.length < 2) return;

    /* Trait fin qui s'amenuise et s'efface comme une encre de stylo plume,
       noir sur fond clair / clair sur fond sombre (voir cursor-on-light). */
    const rgb = document.body.classList.contains('cursor-on-light') ? '11,11,13' : '244,243,239';
    trailCtx.lineCap = 'round';
    trailCtx.lineJoin = 'round';

    for (let i = 1; i < trailPoints.length; i++) {
      const p0 = trailPoints[i - 1];
      const p1 = trailPoints[i];
      const age = now - p1.t;
      const t = Math.max(0, 1 - age / TRAIL_MAX_AGE);
      if (t <= 0) continue;
      trailCtx.strokeStyle = `rgba(${rgb}, ${t * 0.5})`;
      trailCtx.lineWidth = Math.max(0.4, t * 2.4);
      trailCtx.beginPath();
      trailCtx.moveTo(p0.x, p0.y);
      trailCtx.lineTo(p1.x, p1.y);
      trailCtx.stroke();
    }
  }

  /* ---------------------------------------------------------------------
     3. Révélation au scroll (IntersectionObserver)
     Exposée pour pouvoir observer aussi les éléments créés en JS.
     --------------------------------------------------------------------- */
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' })
    : null;

  function observeReveals(root = document) {
    const items = root.querySelectorAll('.reveal:not(.is-visible)');
    if (!revealObserver) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    items.forEach((el) => revealObserver.observe(el));
  }
  window.PortfolioUtils.observeReveals = observeReveals;

  /* ---------------------------------------------------------------------
     4. Progression de la trajectoire (section Parcours)
     --------------------------------------------------------------------- */
  const timelineEl = document.getElementById('timeline');
  const timelineFill = document.getElementById('timeline-fill');

  function updateTimelineProgress() {
    if (!timelineEl || !timelineFill) return;
    const rect = timelineEl.getBoundingClientRect();
    const viewportMid = window.innerHeight * 0.55;
    const progress = Math.min(1, Math.max(0, (viewportMid - rect.top) / rect.height));
    timelineFill.style.height = `${progress * 100}%`;
  }

  /* ---------------------------------------------------------------------
     5. Navigation mobile + lien actif
     --------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function syncMenuLabel() {
    if (!navToggle || !navLinks) return;
    const open = navLinks.classList.contains('is-open');
    navToggle.setAttribute('aria-label', open ? t('ui.menuClose') : t('ui.menuOpen'));
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      syncMenuLabel();
    });
    navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navAnchors)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((s) => navIo.observe(s));
  }

  /* ---------------------------------------------------------------------
     6. Grille de projets (générée depuis js/projects-data.js) + filtres
     --------------------------------------------------------------------- */
  const grid = document.getElementById('projects-grid');
  const filtersEl = document.getElementById('project-filters');
  const FILTERS = [
    { value: 'all', key: 'ui.filterAll' },
    { value: 'personal', key: 'ui.filterPersonal' },
    { value: 'academic', key: 'ui.filterAcademic' },
    { value: 'extracurricular', key: 'ui.filterExtracurricular' },
  ];
  let activeFilter = 'all';

  function projectCardHtml(project) {
    const cat = CATEGORY[project.category] || CATEGORY.personal;
    const tags = (project.tags || [])
      .map((tag) => `<li>${escapeHtml(pick(tag))}</li>`)
      .join('');

    return `
      <a class="project-card reveal" href="project.html?id=${encodeURIComponent(project.id)}"
         data-category="${escapeHtml(project.category)}">
        <div class="project-top">
          <span class="project-label ${cat.cls}">${escapeHtml(t(cat.labelKey))}</span>
          <span class="project-year">${escapeHtml(pick(project.year))}</span>
        </div>
        <h3 class="project-title">${escapeHtml(pick(project.title))}</h3>
        <p class="project-desc">${escapeHtml(pick(project.summary))}</p>
        ${tags ? `<ul class="project-tags">${tags}</ul>` : ''}
        <span class="project-cta">${escapeHtml(t('ui.viewProject'))} ${ARROW_SVG}</span>
      </a>`;
  }

  function emptySlotHtml() {
    return `
      <div class="project-card project-card-empty reveal" data-category="all">
        <div class="project-top">
          <span class="project-label label-empty">${escapeHtml(t('ui.nextSlotLabel'))}</span>
        </div>
        <h3 class="project-title project-title-muted">${escapeHtml(t('ui.nextSlotTitle'))}</h3>
        <p class="project-desc">${escapeHtml(t('ui.nextSlotDesc'))}</p>
      </div>`;
  }

  function applyFilter(value) {
    activeFilter = value;
    if (filtersEl) {
      filtersEl.querySelectorAll('.filter-btn').forEach((btn) => {
        const isActive = btn.dataset.filter === value;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
      });
    }
    if (!grid) return;
    grid.querySelectorAll('[data-category]').forEach((card) => {
      const match = value === 'all' || card.dataset.category === value;
      card.classList.toggle('is-hidden', !match);
    });
  }

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = FILTERS.map(({ value, key }) => `
      <button class="filter-btn${value === activeFilter ? ' is-active' : ''}" data-filter="${value}"
              role="tab" aria-selected="${value === activeFilter}">${escapeHtml(t(key))}</button>`).join('');
    filtersEl.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
  }

  function renderProjects() {
    if (!grid) return;
    const list = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
    grid.innerHTML = list.map(projectCardHtml).join('') + emptySlotHtml();
    observeReveals(grid);
    applyFilter(activeFilter);
  }

  if (grid || filtersEl) {
    renderFilters();
    renderProjects();
  }

  /* Re-rendu au changement de langue -------------------------------------- */
  if (window.I18N) {
    window.I18N.onChange(() => {
      renderFilters();
      renderProjects();
      syncMenuLabel();
    });
  }

  /* Observe les éléments statiques déjà présents dans le HTML */
  observeReveals(document);

  /* ---------------------------------------------------------------------
     7. Boucle d'animation principale
     --------------------------------------------------------------------- */
  function loop(now) {
    starfields.forEach((s) => s.update(now));
    updateCursorRing();
    updateTrail(now);
    updateTimelineProgress();
    requestAnimationFrame(loop);
  }

  if (!reduceMotion) {
    requestAnimationFrame(loop);
  } else {
    updateTimelineProgress();
    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    window.addEventListener('resize', updateTimelineProgress, { passive: true });
  }
})();
