if (!TASK_CONFIG.sass || !TASK_CONFIG.sass.enable) return;

const browserSync  = require('browser-sync'),
      print        = require('gulp-print'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      importer     = require('gulp-sass-glob'),
      plumber      = require('gulp-plumber'),
      cleanCSS     = require('gulp-clean-css'),
      gulp         = require('gulp'),
      path         = require('path');

/**
 * Sass task.
 *
 * Compile sass, create sourcemaps, clean css etc..
 */
const sassTask = function () {
  return gulp.src(path.resolve(PATH_CONFIG.theme, TASK_CONFIG.sass.src) + '/*.scss')
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
    .pipe(gulp.dest(path.resolve(PATH_CONFIG.public, TASK_CONFIG.sass.dest)))
    .pipe(browserSync.stream());
};

gulp.task('sass', sassTask);
module.exports = sassTask;
