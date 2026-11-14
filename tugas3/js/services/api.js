const DataService = {
    async fetchBahanAjar() {
        const fallbackData = {
            upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar", "Banjarmasin"],
            kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
            pengirimanList: [
                { kode: "REG", nama: "Reguler (3-5 hari)" },
                { kode: "EXP", nama: "Ekspres (1-2 hari)" }
            ],
            paket: [
                { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116", "EKMA4115"], harga: 120000 },
                { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201", "FISIP4001"], harga: 140000 }
            ],
            stok: [
                {
                    kode: "EKMA4116",
                    judul: "Pengantar Manajemen",
                    kategori: "MK Wajib",
                    upbjj: "Jakarta",
                    lokasiRak: "R1-A3",
                    harga: 65000,
                    qty: 28,
                    safety: 20,
                    catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
                },
                {
                    kode: "EKMA4115",
                    judul: "Pengantar Akuntansi",
                    kategori: "MK Wajib",
                    upbjj: "Jakarta",
                    lokasiRak: "R1-A4",
                    harga: 60000,
                    qty: 7,
                    safety: 15,
                    catatanHTML: "<strong>Cover baru</strong>"
                },
                {
                    kode: "BIOL4201",
                    judul: "Biologi Umum (Praktikum)",
                    kategori: "Praktikum",
                    upbjj: "Surabaya",
                    lokasiRak: "R3-B2",
                    harga: 80000,
                    qty: 12,
                    safety: 10,
                    catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
                },
                {
                    kode: "FISIP4001",
                    judul: "Dasar-Dasar Sosiologi",
                    kategori: "MK Pilihan",
                    upbjj: "Makassar",
                    lokasiRak: "R2-C1",
                    harga: 55000,
                    qty: 2,
                    safety: 8,
                    catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
                }
            ],
            tracking: {
                "DO2025-0001": {
                    nim: "123456789",
                    nama: "Rina Wulandari",
                    status: "Dalam Perjalanan",
                    ekspedisi: "JNE",
                    tanggalKirim: "2025-08-25",
                    paket: "PAKET-UT-001",
                    total: 120000,
                    perjalanan: [
                        { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" }
                    ]
                }
            }
        };

        try {
            const response = await fetch('data/dataBahanAjar.json');
            if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
            }
            const rawData = await response.json();

            const normalizedTracking = {};
            if (Array.isArray(rawData.tracking)) {
                rawData.tracking.forEach(item => {
                    if (item && typeof item === 'object') {
                        Object.assign(normalizedTracking, item);
                    }
                });
            } else if (rawData.tracking && typeof rawData.tracking === 'object') {
                Object.assign(normalizedTracking, rawData.tracking);
            }

            return {
                upbjjList: rawData.upbjjList || fallbackData.upbjjList,
                kategoriList: rawData.kategoriList || fallbackData.kategoriList,
                pengirimanList: rawData.pengirimanList || fallbackData.pengirimanList,
                paket: rawData.paket || fallbackData.paket,
                stok: rawData.stok || fallbackData.stok,
                tracking: normalizedTracking
            };
        } catch (error) {
            console.warn('Menggunakan data fallback lokal:', error.message);
            return fallbackData;
        }
    }
};