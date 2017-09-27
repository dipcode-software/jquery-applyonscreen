var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  qunit = require('node-qunit-phantomjs'),
  folder = {
  	src: 'src/',
    lib: 'lib/',
  	dest: 'dist/'
  },
  files_to_move = [
  	'./README.md',
  	'./LICENSE'
  ];

gulp.task('compress', function() {
  gulp.src(folder.src + '*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(folder.dest));
});

gulp.task('lint', function() {
  return gulp.src([folder.src + '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('docs-copy-src', function () {
	gulp.src(files_to_move)
    .pipe(gulp.dest(folder.dest));
});

gulp.task('test', function() {
  qunit('./test/test_applyonscreen.html', {
    'timeout': 5,
    'verbose': true,
    'page': {
      viewportSize: {
        width: 1366,
        height: 768
      }
    }
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(folder.src + '*.js', ['default']);
});

gulp.task('default', function() {
    gulp.start('lint', 'test', 'compress', 'docs-copy-src');
});
