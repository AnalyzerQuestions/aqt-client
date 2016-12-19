var gulp = require('gulp');
var jshint = require('gulp-jshint');

/**
Análise do código js.
**/
gulp.task('jshint', function () {
  return gulp.src('src/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint']);
