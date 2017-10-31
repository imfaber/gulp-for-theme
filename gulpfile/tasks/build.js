const gulp         = require('gulp'),
      taskHelper   = require('../lib/taskHelper.js'),
      gulpSequence = require('gulp-sequence');

/**
 * Build task.
 */
const buildTask = function () {

  const preBuildTasks = [],
        defaultTasks  = [];

  // First check pre build tasks such as vendor.
  if (taskHelper.isTaskEnabled('vendor')) {
    preBuildTasks.push('vendor');
  }

  // Then the default tasks
  ['image', 'sass', 'javascript'].forEach((task) => {
    if (taskHelper.isTaskEnabled(task)) {
      defaultTasks.push(task);
    }
  });

  gulpSequence('clean', preBuildTasks)((err) => {
    if (err) console.log(err);
    else {
      gulpSequence(defaultTasks)((err) => {
        if (err) console.log(err)
      });
    }
  });
};

gulp.task('build', buildTask);
module.exports = buildTask;
