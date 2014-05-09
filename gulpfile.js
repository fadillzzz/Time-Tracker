var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    cssMin = require('gulp-minify-css'),
    bowerPath = 'bower_components',
    app = require('./config.json'),
    paths = {
        js: {
            src: [
                bowerPath + '/jquery/dist/jquery.js',
                bowerPath + '/angular/angular.js',
                bowerPath + '/angular-route/angular-route.js',
                bowerPath + '/modernizr/modernizr.js',
                bowerPath + '/angular-foundation/mm-foundation-tpls.js',
                app.src.js + '/wrapper/start.js',
                app.src.js + '/*.js',
                app.src.js + '/wrapper/end.js'
            ],
            dst: app.path.main + '/' + app.path.js,
            fileName: 'script.js',
        },
        css: {
            src: [
                bowerPath + '/foundation/css/normalize.css',
                bowerPath + '/foundation/css/foundation.css',
                bowerPath + '/font-awesome/css/font-awesome.css',
                app.src.css + '/*.css',
            ],
            dst: app.path.main + '/' + app.path.css,
            fileName: 'style.css',
        },
        fonts: {
            src: [
                bowerPath + '/font-awesome/fonts/*',
            ],
            dst: app.path.main + '/' + app.path.fonts,
        }
    };

gulp.task('js', function () {
    return gulp.src(paths.js.src)
               .pipe(concat(paths.js.fileName))
               .pipe(uglify())
               .pipe(gulp.dest(paths.js.dst));
});

gulp.task('lint', function () {
    return gulp.src(paths.js.src.slice(-3))
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
});

gulp.task('css', function () {
    return gulp.src(paths.css.src)
               .pipe(concat(paths.css.fileName))
               .pipe(cssMin())
               .pipe(gulp.dest(paths.css.dst));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts.src)
               .pipe(gulp.dest(paths.fonts.dst));
});

gulp.task('watch', ['js', 'css', 'fonts'], function () {
    gulp.watch(app.src.js + '/*', ['js']);
    gulp.watch(app.src.css + '/*', ['css']);
});

gulp.task('serve', ['watch'], function () {
    connect.createServer(
        connect.static(app.path.main)
    ).listen(app.port);
});

gulp.task('default', ['js', 'css', 'fonts']);

// Used by karma
exports.js = paths.js.src;
exports.js = exports.js.slice(0, exports.js.length - 1);
exports.js[exports.js.length - 2] = exports.js[exports.js.length - 1];
exports.js = exports.js.slice(0, exports.js.length - 1);