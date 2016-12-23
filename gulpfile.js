var gulp = require('gulp')
  ,imagemin = require('gulp-imagemin')
  ,clean = require('gulp-clean')
  ,uglify = require('gulp-uglify')
  ,usemin = require('gulp-usemin')
  ,cssmin = require('gulp-cssmin')
  ,browserSync = require('browser-sync').create()
  ,jshint = require('gulp-jshint')
  ,jshintStylish = require('jshint-stylish')
  ,csslint = require('gulp-csslint')
  ,autoprefixer = require('gulp-autoprefixer')
  ,sass = require('gulp-sass');

gulp.task('default', ['copy'], function() {
	gulp.start('build-img', 'usemin');
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

gulp.task('usemin', function() {

  return gulp.src('dist/**/*.html')
    .pipe(usemin({
      js: [uglify],
      css: [autoprefixer, cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);

    gulp.watch('src/assets/js/**/*.js').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));
    });

    gulp.watch('src/assets/css/**/*.css').on('change', function(event) {
        console.log("Linting " + event.path);
        gulp.src(event.path)
            .pipe(csslint())
            .pipe(csslint.reporter());
    });

    gulp.watch('src/assets/sass/**/*.scss').on('change', function(event) {
       var stream = gulp.src(event.path)
            .pipe(sass().on('error', function(erro) {
              console.log('LESS, erro compilação: ' + erro.filename);
              console.log(erro.message);
            }))
            .pipe(gulp.dest('src/assets/css'));
    });
});
