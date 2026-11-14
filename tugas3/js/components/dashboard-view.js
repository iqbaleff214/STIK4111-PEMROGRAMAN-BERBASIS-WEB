app.component('dashboard-view', {
    template: '#tpl-dashboard',
    props: {
        stok: { type: Array, required: true },
        tracking: { type: Object, required: true }
    },
    emits: ['navigate', 'quick-search'],
    data() {
        return {
            quickDoQuery: ''
        };
    },
    computed: {
        greetingText() {
            const currentHour = new Date().getHours();
            if (currentHour < 12) return 'Selamat Pagi!';
            if (currentHour < 18) return 'Selamat Siang!';
            return 'Selamat Malam!';
        },
        totalStok() {
            return this.stok.reduce((total, item) => total + item.qty, 0);
        }
    },
    methods: {
        submitQuickSearch() {
            if (!this.quickDoQuery) return;
            this.$emit('quick-search', this.quickDoQuery);
            this.quickDoQuery = '';
        }
    }
});