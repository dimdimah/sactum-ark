---
title: Debugger Workflow
description: Workflow sistematik debugging — observe, reproduce, hypothesize, test, fix, prevent
---

# Debugger Workflow

## Tujuan

Workflow ini memandu AI agent melakukan debugging secara sistematik — berbasis bukti, bukan mencoba-coba.

## Kapan Digunakan

Dipanggil saat:
- Ada bug/error dilaporkan
- Test gagal secara misterius
- Perilaku sistem tidak sesuai ekspektasi

## Input

- Error message / log / stack trace
- Step untuk mereproduce bug
- Konteks kode
- Environment yang sedang dipakai

## Output

- Root cause yang teridentifikasi
- Fix pada akar masalah
- Debug log dokumen (`templates/debug-log.md`)
- Regression test

## Langkah Kerja

### Langkah 1: Observe

- Deskripsikan apa yang salah
- Kapan/kenapa terjadi
- Di mana terjadi
- Dampak apa

### Langkah 2: Reproduce

- Cari cara pasti mereproduce
- Minimum input yang diperlukan
- Catat langkah-langkah pasti

### Langkah 3: Hypothesize

- Daftar kemungkinan penyebab
- Urutkan dari paling mungkin
- Untuk tiap hipotesis, apa bukti?

### Langkah 4: Test

- Isolasi satu variabel
- Lakukan eksperimen kecil
- Catat hasil — lulus/gagal

### Langkah 5: Fix

- Perbaiki di akar penyebab
- Pastikan tidak bikin bug baru

### Langkah 6: Prevent

- Tambahkan regression test
- Jika pola berulang, pertimbangkan refactor
- Dokumentasikan insight

## Quality Gate

Debugging selesai ketika:
- Root cause teridentifikasi & diverifikasi
- Fix memecahkan akar, bukan gejala
- Regression test ada
- Test suite lols passage

## Retry Instruction

Jika hipotesis gagal:
1. Catat kegagalan — bisa jadi mengarahkan ke hipotesis baru
2. Kembali ke langkah 3, buat hipotesis baru
3. Jika stuck, gunakan binary search atau rubber duck

## Completion Criteria

- Debug log dokumen terisi
- Root cause jelas
- Fix ada & test lulus
- Regression test ditambahkan
- Insight dicatat
