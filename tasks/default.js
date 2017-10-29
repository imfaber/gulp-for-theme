const gulp         = require('gulp'),
      taskHelper   = require('../lib/taskHelper.js'),
      gulpSequence = require('gulp-sequence'),
      path         = require('path');

const defaultTask = function () {

  const defaultTasks = [],
        tasks        = ['browserSync', 'vendor', 'image', 'sass'];

  tasks.forEach((task) => {
    if (taskHelper.isTaskEnabled(task)) {
      defaultTasks.push(task);
    }
  });


  // requireDir('./', { recurse: true });
  gulpSequence('clean', defaultTasks, 'watch')(function (err) {
    if (err) console.log(err)
  });
};

gulp.task('default', defaultTask);
module.exports = defaultTask;
