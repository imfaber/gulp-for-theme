const gulp  = require('gulp'),
      path  = require('path');

/**
 * Copy fonts to public directory.
 */
const fontTask = function () {
  return gulp.src(path.resolve(PATH_CONFIG.theme, TASK_CONFIG.font.src, '**/*'))
    .pipe(gulp.dest(path.resolve(PATH_CONFIG.public, TASK_CONFIG.font.dest)));
};

gulp.task('font', fontTask);
module.exports = fontTask;
