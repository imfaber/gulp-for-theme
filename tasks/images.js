if (!TASK_CONFIG.images || !TASK_CONFIG.images.enable) return;

const browserSync = require('browser-sync'),
      imagemin    = require('gulp-imagemin'),
      gulp        = require('gulp'),
      path        = require('path');

const imagesTask = function () {

  let srcPath = path.resolve(PATH_CONFIG.theme, TASK_CONFIG.images.src);

  return gulp.src(path.resolve(srcPath, '**/*'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: true}
        ]
      })
    ]))
    .pipe(gulp.dest(srcPath));
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
