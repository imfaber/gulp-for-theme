const gulp       = require('gulp'),
      taskHelper = require('../lib/taskHelper.js'),
      watch      = require('gulp-watch'),
      path       = require('path');

/**
 * Watch task.
 */
const watchTask = function () {

  ['image', 'sass', 'javascript', 'font'].forEach((task) => {
    if (taskHelper.isTaskEnabled(task)) {
      watch(
        path.resolve(PATH_CONFIG.theme, TASK_CONFIG[task].src) + '/**/*',
        {
          readDelay: 100
        },
        () => {
          gulp.start(task);
        }
      );

      // gulp.watch(path.resolve(PATH_CONFIG.theme, TASK_CONFIG[task].src) + '/**/*', {interval: 1}, [task]);
    }
  });

};

gulp.task('watch', watchTask);
module.exports = watchTask;
