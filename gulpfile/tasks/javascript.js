if (!TASK_CONFIG.javascript || !TASK_CONFIG.javascript.enable) return;

const browserSync = require('browser-sync'),
      gulp        = require('gulp'),
      sourcemaps  = require('gulp-sourcemaps'),
      plumber     = require('gulp-plumber'),
      uglify      = require('gulp-uglify'),
      inject      = require('gulp-inject-string'),
      rename      = require('gulp-rename'),
      jshint      = require('gulp-jshint'),
      babel       = require('gulp-babel'),
      concat      = require('gulp-concat'),
      path        = require('path');

/**
 * Javascript task.
 *
 * Validate, compile, create sourcemaps, uglify etc..
 */
const javascriptTask = function () {
  const src          = path.resolve(PATH_CONFIG.theme, TASK_CONFIG.javascript.src),
        dest         = path.resolve(PATH_CONFIG.public, TASK_CONFIG.javascript.dest),
        bundleOutput = TASK_CONFIG.javascript.bundle.output.replace('.js', '');

  return gulp.src(path.resolve(src, TASK_CONFIG.javascript.bundle.files))
    .pipe(plumber())
    .pipe(jshint({
      'esversion': 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat(bundleOutput + '.js'))
    .pipe(inject.prepend(TASK_CONFIG.javascript.bundle.prepend))
    .pipe(inject.append(TASK_CONFIG.javascript.bundle.append))
    .pipe(gulp.dest(dest))
    .pipe(rename(bundleOutput + '.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))
    .on('error', (err) => {
      console.error('Error in javascript task', err.toString());
    })
    .pipe(browserSync.stream());
};

gulp.task('javascript', javascriptTask);
module.exports = javascriptTask;
