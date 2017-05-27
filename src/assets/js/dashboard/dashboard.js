window.currencyOriOnInput = function() {
    const num = parseInt($(this).val(), 10) || 0;
    const input = $(this).next('.__fake');
    const state = this.checkValidity() ? 'valid' : 'invalid';

    input.attr('state', state);
    input.val(num.toLocaleString('id'));
};

window.currencyFakeOnInput = function() {
    const num = parseInt($(this).val().replace(/\./g, ''), 10) || '';
    const input = $(this).prev('.__ori');

    input.val(num).trigger('input');
    $(this).val(num.toLocaleString('id'));
};

$(() => {
    $('#side-menu').metisMenu();
    $('select.select').select2({
        width: '100%',
        theme: 'bootstrap',
    });
    $('.dataTable_wrapper select').select2({
        theme: 'bootstrap',
    });

    _.extend($.fn.dataTable.defaults, {
        searchDelay: 1000,
        responsive: true,
    });

    $('.datatable').DataTable();

    $('.modal.autofocus').on('shown.bs.modal', function() {
        $(this).find(':input:first').focus();
    });

    $('input.date')
        .attr('pattern', '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])')
        .flatpickr({
            onReady() {
                $('input.date').removeAttr('readonly');
                $('.flatpickr-mobile').attr('placeholder', ' ');
            },
        });

    $('.e2tab').keydown((e) => {
        const self = $(':focus');
        const form = self.parents('form:eq(0)');

        const focusable = form.find('input,a,select,button,textarea,div[contenteditable=true],.select2-selection').filter(':visible:not([tabindex="-1"])');

        function enterKey() {
            if (e.which === 13 && !self.is('textarea,div[contenteditable=true]')) {
                if ($.inArray(self, focusable) && (!self.is('a,button'))) {
                    e.preventDefault();
                }
                focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus().select();
            }
        }

        if (e.shiftKey) {
            enterKey();
        } else {
            enterKey();
        }
    });
});
// Loads the correct sidebar on window load,
// collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(() => {
    $(window).bind('load resize', function() {
        let topOffset = 50;
        const width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }
        let height = ((this.window.innerHeight > 0) ?
            this.window.innerHeight : this.screen.height) - 1;
        height -= topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $('#page-wrapper').css('min-height', `${height}px`);
        }
    });
    const url = window.location;
    const element = $('ul.nav a').filter(function() {
        return this.href === url;
    });

    element.addClass('active')
        .parent()
        .parent()
        .addClass('in')
        .parent();

    if (element.is('li')) {
        element.addClass('active');
    }
});
// Input.Form Controll
//
$(() => {
    // Fix Check Label in Input Group
    $('.input-group').each(function() {
        const addOn = $(this).find('.input-group-addon, .input-group-btn');
        const addOnWidth = $(window).width() < 768 ? 20 : 10;
        const width = 100 - (addOn.length * addOnWidth);
        $(this).find('.form-control+label').css('width', `${width}%`);
    });
    // End

    // Input type 'number'
    $('.form-group .form-control[type="number"]:not(:has(~.btn-spinner))')
        .parent()
        .append([
            $('<button>', {
                class: 'btn-spinner btn-up',
                tabindex: -1,
            }), // tabIndex -1 to make unfocusable
            $('<button>', {
                class: 'btn-spinner btn-down',
                tabindex: -1,
            }),
        ]);

    $('.btn-up').click(function(e) {
        e.preventDefault();

        const input = $(this).parent().find('.form-control[type="number"]');

        input[0].stepUp();
        input.trigger('input');
    });

    $('.btn-down').click(function(e) {
        e.preventDefault();

        const input = $(this).parent().find('.form-control[type="number"]');

        input[0].stepDown();
        input.trigger('input');
    });

    $('.form-control[type="number"]').on('input', function() {
        const val = $(this).val() || 0;
        const max = parseInt($(this).attr('max'), 10);
        const min = parseInt($(this).attr('min'), 10);

        $(this).parent().find('.btn-up').attr('disabled', (val >= max));
        $(this).parent().find('.btn-down').attr('disabled', (val <= min));
    });

    $('.form-control[type="number"]:has(~.btn-spinner)').trigger('input');
    // End

    // Input Number Currency
    $('.currency.form-control[type="number"]').each(function() {
        const fakeInput = $(this).clone();
        let event = $(this).attr('oninput');
        event = event ? `${event};` : '';

        fakeInput.addClass('__fake');
        fakeInput.attr('type', 'tel'); /* force android keyboard to numberic input */
        fakeInput.attr('placeholder', ' ');
        fakeInput.attr('oninput', 'currencyFakeOnInput.call(this, event)');
        fakeInput.removeAttr('name');

        $(this).addClass('__ori');
        $(this).attr('tabindex', -1);
        $(this).attr('oninput', `${event}currencyOriOnInput.call(this, event)`);
        $(this).after(fakeInput);
    });
});
