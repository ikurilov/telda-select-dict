const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const replace = require('gulp-replace');

// params
const pathToModule = 'src/app/select-dict';
const tempFolderForTs = 'dist-ts';
// end params

gulp.task('inline-templates-and-css', function () {
  const templateUrlRegexp = /templateUrl:\s*'([^']+?\.html)'/g,
    styleUrlsRegexp = /styleUrls:\s*(\[[\s\S]*?])/gm;
  return gulp.src(pathToModule + '/**/*.ts')
    .pipe(replace(templateUrlRegexp, inlineTemplate))
    .pipe(replace(styleUrlsRegexp, inlineStyles))
    .pipe(gulp.dest(tempFolderForTs))
});

function joinPath(filePath, templateUrl) {
  return path.join(path.dirname(filePath), templateUrl);
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
    .replace(/"/g, '\\"');
}

function inlineTemplate(match, templateUrl) {
  const templateContent = loadResourceFile(joinPath(this.file.path, templateUrl));
  return `template: "${templateContent}"`;
}

function inlineStyles(match, styleUrls) {
  styleUrls = eval(styleUrls);
  const styleContents = styleUrls.map(url => loadResourceFile(joinPath(this.file.path, url)));
  return `styles: ["${styleContents.join(' ')}"]`;
}
