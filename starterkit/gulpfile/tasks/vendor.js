if (!TASK_CONFIG.vendor || !TASK_CONFIG.vendor.enable) return;

const gulp  = require('gulp'),
      shell = require('gulp-shell'),
      path  = require('path');

/**
 * The vendor task makes node_modules available to your public directory.
 * Useful if you need, for instance, to reference Javascript or CSS files
 * in your templates.
 */
const vendorTask = function () {

  const vendorPath = path.resolve(PATH_CONFIG.public, TASK_CONFIG.vendor.dest),
        commands   = [];

  TASK_CONFIG.vendor.nodeModules.forEach((item) => {
    let source      = path.resolve(PATH_CONFIG.nodeModules, item),
        destination = path.resolve(vendorPath, item);
    commands.push(`ln -s ${source} ${destination}`);
  });

  return gulp.src('*.js', {read: false})
    .pipe(shell([
      `'rm' -rf ${vendorPath}`,
      `mkdir ${vendorPath}`
    ].concat(commands)));
};

gulp.task('vendor', vendorTask);
module.exports = vendorTask;
