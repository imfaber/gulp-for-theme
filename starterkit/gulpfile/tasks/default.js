const gulp         = require('gulp'),
      taskHelper   = require('../lib/taskHelper.js'),
      gulpSequence = require('gulp-sequence');

/**
 * Default task.
 */
const defaultTask = function () {

  const preBuildTasks = [],
        defaultTasks  = [];

  // Make an array of default tasks.
  ['browserSync', 'image', 'font', 'sass', 'javascript'].forEach((task) => {
    if (taskHelper.isTaskEnabled(task)) {
      defaultTasks.push(task);
    }
  });

  // If needs some pre build tasks such as vendor run them right after clean.
  if (taskHelper.isTaskEnabled('vendor')) {
    preBuildTasks.push('vendor');
    gulpSequence('clean', preBuildTasks)((err) => {
      if (err) console.log(err);
      else {
        gulpSequence(defaultTasks, 'watch')((err) => {
          if (err) console.log(err)
        });
      }
    });
  }
  else {
    gulpSequence('clean', defaultTasks, 'watch')((err) => {
      if (err) console.log(err)
    });
  }
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
