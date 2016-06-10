// Require Gulp and plugins.
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Task to compile sass to css.
gulp.task('sass', function () {
    return gulp.src('public/assets/css/src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/assets/css'));
});

// Task to minify CSS, and rename file to have have .min suffix.
gulp.task('minify-css', function() {
  return gulp.src('public/assets/css/main.css')
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/assets/css/'));
});

// Task to minify JS, and rename file to have have .min suffix.
gulp.task('uglify', function(){
    return gulp.src('public/assets/js/src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/assets/js'));
});

// Watch tasks.
gulp.task('watch', function() {
    gulp.watch('public/assets/css/src/*.scss', ['sass']);
    gulp.watch('public/assets/css/main.css', ['minify-css']);
    gulp.watch('public/assets/js/src/*.js', ['uglify']);
});

// Style tasks.
gulp.task('style', ['sass', 'minify-css']);

// JS tasks.
gulp.task('scripts', ['uglify']);

// Default task.
gulp.task('default', ['style', 'scripts', 'watch']);
