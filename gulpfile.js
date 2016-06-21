var gulp = require('gulp'),
    connect = require('gulp-connect');


gulp.task('default', ['copyApp','connectDist']);


gulp.task('connectDist', function () {
  return connect.server({
    root: ['node_modules','.dist/webapp'],
    port: 9000
  });
});

gulp.task('copyApp', function () {
  return gulp.src([
        './src/main/webapp/**'
      ],{base: './src/main/webapp'})
      .pipe(gulp.dest('.dist/webapp'));
});

