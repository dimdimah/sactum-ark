# Design System — Movistar KOI About Page (Caveman-inspired Layout)

> Catatan sumber: **layout, susunan section, tipografi, komponen interaktif, dan motion** direferensikan dari struktur [caveman.so](https://caveman.so/) — landing page panjang dengan hero besar, section bernomor ("rung"), badge status, demo interaktif, ladder/proof, dan CTA akhir. **Color palette 100% dari Movistar KOI** (biru Movistar + ungu KOI), tidak ada warna dari caveman.so yang dipakai. Karena situs movistarkoi.gg di-render lewat Shopify dan stylesheet-nya tidak bisa diakses langsung dari sini (cross-origin, di luar allowlist jaringan), hex di bawah tetap memakai palet resmi Movistar (biru) + KOI (ungu) yang sudah divalidasi sebelumnya — sebaiknya dicocokkan sekali lagi dengan brand guideline resmi kalau tersedia.

---

## 1. Project Overview

### 1.1 Purpose
Halaman "About" Movistar KOI dibangun ulang mengikuti **arsitektur landing page ala Caveman**: satu halaman scroll panjang, bernarasi lewat section bernomor, dengan demo/statistik interaktif di antara storytelling — bukan halaman brand statis biasa.

### 1.2 Target Audiences
- **Penggemar Esports:** ingin cerita di balik klub, pemain, dan pencapaian, disajikan seperti "proof" yang bisa di-scroll.
- **Sponsor & Partner:** melihat angka reach dan value proposition dalam format dashboard/metric card.
- **Media & Broadcaster:** butuh fakta brand, logo pack, dan siaran pers dalam grid yang scannable.
- **Talent & Calon Pemain:** menilai budaya klub lewat "our numbers" dan timeline sejarah.

### 1.3 Design Principles
- **Long-scroll, section bernomor:** setiap bagian besar diberi label `01`, `02`, dst — meniru pola "One engine. Five rungs." di Caveman.
- **Proof over claim:** setiap klaim (jumlah fans, sejarah, partnership) ditampilkan sebagai angka/kartu data, bukan cuma paragraf.
- **Brand Coherence:** 100% warna Movistar (biru) + KOI (ungu), tidak dicampur warna neon/hijau khas Caveman.
- **Performance First:** aset dioptimalkan, animasi reduced-motion aware, kontras memenuhi standar aksesibilitas.

---

## 2. Color Palette *(sumber: Movistar KOI — tidak berubah dari brand asli)*

### 2.1 Primary Colors
| Role | Hex | Tailwind Class |
|------|-----|----------------|
| Movistar Blue | `#0072CE` | `text-movistar-blue`, `bg-movistar-blue` |
| KOI Purple | `#780DF2` | `text-koi-purple`, `bg-koi-purple` |
| KOI Dark Purple | `#2F1049` | `text-koi-dark`, `bg-koi-dark` |

### 2.2 Secondary & Accent Colors
| Role | Hex | Tailwind Class |
|------|-----|----------------|
| Electric Blue | `#3EBAFE` | `text-electric-blue`, `bg-electric-blue` |
| Soft Lilac | `#E0E1FC` | `text-soft-lilac`, `bg-soft-lilac` |
| Soft Lavender | `#D5D6F2` | `text-soft-lavender`, `bg-soft-lavender` |
| Orange Accent | `#F2A73B` | `text-orange-accent`, `bg-orange-accent` |

### 2.3 Background Colors
| Role | Hex | Tailwind Class |
|------|-----|----------------|
| Base Background | `#121212` | `bg-base` |
| Surface | `#1D053D` | `bg-surface` |
| Surface Strong | `#320954` | `bg-surface-strong` |
| Gradient Light (section terang opsional) | `from-white to-indigo-100` | `bg-gradient-to-r from-white to-indigo-100` |

### 2.4 Text Colors
| Role | Hex | Tailwind Class |
|------|-----|----------------|
| Heading | `#FFFFFF` | `text-heading` |
| Body | `#F4F4F4` | `text-body` |
| Muted (=Soft Lilac, dipakai dobel peran secara sengaja) | `#E0E1FC` | `text-muted` |
| Subtle | `#9CA3AF` | `text-subtle` |

### 2.5 Status Badge Colors *(pola dari Caveman: badge "live / in development")*
| Status | Hex | Tailwind Class |
|--------|-----|----------------|
| Live / Aktif | `#3EBAFE` (Electric Blue) | `bg-electric-blue/15 text-electric-blue` |
| Segera / Coming soon | `#F2A73B` (Orange Accent) | `bg-orange-accent/15 text-orange-accent` |
| Arsip / Selesai | `#9CA3AF` (Subtle) | `bg-subtle/15 text-subtle` |

---

## 3. Typography

### 3.1 Font Family
- **Primary:** `Inter` — body & UI.
- **Secondary (Hero/Display):** `Montserrat` — headline besar, gaya "3.5rem bold" ala hero Caveman ("Cut 65% of your AI costs.").
- **Monospace (angka & metadata):** `JetBrains Mono` — dipakai eksplisit untuk **semua angka statistik** (mis. "2.62M Club Accounts", token counter), badge versi, dan label teknis — meniru gaya monospace counter di Caveman. Mono **dikecualikan** dari batas 2-font di bawah karena perannya cuma untuk data, bukan teks naratif.

### 3.2 Type Scale & Weight
| Element | Font Size | Weight | Line Height | Tailwind |
|---------|-----------|--------|-------------|----------|
| Display / Hero H1 | `3.5rem` / `56px` | `700` | `1.1` | `text-5xl font-bold` |
| H1 Page Title | `2.5rem` / `40px` | `700` | `1.2` | `text-4xl font-bold` |
| H2 Section Title | `1.75rem` / `28px` | `600` | `1.3` | `text-3xl font-semibold` |
| H3 Card Title | `1.25rem` / `20px` | `600` | `1.4` | `text-xl font-semibold` |
| Stat Number (mono) | `2.25rem` / `36px` | `700` | `1.1` | `font-mono text-4xl font-bold` |
| Body Large | `1.125rem` / `18px` | `400` | `1.6` | `text-lg` |
| Body Default | `1rem` / `16px` | `400` | `1.6` | `text-base` |
| Small / Caption | `0.875rem` / `14px` | `400` | `1.5` | `text-sm` |
| Tiny / Label / Eyebrow | `0.75rem` / `12px` | `600` | `1.4` | `text-xs font-semibold uppercase tracking-wider` |

### 3.3 Usage Rules
- Maksimal **2 font naratif** per halaman (`Inter` + `Montserrat`); `JetBrains Mono` boleh muncul di mana pun ada angka/data.
- Eyebrow label (mis. "02 Visibility", "WE ARE MOVISTAR KOI") pakai `text-xs font-semibold uppercase tracking-wider text-electric-blue`.
- Headline pakai `tracking-tight`; body pakai `tracking-normal`.

---

## 4. Page Anatomy *(susunan section — diadaptasi dari struktur caveman.so)*

Section berurutan dari atas ke bawah, tiap section besar diberi nomor 2 digit seperti pola Caveman:

1. **Nav bar** (sticky, blur)
2. **Hero** — headline besar + CTA + badge kecil (stars/press mention)
3. **Logo marquee** — "Trusted by" versi sponsor Movistar KOI
4. **01 — Fusion/Origin** — numbered stepper: Movistar Riders + KOI + OverActive Media (analog "One engine, five rungs")
5. **02 — Our Numbers** — dashboard grid statistik (analog "Every dollar explains itself")
6. **03 — Community & Culture** — kartu fitur dengan icon (analog "Optimization" cards)
7. **04 — Our History (Ladder)** — timeline 3 tahap (analog "inferred → replayed → verified")
8. **05 — New Era / Rebrand** — highlight card dengan video/gambar besar
9. **06 — Talents & Team** — grid kartu pemain (analog "papers/figures" grid)
10. **Partners / Sponsors grid**
11. **News / Press**
12. **Final CTA banner**
13. **Footer multi-kolom**

### 4.1 Nav Bar
- **Background:** `bg-base/80 backdrop-blur-md`
- **Border bottom:** `border-b border-white/10`
- **Height:** `h-16`
- **Logo:** kiri, height `32px`.
- **Links:** `text-soft-lavender hover:text-white transition-colors`, di tengah/kanan.
- **CTA kanan:** tombol primary kecil `px-4 py-2 text-xs` (mis. "Join the Club").
- **Perilaku scroll:** nav tetap solid (tidak hilang), meniru caveman.so — bukan hide-on-scroll.

### 4.2 Hero Section
- **Eyebrow badge:** pill kecil di atas headline, mis. `★ Est. sejak fusion` — `bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs`.
- **Headline:** `text-5xl font-bold tracking-tight` warna `text-heading`, 2 baris maksimal, gaya deklaratif pendek (ikuti pola "Cut 65% of your AI costs.") → contoh: "Ready to reach the top."
- **Subheadline:** 1 paragraf `text-lg text-body`, maksimal 2 baris.
- **CTA group:** 1 tombol primary (`bg-movistar-blue`) + 1 tombol outline (`border-soft-lilac`), sejajar horizontal, gap `gap-4`.
- **Baris kecil di bawah CTA:** mono-text kecil berisi social proof, mis. `★74k` ala Caveman → diganti jadi jumlah followers/fans dalam `font-mono text-xs text-subtle`.
- **Background hero:** `bg-surface` dengan radial glow lembut `koi-purple/20` di belakang headline, bukan gradient neon hijau.

### 4.3 Logo Marquee (Sponsor Strip)
- **Layout:** infinite horizontal scroll (marquee), bukan grid statis — meniru strip "Trusted by 10,000,000+ professionals" di Caveman.
- **Item:** logo dalam container `bg-white/5 rounded-xl px-6 py-4 flex items-center justify-center`, tinggi logo maksimal `40px`.
- **Default state:** `grayscale opacity-70`.
- **Hover/pause on hover:** `grayscale-0 opacity-100`, marquee berhenti sebentar saat di-hover.
- **Animasi:** `animate-marquee` linear, durasi `30s`, `motion-reduce:animate-none` (fallback jadi grid statis).

### 4.4 Numbered Stepper Section (pola "01 liveCaveman Skill…")
Dipakai untuk cerita fusion 3 entitas (Movistar Riders, KOI, OverActive Media) dan untuk daftar tim (LOL, Pokémon, TFT).
- **Struktur per item:** nomor 2 digit (`01`, `02`, `03`) + badge status (`live`/`in development` → diganti `aktif`/`segera`) + judul + deskripsi singkat + link panah `→`.
- **Nomor:** `font-mono text-sm text-electric-blue` di kiri atas card.
- **Card:** `bg-surface border border-koi-dark rounded-2xl p-6`, hover `border-electric-blue/50`.
- **Layout:** stack vertikal di mobile, grid `md:grid-cols-3` di desktop untuk 3 entitas fusion.

### 4.5 Stat / Dashboard Cards ("Our Numbers")
Analog section "Every dollar explains itself" di Caveman — angka besar mono + label kecil.
- **Card:** `bg-surface border border-koi-dark rounded-2xl p-6 text-center`
- **Angka:** `font-mono text-4xl font-bold text-white`
- **Label:** `text-sm text-soft-lavender mt-2`
- **Grid:** `grid-cols-2 md:grid-cols-4 gap-6`
- **Opsional:** tab switcher di atas grid (by member/by key/by model → diganti by platform: X, Instagram, YouTube, TikTok, Twitch) — `flex gap-2` pill button, active state `bg-koi-purple text-white`, inactive `bg-white/5 text-soft-lavender`.

### 4.6 Feature Cards (Community/Culture)
- Background `bg-surface`, border `border-koi-dark`, `rounded-2xl`, padding `p-6`.
- Icon kiri atas: `w-12 h-12 rounded-xl bg-koi-purple/20 flex items-center justify-center text-koi-purple`.
- Judul `text-xl font-semibold text-heading`, body `text-body`.
- Hover: `hover:border-electric-blue/50 hover:shadow-electric-blue/10 hover:-translate-y-1`.

### 4.7 Ladder / Timeline Component (pola "inferred → replayed → verified")
Dipakai untuk **sejarah klub** (mis. Movistar Riders era → KOI era → Movistar KOI/OverActive era) — 3 tahap horizontal (stack di mobile), tiap tahap makin "solid" secara visual dari tahap 1 ke 3:
- Tahap 1: `border border-dashed border-soft-lavender/40 text-subtle` (era awal, "belum solid").
- Tahap 2: `border border-soft-lavender/60 text-soft-lavender` (transisi).
- Tahap 3: `bg-koi-purple/10 border border-koi-purple text-white` (era sekarang, ditandai solid + sedikit glow).
- Connector antar tahap: garis horizontal `border-t border-koi-dark` dengan panah kecil di titik transisi.

### 4.8 Talent / Player Card
- Image area atas `aspect-[3/4]`, `rounded-t-2xl overflow-hidden bg-base`.
- Overlay gradient `bg-gradient-to-t from-base/80 to-transparent` untuk nama+role di atas foto.
- Konten bawah: nama (`font-semibold`), role (`text-sm text-soft-lavender`), highlight stat kecil mono (`font-mono text-xs text-electric-blue`).
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`, ditata seperti grid "figures/papers" di section riset Caveman.

### 4.9 Sponsor/Partner Grid (statis, beda dari marquee hero)
- **Layout:** `grid-cols-2 md:grid-cols-4 gap-8`
- **Item:** `bg-white/5 rounded-xl p-6 flex items-center justify-center`
- **Default:** `grayscale opacity-70` → hover `grayscale-0 opacity-100`, `transition-all duration-300`.

### 4.10 News / Press Cards
- Analog "ReleaseAug 2026 Caveman is live on GreenPT…" — kartu horizontal: tag tanggal/kategori (mono, kecil) + judul + ringkasan 1 kalimat + link "Read →".
- **Card:** `bg-surface border border-koi-dark rounded-2xl p-6 hover:border-electric-blue/40`.
- **Tag:** `font-mono text-xs text-orange-accent uppercase`.

### 4.11 Final CTA Banner
- Full-width, background `bg-surface-strong` dengan radial glow `koi-purple/20`.
- Headline besar `text-4xl font-bold text-center`, subteks kecil, dua tombol CTA (primary + outline), mirip penutup "Find your first million in AI waste."
- Tambahan baris kecil mono di bawah tombol: mis. jumlah member/press mention (`font-mono text-xs text-subtle`).

### 4.12 Footer
- **Background:** `bg-surface-strong`
- **Border top:** `border-t border-koi-dark`
- **Layout kolom:** multi-kolom ala Caveman — `Teams` / `Club` (About, History, Partners) / `Connect` (social) / `Legal` — `grid grid-cols-2 md:grid-cols-4 gap-8`.
- **Baris brand kecil di bawah:** tagline singkat + tahun, `text-subtle text-xs`, meniru "MIT · 2026 · the fire stays in your cave" → mis. "Movistar KOI · 2026 · Fundado en la fusión".
- **Social icons:** `w-10 h-10 rounded-full bg-white/5 hover:bg-koi-purple/30 flex items-center justify-center transition-colors`.

---

## 5. Buttons *(style tetap, diverifikasi ulang biar konsisten dgn palette Movistar KOI)*

#### Primary Button
- `bg-movistar-blue text-white px-6 py-3 rounded-lg text-sm font-semibold`
- Hover: `hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30`
- Active: `active:scale-[0.98]`

#### Secondary Button
- `bg-koi-purple text-white px-6 py-3 rounded-lg text-sm font-semibold`
- Hover: `hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30`

#### Outline Button
- `bg-transparent border border-soft-lilac text-soft-lilac px-6 py-3 rounded-lg`
- Hover: `hover:bg-soft-lilac/10 hover:border-white`

#### Size Variants
- Small: `px-4 py-2 text-xs` — **khusus non-primary-action** (badge/tag button), bukan CTA utama, karena di bawah target sentuh 44px (lihat §8.1).
- Medium (default): `px-6 py-3 text-sm`
- Large: `px-8 py-4 text-base`

---

## 6. Layout & Spacing System

### 6.1 Container
- **Max-width:** `max-w-7xl` / `1280px`, `mx-auto`
- **Padding:** `px-6` mobile, `px-8` desktop

### 6.2 Grid System
- Base 12-kolom: `grid grid-cols-1 md:grid-cols-12 gap-6`
- Konten naratif desktop: `md:col-8 md:col-start-2` untuk keterbacaan
- Card grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Numbered stepper (fusion/tim): `grid-cols-1 md:grid-cols-3 gap-6`

### 6.3 Spacing Scale
| Token | Size | Usage |
|-------|------|-------|
| `space-1` | `4px` | Gap kecil antar elemen sejenis |
| `space-2` | `8px` | Padding badge, icon spacing |
| `space-3` | `12px` | Margin antar paragraf pendek |
| `space-4` | `16px` | Padding card internal, gap form field |
| `space-6` | `24px` | Section spacing standar |
| `space-8` | `32px` | Spacing antar section besar |
| `space-12` | `48px` | Hero bottom, footer top |
| `space-16` | `64px` | Jarak antar blok utama (antar section bernomor) |

### 6.4 Breakpoints
- Mobile `< 640px` — 1 column, stepper/ladder jadi stack vertikal.
- Tablet `640–1024px` — 2 columns.
- Desktop `> 1024px` — 3 columns, ladder jadi horizontal, marquee full-width.

---

## 7. Assets & Media

### 7.1 Image Guidelines
- Format `WebP` dengan fallback `PNG`/`JPG`.
- Resolusi: hero banner `1920x1080` min, player card `600x800` (3:4), team photo `1600x900`.
- Kompresi via Squoosh/Sharp, target `< 200KB` per gambar utama.
- `loading="lazy"` untuk gambar di bawah fold; placeholder `bg-surface` solid saat loading (hindari layout shift).

### 7.2 Logo Sponsor & Partner
- Simpan di `/assets/sponsors/`, nama file `{sponsor}-logo.svg`/`.png`.
- Warna default full color; grayscale via CSS `filter: grayscale(100%)` untuk default state.
- Padding minimal `16px` dari border container.

### 7.3 Iconography
- Icon set: **Phosphor Icons** atau **Lucide React**, stroke `1.5–2px`.
- Ukuran: `20px` inline, `24px` button, `32px` feature icon.
- Warna: `text-soft-lilac` default, `text-white` hover/active.

---

## 8. Accessibility & Performance

### 8.1 Accessibility
- Kontras teks minimum **4.5:1** untuk body text.
- Semua interactive element: `focus-visible:ring-2 focus-visible:ring-electric-blue`.
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- `alt` text deskriptif untuk semua gambar, termasuk logo di marquee (jangan `alt=""` kosong kalau logo itu informatif).
- Tombol/link CTA minimal `44x44px` touch target — **Button Small dikecualikan** karena dipakai untuk elemen sekunder, bukan CTA utama.
- Marquee logo & animasi ladder wajib punya `motion-reduce:animate-none` fallback (jadi grid statis / tanpa transisi).

### 8.2 Performance
- `next/font` atau `@font-face` dengan `font-display: swap`.
- Hindari `@import` berlebihan untuk font; preload `Inter` & `Montserrat`.
- `srcset` + `sizes` untuk semua image; purge unused Tailwind classes.
- Target **LCP < 2.5s** pada koneksi 4G.
- Marquee/infinite-scroll pakai CSS animation (bukan JS scroll loop) supaya ringan.

---

## 9. Motion & Animation

### 9.1 Principles
- Subtle & purposeful — `ease-out` masuk, `ease-in-out` loop.
- Durasi: `150ms` hover, `300ms` layout transition, `500ms` hero reveal, `30s` linear untuk marquee.

### 9.2 Patterns
- **Fade In Up (per section bernomor):** `opacity-0 translate-y-4` → `opacity-100 translate-y-0`, trigger saat section masuk viewport (scroll-reveal), meniru reveal section "01/02/03…" di Caveman.
- **Hover Lift (card):** `hover:-translate-y-1 hover:shadow-xl`
- **Border Glow (card aktif):** `hover:shadow-[0_0_15px_rgba(120,13,242,0.5)]` (pakai warna KOI purple, bukan hijau/biru neon Caveman).
- **Marquee scroll:** logo sponsor bergerak linear, pause on hover.
- **Stat count-up:** angka di §4.5 animasi count dari 0 ke nilai final saat pertama kali masuk viewport (`duration-1000 ease-out`), mono font supaya digit tidak "jitter" lebar.
- **Reduced Motion:** semua pattern di atas wajib punya `motion-reduce:transition-none motion-reduce:animate-none`.

---

## 10. Component Checklist untuk Developer
- [ ] Semua warna pakai token Tailwind di `tailwind.config.js` (lihat §11) — termasuk `text-heading`, `text-body`, `text-muted`, `text-subtle` yang harus didaftarkan, bukan cuma dipakai di kelas.
- [ ] Font `Inter` & `Montserrat` di-preload, `font-display: swap`; `JetBrains Mono` di-load khusus untuk elemen angka/mono.
- [ ] Nav bar sticky + blur, tidak hide-on-scroll.
- [ ] Marquee logo sponsor punya `motion-reduce` fallback ke grid statis.
- [ ] Numbered stepper (fusion 3 entitas) render badge status yang benar (aktif/segera/arsip — §2.5).
- [ ] Ladder/timeline sejarah render 3 tahap dengan intensitas visual meningkat (dashed → solid).
- [ ] Stat cards pakai `font-mono` untuk semua angka, count-up sekali saat masuk viewport.
- [ ] Semua card (feature/stepper/news/talent) share transition & hover state yang konsisten (`duration-300`).
- [ ] Grid sponsor & partner responsif, tidak overflow di mobile.
- [ ] Semua gambar & logo marquee punya `alt` text.
- [ ] Focus state terlihat dengan kontras memadai di semua tombol/link, termasuk di dalam card gelap.
- [ ] Tidak ada layout shift saat load (aspect-ratio didefinisikan untuk semua media & stat card).
- [ ] Button Small hanya dipakai untuk elemen non-CTA-utama (lihat §5 & §8.1).

---

## 11. Appendix: Tailwind Config Snippet

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        movistar: {
          blue: '#0072CE',
        },
        koi: {
          purple: '#780DF2',
          dark: '#2F1049', // dipakai sbg bg-koi-dark & border-koi-dark
        },
        electric: {
          blue: '#3EBAFE',
        },
        soft: {
          lilac: '#E0E1FC',
          lavender: '#D5D6F2',
        },
        orange: {
          accent: '#F2A73B',
        },
        base: {
          DEFAULT: '#121212',
          surface: '#1D053D',
          'surface-strong': '#320954',
        },
        heading: '#FFFFFF',
        body: '#F4F4F4',
        muted: '#E0E1FC', // sengaja sama dgn soft.lilac (dual-role, lihat §2.4)
        subtle: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(1rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

Kelas yang dipakai di dokumen ini sekarang **1:1 cocok** dengan key di config (`bg-koi-dark`, `border-koi-dark`, `text-heading`, `text-body`, `text-muted`, `text-subtle` semua sudah terdaftar) — beda dari versi sebelumnya yang punya beberapa key tidak sinkron.

---

*Dokumen ini menjadi source of truth untuk visual identity + layout halaman About Movistar KOI. Layout terinspirasi struktur caveman.so, warna 100% Movistar KOI. Setiap perubahan warna, spacing, atau komponen harus melalui diskusi dengan UI/UX lead.*