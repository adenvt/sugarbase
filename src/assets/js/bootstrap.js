try {
    window.$ = window.jQuery = require('jquery');
    window._ = require('lodash');
    window.Vue = require('vue');
    window.dialog = require('bootstrap3-dialog');
    window.shortcut = require('mousetrap');
    window.Chart = require('chart.js');
    window.ajax = require('axios');

    window.ajax.defaults.headers.common = {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        'X-Requested-With': 'XMLHttpRequest',
    };
} catch (e) {}
