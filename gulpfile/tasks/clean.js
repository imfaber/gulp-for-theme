const gulp  = require('gulp'),
      shell = require('gulp-shell'),
      path  = require('path');

/**
 * Remove public directory.
 */
const cleanTask = function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      `'rm' -rf ${PATH_CONFIG.public}`,
      `mkdir ${PATH_CONFIG.public}`
    ]));
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
