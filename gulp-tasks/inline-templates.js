const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const replace = require('gulp-replace');

const pathToModule = 'src/app/select-dict';


gulp.task('inline-templates-and-css', function () {
  return gulp.src(pathToModule + '/**/*.ts')
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
    .pipe(gulp.dest('dist-ts'))
});

function joinPath(filePath, templateUrl) {
  return path.join(path.dirname(filePath), templateUrl);
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}
