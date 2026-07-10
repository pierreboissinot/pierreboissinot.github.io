# pierreboissinot.github.io

Blog perso — Astro 7, bilingue (EN à la racine, FR sous `/fr/`), design « Éditorial Spec », déployé sur GitHub Pages via Actions.

## Commandes

```sh
npm install
npm run dev        # dev server (drafts visibles)
npm run build      # build de production dans dist/ (drafts exclus)
npm run preview    # sert dist/ en local
```

Node 24 (`.nvmrc`).

## Écrire un article

Un fichier Markdown dans `src/content/blog/en/` ou `src/content/blog/fr/` :

```yaml
---
title: "Titre"
description: "Une phrase."
pubDate: 2026-07-10
tags: [openspec, ia]
draft: true            # retirer pour publier
# Pour un épisode de série :
series: openspec
seriesOrder: 2
translationKey: openspec-02   # lie les versions EN/FR (sinon : même nom de fichier)
---
```

- URL : `/posts/<slug>/` (EN) ou `/fr/posts/<slug>/` (FR) — slug = nom du fichier.
- Les paires EN/FR liées (même `translationKey` ou même nom de fichier) obtiennent
  automatiquement le sélecteur de langue croisé et les balises hreflang.
- Carte scénario (élément signature) dans le corps :

```html
<aside class="scenario">
  <p><b>GIVEN</b> …</p>
  <p><b>WHEN</b> …</p>
  <p><b>THEN</b> …</p>
</aside>
```

## Architecture

- `src/lib/blog.ts` — source de vérité : listing, tri, filtrage des drafts (dev only),
  résolution des traductions et des épisodes. Ne jamais appeler `getCollection('blog')` ailleurs.
- `src/content.config.ts` — schéma des collections (`blog`, `series`).
- `src/i18n/ui.ts` — chaînes d'interface EN/FR.
- `src/pages/` + jumelles `src/pages/fr/` — routes (i18n Astro, `prefixDefaultLocale: false`).
- `src/styles/global.css` — design system (Tailwind v4 CSS-first, tokens encre/papier/chartreuse).
- `astro.config.mjs` — i18n, fonts (Archivo + JetBrains Mono self-hostées), Shiki dual-theme,
  redirections des anciennes URLs Hugo.

## Déploiement

Push sur `master` → `.github/workflows/deploy.yml` build et publie sur GitHub Pages
(source « GitHub Actions »). Déclenchement manuel possible via l'onglet Actions.

Anciennes URLs Hugo (`/posts/2018-04-22-makefile/`…) : redirections meta-refresh
générées au build vers les nouvelles URLs.
