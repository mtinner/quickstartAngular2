var gulp = require('gulp'),
    connect = require('gulp-connect');


gulp.task('default', ['connectDist']);


gulp.task('connectDist', function () {
  return connect.server({
    root: '',
    port: 9000
  });
});

