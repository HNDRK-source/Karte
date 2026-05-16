# ulmenschutz.de

Statische Website der Initiative Ulmenschutz, gebaut mit [Astro](https://astro.build) und Tailwind CSS. Zweisprachig (DE / EN). Inhalte als Markdown unter `src/content/pages/`.

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statisches Build in dist/
npm run preview  # dist/ lokal servieren
```

## Struktur

```
src/
  content/pages/de/   Markdown-Inhalte deutsch
  content/pages/en/   Markdown-Inhalte englisch
  components/         Astro-Komponenten (Header, Footer, MapView)
  layouts/            Basis-Layout
  pages/              Routen (index, [slug], karte, en/*)
  i18n/ui.ts          Übersetzungen, Routen, Sprachhilfen
public/
  data/ulmen.geojson  Kartendaten (Platzhalter)
  favicon.svg
```

## Inhalte pflegen

Eine Markdown-Datei pro Sprache, gleicher `slug`. Frontmatter:

```yaml
---
title: "Seitentitel"
description: "Meta-Description"
lang: "de"           # oder "en"
slug: "ulme"         # URL-Segment
order: 1
draft: false
---
```

## Deploy zu Strato

Statisches Build (`dist/`) per SFTP auf den Strato-Webspace.
Workflow-Vorlage: `.github/workflows/deploy.yml` — Secrets setzen und `if: false` entfernen.
