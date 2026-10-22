# Laman web Madrasah Tahfiz An Nur Gedong — draf

Laman statik (HTML, CSS, JavaScript biasa). Tiada langkah binaan dan tiada pangkalan data, jadi ia boleh dibuka terus dari folder atau dihos di mana-mana pelayan statik (Netlify, GitHub Pages, cPanel).

## Melihat laman

Klik dua kali `index.html`, atau jalankan pelayan tempatan:

```bash
python -m http.server 8080
```

kemudian buka http://localhost:8080.

## Mengubah kandungan

Semua teks, berita, foto dan hubungan ada dalam **satu fail sahaja**: `kandungan/kandungan.js`.

Setiap fakta menyimpan `status`, `sumber` dan `catatan`:

| Status | Maksud | Di laman awam (jika `awamIkutDraf: false`) |
|---|---|---|
| `rasmi` | Rekod portal JAIS / KISWA | Dipaparkan |
| `facebook` | Catatan Facebook madrasah | Dipaparkan |
| `media` | Laporan media | Dipaparkan |
| `sekunder` | Direktori / sumber pihak ketiga | Disembunyikan |
| `perlu-sahkan` | Bercanggah atau belum lengkap | Disembunyikan |
| `editorial` | Ayat cadangan untuk semakan | Disembunyikan |

Selepas pengurusan mengesahkan sesuatu item, tambah `diluluskan: true` padanya. Foto juga hanya muncul di laman awam apabila `diluluskan: true`.

## Mod draf dan mod awam

- `tetapan.mod: "draf"` — label status, nota semakan, bahagian belum lengkap dan halaman `semakan.html` dipaparkan. Butang **Pratonton laman awam** di bar bawah menunjukkan rupa laman selepas diterbitkan.
- `tetapan.mod: "awam"` — tiada bar draf, label atau nota semakan.
- `tetapan.awamIkutDraf: true` (tetapan semasa) — laman awam memaparkan kandungan yang sama seperti draf, termasuk foto dan item belum disahkan. Bahagian semakan dalaman (jadual rekod bercanggah, borang demonstrasi, ruang foto kosong, senarai semak, halaman Sumbangan draf) tetap disembunyikan. Tukar kepada `false` untuk kembali kepada penapisan ketat mengikut status dalam jadual di atas.

## Sebelum diterbitkan

1. Lengkapkan medan dalam `semakan.html` (bahagian “Medan menunggu pengesahan”).
2. Tetapkan `diluluskan: true` pada item dan foto yang sudah disahkan.
3. Isi `hubungi.alamatDisahkan`, dan `hubungi.whatsapp` (`aktif: true`) jika diluluskan.
4. Tukar `tetapan.mod` kepada `"awam"`.
5. Buang baris `<meta name="robots" content="noindex, nofollow">` dalam setiap fail `.html`.
6. Padam `semakan.html` dan `assets/img/logo/logo-kemas-ai-untuk-semak.png` daripada salinan yang dimuat naik.

## Struktur

```
index.html, tentang.html, pengajian.html, aktiviti.html, galeri.html,
kemasukan.html, sumbangan.html, hubungi.html, semakan.html
kandungan/kandungan.js   ← sunting di sini
assets/css/gaya.css      ← reka bentuk (warna daripada logo)
assets/js/app.js         ← enjin paparan
assets/img/              ← logo dan foto
```

Bahan sumber penyelidikan: `D:\Sepul Lab\Madrasah Annur - Bahan Laman Web`.
