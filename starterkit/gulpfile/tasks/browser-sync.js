if (!TASK_CONFIG.browserSync || !TASK_CONFIG.browserSync.enable) return;

const browserSync  = require('browser-sync'),
      gulp         = require('gulp');

/**
 * BrowserSync task.
 */
const browserSyncTask = function () {
  browserSync.init(TASK_CONFIG.browserSync.config);
};

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;
