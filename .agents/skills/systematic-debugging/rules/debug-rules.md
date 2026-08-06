---
title: Debug Rules
description: Aturan dan teknik untuk debugging sistematik yang berbasis bukti
---

# Debug Rules

## Tujuan

Menetapkan aturan untuk pendekatan debugging yang sistematik — berbasis hipotesis, evidence, dan proses eliminasi — bukan mencoba-coba sampai berhasil.

## Kapan Digunakan

- Saat ada bug/error yang dilaporkan
- Test gagal secara misterius
- Perilaku sistem tidak sesuai ekspektasi
- Saat verification-loop gagal dan perlu investigasi lebih dalam

## Input

- Error message / log / stack trace
- Reproduksi langkah-langkah bug
- Konteks kode (file, fungsi, environment)
- Versi / commit yang sedang dijalankan

## Output

- Root cause yang teridentifikasi
- Fix yang tepat sasaran pada akar masalah
- Dokumen debug log (`templates/debug-log.md`)
- Regression test (untuk mencegah kambuh)

## Proses 6 Langkah Debugging

### Langkah 1: Observe — Deskripsikan Gejala

Jawab:
- Apa yang **salah**? (error message, output salah)
- **Kapan** terjadi? (setiap waktu / kondisi tertentu)
- **Di mana** terjadi? (file, fungsi, endpoint)
- Seberapa **sering**? (100% / kadang / pertama kalinya)
- **Dampak**? (blokir / edge case)

### Langkah 2: Reproduce — Buat Kasus Reproduksibel

- Cari cara pasti mereproduksi error
- Minimum input yang diperlukan
- Catat langkah-langkah pasti yang bisa diulang
- Jika gagal reproduce → kemungkinan environment issue

### Langkah 3: Hypothesize — Buat Hipotesis Penyebab

- Daftar semua kemungkinan penyebab (urut dari paling mungkin)
- Untuk tiap hipotesis: apa bukti yang mendukung/menentang?
- Buat test kecil untuk verifikasi tiap hipotesis

### Langkah 4: Test — Verifikasi Hipotesis Terisolasi

- Isolasi satu variabel pada satu waktu
- Lakukan eksperimen kecil
- Catat hasil — lulus/gagal
- Jangan skip langkah — tiap "ya/tidak" harus tercatat

### Langkah 5: Fix — Perbaiki Akar Masalah

- Perbaiki di sumber akar, bukan gejala
- Pastikan fix tidak ciptakan bug baru
- Jalankan test kembali untuk konfirmasi

### Langkah 6: Prevent — Cegah Kambuh

- Tambahkan regression test
- Jika pola berulang → pertimbangkan refactoring
- Dokumentasikan insight ke gotchas/strategic summary

## Teknik Debugging

- **Binary search** — bagi area kode setengah, tentukan sisi mana error
- **Minimal reproduction** — kurangi hingga error hilang, tambahkan kembali
- **Log injection** — tambah log untuk trace alur eksekusi
- **Rubber duck** — jelaskan kode dengan kata-kata untuk temukan logika salah
- **Version bisect** — gunakan git bisect (lihat git-history-archaeologist skill)

## Checklist

- [ ] Gejala dideskripsikan lengkap?
- [ ] Bisa mereproduce secara konsisten?
- [ ] Hipotesis didaftarkan, tidak eksklusif?
- [ ] Eksperimen terisolasi satu variabel?
- [ ] Fix dituju pada akar penyebab?
- [ ] Regression test ditambahkan?

## Best Practice

- Mulai dari gejala yang spesifik — jangan langsung ke solusi
- Isolsikan satu variabel — eksperimen bersih
- Catat setiap hasil — lulus atau gagal
- Jika stuck, gunakan binary search atau minta tolog (rubber duck)
- Dokumentasikan insight ke strategic summary

## Quality Gate

Debugging selesai ketika:
- Root cause teridentifikasi
- Fix memecahkan akar, bukan gejala
- Regression test ada
- Test suite lols passage semua

## Failure Condition

- Mengganti kode acak tanpa hipotesis → "try until it works" (anti-pattern)
- Hanya fix gejala → bug akan kambuh
- Tidak mereproduce → fix mungkin tidak benar
- Membuang test → regression tidak terhindarkan

## Retry Instruction

Jika hipotesis gagal:
1. Catat kegagalan — apakah mengarahkan ke hipotesis baru?
2. Kembali ke langkah 3, buat hipotesis baru
3. Jika stuck → gunakan binary search atau minta tolong (rubber duck)

## Completion Criteria

Debugging selesai ketika:
- Debug log dokumen terisi
- Root cause jelas dan diverifikasi
- Fix ada dan test lulus
- Regression test ditambahkan
- Insight dicatat di strategic summary (jika relevan)
