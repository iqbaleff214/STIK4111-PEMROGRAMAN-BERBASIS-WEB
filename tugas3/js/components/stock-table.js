app.component('ba-stock-table', {
    name: 'StockTable',
    template: '#tpl-stock',
    props: {
        items: { type: Array, required: true },
        upbjjList: { type: Array, default: () => [] },
        kategoriList: { type: Array, default: () => [] }
    },
    emits: ['create-stock', 'update-stock', 'delete-stock'],
    data() {
        return {
            filters: {
                search: '',
                upbjj: '',
                kategori: '',
                warningOnly: false,
                sortBy: 'judul'
            },
            isAddModalOpen: false,
            formAdd: {
                kode: '', judul: '', upbjj: '', kategori: '',
                qty: 0, safety: 10, lokasiRak: '', harga: 0, catatanHTML: ''
            },
            addErrors: {},
            isEditModalOpen: false,
            formEdit: {
                kode: '', judul: '', qty: 0, safety: 0, lokasiRak: '', harga: 0, catatanHTML: ''
            },
            editErrors: {}
        };
    },
    computed: {
        filteredStock() {
            let result = [...this.items];

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
                result = result.filter(item => item.qty < item.safety || item.qty === 0);
            }

            result.sort((a, b) => {
                if (this.filters.sortBy === 'judul') {
                    return a.judul.localeCompare(b.judul);
                } else if (this.filters.sortBy === 'qty') {
                    return a.qty - b.qty;
                } else if (this.filters.sortBy === 'harga') {
                    return a.harga - b.harga;
                }
                return 0;
            });

            return result;
        }
    },
    watch: {
        'filters.upbjj'(newVal) {
            if (newVal === '') {
                this.filters.kategori = '';
            }
        }
    },
    methods: {
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
            this.addErrors = {};
            this.formAdd = {
                kode: '', judul: '', upbjj: '', kategori: '',
                qty: 0, safety: 10, lokasiRak: '', harga: 0, catatanHTML: ''
            };
            this.isAddModalOpen = true;
        },
        closeAddModal() {
            this.isAddModalOpen = false;
        },
        validateAdd() {
            const errs = {};
            if (!this.formAdd.kode) {
                errs.kode = 'Kode wajib diisi.';
            } else if (this.items.some(i => i.kode.toUpperCase() === this.formAdd.kode.toUpperCase())) {
                errs.kode = 'Kode sudah terdaftar.';
            }
            if (!this.formAdd.judul) errs.judul = 'Judul wajib diisi.';
            if (!this.formAdd.upbjj) errs.upbjj = 'Pilih UPBJJ.';
            if (!this.formAdd.kategori) errs.kategori = 'Pilih kategori.';
            if (this.formAdd.qty === '' || this.formAdd.qty < 0) errs.qty = 'Stok minimal 0.';
            if (this.formAdd.safety === '' || this.formAdd.safety < 1) errs.safety = 'Safety minimal 1.';
            if (!this.formAdd.lokasiRak) errs.lokasiRak = 'Lokasi rak wajib diisi.';
            if (this.formAdd.harga === '' || this.formAdd.harga <= 0) errs.harga = 'Harga harus > 0.';

            this.addErrors = errs;
            return Object.keys(errs).length === 0;
        },
        submitAddStock() {
            if (!this.validateAdd()) return;

            this.$emit('create-stock', {
                kode: this.formAdd.kode.toUpperCase(),
                judul: this.formAdd.judul,
                upbjj: this.formAdd.upbjj,
                kategori: this.formAdd.kategori,
                qty: parseInt(this.formAdd.qty, 10),
                safety: parseInt(this.formAdd.safety, 10),
                lokasiRak: this.formAdd.lokasiRak.toUpperCase(),
                harga: parseInt(this.formAdd.harga, 10),
                catatanHTML: this.formAdd.catatanHTML || '-'
            });
            this.closeAddModal();
        },
        openEditModal(item) {
            this.editErrors = {};
            this.formEdit = { ...item };
            this.isEditModalOpen = true;
        },
        closeEditModal() {
            this.isEditModalOpen = false;
        },
        validateEdit() {
            const errs = {};
            if (this.formEdit.qty === '' || this.formEdit.qty < 0) errs.qty = 'Stok minimal 0.';
            if (this.formEdit.safety === '' || this.formEdit.safety < 1) errs.safety = 'Safety minimal 1.';
            if (!this.formEdit.lokasiRak) errs.lokasiRak = 'Lokasi rak wajib diisi.';
            if (this.formEdit.harga === '' || this.formEdit.harga <= 0) errs.harga = 'Harga harus > 0.';

            this.editErrors = errs;
            return Object.keys(errs).length === 0;
        },
        submitEditStock() {
            if (!this.validateEdit()) return;

            this.$emit('update-stock', {
                ...this.formEdit,
                qty: parseInt(this.formEdit.qty, 10),
                safety: parseInt(this.formEdit.safety, 10),
                lokasiRak: this.formEdit.lokasiRak.toUpperCase(),
                harga: parseInt(this.formEdit.harga, 10)
            });
            this.closeEditModal();
        },
        requestDelete(item) {
            this.$emit('delete-stock', item);
        }
    },
    created() {
        console.log('[StockTable] Component created');
        console.log('[StockTable] filters:', this.filters);
        console.log('[StockTable] data:', this.$data);
    },
});