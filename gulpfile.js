var gulp = require('gulp');
var jshint = require('gulp-jshint');


gulp.task('jshint', function () {
  return gulp.src('src/app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint']);
