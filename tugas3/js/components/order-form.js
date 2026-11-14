app.component('order-form', {
    template: '#tpl-order',
    props: {
        isOpen: { type: Boolean, default: false },
        paket: { type: Array, required: true },
        ekspedisi: { type: Array, required: true },
        stok: { type: Array, default: () => [] },
        tracking: { type: Object, default: () => ({}) }
    },
    emits: ['created', 'close'],
    data() {
        const today = new Date().toISOString().split('T')[0];
        return {
            form: {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: today,
                total: 0
            },
            errors: {}
        };
    },
    computed: {
        generatedDONumber() {
            const year = new Date().getFullYear();
            const prefix = `DO${year}-`;
            const existingKeys = Object.keys(this.tracking).filter(k => k.startsWith(prefix));
            let maxSeq = 0;

            existingKeys.forEach(key => {
                const seq = parseInt(key.split('-')[1], 10);
                if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
            });

            const nextSeq = String(maxSeq + 1).padStart(4, '0');
            return `${prefix}${nextSeq}`;
        },
        selectedPaketData() {
            if (!this.form.paket) return null;
            return this.paket.find(p => p.kode === this.form.paket) || null;
        }
    },
    watch: {
        'form.paket'(newKode) {
            const pk = this.paket.find(p => p.kode === newKode);
            this.form.total = pk ? pk.harga : 0;
            if (pk && this.errors.paket) {
                delete this.errors.paket;
            }
        }
    },
    methods: {
        getJudulBuku(kodeMatkul) {
            const book = this.stok.find(s => s.kode === kodeMatkul);
            return book ? book.judul : 'Judul Tidak Diketahui';
        },
        validateForm() {
            const errs = {};
            if (!this.form.nim) {
                errs.nim = 'NIM wajib diisi.';
            } else if (!/^\d{6,12}$/.test(this.form.nim)) {
                errs.nim = 'NIM harus berupa angka (6-12 digit).';
            }
            if (!this.form.nama) errs.nama = 'Nama lengkap wajib diisi.';
            if (!this.form.ekspedisi) errs.ekspedisi = 'Pilih ekspedisi.';
            if (!this.form.paket) errs.paket = 'Pilih paket bahan ajar.';
            if (!this.form.tanggalKirim) errs.tanggalKirim = 'Tanggal kirim wajib diisi.';

            this.errors = errs;
            return Object.keys(errs).length === 0;
        },
        submitForm() {
            if (!this.validateForm()) return;

            const newDoNumber = this.generatedDONumber;
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const waktu = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

            this.$emit('created', {
                doNumber: newDoNumber,
                detail: {
                    nim: this.form.nim,
                    nama: this.form.nama,
                    status: 'Diproses',
                    ekspedisi: this.form.ekspedisi,
                    tanggalKirim: this.form.tanggalKirim,
                    paket: this.form.paket,
                    total: this.form.total,
                    perjalanan: [
                        {
                            waktu,
                            keterangan: 'Data DO telah dibuat dan masuk antrean packing.'
                        }
                    ]
                }
            });

            const today = new Date().toISOString().split('T')[0];
            this.form = {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: today,
                total: 0
            };
            this.errors = {};
        }
    }
});