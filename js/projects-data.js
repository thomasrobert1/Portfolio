/* ==========================================================================
   PORTFOLIO SPATIAL — projects-data.js
   ✏️ C'EST ICI QUE TU DÉCRIS TES PROJETS. Un objet = un projet = une carte
   sur la page d'accueil + une page de détail (project.html?id=...).

   Tous les textes sont bilingues : { en: "...", fr: "..." }.
   Le contenu ci-dessous est un EXEMPLE à remplacer par tes vrais projets.

   ---------------------------------------------------------------------------
   CHAMPS D'UN PROJET
   ---------------------------------------------------------------------------
   id        (obligatoire) identifiant en minuscules, sans espace. Il devient
             l'URL de la page : project.html?id=mon-projet
   category  'academic' | 'personal' | 'extracurricular'  → filtre + badge
   year      texte libre affiché sur la carte ('2025', '2025 — Present'…)
   title     titre du projet
   summary   1 à 3 phrases : résumé affiché sur la carte et en haut de la page
   tags      liste de mots-clés (affichés sur la carte et sur la page)
   cover     image d'en-tête de la page de détail : { src, alt }
   meta      lignes de la fiche technique : [{ label, value }]
   links     boutons de liens externes : [{ label, href, download? }]
   blocks    le corps de la page (voir ci-dessous)

   ---------------------------------------------------------------------------
   TYPES DE BLOCS DISPONIBLES (tableau `blocks`)
   ---------------------------------------------------------------------------
   { type: 'heading',    text }                       → titre de section (h2)
   { type: 'subheading', text }                       → sous-titre (h3)
   { type: 'text',       text }                       → paragraphe (HTML simple autorisé : <strong>, <em>, <a>)
   { type: 'list',       items: [ ... ] }             → liste à puces
   { type: 'image',      src, alt, caption }          → image + légende
   { type: 'gallery',    items: [{ src, alt, caption }] } → 2 à 3 images côte à côte
   { type: 'video',      src, poster, caption }       → vidéo locale (.mp4)
   { type: 'embed',      provider: 'youtube', id, caption } → vidéo YouTube
   { type: 'quote',      text, author }               → citation mise en avant
   { type: 'stats',      items: [{ value, label }] }  → chiffres clés

   Les images vont dans assets/img/projects/, les vidéos dans assets/video/.
   Si un fichier est absent, un cadre en pointillés indique le chemin attendu :
   rien ne casse, tu peux remplir plus tard.
   ========================================================================== */

window.PROJECTS = [

  /* ======================================================================
     1. Projet académique
     ====================================================================== */
  {
    id: 'precision-gearbox',
    category: 'academic',
    year: '2025',
    title: {
      en: 'Precision gearbox redesign',
      fr: 'Refonte d’un réducteur de précision',
    },
    summary: {
      en: 'A two-stage reduction gearbox redesigned to cut backlash by half, from analytical sizing to a machined and instrumented prototype.',
      fr: 'Un réducteur à deux étages repensé pour diviser le jeu angulaire par deux, du dimensionnement analytique au prototype usiné et instrumenté.',
    },
    tags: [
      { en: 'Mechanical design', fr: 'Conception mécanique' },
      { en: 'CAD / CATIA', fr: 'CAO / CATIA' },
      { en: 'FEA', fr: 'Calcul EF' },
      { en: 'Machining', fr: 'Usinage' },
    ],
    cover: {
      src: 'assets/img/projects/gearbox-cover.jpg',
      alt: { en: 'Exploded CAD view of the gearbox', fr: 'Vue éclatée CAO du réducteur' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'Design lead (team of 4)', fr: 'Responsable conception (équipe de 4)' } },
      { label: { en: 'Duration', fr: 'Durée' }, value: { en: '14 weeks', fr: '14 semaines' } },
      { label: { en: 'Context', fr: 'Contexte' }, value: { en: 'Design & manufacturing course, ENSAM', fr: 'UE Conception & fabrication, ENSAM' } },
      { label: { en: 'Tools', fr: 'Outils' }, value: { en: 'CATIA V5, Abaqus, Python', fr: 'CATIA V5, Abaqus, Python' } },
    ],
    links: [
      { label: { en: 'Read the report (PDF)', fr: 'Lire le rapport (PDF)' }, href: '#' },
    ],
    blocks: [
      { type: 'heading', text: { en: 'The brief', fr: 'Le sujet' } },
      {
        type: 'text',
        text: {
          en: 'The existing bench used a commercial gearbox whose <strong>angular backlash of about 40 arcmin</strong> made repeatable positioning impossible. Our task: redesign the reduction stage for the same footprint and the same 1:25 ratio, but with half the backlash — and prove it with measurements, not with a datasheet.',
          fr: 'Le banc existant utilisait un réducteur du commerce dont le <strong>jeu angulaire d’environ 40 arcmin</strong> rendait tout positionnement répétable impossible. Notre mission : reconcevoir l’étage de réduction dans le même encombrement et avec le même rapport 1:25, mais avec deux fois moins de jeu — et le prouver par la mesure, pas par une fiche technique.',
        },
      },
      {
        type: 'stats',
        items: [
          { value: '1:25', label: { en: 'Reduction ratio', fr: 'Rapport de réduction' } },
          { value: '−52 %', label: { en: 'Measured backlash', fr: 'Jeu angulaire mesuré' } },
          { value: '18 Nm', label: { en: 'Output torque', fr: 'Couple en sortie' } },
        ],
      },

      { type: 'heading', text: { en: 'What I did', fr: 'Ce que j’ai fait' } },
      {
        type: 'list',
        items: [
          { en: 'Wrote a Python sizing script for the gear trains (module, tooth count, contact ratio, Hertz pressure) to explore ~200 combinations instead of three.', fr: 'Écrit un script Python de dimensionnement des trains (module, nombre de dents, rapport de conduite, pression de Hertz) pour explorer ~200 combinaisons au lieu de trois.' },
          { en: 'Modelled the full assembly in CATIA V5 with a tolerance chain built backwards from the target backlash.', fr: 'Modélisé l’ensemble sous CATIA V5 avec une chaîne de côtes construite à rebours depuis l’objectif de jeu.' },
          { en: 'Ran a static FEA on the output shaft and the housing to validate stiffness before committing to machining.', fr: 'Mené un calcul statique par éléments finis sur l’arbre de sortie et le carter pour valider la raideur avant de lancer l’usinage.' },
          { en: 'Machined the housing on a 3-axis mill and assembled the prototype in the school workshop.', fr: 'Usiné le carter sur fraiseuse 3 axes et assemblé le prototype dans l’atelier de l’école.' },
        ],
      },

      { type: 'subheading', text: { en: 'From analysis to chips on the floor', fr: 'Du calcul aux copeaux' } },
      {
        type: 'text',
        text: {
          en: 'The most valuable lesson was not the calculation — it was the gap between the two. Our first housing came out of the mill 0.08 mm out of parallel, which was enough to eat the entire backlash budget. We re-machined the bearing seats in a single setup, and the numbers finally matched the model.',
          fr: 'La leçon la plus utile n’a pas été le calcul, mais l’écart entre les deux. Notre premier carter est sorti de la fraiseuse avec 0,08 mm de défaut de parallélisme — de quoi consommer tout le budget de jeu. Nous avons réusiné les logements de roulements en une seule prise, et les mesures ont enfin rejoint le modèle.',
        },
      },
      {
        type: 'image',
        src: 'assets/img/projects/gearbox-assembly.jpg',
        alt: { en: 'The assembled prototype on the test bench', fr: 'Le prototype assemblé sur le banc d’essai' },
        caption: { en: 'The assembled prototype, instrumented with an optical encoder on the output shaft.', fr: 'Le prototype assemblé, instrumenté d’un codeur optique en sortie d’arbre.' },
      },

      { type: 'heading', text: { en: 'Result', fr: 'Résultat' } },
      {
        type: 'text',
        text: {
          en: 'Measured backlash settled at <strong>19 arcmin</strong> across ten load cycles — better than the 20 arcmin target. The bench is still in use by the following cohort.',
          fr: 'Le jeu mesuré s’est stabilisé à <strong>19 arcmin</strong> sur dix cycles de charge — mieux que l’objectif de 20 arcmin. Le banc est toujours utilisé par la promotion suivante.',
        },
      },
      {
        type: 'video',
        src: 'assets/video/gearbox-run.mp4',
        poster: 'assets/img/projects/gearbox-assembly.jpg',
        caption: { en: 'Prototype running at 300 rpm during the final acceptance test.', fr: 'Le prototype à 300 tr/min lors de l’essai de recette final.' },
      },
    ],
  },
{
    id: 'Study of a Helicon plasma thruster with ECR heating',
    category: 'academic',
    year: 'Sept.2026 - June 2027',
    title: {
      en: 'Study of a Helicon plasma thruster with ECR heating',
      fr: 'Étude d’un propulseur plasma Helicon avec chauffage ECR',
    },
    summary: {
      en: 'Led a group of 7 students to study the performance of a Helicon plasma thruster with Electron Cyclotron Resonance heating, including design, simulation, and experimental validation. The objective was to study the association of Helicon and ECR heating to improve the performance of the thruster. Possible integration of the thruster in a CubeSat was also in the scope of the project.',
      fr: 'Étude du comportement d’un propulseur plasma Helicon avec chauffage par résonance électronique cyclotronique, incluant la conception, la simulation et la validation expérimentale. L’objectif était d’étudier l’association du générateur Helicon et du chauffage ECR pour améliorer les performances du propulseur. L’intégration possible du propulseur dans un CubeSat était également dans le périmètre du projet.',
    },
    tags: [
      { en: 'Physics of plasmas', fr: 'Physique des plasmas' },
      { en: 'Fundamentals in Electromagnetism', fr: 'Fondements en Électromagnétisme' },
      { en: 'Teamwork', fr: 'Travail en équipe' },
      { en: 'Project management', fr: 'Gestion de projet' },
    ],
    cover: {
      src: 'assets/img/projects/gearbox-cover.jpg',
      alt: { en: 'The Team', fr: 'L’équipe' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'Project Manager', fr: 'Chef de projet' } },
      { label: { en: 'Duration', fr: 'Durée' }, value: { en: '6 months', fr: '6 mois' } },
      { label: { en: 'Context', fr: 'Contexte' }, value: { en: 'Project between Arts et Métiers Institute of Technology and AM Space', fr: 'Projet entre l’Institut des Arts et Métiers et AM Space' } },
      { label: { en: 'Tools', fr: 'Outils' }, value: { en: 'CATIA V5, Abaqus, Python', fr: 'CATIA V5, Abaqus, Python' } },
    ],
    links: [
      { label: { en: 'Read the report (PDF)[Under NDA]', fr: 'Lire le rapport (PDF) [Sous NDA]' }, href: '#' },
    ],
    blocks: [
      { type: 'heading', text: { en: 'The brief', fr: 'Le sujet' } },
      {
        type: 'text',
        text: {
          en: 'To face the aerodynamical trust of a CubeSat, a Helicon plasma thruster with Electron Cyclotron Resonance heating was studied. The objective was to attest the association of Helicon and ECR heating to create a more efficient propulsion system in VLEO conditions. Because of the size of the system, the thruster also had to face certain physical constraints, such as the size of the magnetic coils and the power supply. The project was conducted in a team of 7 students, with a focus on design, simulation, and experimental validation. This project has been launched by AM Space students who tardet to participate in the EPS 2027 conference in Lausanne.',
          fr: 'Pour répondre à la confiance aérodynamique d’un CubeSat, un propulseur à plasma Helicon avec chauffage par Résonance Cyclotronique des Électrons a été étudié. L’objectif était de valider l’association du Helicon et du chauffage ECR pour créer un système de propulsion plus efficace dans les conditions de VLEO. En raison de la taille du système, le propulseur devait également faire face à certaines contraintes physiques, telles que la taille des bobines magnétiques et l’alimentation électrique. Le projet a été mené dans une équipe de 7 étudiants, avec un focus sur la conception, la simulation et la validation expérimentale. Ce projet a été lancé par les étudiants d’AM Space qui ont tardé à participer à la conférence EPS 2027 à Lausanne.',
        },
      },
      {
        type: 'stats',
        items: [
          { value: 'XXX', label: { en: 'To be determined', fr: 'À déterminer' } },
          { value: 'XXX', label: { en: 'To be determined', fr: 'À déterminer' } },
          { value: 'XXX', label: { en: 'To be determined', fr: 'À déterminer' } },
        ],
      },

      { type: 'heading', text: { en: 'What I did', fr: 'Ce que j’ai fait' } },
      {
        type: 'list',
        items: [
          { en: 'Supervised the whole project and managed the team of 7 students.', fr: 'Supervisé le projet entier et géré l’équipe de 7 étudiants.' },
          { en: 'As the VP of AM Space, I had to get specific results from the analysis especially regarding our participation in the EPS 2027 conference.', fr: 'En tant que VP d’AM Space, j’ai dû obtenir des résultats spécifiques de l’analyse, en particulier concernant notre participation à la conférence EPS 2027.' },
          { en: 'Helped study the physics of plasma and the ECR heating mechanism.', fr: 'Aidé l’étude de la physique du plasma et du mécanisme de chauffage ECR.' },
          { en: 'Managed the whole experimental phase.', fr: 'Géré l’ensemble de la phase expérimentale.' },
        ],
      },

      { type: 'subheading', text: { en: 'During the project', fr: 'Pendant le projet' } },
      {
        type: 'text',
        text: {
          en: 'In progress',
          fr: 'En cours',
        },
      },
      {
        type: 'image',
        src: 'assets/img/projects/gearbox-assembly.jpg',
        alt: { en: 'The assembled prototype on the test bench', fr: 'Le prototype assemblé sur le banc d’essai' },
        caption: { en: 'During the project', fr: 'Pendant le projet' },
      },

      { type: 'heading', text: { en: 'Result', fr: 'Résultat' } },
      {
        type: 'text',
        text: {
          en: 'In progress',
          fr: 'En cours',
        },
      },
    ],
  },
  {
    id: 'L\'Oréal Brandstorm 2026',
    category: 'academic',
    year: 'Feb. 2026 - June 2026',
    title: {
      en: 'L\'Oréal Brandstorm 2026',
      fr: 'L\'Oréal Brandstorm 2026',
    },
    summary: {
      en: 'Led a team of 3 students to participate in the L\'Oréal Brandstorm 2026 competition, focusing on innovative solutions for sustainable fragrances. The project involved market research, product design, and a final presentation to the L\'Oréal panel.',
      fr: 'Dirigé une équipe de 3 étudiants pour participer à la compétition L\'Oréal Brandstorm 2026, en se concentrant sur des solutions innovantes pour les parfums durables. Le projet a impliqué une recherche de marché, la conception du produit et une présentation finale devant le comité L\'Oréal.',
    },
    tags: [
      { en: 'Innovation', fr: 'Innovation' },
      { en: 'Market Research', fr: 'Étude de marché' },
      { en: 'Teamwork', fr: 'Travail en équipe' },
      { en: 'CAD and Elevator Pitch', fr: 'CAO et Elevator Pitch' },
    ],
    cover: {
      src: 'assets/img/projects/lorealteam.jpg',
      alt: { en: 'The Team', fr: 'L’équipe' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'Project Manager', fr: 'Chef de projet' } },
      { label: { en: 'Duration', fr: 'Durée' }, value: { en: '6 months', fr: '6 mois' } },
      { label: { en: 'Context', fr: 'Contexte' }, value: { en: 'Participation in the L\'Oréal Brandstorm 2026 competition', fr: 'Participation à la compétition L\'Oréal Brandstorm 2026' } },
      { label: { en: 'Skills', fr: 'Compétences' }, value: { en: 'How to pitch a new product', fr: 'Comment présenter un nouveau produit' } },
    ],
    links: [
      { label: { en: 'The concept', fr: 'Le concept' }, href: '#' },
    ],
    blocks: [
      { type: 'heading', text: { en: 'Le concept', fr: 'Le concept' } },
      {
        type: 'text',
        text: {
          en: 'Participation in the L\'Oréal Brandstorm 2026 competition, focusing on innovative solutions for sustainable fragrances. The project involved market research, product design, and a final presentation to the L\'Oréal panel. The concept was to create a jewelry line that releases fragrance when worn, using sustainable materials, refillable scent capsules and precision mechanisms. Such as broches and necklaces that can be personalized with different scents. The team conducted market research to identify consumer preferences and designed prototypes using CAD software. The final presentation included a pitch to the L\'Oréal panel, highlighting the unique selling points of the product and its potential impact on the fragrance industry.',
          fr: 'Participation dans la compétition L\'Oréal Brandstorm 2026, axée sur des solutions innovantes pour les parfums durables. Le projet a impliqué une recherche de marché, la conception du produit et une présentation finale devant le comité L\'Oréal. Le concept consistait à créer une ligne de bijoux qui délivre un parfum lorsqu\'ils sont portés, en utilisant des matériaux durables et des capsules de parfum rechargeables. Comme des broches et des colliers qui peuvent être personnalisés avec différents parfums. L\'équipe a mené une recherche de marché pour identifier les préférences des consommateurs et a conçu des prototypes en utilisant un logiciel CAD. La présentation finale a inclus une présentation devant le comité L\'Oréal, mettant en avant les points de vente uniques du produit et son impact potentiel sur l\'industrie des parfums.',
        },
      },
      {
        type: 'stats',
        items: [
          { value: '60 g', label: { en: 'Weight', fr: 'Poids' } },
          { value: '800 - 6000 € for L\'Oréal Group brands', label: { en: 'Price', fr: 'Prix' } },
          { value: '> 60%', label: { en: 'Estimated Gross Margin', fr: 'Marge brute estimée' } },
        ],
      },

      { type: 'heading', text: { en: 'What I did', fr: 'Ce que j’ai fait' } },
      {
        type: 'list',
        items: [
          { en: 'Worked in a team of 3 students to find a new concept for the L\'Oréal Brandstorm 2026 competition.', fr: 'Travaillé dans une équipe de 3 étudiants pour trouver un nouveau concept pour la compétition L\'Oréal Brandstorm 2026.' },
          { en: 'Immerged in a new work environment by studying luxury.', fr: 'Immersion dans un nouvel environnement de travail en étudiant le secteur du luxe.' },
          { en: 'Designed the product.', fr: 'Conception du produit.' },
          { en: 'Pitched the project.', fr: 'Présentation du projet & aspect commercial.' },
        ],
      },

      { type: 'subheading', text: { en: 'During the project', fr: 'Pendant le projet' } },
      {
        type: 'text',
        text: {
          en: 'In progress',
          fr: 'En cours',
        },
      },
      {
        type: 'image',
        src: 'assets/img/projects/gearbox-assembly.jpg',
        alt: { en: 'The product', fr: 'Le produit' },
        caption: { en: 'During the project', fr: 'Pendant le projet' },
      },

      { type: 'heading', text: { en: 'Result', fr: 'Résultat' } },
      {
        type: 'text',
        text: {
          en: 'In progress',
          fr: 'En cours',
        },
      },
    ],
  },
  /* ======================================================================
     2. Projet personnel
     ====================================================================== */
  {
    id: '127 mm DIY Telescope',
    category: 'personal',
    year: '2026',
    title: {
      en: '127 mm DIY Telescope',
      fr: 'Télescope DIY de 127 mm',
    },
    summary: {
      en: 'Building a 127 mm telescope from scratch, including the choice of components, the 3D printedtube, and the mount, to learn optics and mechanical design hands-on. Making some planetary observations. ',
      fr: 'Construction d\'un télescope de 127 mm à partir de zéro, y compris le choix des composants, le tube imprimé en 3D et le montage, pour apprendre l’optique et la conception mécanique avec leur application. Réalisation de quelques observations planétaires.',
    },
    tags: [
      { en: 'Optics', fr: 'Optique' },
      { en: 'CATIA V5', fr: 'CATIA V5' },
      { en: 'Mechanical Design', fr: 'Conception Mécanique' },
      { en: 'Astronomy', fr: 'Astronomie' },
    ],
    cover: {
      src: 'assets/img/projects/cnc-cover.jpg',
      alt: { en: 'The mounted telescope', fr: 'Le télescope monté' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'Solo project', fr: 'Projet solo' } },
      { label: { en: 'Duration', fr: 'Durée' }, value: { en: '4 months, evenings & weekends', fr: '4 mois, soirs et week-ends' } },
      { label: { en: 'Budget', fr: 'Budget' }, value: { en: '800 €[—]', fr: '800 [—] €' } },
      { label: { en: 'Status', fr: 'Statut' }, value: { en: 'Running, still being improved', fr: 'En service, encore en amélioration' } },
    ],

    blocks: [
      { type: 'heading', text: { en: 'Why build one', fr: 'Pourquoi la construire' } },
      {
        type: 'text',
        text: {
          en: 'I wanted to be able to do some planetary observations without having to buy a ready-to-use one. It allowed me to be able to customize it to my needs.',
          fr: 'Je voulais être capable de faire des observations planétaires sans avoir à acheter un modèle prêt à l’emploi. Cela m’a permis de le personnaliser selon mes besoins.',
        },
      },

      { type: 'heading', text: { en: 'Design choices', fr: 'Choix de conception' } },
      {
        type: 'list',
        items: [
          { en: 'Built like a newtonian telescope but with a 127 mm objective', fr: 'Construit comme un télescope newtonien mais avec un objectif de 127 mm' },
          { en: '90° tilt for planetary observations and improved eye comfort', fr: 'Inclination de 90° pour les observations planétaires et le confort oculaire' },
          { en: 'DIY ocular with ThorLabs lenses to build a Barlow lens', fr: 'Oculaire DIY avec lentilles ThorLabs pour construire une lentille Barlow' },
          { en: 'Astronomical camera for high resolution imaging', fr: 'Appareil photographique astronomique pour la prise de vue à haute résolution' },
        ],
      },
      {
        type: 'gallery',
        items: [
          { src: 'assets/img/projects/cnc-frame.jpg', alt: { en: 'The Telescope', fr: 'Le Télescope' }, caption: { en: 'The Telescope', fr: 'Le Télescope' } },
          { src: 'assets/img/projects/cnc-spindle.jpg', alt: { en: 'Observation setup', fr: 'Réglage pour observations' }, caption: { en: 'Observation setup', fr: 'Réglage pour observations' } },
          { src: 'assets/img/projects/cnc-part.jpg', alt: { en: 'First pictures', fr: 'Premières images' }, caption: { en: 'First pictures', fr: 'Premières images' } },
        ],
      },

      { type: 'heading', text: { en: 'What it can do now', fr: 'Ce qu’il sait faire' } },
      {
        type: 'stats',
        items: [
          { value: 'XXX', label: { en: 'Size', fr: 'Taille (mm)' } },
          { value: 'XXX', label: { en: 'Specs', fr: 'Caractéristiques' } },
          { value: 'XXX', label: { en: 'The camera', fr: 'Caméra astronomique' } },
        ],
      },
      {
        type: 'text',
        text: {
          en: 'The telescope is currently able to observe planets and the moon. The next step is to improve the mount and the tracking system for better stability during observations.',
          fr: 'Le télescope est actuellement capable d\'observer les planètes et la lune. L\'étape suivante est d\'améliorer le montage et le système de suivi pour une meilleure stabilité lors des observations.',
        },
      },
      {
        type: 'quote',
        text: {
          en: 'The harder part is not the design but the alignment and the calibration of the telescope.',
          fr: 'La partie la plus difficile n’est pas la conception mais l’alignement et la calibration du télescope.',
        },
      },
    ],
  },

  /* ======================================================================
     3. Projet associatif
     ====================================================================== */
  {
    id: 'The "Great Challenge"',
    category: 'extracurricular',
    year: { en: 'November 2025', fr: 'Novembre 2025' },
    title: {
      en: 'The "Great Challenge"',
      fr: 'Le "Grand Défi"',
    },
    summary: {
      en: 'During a 24-hour immersion at the UMB facility in Châlons-en-Champagne, our year group designed and painted murals to make the site more welcoming for patients.',
      fr: 'Plongée 24h au sein de l\'établissement de l\'UMD de Châlons-en-Champagne, notre promo a réalisé des fresques artistiques pour rendre le quotidien des patients plus agréable.',
    },
    tags: [
      { en: 'Teamwork', fr: 'Travail en équipe' },
      { en: 'Painting', fr: 'Peinture' },
    ],
    cover: {
      src: 'assets/img/projects/fs-cover.jpg',
      alt: { en: 'The group after the event', fr: 'L’équipe après l’événement' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'Painting assistant', fr: 'Assistant peinture' } },
      { label: { en: 'Team', fr: 'Équipe' }, value: { en: '130 students from Arts et Métiers Institute of Technology', fr: '130 étudiants d\'Arts et Métiers' } },
      { label: { en: 'Season', fr: 'Saison' }, value: { en: '2025', fr: '2025' } },
      { label: { en: 'Commitment', fr: 'Engagement' }, value: { en: '24 hours', fr: '24 heures' } },
    ],

    blocks: [
      { type: 'heading', text: { en: 'The team', fr: 'L’équipe' } },
      {
        type: 'text',
        text: {
          en: 'The Ch225 Promotion stayed during 24 hours at the UMD of Châlons-en-Champagne to design and paint murals to make the site more welcoming for patients.',
          fr: 'La promotion Ch225 est restée pendant 24 heures à l’UMD de Châlons-en-Champagne pour concevoir et peindre des fresques afin de rendre le site plus accueillant pour les patients.',
        },
      },

      { type: 'heading', text: { en: 'My contribution', fr: 'Ma contribution' } },
      {
        type: 'list',
        items: [
          { en: 'Spent 24 challenging hours painting murals', fr: 'Passé 24 heures challengeantes à peindre des fresques' },
          { en: 'A TV report is available on request. Feedback from patients was very positive, and the murals helped create a more cheerful and stimulating environment.', fr: 'Un reportage télévisé est disponible sur demande. Les retours des patients étaient très positifs, et les fresques ont contribué à créer un environnement plus joyeux et stimulant.' },
        ],
      },
      {
        type: 'image',
        src: 'assets/img/projects/fs-upright.jpg',
        alt: { en: 'The Ch225 Promotion', fr: 'La promotion Ch225' },
      },
      {
        type: 'quote',
        text: {
          en: 'Helping people is a great way to learn teamwork and empathy.',
          fr: 'Aider les gens est un excellent moyen d’apprendre le travail d’équipe et l’empathie.',
        },
      },
    ],
  },
{
    id: 'Farm & Italian Cuisine Association',
    category: 'extracurricular',
    year: { en: 'Dec. 2025 - June 2027', fr: 'Dec. 2025 - Juin 2027' },
    title: {
      en: 'Farm & Italian Cuisine Association',
      fr: 'L\'Association Ferme & Cuisine Italienne',
    },
    summary: {
      en: 'Planned and organized a series of events to promote sustainable agriculture and Italian cuisine, including the distribution of local produce, cooking for students, negociation with local farmers and the acquisition of new equipment such as a brand new pizza oven.',
      fr: 'Planifié et organisé une série d\'événements pour promouvoir l\'agriculture durable et la cuisine italienne, notamment la distribution de produits locaux, la cuisine pour les étudiants, les négociations avec les agriculteurs locaux et l\'acquisition de nouveaux équipements comme un four à pizza neuf.',
    },
    tags: [
      { en: 'Teamwork', fr: 'Travail en équipe' },
      { en: 'Sustainability', fr: 'Durabilité' },
      { en: 'Cooking', fr: 'Cuisine' },
    ],
    cover: {
      src: 'assets/img/projects/fs-cover.jpg',
      alt: { en: 'The group after the event', fr: 'L’équipe après l’événement' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'Project manager', fr: 'Chef de projet' } },
      { label: { en: 'Team', fr: 'Équipe' }, value: { en: 'A 5-member team', fr: 'Une équipe de 5 personnes' } },
      { label: { en: 'Season', fr: 'Saison' }, value: { en: '2025 - 2027', fr: '2025 - 2027' } },
    ],

    blocks: [
      { type: 'heading', text: { en: 'The Team', fr: 'L’équipe' } },
      {
        type: 'text',
        text: {
          en: 'The non-profit association was created to promote sustainable agriculture and Italian cuisine. We organized a series of events, including the distribution of local produce, cooking for students, and negotiations with local farmers. We also acquired new equipment, such as a brand new pizza oven, to enhance our cooking capabilities.',
          fr: 'L\'association à but non lucratif a été créée pour promouvoir l\'agriculture durable et la cuisine italienne. Nous avons organisé une série d\'événements, notamment la distribution de produits locaux, la cuisine pour les étudiants, et les négociations avec les agriculteurs locaux. Nous avons également acquis de nouveaux équipements, comme un four à pizza neuf, pour améliorer nos capacités de cuisson.',
        },
      },

      { type: 'heading', text: { en: 'My contribution', fr: 'Ma contribution' } },
      {
        type: 'list',
        items: [
          { en: 'Cooked pizzas for many students and events', fr: 'Cuisiné des pizzas pour de nombreux étudiants et événements' },
          { en: 'Almost 100% satisfaction rate from participants !', fr: 'Taux de satisfaction presque de 100% chez les participants !' },
        ],
      },
      {
        type: 'image',
        src: 'assets/img/projects/fs-upright.jpg',
        alt: { en: 'The Team and the oven', fr: 'L\'équipe et le four' },
      },
      {
        type: 'quote',
        text: {
          en: 'Cooking with love and a nice team is the best way to make people happy and learn new skills.',
          fr: 'Cuisiner avec amour et une belle équipe est la meilleure façon de rendre les gens heureux et d\'apprendre de nouvelles compétences.',
        },
      },
    ],
  },
  /* ======================================================================
     4. Projet académique
     ====================================================================== */
  {
    id: 'Auto-calibrated windturbine',
    category: 'academic',
    year: 'Nov. 2024 - June 2025',
    title: {
      en: 'Auto-calibrated wind turbine',
      fr: 'Éolienne asservie pour s\'auto-calibrer avec la direction du vent',
    },
    summary: {
      en: 'Worked on the control of the nacelleof a small windturbine to keep the rotor aligned with the wind direction, using a low-cost anemometer and a PID controller (Arduino).',
      fr: 'Travail sur l’asservissement de la nacelle d’une petite éolienne pour maintenir le rotor aligné avec la direction du vent, en utilisant un anémomètre à bas coût et un régulateur PID (Arduino).',
    },
    tags: [
      { en: 'Controls', fr: 'Asservissement' },
      { en: 'Arduino', fr: 'Arduino' },
      { en: 'Prototype', fr: 'Prototype' },
      { en: 'Stability, precision & rapidity criteria', fr: 'Critères de stabilité, précision et rapidité' },
    ],
    cover: {
      src: 'assets/img/projects/tunnel-cover.jpg',
      alt: { en: 'The prototype of the control system', fr: 'Le prototype du système d\'asservissement' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'Solo project', fr: 'Projet individuel' } },
      { label: { en: 'Duration', fr: 'Durée' }, value: { en: '8 months', fr: '8 mois' } },
      { label: { en: 'Context', fr: 'Contexte' }, value: { en: 'TIPE project', fr: 'Projet de TIPE' } },
      { label: { en: 'Tools', fr: 'Outils' }, value: { en: 'Arduino and prototyping', fr: 'Arduino et prototypage' } },
    ],
    links: [
      { label: { en: 'Measurement notebook (PDF)', fr: 'Cahier de mesures (PDF)' }, href: '#' },
    ],
    blocks: [
      { type: 'heading', text: { en: 'Problem', fr: 'Problème' } },
      {
        type: 'text',
        text: {
          en: 'The tunnel had no working balance: students could visualise flow but never quantify it. A commercial unit was out of budget, so we had ten weeks to build one that was good enough to teach with.',
          fr: 'La soufflerie n’avait plus de balance en état : les étudiants pouvaient visualiser l’écoulement, jamais le quantifier. Un modèle du commerce dépassait le budget ; nous avions dix semaines pour en construire un assez fiable pour servir en TP.',
        },
      },

      { type: 'subheading', text: { en: 'Approach', fr: 'Démarche' } },
      {
        type: 'list',
        items: [
          { en: 'Two-axis strain-gauge balance on a machined flexure, decoupling lift and drag.', fr: 'Balance deux axes à jauges de contrainte sur une lame flexible usinée, découplant portance et traînée.' },
          { en: 'Calibration with dead weights over the full range, twice, in both directions to capture hysteresis.', fr: 'Étalonnage aux masses mortes sur toute la gamme, deux fois, dans les deux sens pour capter l’hystérésis.' },
          { en: 'Python acquisition chain with averaging over 30 s and automatic export to CSV.', fr: 'Chaîne d’acquisition Python avec moyennage sur 30 s et export CSV automatique.' },
          { en: 'A written uncertainty budget — the part that turned a gadget into an instrument.', fr: 'Un budget d’incertitude écrit — la partie qui a transformé un gadget en instrument.' },
        ],
      },
      {
        type: 'gallery',
        items: [
          { src: 'assets/img/projects/tunnel-balance.jpg', alt: { en: 'The strain-gauge flexure', fr: 'La lame flexible instrumentée' }, caption: { en: 'The flexure', fr: 'La lame flexible' } },
          { src: 'assets/img/projects/tunnel-polar.png', alt: { en: 'Measured lift polar compared with reference data', fr: 'Polaire de portance mesurée comparée aux données de référence' }, caption: { en: 'NACA 0012 polar vs. reference', fr: 'Polaire NACA 0012 vs. référence' } },
        ],
      },

      { type: 'heading', text: { en: 'Outcome', fr: 'Résultat' } },
      {
        type: 'text',
        text: {
          en: 'Our lift polar on a NACA 0012 matched published data to within <strong>4 %</strong> up to 12° of incidence, and diverged past stall exactly where the tunnel’s blockage ratio says it should. The bench is now part of the second-year lab syllabus.',
          fr: 'Notre polaire de portance sur NACA 0012 correspond aux données publiées à <strong>4 %</strong> près jusqu’à 12° d’incidence, et s’en écarte après le décrochage exactement là où le taux de blocage de la veine le prévoit. Le banc fait maintenant partie des TP de 2ᵉ année.',
        },
      },
    ],
  },

  /* ======================================================================
     5. Projet personnel
     ====================================================================== */
  {
    id: 'Plasma thruster Helicon',
    category: 'personal',
    year: '2026',
    title: {
      en: 'Assembly of a plasma thruster (Helicon type)',
      fr: 'Assemblage d’un propulseur à plasma (type Helicon)',
    },
    summary: {
      en: 'Assembly of a Helicon plasma thruster from scratch based on a study made by AM Space students. The thruster is designed to be used on a CubeSat 6U satellite to keep it in orbit.',
      fr: 'Assemblage d’un propulseur à plasma (type Helicon) à partir de zéro, basé sur une étude réalisée par des étudiants d’AM Space. Le propulseur est conçu pour être utilisé sur un satellite CubeSat 6U afin de le maintenir en orbite.',
    },
    tags: [
      { en: 'Manual work', fr: 'Travail manuel' },
      { en: 'Data visualisation & analysis', fr: 'Visualisation et analyse de données' },
      { en: 'Teamwork', fr: 'Travail en équipe' },
    ],
    cover: {
      src: 'assets/img/projects/telemetry-cover.png',
      alt: { en: 'Pic of the assembled thruster', fr: 'Photo du propulseur assemblé' },
    },
    meta: [
      { label: { en: 'Role', fr: 'Rôle' }, value: { en: 'VP - AM Space', fr: 'Vice-Président - AM Space' } },
      { label: { en: 'Duration', fr: 'Durée' }, value: { en: '6 months', fr: '6 mois' } },
      { label: { en: 'Status', fr: 'Statut' }, value: { en: 'In progress', fr: 'En cours' } },
    ],
    blocks: [
      { type: 'heading', text: { en: 'The thruster', fr: 'Le propulseur' } },
      {
        type: 'text',
        text: {
          en: 'The thruster is a Helicon type plasma thruster, which uses a magnetic field to ionize a gas and accelerate the ions to produce thrust. It is designed to be used on a CubeSat 6U satellite to keep it in orbit. The study was made in 2025 by AM Space students, and the assembly is being done in 2026 by my team.',
          fr: 'Le propulseur est un propulseur à plasma de type Helicon, qui utilise un champ magnétique pour ioniser un gaz et accélérer les ions afin de produire une poussée. Il est conçu pour être utilisé sur un satellite CubeSat 6U pour le maintenir en orbite. L\'étude a été réalisée en 2025 par des étudiants d\'AM Space, et l\'assemblage est en cours en 2026 par mon équipe.',
        },
      },
      {
        type: 'image',
        src: 'assets/img/projects/telemetry-ui.png',
        alt: { en: 'The dashboard during a live run', fr: 'Le tableau de bord pendant un essai en direct' },
      },

      { type: 'heading', text: { en: 'How it works', fr: 'Comment ça marche' } },
      {
        type: 'list',
        items: [
          { en: 'Using the Helicon technology to avoid using a cathode that might be damaged by the atomic Oxygen.', fr: 'Utilisation de la technologie Helicon pour éviter d’utiliser une cathode qui pourrait être endommagée par l’oxygène atomique.' },
          { en: 'xxx.', fr: 'xxx.' },
          { en: 'Every session is written to a CSV named after its metadata, so files stay traceable weeks later.', fr: 'Chaque session est écrite dans un CSV nommé d’après ses métadonnées, pour que les fichiers restent traçables des semaines plus tard.' },
        ],
      },
      {
        type: 'text',
        text: {
          en: 'It is deliberately small: one file per concern, no database, no accounts. Two other student projects have since used it as-is.',
          fr: 'C’est volontairement petit : un fichier par responsabilité, pas de base de données, pas de comptes. Deux autres projets étudiants l’ont depuis réutilisé tel quel.',
        },
      },
    ],
  },

];
