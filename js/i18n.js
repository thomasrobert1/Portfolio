/* ==========================================================================
   PORTFOLIO SPATIAL — i18n.js
   Bilingue EN / FR. Aucune dépendance.

   PRINCIPE (important pour éditer le site) :
   -----------------------------------------
   • L'ANGLAIS est écrit directement dans le HTML (c'est la version par défaut).
   • Le FRANÇAIS vit dans le dictionnaire `FR` ci-dessous, indexé par la clé
     `data-i18n="..."` posée sur l'élément HTML correspondant.
   → Pour changer un texte anglais : édite le HTML.
   → Pour changer sa traduction : édite la clé correspondante dans `FR`.

   Le moteur mémorise le texte anglais original au chargement, donc revenir en
   anglais restaure exactement le HTML de départ.

   Marqueurs disponibles dans le HTML :
     data-i18n="cle"                          → remplace le contenu de l'élément
     data-i18n-attrs="aria-label:cle,title:x" → remplace des attributs
   ========================================================================== */
(() => {
  'use strict';

  const STORAGE_KEY = 'portfolio-lang';
  const DEFAULT_LANG = 'en';
  const LANGS = ['en', 'fr'];

  /* ---------------------------------------------------------------------
     1. Dictionnaire français (le texte anglais, lui, est dans le HTML)
     --------------------------------------------------------------------- */
  const FR = {
    /* --- Méta / SEO --- */
    'meta.title': 'Thomas ROBERT — Étudiant ingénieur, Arts et Métiers',
    'meta.description': 'Portfolio de Thomas ROBERT, étudiant ingénieur en 2ᵉ année aux Arts et Métiers (ENSAM).',

    /* --- Navigation --- */
    'nav.home': 'Accueil',
    'nav.commitments': 'Mes engagements',
    'nav.journey': 'Parcours',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.menuOpen': 'Ouvrir le menu',
    'nav.menuClose': 'Fermer le menu',

    /* --- Hero --- */
    'hero.eyebrow': 'Étudiant en génie mécanique — Arts et Métiers',
    'hero.text': "Étudiant en 2ᵉ année à Arts et Métiers (ENSAM), passionné de mécanique, d'aérospatial et d'exploration spatiale. Je suis à la recherche de nouvelles opportunités dans des projets liés à l'aérospatial.",
    'hero.cv': 'Télécharger mon CV',
    'hero.seeProjects': 'Voir mes projets',
    'hero.metaLocation': 'Localisation',
    'hero.metaLocationValue': 'Paris, France',
    'hero.metaStatus': 'Statut',
    'hero.metaStatusValue': 'Ouvert aux opportunités',
    'hero.metaContact': 'Contact',
    'hero.scroll': 'Défiler',
    'hero.scrollAria': 'Défiler vers mes engagements',

    /* --- Engagements --- */
    'commitments.eyebrow': 'Leadership',
    'commitments.title': 'Mes engagements',
    'commitments.sub': "Au-delà des études — rôles associatifs et de leadership",

    'c1.date': 'Juin 2026 — Juin 2027',
    'c1.title': 'Responsable Qualité, Performance &amp; Audit',
    'c1.place': "AMJE, Junior-Entreprise des Arts et Métiers",
    'c1.desc': "<li>En charge des processus qualité, du suivi de la performance et de l'audit interne des missions et du fonctionnement de la junior-entreprise.</li><li>Mise à disposition d'outils d'auto-formation pour 50 chargés d'affaires.</li><li>Participation au développement d'un ERP interne pour améliorer l'efficacité et l'indépendance de la structure.</li><li>Vérification et correction de plus de 300 documents et rapports, et audit de 10 missions pour garantir la qualité des livrables.</li><li>Développement d'un outil d'IA pour détecter les erreurs et non-conformités dans des documents anonymisés.</li><li>Encadrement d'une équipe de 6 personnes en charge de la qualité et de la performance, et co-encadrement de 50 chargés d'affaires avec le directeur commercial.</li><li>En charge de la préparation de l'audit mené par les auditeurs CNJE en décembre 2026 et juin 2027.</li>",
    'c1.t1': 'Qualité',
    'c1.t2': 'Audit',
    'c1.t3': 'Performance',

    'c2.date': 'Août 2026 — Août 2027',
    'c2.title': 'Vice-Président',
    'c2.place': "AM Space, Association aérospatiale des Arts et Métiers",
    'c2.desc': "<li>Co-pilotage de la stratégie et des projets aérospatiaux de l'association, coordination des équipes et des partenariats.</li><li>Lancement d'un nouveau projet de conception d'un système de propulsion complet pour satellites CubeSat, comprenant un chauffage ECR et un système de propulsion Helicon.</li><li>Aide à l'organisation d'événements liés à l'aérospatial et à l'exploration spatiale, dont des conférences et ateliers.</li><li>Aide au président pour préparer notre première participation à la conférence EPS 2027 à Lausanne, en Suisse.</li><li>Début de la conception et de la fabrication d'un télescope DIY de 127 mm pour l'observation planétaire et l'astrophotographie.</li>",
    'c2.t1': 'Leadership',
    'c2.t2': 'Aérospatial',
    'c2.t3': 'Gestion de projet',

    /* --- Parcours --- */
    'journey.eyebrow': 'Trajectoire',
    'journey.title': 'Parcours académique &amp; professionnel',
    'journey.sub': 'Du lycée aux Arts et Métiers, chaque étape a sa propre orbite.',

    'j1.date': 'Sept. 2026 — Présent',
    'j1.title': '2ᵉ année — Formation ingénieur généraliste',
    'j1.place': 'Arts et Métiers (ENSAM), Paris',
    'j1.desc': "Programme Grande École parmi les 10 premières écoles d'ingénieurs françaises, avec une spécialisation progressive en mécanique et systèmes complexes. Projets de conception, de calcul et de fabrication.",
    'j1.t1': 'Mécanique',
    'j1.t2': 'Calcul de structures',
    'j1.t3': 'CAO',

    'j1a.date': 'Juin 2026 — Juin 2027',
    'j1a.title': 'Responsable Qualité, Performance &amp; Audit',
    'j1a.place': "AMJE, Junior-Entreprise des Arts et Métiers",
    'j1a.desc': "En charge des processus qualité, du suivi de la performance et de l'audit interne des missions et du fonctionnement de la junior-entreprise.",
    'j1a.t1': 'Qualité',
    'j1a.t2': 'Audit',
    'j1a.t3': 'Performance',

    'j1b.date': 'Août 2026 — Août 2027',
    'j1b.title': 'Vice-Président',
    'j1b.place': "AM Space, Association aérospatiale des Arts et Métiers",
    'j1b.desc': "Co-pilotage de la stratégie et des projets aérospatiaux de l'association, coordination des équipes et des partenariats.",
    'j1b.t1': 'Leadership',
    'j1b.t2': 'Aérospatial',
    'j1b.t3': 'Gestion de projet',

    'j1c.date': 'Juillet 2026',
    'j1c.title': 'Stage',
    'j1c.place': "Laboratoire d'Astrophysique de Marseille (LAM)",
    'j1c.desc': "Stage de recherche au sein du laboratoire d'astrophysique de Marseille.",
    'j1c.t1': 'Astrophysique',
    'j1c.t2': 'Recherche',

    'j2.date': 'Sept. 2025 — Juin 2026',
    'j2.title': '1ʳᵉ année — Tronc commun ingénieur',
    'j2.place': 'Arts et Métiers (ENSAM), Châlons-en-Champagne',
    'j2.desc': "Fondamentaux scientifiques et techniques : mécanique des solides et des fluides, matériaux, procédés industriels, gestion de projet.",
    'j2.t1': 'Mécanique des fluides',
    'j2.t2': 'Matériaux',
    'j2.t3': 'Projet',

    'j3.date': 'Sept. 2023 — Juin 2025',
    'j3.title': 'Classes préparatoires MPSI / PSI',
    'j3.place': 'Lycée Aux Lazaristes, Lyon',
    'j3.desc': "Formation intensive en mathématiques, physique et sciences de l'ingénieur, dans une classe préparatoire classée parmi les 5 premières de France. Admission aux Arts et Métiers via le concours national CentraleSupélec (PSI) — classé dans le top 25 % sur 3 684 candidats.",
    'j3.t1': 'Mathématiques',
    'j3.t2': 'Physique',
    'j3.t3': 'SI',

    'j4.date': 'Sept. 2021 — Juin 2023',
    'j4.title': 'Baccalauréat général',
    'j4.place': 'Lycée Saint Éloi, Aix-en-Provence',
    'j4.desc': "Spécialités Mathématiques, Physique-Chimie et sciences de l'ingénieur. Obtenu avec mention et félicitations du jury.",
    'j4.t1': 'Mention',

    /* --- Projets --- */
    'projects.eyebrow': 'Missions',
    'projects.title': 'Projets',
    'projects.sub': 'Personnels, académiques et associatifs — en cours de remplissage.',
    'projects.filterAria': 'Filtrer les projets',

    /* --- Contact --- */
    'contact.eyebrow': 'Contact',
    'contact.title': 'Me contacter',
    'contact.email': 'E-mail',
    'footer.text': '— Étudiant ingénieur, Arts et Métiers',
    'footer.top': 'Haut de page ↑',

    /* --- Interface générée en JS (cartes projets, page projet) --- */
    'ui.filterAll': 'Tous',
    'ui.filterPersonal': 'Personnel',
    'ui.filterAcademic': 'Académique',
    'ui.filterExtracurricular': 'Associatif',
    'ui.catPersonal': 'Personnel',
    'ui.catAcademic': 'Académique',
    'ui.catExtracurricular': 'Associatif',
    'ui.viewProject': 'Voir le projet',
    'ui.nextSlotLabel': '+ Nouveau',
    'ui.nextSlotTitle': 'Prochain projet',
    'ui.nextSlotDesc': 'Emplacement libre — ajoute une entrée dans js/projects-data.js pour créer un projet.',
    'ui.backToProjects': 'Tous les projets',
    'ui.overview': 'En bref',
    'ui.prevProject': 'Projet précédent',
    'ui.nextProject': 'Projet suivant',
    'ui.notFoundTitle': 'Projet introuvable',
    'ui.notFoundText': "Ce projet n'existe pas (ou plus). Retourne à la liste des projets pour continuer la visite.",
    'ui.mediaMissing': 'Média à déposer ici',
    'ui.otherProjects': 'Continuer la visite',
    'ui.langLabel': 'Langue',
    'ui.langEn': 'Passer en anglais',
    'ui.langFr': 'Passer en français',
    'ui.readTime': 'Lecture',
    'ui.minutes': 'min',
    'ui.menuOpen': 'Ouvrir le menu',
    'ui.menuClose': 'Fermer le menu',
  };

  const DICT = { fr: FR };

  /* ---------------------------------------------------------------------
     2. Textes anglais utilisés par le JS (cartes, page projet)
        Équivalents des clés `ui.*` ci-dessus.
     --------------------------------------------------------------------- */
  const EN_UI = {
    'ui.filterAll': 'All',
    'ui.filterPersonal': 'Personal',
    'ui.filterAcademic': 'Academic',
    'ui.filterExtracurricular': 'Extracurricular',
    'ui.catPersonal': 'Personal',
    'ui.catAcademic': 'Academic',
    'ui.catExtracurricular': 'Extracurricular',
    'ui.viewProject': 'View project',
    'ui.nextSlotLabel': '+ New',
    'ui.nextSlotTitle': 'Next project',
    'ui.nextSlotDesc': 'Free slot — add an entry in js/projects-data.js to create a project.',
    'ui.backToProjects': 'All projects',
    'ui.overview': 'Overview',
    'ui.prevProject': 'Previous project',
    'ui.nextProject': 'Next project',
    'ui.notFoundTitle': 'Project not found',
    'ui.notFoundText': 'This project does not exist (or no longer does). Head back to the project list to keep exploring.',
    'ui.mediaMissing': 'Drop your media here',
    'ui.otherProjects': 'Keep exploring',
    'ui.langLabel': 'Language',
    'ui.langEn': 'Switch to English',
    'ui.langFr': 'Switch to French',
    'ui.readTime': 'Read',
    'ui.minutes': 'min',
    'ui.menuOpen': 'Open the menu',
    'ui.menuClose': 'Close the menu',
  };

  /* ---------------------------------------------------------------------
     3. Moteur
     --------------------------------------------------------------------- */
  let current = DEFAULT_LANG;
  const listeners = new Set();
  const originals = new WeakMap(); // élément → texte anglais d'origine

  /**
   * Langue au chargement, par ordre de priorité :
   *   1. le paramètre d'URL ?lang=fr  (lien partageable : index.html?lang=fr)
   *   2. le choix mémorisé lors d'une visite précédente
   *   3. l'anglais
   */
  function readInitial() {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang');
      if (LANGS.includes(fromUrl)) return fromUrl;
    } catch (e) { /* URL exotique : on continue */ }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(stored)) return stored;
    } catch (e) { /* localStorage indisponible */ }
    return DEFAULT_LANG;
  }

  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* mode privé */ }
    // Si l'URL portait ?lang=…, on la garde cohérente avec le choix courant.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('lang') && url.searchParams.get('lang') !== lang) {
        url.searchParams.set('lang', lang);
        window.history.replaceState(null, '', url);
      }
    } catch (e) { /* history indisponible (file://) */ }
  }

  /** Traduit une clé `ui.*` (textes créés en JavaScript). */
  function t(key) {
    if (current !== 'en' && DICT[current] && DICT[current][key] != null) return DICT[current][key];
    return EN_UI[key] != null ? EN_UI[key] : key;
  }

  /** Choisit la bonne variante d'un champ `{ en, fr }` venant des données. */
  function pick(field) {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    return field[current] != null ? field[current] : (field.en != null ? field.en : '');
  }

  function snapshot(root) {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      if (!originals.has(el)) originals.set(el, { html: el.innerHTML });
    });
    root.querySelectorAll('[data-i18n-attrs]').forEach((el) => {
      let entry = originals.get(el);
      if (!entry) { entry = { html: null }; originals.set(el, entry); }
      if (entry.attrs) return;
      entry.attrs = {};
      parseAttrSpec(el).forEach(({ attr }) => { entry.attrs[attr] = el.getAttribute(attr); });
    });
  }

  function parseAttrSpec(el) {
    return (el.getAttribute('data-i18n-attrs') || '')
      .split(',')
      .map((pair) => pair.trim())
      .filter(Boolean)
      .map((pair) => {
        const idx = pair.indexOf(':');
        return { attr: pair.slice(0, idx).trim(), key: pair.slice(idx + 1).trim() };
      })
      .filter(({ attr, key }) => attr && key);
  }

  /** Applique la langue courante à un sous-arbre du DOM. */
  function apply(root = document) {
    snapshot(root);
    const dict = DICT[current] || null;

    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const original = originals.get(el);
      const translated = dict ? dict[key] : null;
      const value = translated != null ? translated : (original ? original.html : el.innerHTML);
      if (el.innerHTML !== value) el.innerHTML = value;
    });

    root.querySelectorAll('[data-i18n-attrs]').forEach((el) => {
      const entry = originals.get(el);
      parseAttrSpec(el).forEach(({ attr, key }) => {
        const translated = dict ? dict[key] : null;
        const value = translated != null ? translated : (entry && entry.attrs ? entry.attrs[attr] : null);
        if (value != null) el.setAttribute(attr, value);
      });
    });
  }

  function setLang(lang, { silent = false } = {}) {
    if (!LANGS.includes(lang)) return;
    current = lang;
    document.documentElement.setAttribute('lang', lang);
    store(lang);
    apply(document);
    syncSwitchers();
    if (!silent) listeners.forEach((fn) => { try { fn(lang); } catch (e) { console.error(e); } });
  }

  /* ---------------------------------------------------------------------
     4. Sélecteur de langue (drapeaux) — injecté dans [data-lang-switch]
     --------------------------------------------------------------------- */
  const FLAGS = {
    en: `<svg class="flag" viewBox="0 0 60 30" aria-hidden="true" focusable="false">
        <clipPath id="flag-clip-uk"><rect width="60" height="30"/></clipPath>
        <g clip-path="url(#flag-clip-uk)">
          <rect width="60" height="30" fill="#012169"/>
          <path d="M0 0 60 30M60 0 0 30" stroke="#fff" stroke-width="6"/>
          <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" stroke-width="2.4"/>
          <path d="M30 0V30M0 15H60" stroke="#fff" stroke-width="10"/>
          <path d="M30 0V30M0 15H60" stroke="#c8102e" stroke-width="6"/>
        </g>
      </svg>`,
    fr: `<svg class="flag" viewBox="0 0 60 30" aria-hidden="true" focusable="false">
        <rect width="20" height="30" fill="#002654"/>
        <rect x="20" width="20" height="30" fill="#f5f5f5"/>
        <rect x="40" width="20" height="30" fill="#ed2939"/>
      </svg>`,
  };

  function buildSwitchers() {
    document.querySelectorAll('[data-lang-switch]').forEach((host) => {
      if (host.dataset.built === 'true') return;
      host.classList.add('lang-switch');
      host.setAttribute('role', 'group');
      host.innerHTML = LANGS.map((lang) => `
        <button type="button" class="lang-btn" data-lang="${lang}" aria-pressed="false">
          ${FLAGS[lang]}<span class="lang-code">${lang.toUpperCase()}</span>
        </button>`).join('');
      host.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
      });
      host.dataset.built = 'true';
    });
    syncSwitchers();
  }

  function syncSwitchers() {
    document.querySelectorAll('[data-lang-switch]').forEach((host) => {
      host.setAttribute('aria-label', t('ui.langLabel'));
      host.querySelectorAll('.lang-btn').forEach((btn) => {
        const isActive = btn.dataset.lang === current;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
        btn.setAttribute('title', btn.dataset.lang === 'fr' ? t('ui.langFr') : t('ui.langEn'));
        btn.setAttribute('aria-label', btn.dataset.lang === 'fr' ? t('ui.langFr') : t('ui.langEn'));
      });
    });
  }

  /* ---------------------------------------------------------------------
     5. API publique + démarrage
     --------------------------------------------------------------------- */
  window.I18N = {
    LANGS,
    get lang() { return current; },
    setLang,
    t,
    pick,
    apply,
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };

  snapshot(document);
  buildSwitchers();
  setLang(readInitial(), { silent: true });
  // Le HTML est masqué le temps d'appliquer la langue (cf. inline script du <head>)
  document.documentElement.removeAttribute('data-lang-loading');
})();
