const typescript = require('gulp-typescript');
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const replace = require('gulp-replace');
const pathToModule = 'src/app/select-dict';

const tsProject = typescript.createProject('tsconfig-ngc.json');

gulp.task('compile', function () {
  const tsResult = gulp.src(pathToModule + '/**/*.ts')
    .pipe(replace(/templateUrl:\s*'([^']+?\.html)'/g, function (match, templateUrl) {
      const templateContent = loadResourceFile(joinPath(this.file.path, templateUrl));
      return `template: "${templateContent}"`;
    }))
    .pipe(replace(/styleUrls:\s*(\[[\s\S]*?])/gm, function (match, styleUrls) {
      styleUrls = eval(styleUrls);
      const styleContents = styleUrls.map(url => joinPath(this.file.path, url))
        .map(path => loadResourceFile(path));

      return `styles: ["${styleContents.join(' ')}"]`;
    }))
    .pipe(tsProject());

  return tsResult.pipe(gulp.dest('release/'));
});


function joinPath(filePath, templateUrl) {
  return path.join(path.dirname(filePath), templateUrl);
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}
