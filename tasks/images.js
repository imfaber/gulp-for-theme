'use strict';
var gulp         = require('gulp'),
    print        = require('gulp-print'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    importer     = require('gulp-sass-glob'),
    notify       = require("gulp-notify"),
    plumber      = require('gulp-plumber'),
    browserSync  = require('browser-sync').create(),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    inject       = require('gulp-inject-string'),
    rename       = require('gulp-rename'),
    jshint       = require('gulp-jshint'),
    cleanCSS     = require('gulp-clean-css'),
    babel        = require('gulp-babel'),
    shell        = require('gulp-shell'),
    concat       = require('gulp-concat');

// // Paths
// var paths = {
//   current:      __dirname,
//   build:        __dirname + '/build',
//   node_modules: '../../../../../node_modules'
//
// };

// Browser Sync
// gulp.task('browser-sync', function () {
//   return browserSync({
//     open:         false,
//     server:       {
//       baseDir: "./build"
//     },
//     watchOptions: {
//       debounceDelay: 1000
//     }
//   });
// });

// Images task
gulp.task('images', function () {
  return gulp.src(paths.current + '/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use:         [pngquant()]
    }))
    .pipe(gulp.dest(paths.current + '/images'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
  return gulp.src(paths.current + '/js/**.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('su-scripts.js'))
    .pipe(inject.prepend('(function ($, DrupalModernizr, Drupal, drupalSettings) {\nDrupal.su = Drupal.su || {};\n'))
    .pipe(inject.append('})(jQuery, Modernizr, Drupal, drupalSettings);'))
    .pipe(gulp.dest(paths.build + '/js'))
    .pipe(rename('su-scripts.min.js'))
    .pipe(uglify().on('error', onError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build + '/js'));
});

// Sass task
gulp.task('sass', function () {
  return gulp.src(paths.current + '/scss/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(importer())
    .pipe(print())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build + '/css'));
});

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch(paths.current + '/js/**/*.js', {interval: 1}, ['scripts']);
  gulp.watch(paths.current + '/scss/**/*.scss', {interval: 1}, ['sass']);
});

// Setup theme
gulp.task('setup', function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      'cd ' + paths.current,
      'rm -rf vendor',
      'mkdir vendor',
      'ln -s ' + paths.node_modules + '/bootstrap-sass vendor/bootstrap'
    ]))
});

// Default Task
gulp.task('default', ['images', 'sass', 'scripts', 'watch']);
gulp.task('build', ['sass', 'scripts']);
gulp.task('init', ['setup', 'build']);

/**
 * On error log error
 * @param err
 */
function onError(err) {
  console.log(err);
  this.emit('end');
}