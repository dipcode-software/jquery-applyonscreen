var gulp = require('gulp'),
    jshint = require('gulp-jshint')
    rename = require('gulp-rename')
    uglify = require('gulp-uglify'),
    qunit = require('gulp-qunit'),
    folder = {
		src: 'src/',
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
    .pipe(gulp.dest(folder.dest))
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
    qunit('./test/*.html', {'page': {
        viewportSize: { width: 1366, height: 800 }
    }});
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(folder.src + '*.js', ['default']);
});

gulp.task('default', function() {
    gulp.start('lint', 'test', 'compress', 'docs-copy-src');
});
