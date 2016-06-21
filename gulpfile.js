var gulp = require('gulp'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject("tsconfig.json"),
    runSequence = require('run-sequence');


gulp.task('default', function (callback) {
  runSequence(
      ['cleanDist','transpile'],
      ['copyApp', 'connectDist'],
      callback
  );
});

gulp.task('cleanDist', function () {
  return gulp.src('.dist', {read: false})
      .pipe(clean());
});

gulp.task('transpile', function () {
  return tsProject.src()
      .pipe(ts(tsProject))
      .js.pipe(gulp.dest('.dist/webapp/app'));
});

gulp.task('connectDist', function () {
  return connect.server({
    root: ['node_modules', '.dist/webapp'],
    port: 9000
  });
});

gulp.task('copyApp', function () {
  return gulp.src([
        './src/main/webapp/**',
        '!./src/main/webapp/**/*.ts'
      ], {base: './src/main/webapp'})
      .pipe(gulp.dest('.dist/webapp'));
});

gulp.task('copyScripts', function () {
  return gulp.src([
        './src/main/webapp/**'
      ], {base: './src/main/webapp'})
      .pipe(gulp.dest('.dist/webapp'));
});

