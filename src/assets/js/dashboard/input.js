$.fn.input2 = function() {
    if (this.next('label').length) {
        this.attr('placeholder', ' ');
        return this;
    }

    const placeholder = this.attr('placeholder');
    const id = this.attr('id');

    if (placeholder) {
        this.after($('<label>', {
            html: placeholder,
            for: id,
        }));
        this.attr('placeholder', ' ');
    } else {
        this.addClass('--no-label');
    }
    return this;
};
