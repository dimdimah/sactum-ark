---
name: systematic-debugging
description: 'Gunakan skill ini untuk pendekatan debugging yang terstruktur — mempersempit kemungkinan penyebab satu per satu berdasarkan bukti, bukan asal coba-coba ganti kode sampai kebetulan jalan. Melatih pola pikir menelusuri akar masalah. Trigger: "bug", "error", "debug", "gagal", "kenapa ini error", "systematic debugging", "investigate error", "root cause".'
---

# Systematic Debugging

## Tujuan

Skill ini memberikan pendekatan **terstruktur untuk debugging** yang berbasis bukti dan logis. Daripada mencoba-coba mengganti kode sampai berhasil, skill ini mengajarkan AI untuk:

1. Membuat hipotesis yang terukur
2. Mempersempit kemungkinan penyebab
3. Verifikasi satu per satu secara sistematis
4. Menemukan akar masalah (root cause), bukan gejala

## Kapan Skill Ini Aktif

Aktifkan ketika:

- User melaporkan error/bug
- Output tidak sesuai ekspektasi
- Test gagal secara aneh (flaky test, intermittent failure)
- Performance regression terdeteksi
- Perilaku sistem tidak konsisten

## Proses Sistematik Debugging

### Langkah 1: Observer — Deskripsikan Gejala

Jawab pertanyaan ini:
- Apa yang **salah**? (error message, output yang salah)
- Kapan **terjadi**? (setiap waktu / kondisi tertentu)
- **Di mana** terjadi? (file, fungsi, API endpoint)
- Seberapa **sering**? (100% / kadang-kadang / baru pertama kali)
- Apa **impact**-nya? (blokir semua / hanya edge case)

### Langkah 2: Reproduce — Buat Kasus yang Reproduksibel

- Cari cara pasti untuk mereproduksi error
- Minimum input yang diperlukan
- Catat langkah-langkah pasti yang bisa diulang
- Jika gagal mereproduce, cek apakah environment issue

### Langkah 3: Hypothesize — Buat Hipotesis Penyebab

- Daftar semua kemungkinan penyebab (urutkan dari paling mungkin ke tidak mungkin)
- Untuk setiap hipotesis: apa bukti yang mendukung/menentang?
- Buat test kecil untuk memverifikasi tiap hipotesis

### Langkah 4: Test — Verifikasi Hipotesis Secara Terisolasi

- Isolasi satu variabel pada satu waktu
- Lakukan eksperimen kecil
- Catat hasil — lulus atau gagal
- Jangan skip langkah — setiap "ya/tidak" harus tercatat

### Langkah 5: Fix — Perbaiki Akar Masalah

- Perbaiki di sumber akar, bukan gejala
- Pastikan fix tidak menciptakan bug baru
- Jalankan test kembali untuk konfirmasi

### Langkah 6: Prevent — Cegah Kambuh

- Tambahkan test yang menangkap bug ini di masa depan
- Jika ini pola berulang, pertimbangkan refactoring
- Dokumentasikan insight ke gotchas

## Debug Techniques

- **Binary search** — bagi area kode setengahnya, tentukan sisi mana error terjadi
- **Minimal reproduction** — kurangi input sampai minimal, lihat kapan error hilang
- **Logging/strace** — tambah log untuk trace alur eksekusi
- **Rubber duck** — jelaskan kode dengan kata-kata untuk menemukan logika yang salah
- **Bisect git** — gunakan git-bisect untuk temukan commit penyebab (gunakan git-history-archaeologist skill)

## Integrasi

| Skill | Integrasi |
|-------|-----------|
| `git-history-archaeologist` | Gunakan git bisect untuk temukan commit penyebab |
| `verification-loop` | Pastikan fix lol passage seluruh verification |
| `tdd-workflow` | Tambahkan regression test setelah fix |
| `strategic-compact` | Catat insight/keputusan debug ke strategic summary |

## Cara Kerja

Ikuti struktur skill ini:

1. **Baca `rules/debug-rules.md`** — aturan debugging sistematik
2. **Ikuti `workflow/debugger.md`** — proses 6 langkah: observe, reproduce, hypothesize, test, fix, prevent
3. **Gunakan `templates/debug-log.md`** untuk output dokumen
4. **Validasi** dengan `schemas/debug-log.schema.json`

## Checklist Sebelum Mengaktifkan Skill Ini

- [ ] Error message / log sudah didapat?
- [ ] Bisa mereproduce secara konsisten?
- [ ] Apakah ini pertama kali terjadi atau berulang?

## Prinsip Utama

- **Berbasis bukti, bukan asumsi** — verifikasi hipotesis satu per satu
- **Cari akar penyebab, bukan gejala** — fix harus tepat sasaran
- **Isolasi satu variabel** — eksperimen bersih
- **Dokumentasikan insight** — bagikan ke sesi berikutnya
