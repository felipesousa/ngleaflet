var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('script', function (){
  return gulp.src('./source/index.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename('ngleaflet.min.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./build'))
});

gulp.task('script::watch', function (){
  gulp.watch('./source/*.js', ['script'])
});

gulp.task('default', ['script', 'script::watch'])
