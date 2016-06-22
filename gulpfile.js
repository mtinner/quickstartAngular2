var gulp = require('gulp'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject("tsconfig.json"),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('default', function (callback) {
  runSequence(
      'cleanDist',
      'transpiling',
      ['copyApp', 'copyScripts', 'copyNodeModules'],
      'connectDist',
      callback
  );
});

gulp.task('cleanDist', function () {
  return gulp.src('.dist', {read: false})
      .pipe(clean());
});

gulp.task('transpiling', function () {
  var tsResult= tsProject.src()
      .pipe(sourcemaps.init())
      .pipe(ts(tsProject));

  return tsResult.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('.dist/webapp/app'));
});

gulp.task('connectDist', function () {
  return connect.server({
    root: ['.dist/webapp'],
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
        'node_modules/core-js/client/shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/zone.js/dist/zone.js'
      ])
      .pipe(gulp.dest('.dist/webapp/app/scripts/vendor'));
});

gulp.task('copyNodeModules', function () {
  return gulp.src([
        'node_modules/@angular/*/bundles/*.js',
        'node_modules/rxjs/**'
      ], {base: './node_modules/*'})
      .pipe(gulp.dest('.dist/webapp/app/scripts/vendor/*'));
});

