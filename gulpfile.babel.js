import gulp from 'gulp';
import concat from 'gulp-concat';
import wrap from 'gulp-wrap';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import cleanCSS from 'gulp-clean-css';
import ngAnnotate from 'gulp-ng-annotate';
import templateCache from 'gulp-angular-templatecache';
import server from 'browser-sync';
import del from 'del';
import path from 'path';
import runSequence from 'run-sequence';

const NODE_EV = process.env.NODE_ENV || 'development';
const ROOT = 'src/';
const PATHS = {
  dist: './dist/',
  distDocs: './docs/build',
  docs: './docs/app/*.js',
  scripts: [`${ROOT}/app/**/*.js`,],
  styles: [
    `${ROOT}/assets/css/*.css`,
    'node_modules/materialize-css/dist/css/materialize.css'

  ],
  templates: `${ROOT}/app/**/*.html`,
  modules: [
    'jquery/dist/jquery.min.js',
    'angular/angular.js',
    'angular-route/angular-route.js',
    'materialize-css/dist/js/materialize.js',
    'ng-tags-input/build/ng-tags-input.js'
  ],
  static: [
    `${ROOT}/index.html`,
    `${ROOT}/manifest.json`,
    `${ROOT}/appCache.manifest`,
    `${ROOT}/sw.js`,
    `${ROOT}/assets/img/**/*`,
    `${ROOT}/assets/fonts/**/*`
  ]
};

server.create();

gulp.task('clean', () => {
  return del('dist/**/*');
});

gulp.task('templates', () => {
  return gulp.src(PATHS.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      ROOT: 'app',
      standalone: true,
      transformUrl: function (url) {
        return url.replace(path.dirname(url), '.');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('modules', ['templates'], () => {
  return gulp.src(PATHS.modules.map(item => 'node_modules/' + item))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(NODE_EV === 'production', uglify()))
    .pipe(gulp.dest(PATHS.dist + 'js/'));
});

gulp.task('styles', () => {
	return gulp.src(PATHS.styles)
	.pipe(cleanCSS())
	.pipe(concat('styles.min.css'))
	.pipe(gulp.dest(PATHS.dist + 'css/'));
});

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
      `${ROOT}/app/**/*.js`,
      ...PATHS.scripts,
      './templates.js'
    ])
    .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(NODE_EV === 'production', uglify()))
    .pipe(gulp.dest(PATHS.dist + 'js/'));
});

gulp.task('serve', () => {
  return server.init({
    files: [`${PATHS.dist}/**`],
    port: 3000,
    server: {
      baseDir: PATHS.dist
    }
  });
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(PATHS.static, { base: 'src' })
    .pipe(gulp.dest(PATHS.dist));
});

gulp.task('watch', ['serve', 'scripts'], () => {
  gulp.watch([PATHS.scripts, PATHS.templates], ['scripts']);
});

gulp.task('default', (cb) => {
	return runSequence('clean', ['copy','styles','serve','watch'], cb)
});
