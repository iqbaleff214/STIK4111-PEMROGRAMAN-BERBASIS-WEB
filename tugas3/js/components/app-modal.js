app.component('app-modal', {
    template: '#tpl-modal',
    data() {
        return {
            isOpen: false,
            mode: 'alert',
            type: 'primary',
            title: '',
            message: '',
            confirmText: 'OK',
            cancelText: 'Batal',
            onConfirmCallback: null
        };
    },
    methods: {
        alert(options) {
            this.mode = 'alert';
            this.type = options.type || 'primary';
            this.title = options.title || 'Informasi';
            this.message = options.message || '';
            this.confirmText = options.confirmText || 'OK';
            this.onConfirmCallback = options.onConfirm || null;
            this.isOpen = true;
        },
        confirm(options) {
            this.mode = 'confirm';
            this.type = options.type || 'danger';
            this.title = options.title || 'Konfirmasi';
            this.message = options.message || '';
            this.confirmText = options.confirmText || 'Ya';
            this.cancelText = options.cancelText || 'Batal';
            this.onConfirmCallback = options.onConfirm || null;
            this.isOpen = true;
        },
        handleConfirm() {
            this.isOpen = false;
            if (typeof this.onConfirmCallback === 'function') {
                this.onConfirmCallback();
            }
        },
        handleCancel() {
            this.isOpen = false;
        }
    }
});