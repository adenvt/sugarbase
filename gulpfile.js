const gulp = require('gulp');
const gutil = require('gulp-util');
const nunjucks = require('gulp-nunjucks');
const prettify = require('gulp-jsbeautifier');

const webpack = require('webpack');
const webpackCfg = require('./webpack.config.js');

gulp.task('html', () => {
    gulp.src(['src/html/**/*.html', '!**/_*/**'])
        .pipe(nunjucks.compile({}, {
            tags: {
                blockStart: '<?php',
                blockEnd: '?>',
                variableStart: '{{',
                variableEnd: '}}',
                commentStart: '<#',
                commentEnd: '#>'
            }
        }))
        .pipe(prettify())
        .pipe(gulp.dest('docs/'))
});

gulp.task('watch', ['html'], () => {
    gulp.watch(['src/html/**/*.html'], ['html'])
})

gulp.task('asset', (callback) => {
    webpack(webpackCfg, (err, stat) => {
        if (err) throw new gutil.PluginError('webpack', err);

        gutil.log('[webpack]\n', stat.toString({
            hash: false,
            version: false,
            timings: false,
            colors: true,
            chunks: false,
            children: false,
            modules: false
        }));

        callback();
    });
});

gulp.task('lint', function() {
    return gulp.src(['src/**/*'])
        .pipe(prettify.validate())
        .pipe(prettify.reporter())
});

gulp.task('fix', function() {
    return gulp.src(['src/**/*'], {
            base: './'
        })
        .pipe(prettify())
        .pipe(gulp.dest('./'))
});

gulp.task('default', ['html', 'asset'])

