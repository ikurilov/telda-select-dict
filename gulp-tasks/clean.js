const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean:after-build', function () {
  return gulp.src('dist-ts')
    .pipe(clean());
});

gulp.task('clean:before-build', function () {
  return gulp.src('dist-ngc')
    .pipe(clean());
});
