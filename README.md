# Portfolio — Étudiant Ingénieur (Arts et Métiers)

Site statique en HTML / CSS / JS pur (aucune dépendance, aucun build) : prêt à héberger
sur **GitHub Pages**. Thème noir & blanc, univers spatial (ciel étoilé animé, curseur
"comète", parcours présenté comme une trajectoire), pensé pour rester léger et rapide.

**Site bilingue** : l'anglais est la version par défaut, le français s'active en cliquant
sur le drapeau dans la navigation. Chaque projet possède sa propre page de détail.

## Structure du projet

```
portfolio-spatial/
├── index.html              → page d'accueil (sections ancrées : Home / Journey / Projects / Contact)
├── project.html            → gabarit unique des pages de détail projet (project.html?id=…)
├── css/
│   └── style.css           → design tokens (couleurs, typo) + tout le style
├── js/
│   ├── i18n.js             → bascule EN / FR + dictionnaire français
│   ├── projects-data.js    → ✏️ LE CONTENU DE TES PROJETS (cartes + pages de détail)
│   ├── script.js           → ciel étoilé, curseur, animations, grille et filtres de projets
│   └── project-page.js     → construit la page de détail d'un projet
└── assets/
    ├── cv/                 → dépose ton CV ici (voir plus bas)
    ├── video/              → vidéos de projets (.mp4)
    └── img/
        ├── favicon.svg
        └── projects/       → images de projets
```

## Bilingue : où écrire quoi ?

Le principe est simple et évite de dupliquer les textes :

- **L'anglais est écrit directement dans le HTML** (c'est la langue par défaut).
- **Le français vit dans le dictionnaire `FR` de `js/i18n.js`**, indexé par la clé
  `data-i18n="..."` posée sur l'élément HTML correspondant.

Exemple : `<h2 data-i18n="journey.title">My journey</h2>` dans `index.html`, et
`'journey.title': 'Mon parcours'` dans `js/i18n.js`.

Donc : pour corriger un texte anglais → `index.html` ; pour corriger sa traduction →
`js/i18n.js`. Si une clé française manque, l'anglais est affiché : rien ne casse.

Les textes des projets, eux, sont bilingues au même endroit (`js/projects-data.js`),
sous la forme `{ en: "...", fr: "..." }`.

Autres détails utiles :

- Le choix de langue est mémorisé dans le navigateur (`localStorage`) et vaut pour toutes
  les pages.
- Un lien peut forcer la langue : `index.html?lang=fr` (pratique pour envoyer la version
  française à un recruteur francophone).
- Le sélecteur de langue apparaît à droite de la navigation sur ordinateur, et dans le
  menu déroulant sur mobile.

## Personnaliser le contenu

### 1. Ton identité (dans `index.html`)

Les zones à modifier sont indiquées par des commentaires `<!-- ✏️ À PERSONNALISER -->` :

1. **Nom et titre** — balise `<title>`, logo dans la nav (`TR.`), et le grand titre dans
   `#home` (`<h1 class="hero-title">`).
2. **Texte de présentation** — paragraphe `.hero-text` (+ la clé `hero.text` en français).
3. **Localisation / statut / e-mail** — liste `.hero-meta`.
4. **CV** — dépose ton fichier PDF dans `assets/cv/` sous le nom exact `CV.pdf`
   (ou change le chemin dans le bouton `Download my CV`).
5. **Parcours** — dans `#journey`, chaque étape est un bloc
   `<article class="timeline-item reveal">`. Duplique / réordonne / adapte les dates,
   intitulés et tags (clés françaises `j1.*`, `j2.*`, … dans `js/i18n.js`).
   L'étape la plus récente doit rester en haut.
6. **Contact** — adapte les liens e-mail, LinkedIn et GitHub dans `#contact`
   (ils sont aussi présents en bas de `project.html`).

### 2. Tes projets (dans `js/projects-data.js`)

Tout le contenu des projets est regroupé dans ce seul fichier. Un objet du tableau
`window.PROJECTS` = **une carte** sur la page d'accueil **+ une page de détail**.

- L'`id` devient l'URL de la page : `project.html?id=desktop-cnc`.
- La `category` (`academic`, `personal`, `extracurricular`) pilote le filtre et le badge.
- Le tableau `blocks` décrit le corps de la page. Types disponibles :
  `heading`, `subheading`, `text`, `list`, `image`, `gallery`, `video`, `embed`
  (YouTube), `quote`, `stats`. Le détail de chaque type est documenté en tête du fichier.
- Les images vont dans `assets/img/projects/`, les vidéos dans `assets/video/`.
  **Tant qu'un fichier est absent, la page affiche un cadre en pointillés rappelant le
  chemin attendu** : tu peux publier d'abord et ajouter les visuels ensuite.
- Un lien "projet précédent / suivant" est généré automatiquement à partir de l'ordre du
  tableau.

Le contenu livré est un **exemple** (cinq projets d'ingénierie plausibles avec des
`[crochets]` là où mettre tes informations) : remplace-le par tes vrais projets.

Aucune valeur codée en dur côté CSS/JS ne dépend du contenu : tu peux ajouter ou retirer
des étapes de parcours et des projets librement, tout s'adapte automatiquement (grille,
trajectoire, filtres, pagination des projets).

## Aperçu en local

Pas besoin d'installation. Deux options :

- Ouvrir `index.html` directement dans un navigateur, **ou**
- Servir le dossier localement pour éviter les restrictions de certains navigateurs sur
  les fichiers locaux :

  ```bash
  cd portfolio-spatial
  python3 -m http.server 8000
  # puis ouvrir http://localhost:8000
  ```

  Sous Windows (PowerShell), la commande est `py -3 -m http.server 8000`.

Servir le dossier est recommandé : en `file://`, certains navigateurs bloquent
`localStorage`, et le choix de langue n'est alors pas mémorisé d'une page à l'autre.

## Déployer sur GitHub Pages

1. Crée un dépôt GitHub (public), par exemple `portfolio`.
2. Pousse le contenu de ce dossier à la racine du dépôt :

   ```bash
   cd portfolio-spatial
   git init
   git add .
   git commit -m "Portfolio initial"
   git branch -M main
   git remote add origin https://github.com/<ton-pseudo>/<ton-repo>.git
   git push -u origin main
   ```

3. Sur GitHub : **Settings → Pages**.
4. Dans **Build and deployment**, choisis **Source : Deploy from a branch**, puis
   **Branch : `main`** et dossier **`/ (root)`**. Enregistre.
5. Le site sera disponible après une à deux minutes à l'adresse :
   `https://<ton-pseudo>.github.io/<ton-repo>/`

   Si le dépôt s'appelle exactement `<ton-pseudo>.github.io`, le site sera directement
   accessible à la racine : `https://<ton-pseudo>.github.io/`.

## Détails techniques et choix de conception

- **Palette** strictement en niveaux de gris (fond quasi noir `#050506`, encre
  `#f4f3ef`), à l'exception de la section Projets qui bascule sur un fond clair
  (`#eceef0`) pour marquer une rupture visuelle sans introduire de couleur.
- **Typographies** : *Questrial* pour les titres et sous-titres, *Hind Guntur*
  pour tout le reste (texte courant, dates, labels et tags). Deux polices, pas plus.
  Chargées via Google Fonts avec `preconnect` pour limiter le coût de chargement.
- **Curseur personnalisé** : un point qui suit exactement la souris + un anneau qui suit
  avec un léger retard (interpolation), s'agrandit et s'inverse (`mix-blend-mode`) au
  survol des éléments interactifs, accompagné d'une fine traînée de particules.
  Désactivé automatiquement sur écran tactile et si `prefers-reduced-motion` est actif.
- **Ciels étoilés** (Canvas 2D) : trois instances indépendantes (accueil, parcours,
  contact), avec scintillement, parallax léger au mouvement de la souris, et étoiles
  filantes occasionnelles sur les sections accueil/contact.
- **Trajectoire du parcours** : la ligne verticale se remplit progressivement selon la
  position de scroll ; chaque étape s'illumine à l'apparition.
- **Filtres de projets** : entièrement en JavaScript vanilla, sans rechargement.
- **Pages de projet** : un seul gabarit (`project.html`) alimenté par l'identifiant passé
  en paramètre d'URL, et rendu depuis `js/projects-data.js`. Avantage : ajouter un projet
  ne demande aucune duplication de HTML ; l'en-tête sombre, la fiche technique collante et
  le corps sur fond clair sont partagés par tous les projets. Si un `id` inconnu est
  demandé, la page affiche un message "projet introuvable" plutôt qu'une page vide.
- **Bilingue sans dépendance** : le moteur (`js/i18n.js`) mémorise le HTML anglais
  d'origine au chargement, puis remplace le contenu des éléments marqués `data-i18n` par
  leur traduction. Revenir à l'anglais restaure donc exactement le HTML de départ, et il
  n'existe qu'une seule source pour chaque langue. Un court script en `<head>` masque la
  page le temps d'appliquer une langue mémorisée, pour éviter un clignotement
  anglais → français au chargement.
- **Accessibilité** : navigation au clavier, focus visibles, structure sémantique
  (`header`, `nav`, `section`, `article`), `prefers-reduced-motion` respecté partout
  (curseur, traînée, ciels étoilés désactivés → contenu statique).
- **Performance** : aucune dépendance externe hormis les polices Google Fonts, une
  seule boucle `requestAnimationFrame` pour toutes les animations, canvas
  redimensionnés au `devicePixelRatio` plafonné à 2.

## Prochaines étapes possibles (facultatif)

- Remplacer le contenu d'exemple de `js/projects-data.js` par tes vrais projets, et
  déposer les images dans `assets/img/projects/`.
- Remplacer les liens `#` des projets par les vraies URLs (rapport PDF, dépôt GitHub…).
- Ajouter une favicon PNG de secours si besoin de compatibilité maximale.
- Ajouter une meta `og:image` pour un aperçu soigné lors du partage du lien.
- Ajouter une troisième langue : dupliquer le dictionnaire `FR` dans `js/i18n.js`,
  l'ajouter au tableau `LANGS` et à l'objet `FLAGS` (un SVG de drapeau), puis compléter
  les champs `{ en, fr }` de `js/projects-data.js` avec la nouvelle langue.
