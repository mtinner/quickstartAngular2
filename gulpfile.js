var gulp = require('gulp'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence');


gulp.task('default', function (callback) {
  runSequence('cleanDist',
      ['copyApp', 'connectDist'],
      callback
  );
});

gulp.task('cleanDist', function () {
  return gulp.src('.dist', {read: false})
      .pipe(clean());
});

gulp.task('connectDist', function () {
  return connect.server({
    root: ['node_modules', '.dist/webapp'],
    port: 9000
  });
});

gulp.task('copyApp', function () {
  return gulp.src([
        './src/main/webapp/**'
      ], {base: './src/main/webapp'})
      .pipe(gulp.dest('.dist/webapp'));
});

