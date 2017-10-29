const gulp         = require('gulp'),
      taskHelper   = require('../lib/taskHelper.js'),
      gulpSequence = require('gulp-sequence');

/**
 * Build task.
 */
const buildTask = function () {

  const defaultTasks = [],
        tasks        = ['vendor', 'image', 'sass', 'javascript'];

  tasks.forEach((task) => {
    if (taskHelper.isTaskEnabled(task)) {
      defaultTasks.push(task);
    }
  });

  gulpSequence('clean', defaultTasks)((err) => {
    if (err) console.log(err)
  });
};

gulp.task('default', buildTask);
module.exports = buildTask;
