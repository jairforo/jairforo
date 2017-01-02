var gulp = require('gulp')
  ,imagemin = require('gulp-imagemin')
  ,clean = require('gulp-clean')
  ,uglify = require('gulp-uglify')
  ,useref = require('gulp-useref')
  ,gulpif = require('gulp-if')
  ,cssmin = require('gulp-cssmin')
  ,browserSync = require('browser-sync').create()
  ,autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['copy'], function() {
	gulp.start('build-img', 'useref');
});

gulp.task('copy', ['clean'], function() {
  
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {

	return gulp.src('dist')
		.pipe(clean());
});

gulp.task('build-img', function() {

  return gulp.src('src/assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('useref', function() {
    return gulp.src('src/**/*.html')
        .pipe(useref())
        .pipe(gulpif('src/**/*.js', uglify()))
        .pipe(gulpif('src/**/*.css', autoprefixer()))
        .pipe(gulpif('src/**/*.css', cssmin()))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
});
