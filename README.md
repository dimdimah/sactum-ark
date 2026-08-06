# Sactum Ark Web

Website katalog untuk **Sactum Ark**.

## Tech Stack

- **Astro** — static site generator
- **Tailwind CSS** — styling

## Local Development

```bash
npm install
npm run dev
```

Build:
```bash
npm run build
npm run preview
```

## Struktur

```
src/
  pages/
    index.astro          # Halaman katalog skills
    agents.astro         # Panduan setup per agent
    skills/[name].astro  # Halaman detail per skill (isi SKILL.md dirender via marked)
  components/
    Button.astro, Icon.astro, InstallPanel.astro, SkillCard.astro
  data/
    skills-catalog.json  # Metadata 12 skill (dari fetch:skills)
    skills-content.json  # Isi SKILL.md per skill (dari fetch:skills)
    stats.json           # Angka test/eval/commit dari repo (dari fetch:stats)
    skills.js, agents.js, site.js
  layouts/
    Layout.astro
  styles/
    global.css           # Tailwind + global styles (termasuk animasi background)
scripts/
  fetch-skills.mjs       # Ambil metadata + SKILL.md dari repo → JSON
  fetch-stats.mjs        # Klon repo, jalankan harness & eval, tulis stats.json
public/
  assets/
```

## Integrasi dengan Repo Skills

Data skill di-*vendor* dari repo `dimdimah/project-ai-skills-skill` lewat dua script:

```bash
npm run fetch:skills   # sync metadata + isi SKILL.md → src/data/
npm run fetch:stats    # clone repo, jalankan harness & eval → src/data/stats.json
```

Keduanya dijalankan otomatis tiap hari oleh GitHub Action `.github/workflows/sync-skills.yml`.

## Deploy

Recommended: Vercel / Netlify / Cloudflare Pages.

Connect repo ini ke platform pilihan kamu, dan deploy otomatis tiap push ke branch `main`.

## Kontribusi

Buka issue di repo skills utama: https://github.com/dimdimah/project-ai-skills-skill
