const app = Vue.createApp({
    data() {
        const sittaSidebarCollapsed = localStorage.getItem('sittaSidebarCollapsed') ?? false;

        return {
            sidebarCollapsed: sittaSidebarCollapsed !== null ? (sittaSidebarCollapsed === 'true') : false,
            navItems: [
                { 
                    name: "Dasbor",
                    link: "index.html", 
                    active: () => window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/"),
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-layout-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -1" /><path d="M4 15a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -3" /><path d="M14 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -3" /><path d="M14 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -1" /></svg>` },
                { 
                    name: "Stok Bahan Ajar",
                    link: "stock.html", 
                    active: () => window.location.pathname.endsWith("stock.html"),
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-library"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 5.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" /><path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" /><path d="M11 7h5" /><path d="M11 10h6" /><path d="M11 13h3" /></svg>` },
                { 
                    name: "Tracking Pengiriman",
                    link: "tracking.html", 
                    active: () => window.location.pathname.endsWith("tracking.html"),
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg>` },
            ],
            upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar", "Banjarmasin"],
            kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
            pengirimanList: [
                { kode: "REG", nama: "Reguler (3-5 hari)" },
                { kode: "EXP", nama: "Ekspres (1-2 hari)" }
            ],
            paket: [
                { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116","EKMA4115"], harga: 120000 },
                { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201","FISIP4001"], harga: 140000 }
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
                        { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
                        { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
                        { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
                    ]
                }
            },
            
            searchQuery: '',
            searchResult: null,
            hasSearched: false,
            
            isModalOpen: false,
            form: {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: ''
            }
        }
    },
    
    computed: {
        generatedDONumber() {
            const year = new Date().getFullYear();
            const prefix = `DO${year}-`;
            
            const existingKeys = Object.keys(this.tracking).filter(k => k.startsWith(prefix));
            let maxSeq = 0;
            
            existingKeys.forEach(key => {
                const seq = parseInt(key.split('-')[1]);
                if (seq > maxSeq) maxSeq = seq;
            });
            
            const nextSeq = String(maxSeq + 1).padStart(4, '0');
            return `${prefix}${nextSeq}`;
        },
        selectedPaketData() {
            if (!this.form.paket) return null;
            return this.paket.find(p => p.kode === this.form.paket);
        }
    },

    methods: {
        sidebarToggle() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
            document.body.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
            localStorage.setItem('sittaSidebarCollapsed', this.sidebarCollapsed);
        },
        logout() {
            alert("Fungsi logout belum diimplementasikan.");
        },
        searchDO() {
            if (!this.searchQuery || this.searchQuery === '') {
                this.hasSearched = false;
                this.searchResult = null;
                return;
            }
            
            this.hasSearched = true;
            const result = this.tracking[this.searchQuery.trim().toUpperCase()];
            
            if (result) {
                this.searchResult = { ...result, nomorDO: this.searchQuery.trim().toUpperCase() };
            } else {
                this.searchResult = null;
            }
        },
        openModal() {
            const today = new Date().toISOString().split('T')[0];
            
            this.form = {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: today
            };
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        submitForm() {
            const newDoNumber = this.generatedDONumber;
            const newEntry = {
                nim: this.form.nim,
                nama: this.form.nama,
                status: "Diproses",
                ekspedisi: this.form.ekspedisi,
                tanggalKirim: this.form.tanggalKirim,
                paket: this.form.paket,
                total: this.selectedPaketData.harga,
                perjalanan: [
                    { 
                        waktu: new Date().toLocaleString('id-ID'), 
                        keterangan: "Data DO telah dibuat dan masuk antrean packing." 
                    }
                ]
            };
            
            this.tracking[newDoNumber] = newEntry;
            
            this.closeModal();
            alert(`Delivery Order ${newDoNumber} berhasil dibuat!`);
            
            this.searchQuery = newDoNumber;
            this.searchDO();
        },
        viewDO(doNumber) {
            this.searchQuery = doNumber;
            this.searchDO();
        },
        resetSearch() {
            this.searchQuery = '';
            this.searchResult = null;
            this.hasSearched = false;
        },
        checkEmptySearch() {
            if (this.searchQuery.trim() === '') {
                this.resetSearch();
            }
        },
        formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
        },
        getNamaPaket(kodePaket) {
            const pk = this.paket.find(p => p.kode === kodePaket);
            return pk ? pk.nama : kodePaket;
        },
        getJudulBuku(kodeMatkul) {
            const book = this.stok.find(s => s.kode === kodeMatkul);
            return book ? book.judul : "Judul Tidak Diketahui";
        }
    },

    mounted() {
        document.body.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
        
        const urlParams = new URLSearchParams(window.location.search);
        const doParam = urlParams.get('do');
        if (doParam) {
            this.searchQuery = doParam;
            this.searchDO();
        }
    }
});

app.mount('#app');