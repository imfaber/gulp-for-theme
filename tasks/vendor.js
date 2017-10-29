if (!TASK_CONFIG.vendor || !TASK_CONFIG.vendor.enable) return;

const gulp  = require('gulp'),
      shell = require('gulp-shell'),
      path  = require('path');

const vendorTask = function () {

  const vendorPath  = path.resolve(PATH_CONFIG.public, TASK_CONFIG.vendor.dest),
        nodeModules = TASK_CONFIG.vendor.nodeModules,
        commands    = [];

  TASK_CONFIG.vendor.nodeModules.forEach((item) => {
    let source = path.resolve(PATH_CONFIG.nodeModules, item),
        destination = path.resolve(vendorPath, item);
    commands.push(`ln -s ${source} ${destination}`);
  });

  return gulp.src('*.js', {read: false})
    .pipe(shell([
      `rm -rf ${vendorPath}`,
      `mkdir ${vendorPath}`
    ].concat(commands)));
};

gulp.task('vendor', vendorTask);
module.exports = vendorTask;
