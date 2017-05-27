/* globals dialog */
window.confirmDelete = function(callback) {
    dialog.confirm({
        title: 'Peringatan !',
        message: 'Lanjutkan Proses Hapus ?',
        type: dialog.TYPE_DANGER,
        size: dialog.SIZE_SMALL,
        btnCancelLabel: 'Batal',
        btnOKLabel: 'Hapus',
        callback,
    });
};
