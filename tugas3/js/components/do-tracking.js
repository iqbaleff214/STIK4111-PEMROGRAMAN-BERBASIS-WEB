app.component('do-tracking', {
    template: '#tpl-tracking',
    props: {
        data: { type: Object, required: true },
        paketList: { type: Array, default: () => [] }
    },
    emits: ['add-progress', 'open-order'],
    data() {
        return {
            searchQuery: '',
            lastSearchedQuery: '',
            selectedDONumber: null,
            hasSearched: false,
            newProgressText: ''
        };
    },
    computed: {
        searchResult() {
            if (!this.selectedDONumber || !this.data[this.selectedDONumber]) {
                return null;
            }
            return {
                ...this.data[this.selectedDONumber],
                nomorDO: this.selectedDONumber
            };
        }
    },
    watch: {
        searchQuery(newVal) {
            if (newVal.trim() === '') {
                this.selectedDONumber = null;
                this.hasSearched = false;
                this.lastSearchedQuery = '';
            }
        }
    },
    methods: {
        searchDO() {
            const query = this.searchQuery.trim().toUpperCase();
            if (!query) {
                this.resetSearch();
                return;
            }

            this.hasSearched = true;
            this.lastSearchedQuery = this.searchQuery.trim();

            if (this.data[query]) {
                this.selectedDONumber = query;
                return;
            }

            const matchedKey = Object.keys(this.data).find(
                key => this.data[key].nim.toUpperCase() === query
            );

            this.selectedDONumber = matchedKey || null;
        },
        viewDO(doNumber) {
            this.searchQuery = doNumber;
            this.searchDO();
        },
        resetSearch() {
            this.searchQuery = '';
            this.lastSearchedQuery = '';
            this.selectedDONumber = null;
            this.hasSearched = false;
            this.newProgressText = '';
        },
        getNamaPaket(kodePaket) {
            const pk = this.paketList.find(p => p.kode === kodePaket);
            return pk ? `${pk.kode} - ${pk.nama}` : kodePaket;
        },
        submitProgress() {
            if (!this.searchResult || !this.newProgressText) return;

            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const waktu = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

            this.$emit('add-progress', {
                doNumber: this.searchResult.nomorDO,
                log: { waktu, keterangan: this.newProgressText }
            });

            this.newProgressText = '';
        }
    }
});