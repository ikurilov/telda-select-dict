const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const replace = require('gulp-replace');

const pathToModule = 'src/app/select-dict';

gulp.task('inline-templates', function () {
  return gulp.src(pathToModule + '/**/*.ts')
    .pipe(replace(/templateUrl:\s*'([^']+?\.html)'/g, function (match, templateUrl) {
      const templateContent = loadResourceFile(path.join(path.dirname(this.file.path), templateUrl));
      return `template: "${templateContent}"`;
    }))
    .pipe(gulp.dest('dist-ts'))
});


function inlineTemplate(fileContent, filePath) {
  return fileContent.replace(/templateUrl:\s*'([^']+?\.html)'/g, (_match, templateUrl) => {
    const templatePath = path.join(dirname(filePath), templateUrl);
    const templateContent = loadResourceFile(templatePath);
    return `template: "${templateContent}"`;
  });
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}
