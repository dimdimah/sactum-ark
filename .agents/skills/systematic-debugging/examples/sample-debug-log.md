---
title: Sample Debug Log
debug_id: dbg-001
issue: Order total salah ketika ada diskon
scenario: Sistem menghitung total order dengan salah ketika voucher diskon diaplikasikan
---

# Debug Log

## 1. Observe — Deskripsi Gejala

### Apa yang Salah?
Saat user menggunakan voucher diskon, total order dihitung dengan salah — hasilnya lebih besar dari seharusnya (diskon tidak diterapkan dengan benar).

### Kapan Terjadi?
- **Frekuensi**: Setiap kali ada voucher percentage (misal 20% off)
- **Kondisi**: Hanya terjadi dengan tipediskon percentage, bukan fixed amount
- **Environment**: Production

### Error Message / Log

```
[ERROR] OrderService: total_mismatch — expected 80000, got 100000
  at OrderService.calculateTotal (src/services/OrderService.ts:45:12)
  at OrderController.checkout (src/controllers/OrderController.ts:120:8)
```

## 2. Reproduce — Langkah Repro

1. Buat order dengan 2 item, total 100000
2. Terapkan voucher 20% off
3. Submit order
4. **Expected**: total = 80000 (100000 × 0.8)
5. **Actual**: total = 100000 (voucher tidak diterapkan)

Repro konsisten? **Ya** — 100% reprodusibel dengan voucher percentage

## 3. Hypothesize — Hipotesis Penyebab

| No | Hipotesis | Evidence Pendukung | Keyakinan |
|----|-----------|-------------------|-----------|
| 1 | Bug di discount calculation — percentage dikalikan, bukan dikurangi | Log menunjukkan total tidak berubah sama sekali | tinggi |
| 2 | Voucher tidak di-load dari database | Voucher fixed amount bekerja dengan benar | rendah |
| 3 | Middleware discount tidak dijalankan untuk percentage type | Hanya percentage yang gagal | sedang |

## 4. Test — Verifikasi Hipotesis

| Hipotesis No | Eksperimen | Hasil | Kesimpulan |
|-------------|-----------|-------|------------|
| 1 | Baca kode di `OrderService.calculateTotal`, cek logic discount | Ditemukan: `total = subtotal - (subtotal * percentage)` seharusnya `total = subtotal * (1 - percentage)` | ✅ Root cause terkonfirmasi |
| 2 | Cek database voucher, periksa type field | Voucher percentage ada dan valid | ❌ Hipotesis 2 salah |

## 5. Fix — Solusi

### Root Cause

```javascript
// BEFORE (BUG):
function applyPercentageDiscount(subtotal, percentage) {
  return subtotal - (subtotal * percentage);  // BUG: 100000 - (100000 * 0.2) = 80000... 
  // Wait, this looks correct? 
}
```

**Fakta ternyata**: Bug sebenarnya ada di mana voucher diload — property `percentage` adalah string "0.2", bukan number 0.2. JS string × number = NaN, lalu `subtotal - NaN = NaN`, yang kemudian fallback ke subtotal.

### Perubahan yang Dilakukan

- **File**: `src/services/OrderService.ts:38`
- **Perubahan**: `parseFloat(voucher.percentage)` sebelum perhitungan
- **File**: `src/services/OrderService.ts` (unit test)
- **Perubahan**: Tambah test untuk string percentage input

### Verifikasi Fix

- [x] Manual repro — sekarang hasil 80000
- [x] Unit test lulus
- [x] Regression test ditambahkan

## 6. Prevent — Cegah Kambuh

- **Regression test**: `OrderService.test.ts` → "should handle string percentage from DB"
- **Insight**: Selalu parse/number() nilai dari database sebelum perhitungan
- **Catatan**: Tambahkan ke coding standard — "parse semua numeric value dari external source"
