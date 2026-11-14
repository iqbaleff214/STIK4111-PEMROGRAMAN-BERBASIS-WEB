const app = Vue.createApp({
    data() {
        const sittaSidebarCollapsed = localStorage.getItem('sittaSidebarCollapsed') === 'true';

        return {
            tab: 'dasbor',
            isLoading: true,
            sidebarCollapsed: sittaSidebarCollapsed,
            isOrderModalOpen: false,
            navItems: [
                {
                    id: 'dasbor',
                    name: 'Dasbor',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-layout-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -1" /><path d="M4 15a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -3" /><path d="M14 6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -3" /><path d="M14 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2l0 -1" /></svg>`
                },
                {
                    id: 'stok',
                    name: 'Stok Bahan Ajar',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-library"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 5.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" /><path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" /><path d="M11 7h5" /><path d="M11 10h6" /><path d="M11 13h3" /></svg>`
                },
                {
                    id: 'tracking',
                    name: 'Tracking Pengiriman',
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg>`
                }
            ],
            state: {
                upbjjList: [],
                kategoriList: [],
                pengirimanList: [],
                paket: [],
                stok: [],
                tracking: {}
            }
        };
    },
    async created() {
        const data = await DataService.fetchBahanAjar();
        this.state = data;
        this.isLoading = false;
    },
    mounted() {
        document.body.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
    },
    methods: {
        sidebarToggle() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
            document.body.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
            localStorage.setItem('sittaSidebarCollapsed', this.sidebarCollapsed);
        },
        logout() {
            this.$refs.modal.alert({
                title: 'Informasi',
                message: 'Fungsi logout belum diimplementasikan.',
                type: 'primary'
            });
        },
        searchDeliveryOrder(query) {
            if (!query) return;
            this.tab = 'tracking';
            this.$nextTick(() => {
                if (this.$refs.trackingComponent) {
                    this.$refs.trackingComponent.viewDO(query);
                }
            });
        },
        handleCreateStock(newItem) {
            this.state.stok.push(newItem);
            this.$refs.modal.alert({
                title: 'Berhasil',
                message: `Data Bahan Ajar <strong>${newItem.kode} - ${newItem.judul}</strong> berhasil ditambahkan!`,
                type: 'primary'
            });
        },
        handleUpdateStock(updatedItem) {
            const idx = this.state.stok.findIndex(s => s.kode === updatedItem.kode);
            if (idx !== -1) {
                this.state.stok[idx] = updatedItem;
                this.$refs.modal.alert({
                    title: 'Berhasil',
                    message: `Data Stok untuk <strong>${updatedItem.kode}</strong> berhasil diperbarui!`,
                    type: 'primary'
                });
            }
        },
        handleDeleteStock(item) {
            this.$refs.modal.confirm({
                title: 'Konfirmasi Hapus Data',
                message: `Apakah Anda yakin ingin menghapus bahan ajar <strong>${item.kode} — ${item.judul}</strong>?`,
                type: 'danger',
                confirmText: 'Ya, Hapus',
                cancelText: 'Batal',
                onConfirm: () => {
                    this.state.stok = this.state.stok.filter(s => s.kode !== item.kode);
                }
            });
        },
        handleAddProgress(payload) {
            const { doNumber, log } = payload;
            if (this.state.tracking[doNumber]) {
                this.state.tracking[doNumber].perjalanan.push(log);
            }
        },
        handleNewDO(payload) {
            const { doNumber, detail } = payload;
            this.state.tracking[doNumber] = detail;
            this.isOrderModalOpen = false;

            this.$refs.modal.alert({
                title: 'Delivery Order Berhasil Dibuat',
                message: `Delivery Order <strong>${doNumber}</strong> atas nama <strong>${detail.nama}</strong> berhasil disimpan!`,
                type: 'primary',
                onConfirm: () => {
                    this.tab = 'tracking';
                    if (this.$refs.trackingComponent) {
                        this.$refs.trackingComponent.viewDO(doNumber);
                    }
                }
            });
        }
    }
});

app.config.errorHandler = (err, instance, info) => {
    console.error('[Vue Error]', {
        message: err.message,
        info,
        component: instance?.$options?.name,
        data: instance?.$data,
        error: err
    });
};

app.config.globalProperties.$filters = {
    rupiah(angka) {
        if (angka === null || angka === undefined || isNaN(angka)) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    },
    satuanBuah(angka) {
        if (angka === null || angka === undefined) return '0 buah';
        return `${angka} buah`;
    },
    tanggalIndo(dateStr) {
        if (!dateStr) return '-';
        const bulan = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;
        return `${parseInt(parts[2], 10)} ${bulan[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
    }
};