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
            filters: {
                search: '',
                upbjj: '',
                kategori: '', 
                warningOnly: false, 
                sortBy: 'judul'
            },
            isAddModalOpen: false,
            formAdd: {
                kode: '', judul: '', upbjj: '', kategori: '', qty: 0, safety: 10, lokasiRak: '', harga: 0, catatanHTML: ''
            },            
            isEditModalOpen: false,
            formEdit: {
                kode: '', judul: '', qty: 0, safety: 0, lokasiRak: ''
            },
            editingIndex: -1
        }
    },
    computed: {
        filteredStock() {
            let result = this.stok;

            if (this.filters.search.trim() !== '') {
                const query = this.filters.search.toLowerCase();
                result = result.filter(item => 
                    item.kode.toLowerCase().includes(query) || 
                    item.judul.toLowerCase().includes(query)
                );
            }

            if (this.filters.upbjj !== '') {
                result = result.filter(item => item.upbjj === this.filters.upbjj);
                
                if (this.filters.kategori !== '') {
                    result = result.filter(item => item.kategori === this.filters.kategori);
                }
            }

            if (this.filters.warningOnly) {
                result = result.filter(item => item.qty < item.safety);
            }

            result = result.sort((a, b) => {
                if (this.filters.sortBy === 'judul') {
                    return a.judul.localeCompare(b.judul);
                } else if (this.filters.sortBy === 'qty') {
                    return a.qty - b.qty; 
                } else if (this.filters.sortBy === 'harga') {
                    return a.harga - b.harga; 
                }
            });

            return result;
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
        formatRupiah(angka) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
        },
        getStockStatus(item) {
            if (item.qty === 0) {
                return { text: 'Kosong', badgeClass: 'badge-danger', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-alert-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg>` };
            } else if (item.qty < item.safety) {
                return { text: 'Menipis', badgeClass: 'badge-warning', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-alert-triangle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" /></svg>` };
            } else {
                return { text: 'Aman', badgeClass: 'badge-success', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-shield-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>` };
            }
        },
        resetFilters() {
            this.filters = {
                search: '',
                upbjj: '',
                kategori: '',
                warningOnly: false,
                sortBy: 'judul'
            };
        },
        openAddModal() {
            this.formAdd = { kode: '', judul: '', upbjj: '', kategori: '', qty: '', safety: 10, lokasiRak: '', harga: '', catatanHTML: '' };
            this.isAddModalOpen = true;
        },
        closeAddModal() {
            this.isAddModalOpen = false;
        },
        submitAddStock() {
            this.stok.push({
                kode: this.formAdd.kode.toUpperCase(),
                judul: this.formAdd.judul,
                upbjj: this.formAdd.upbjj,
                kategori: this.formAdd.kategori,
                qty: parseInt(this.formAdd.qty),
                safety: parseInt(this.formAdd.safety),
                lokasiRak: this.formAdd.lokasiRak.toUpperCase(),
                harga: parseInt(this.formAdd.harga),
                catatanHTML: this.formAdd.catatanHTML || "-"
            });
            alert('Data Bahan Ajar berhasil ditambahkan!');
            this.closeAddModal();
        },
        openEditModal(item) {
            this.editingIndex = this.stok.findIndex(s => s.kode === item.kode);
            
            this.formEdit = {
                kode: item.kode,
                judul: item.judul,
                qty: item.qty,
                safety: item.safety,
                lokasiRak: item.lokasiRak
            };
            this.isEditModalOpen = true;
        },
        closeEditModal() {
            this.isEditModalOpen = false;
            this.editingIndex = -1;
        },
        submitEditStock() {
            if (this.editingIndex !== -1) {
                this.stok[this.editingIndex].qty = parseInt(this.formEdit.qty);
                this.stok[this.editingIndex].safety = parseInt(this.formEdit.safety);
                this.stok[this.editingIndex].lokasiRak = this.formEdit.lokasiRak.toUpperCase();
                
                alert(`Data Stok untuk ${this.formEdit.kode} berhasil diperbarui!`);
                this.closeEditModal();
            }
        }
    },
    watch: {
        'filters.upbjj'(newVal) {
            if (newVal === '') {
                this.filters.kategori = '';
            }
        }
    },

    mounted() {
        document.body.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
    }
});

app.mount('#app');