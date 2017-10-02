const gulp = require('gulp');
const clean = require('gulp-clean');

// params
const tempFolderForTs = 'dist-ts';
const libBuildFolder = 'release';
// end params

gulp.task('clean:after-build', function () {
  return gulp.src(tempFolderForTs)
    .pipe(clean());
});

gulp.task('clean:before-build', function () {
  return gulp.src(libBuildFolder)
    .pipe(clean());
});
