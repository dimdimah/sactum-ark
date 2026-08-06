# Systematic Debugging

## Apa Ini?

Skill ini memberikan pendekatan **terstruktur untuk debugging** berbasis bukti — hipotesis, isolate variabel, verifikasi satu per satu, cari akar masalah. Bukan coba-ganti sampai berhasil.

## Instalasi

```bash
npx skills add dimdimah/project-ai-skills-skill --skill systematic-debugging
```

## Cara Pakai

1. Baca `SKILL.md` untuk proses 6 langkah debugging
2. Ikuti `rules/debug-rules.md` untuk teknik dan prinsip
3. Gunakan `templates/debug-log.md` untuk mendokumentasikan investigasi
4. Ikuti `workflow/debugger.md` untuk workflow tiap kasus

## Struktur

```
systematic-debugging/
├── SKILL.md
├── README.md
├── rules/
│   └── debug-rules.md
├── workflow/
│   └── debugger.md
├── templates/
│   └── debug-log.md
├── schemas/
│   └── debug-log.schema.json
├── scripts/
│   └── debug-track.js
├── tests/
│   └── run-tests.js
└── examples/
    └── sample-debug-log.md
```

## Integrasi

- `git-history-archaeologist` — gunakan git bisect untuk temukan commit penyebab
- `verification-loop` — pastikan fix lolos verification
- `tdd-workflow` — tambahkan regression test setelah fix
- `strategic-compact` — catat insight/debug ke summary
