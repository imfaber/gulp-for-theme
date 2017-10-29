if (!TASK_CONFIG.browserSync || !TASK_CONFIG.browserSync.enable) return;

const browserSync  = require('browser-sync'),
      gulp         = require('gulp');

const browserSyncTask = function () {
  browserSync(TASK_CONFIG.browserSync.config);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
