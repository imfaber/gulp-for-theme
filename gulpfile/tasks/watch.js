const gulp         = require('gulp'),
      taskHelper   = require('../lib/taskHelper.js'),
      path         = require('path');

/**
 * Watch task.
 */
const watchTask = function () {

  if (taskHelper.isTaskEnabled('image')) {
    gulp.watch(path.resolve(PATH_CONFIG.theme, TASK_CONFIG.image.src) + '/**/*', {interval: 1}, ['image']);
  }

  if (taskHelper.isTaskEnabled('sass')) {
    gulp.watch(path.resolve(PATH_CONFIG.theme, TASK_CONFIG.sass.src) + '/**/*.scss', {interval: 1}, ['sass']);
  }

  if (taskHelper.isTaskEnabled('javascript')) {
    gulp.watch(path.resolve(PATH_CONFIG.theme, TASK_CONFIG.javascript.src) + '/**/*.js', {interval: 1}, ['javascript']);
  }

};

gulp.task('watch', watchTask);
module.exports = watchTask;
