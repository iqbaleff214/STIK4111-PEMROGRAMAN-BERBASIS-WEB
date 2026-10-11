# Tugas 1: Aplikasi Pemesanan Bahan Ajar UT-Daerah

Anda diminta untuk membuat sebuah aplikasi website sederhana untuk Pemesanan Bahan Ajar di Universitas Terbuka yang dilakukan oleh UT-Daerah. Pada tugas ini, mahasiswa berfokus pada proses pada front-end tanpa menggunakan back-end terlebih dahulu. Sehingga, data-data yang dibutuhkan tidak dibaca melalui database, tapi melalui `js file` yang akan dilampirkan bersamaan dengan tugas praktik ini.

Buatlah empat halaman website sebagai berikut:

### 1. Halaman Login (`login.html`)
- [ ] Input: "email" dan "password".
- [ ] Tombol "Login".
- [ ] Jika salah atau keduanya tidak sesuai, maka akan memunculkan pop-up/alert yang berisi bahwa "email/password yang Anda masukkan salah".
- [ ] Terdapat tombol "Lupa Password" dan "Daftar" yang dimunculkan dalam bentuk modal box/pop-up.

> Berikut adalah contoh gambaran dari halaman login, tetapi ini hanya sebagai contoh karena aplikasi asli menggunakan versi mobile. Kita sesuaikan dengan versi website dan sesuai dengan kemampuan kreativitas teman-teman mahasiswa masing-masing.
> 
> <img width="329" height="309" alt="image" src="https://github.com/user-attachments/assets/a72dc023-3b58-476e-93e9-e29b8dde3d63" />

### 2. Dashboard Menu (`dashboard.html`)
- [ ] Menu utama yang terdiri atas tombol navigasi ke:
  - [ ] Informasi Bahan Ajar
  - [ ] Tracking Pengiriman
  - [ ] Laporan 
    - [ ] Monitoring Progress DO Bahan Ajar
    - [ ] Rekap Bahan Ajar
  - [ ] Histori Transaksi Bahan Ajar
- Tampilkan "greeting" berdasarkan waktu local time (pagi/siang/sore).

> Berikut adalah contoh gambaran dari halaman dashboard dengan navigasi menu di atas, tetapi ini hanya sebagai contoh. Navigasi menu dapat dirancang berada di kiri ataupun kanan. Teman-teman mahasiswa dapat membuat sesuai dengan kemampuan kreativitas masing-masing.
> 
> <img width="485" height="82" alt="image" src="https://github.com/user-attachments/assets/30c47c4f-5f50-4189-8046-35592cce12ee" />

### 3. Tracking Pengiriman (`tracking.html`)
- [ ] Input: Nomor delivery order
- [ ] Ketika tombol "Cari" ditekan, tampilkan:
  - [ ] Nama mahasiswa
  - [ ] Status pengiriman (dapat disimulasikan dengan progress bar, warna, tabel, atau list sesuai dengan kemampuan dan kreativitas teman-teman)
  - [ ] Detail ekspedisi, tanggal kirim, jenis paket, total pembayaran.

> Berikut adalah contoh gambaran dari halaman tracking pengiriman, tetapi ini hanya sebagai contoh karena aplikasi asli menggunakan versi mobile. Kita sesuaikan dengan versi website dan sesuai dengan kemampuan kreativitas teman-teman mahasiswa masing-masing.
> 
> <img width="199" height="323" alt="image" src="https://github.com/user-attachments/assets/fb2fb26e-f281-4315-bcb0-3fbe3899af37" />

### 4. Informasi Stok Bahan Ajar (`stok.html`)
- [ ] Menampilkan secara dinamis dari data dummy pada `data.js` di variabel konstanta `dataBahanAjar`.
- [ ] Terdapat fitur untuk menambahkan baris stok baru menggunakan Javascript DOM

> Berikut adalah contoh gambaran dari halaman stok, tetapi ini hanya sebagai contoh karena aplikasi asli menggunakan versi mobile. Kita sesuaikan dengan versi website dan sesuai dengan kemampuan kreativitas teman-teman mahasiswa masing-masing.
> 
> <img width="193" height="339" alt="image" src="https://github.com/user-attachments/assets/4a9f397f-9aa5-4057-95a3-b2751a3135f7" />

Kemudian untuk struktur folder proyek dibuat seperti ini:

```text
sitta-praktik/
├── index.html
├── dashboard.html
├── tracking.html
├── stok.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── logo-ut.png
```

Untuk lampiran file data-data dummy yang akan ditampilkan pada Tugas Praktik 1, disimpan dalam folder `js`.
