/* ==========================================================================
   PORTFOLIO SPATIAL — project-page.js
   Construit la page de détail d'un projet à partir de js/projects-data.js.
   L'URL porte l'identifiant du projet : project.html?id=mon-projet

   Rien à modifier ici pour ajouter un projet : tout se passe dans
   js/projects-data.js.
   ========================================================================== */
(() => {
  'use strict';

  const utils = window.PortfolioUtils || {};
  const escapeHtml = utils.escapeHtml || ((v) => String(v == null ? '' : v));
  const CATEGORY = utils.CATEGORY || {};
  const ARROW = utils.ARROW_SVG || '';
  const observeReveals = utils.observeReveals || (() => {});

  const t = (key) => (window.I18N ? window.I18N.t(key) : key);
  const pick = (field) => (window.I18N ? window.I18N.pick(field) : (field && field.en) || '');

  const heroEl = document.getElementById('pd-hero');
  const coverEl = document.getElementById('pd-cover');
  const asideEl = document.getElementById('pd-aside');
  const bodyEl = document.getElementById('pd-body');
  const pagerEl = document.getElementById('pd-pager');
  if (!heroEl || !bodyEl) return;

  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('id');
  const index = projects.findIndex((p) => p.id === requestedId);
  const project = index >= 0 ? projects[index] : null;

  /* ---------------------------------------------------------------------
     Médias : cadre en pointillés si le fichier est absent
     --------------------------------------------------------------------- */
  function missingHtml(path) {
    return `<div class="media-missing">
        <span class="media-missing-label">${escapeHtml(t('ui.mediaMissing'))}</span>
        <code>${escapeHtml(path)}</code>
      </div>`;
  }

  function wireMediaFallbacks(root) {
    root.querySelectorAll('img[data-media-src]').forEach((img) => {
      const swap = () => {
        const holder = img.closest('.media-holder') || img.parentElement;
        if (holder && !holder.querySelector('.media-missing')) {
          holder.innerHTML = missingHtml(img.dataset.mediaSrc);
        }
      };
      if (img.complete && img.naturalWidth === 0) swap();
      img.addEventListener('error', swap, { once: true });
    });

    root.querySelectorAll('video[data-media-src]').forEach((video) => {
      const source = video.querySelector('source');
      const swap = () => {
        const holder = video.closest('.media-holder') || video.parentElement;
        if (holder && !holder.querySelector('.media-missing')) {
          holder.innerHTML = missingHtml(video.dataset.mediaSrc);
        }
      };
      video.addEventListener('error', swap, { once: true });
      if (source) source.addEventListener('error', swap, { once: true });
    });
  }

  function imageHtml(src, alt, extraClass = '') {
    return `<div class="media-holder ${extraClass}">
        <img src="${escapeHtml(src)}" data-media-src="${escapeHtml(src)}"
             alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Blocs de contenu
     --------------------------------------------------------------------- */
  function blockHtml(block) {
    if (!block || !block.type) return '';

    switch (block.type) {
      case 'heading':
        return `<h2 class="pd-h2 reveal">${pick(block.text)}</h2>`;

      case 'subheading':
        return `<h3 class="pd-h3 reveal">${pick(block.text)}</h3>`;

      case 'text':
        return `<p class="pd-p reveal">${pick(block.text)}</p>`;

      case 'list':
        return `<ul class="pd-list reveal">${(block.items || [])
          .map((item) => `<li>${pick(item)}</li>`).join('')}</ul>`;

      case 'image':
        return `<figure class="pd-figure reveal">
            ${imageHtml(block.src, pick(block.alt))}
            ${block.caption ? `<figcaption>${pick(block.caption)}</figcaption>` : ''}
          </figure>`;

      case 'gallery':
        return `<div class="pd-gallery reveal" data-count="${(block.items || []).length}">
            ${(block.items || []).map((item) => `
              <figure class="pd-figure">
                ${imageHtml(item.src, pick(item.alt))}
                ${item.caption ? `<figcaption>${pick(item.caption)}</figcaption>` : ''}
              </figure>`).join('')}
          </div>`;

      case 'video':
        return `<figure class="pd-figure pd-video reveal">
            <div class="media-holder">
              <video controls preload="metadata" data-media-src="${escapeHtml(block.src)}"
                     ${block.poster ? `poster="${escapeHtml(block.poster)}"` : ''}>
                <source src="${escapeHtml(block.src)}" type="video/mp4">
              </video>
            </div>
            ${block.caption ? `<figcaption>${pick(block.caption)}</figcaption>` : ''}
          </figure>`;

      case 'embed':
        if (block.provider === 'youtube' && block.id) {
          return `<figure class="pd-figure pd-video reveal">
              <div class="pd-embed">
                <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(block.id)}"
                        title="${escapeHtml(pick(block.caption) || 'Video')}"
                        loading="lazy" allowfullscreen
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerpolicy="strict-origin-when-cross-origin"></iframe>
              </div>
              ${block.caption ? `<figcaption>${pick(block.caption)}</figcaption>` : ''}
            </figure>`;
        }
        return '';

      case 'quote':
        return `<blockquote class="pd-quote reveal">
            <p>${pick(block.text)}</p>
            ${block.author ? `<cite>${pick(block.author)}</cite>` : ''}
          </blockquote>`;

      case 'stats':
        return `<ul class="pd-stats reveal">${(block.items || []).map((item) => `
            <li>
              <span class="pd-stat-value">${pick(item.value)}</span>
              <span class="pd-stat-label">${pick(item.label)}</span>
            </li>`).join('')}</ul>`;

      default:
        return '';
    }
  }

  /* ---------------------------------------------------------------------
     Rendu
     --------------------------------------------------------------------- */
  function renderNotFound() {
    document.title = `${t('ui.notFoundTitle')} — Thomas ROBERT`;
    heroEl.innerHTML = `
      <a class="pd-back" href="index.html#projects">${ARROW} ${escapeHtml(t('ui.backToProjects'))}</a>
      <h1 class="pd-title">${escapeHtml(t('ui.notFoundTitle'))}</h1>
      <p class="pd-summary">${escapeHtml(t('ui.notFoundText'))}</p>
      <div class="pd-hero-actions">
        <a class="btn btn-primary" href="index.html#projects">${escapeHtml(t('ui.backToProjects'))}</a>
      </div>`;
    if (coverEl) coverEl.innerHTML = '';
    if (asideEl) asideEl.innerHTML = '';
    bodyEl.innerHTML = '';
    if (pagerEl) pagerEl.innerHTML = '';
  }

  function renderHero() {
    const cat = CATEGORY[project.category] || {};
    heroEl.innerHTML = `
      <a class="pd-back" href="index.html#projects">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M13 5H1m0 0 4-4M1 5l4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${escapeHtml(t('ui.backToProjects'))}
      </a>
      <div class="pd-kicker">
        <span class="pd-kicker-label">${escapeHtml(t(cat.labelKey || 'ui.catPersonal'))}</span>
        <span class="pd-kicker-year">${escapeHtml(pick(project.year))}</span>
      </div>
      <h1 class="pd-title">${escapeHtml(pick(project.title))}</h1>
      <p class="pd-summary">${escapeHtml(pick(project.summary))}</p>`;
  }

  function renderCover() {
    if (!coverEl) return;
    if (!project.cover || !project.cover.src) { coverEl.innerHTML = ''; return; }
    coverEl.innerHTML = `<figure class="pd-cover-figure">
        ${imageHtml(project.cover.src, pick(project.cover.alt), 'media-holder-wide')}
      </figure>`;
  }

  function renderAside() {
    if (!asideEl) return;
    const meta = (project.meta || []).map((row) => `
      <div class="pd-meta-row">
        <dt>${escapeHtml(pick(row.label))}</dt>
        <dd>${escapeHtml(pick(row.value))}</dd>
      </div>`).join('');

    const tags = (project.tags || []).map((tag) => `<li>${escapeHtml(pick(tag))}</li>`).join('');

    const links = (project.links || []).map((link) => {
      const href = link.href || '#';
      const external = /^https?:/i.test(href);
      return `<a class="pd-link" href="${escapeHtml(href)}"
          ${link.download ? 'download' : ''}
          ${external ? 'target="_blank" rel="noopener"' : ''}>${escapeHtml(pick(link.label))} ${ARROW}</a>`;
    }).join('');

    asideEl.innerHTML = `
      <div class="pd-aside-inner reveal">
        <p class="pd-aside-title">${escapeHtml(t('ui.overview'))}</p>
        ${meta ? `<dl class="pd-meta">${meta}</dl>` : ''}
        ${tags ? `<ul class="pd-tags">${tags}</ul>` : ''}
        ${links ? `<div class="pd-links">${links}</div>` : ''}
      </div>`;
  }

  function renderBody() {
    bodyEl.innerHTML = (project.blocks || []).map(blockHtml).join('');
  }

  function renderPager() {
    if (!pagerEl) return;
    if (projects.length < 2) { pagerEl.innerHTML = ''; return; }
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];

    const card = (target, dirKey, dirClass) => `
      <a class="pd-pager-card ${dirClass}" href="project.html?id=${encodeURIComponent(target.id)}">
        <span class="pd-pager-dir">${escapeHtml(t(dirKey))}</span>
        <span class="pd-pager-title">${escapeHtml(pick(target.title))}</span>
      </a>`;

    pagerEl.innerHTML = `
      <p class="pd-pager-head reveal">${escapeHtml(t('ui.otherProjects'))}</p>
      <div class="pd-pager-grid reveal">
        ${card(prev, 'ui.prevProject', 'is-prev')}
        ${card(next, 'ui.nextProject', 'is-next')}
      </div>`;
  }

  function render() {
    if (!project) { renderNotFound(); return; }

    document.title = `${pick(project.title)} — Thomas ROBERT`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', pick(project.summary));

    renderHero();
    renderCover();
    renderAside();
    renderBody();
    renderPager();

    wireMediaFallbacks(document);
    observeReveals(document);
  }

  render();
  if (window.I18N) window.I18N.onChange(render);
})();
