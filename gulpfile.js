const { src, parallel, dest, watch }  = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');

// File Paths

const cssInPath = 'src/css/**.css';
const cssOutPath = 'public/assets';
const htmlInPath = 'src/html/**.html';
const htmlOutPath = 'public';
const jsInPath = 'src/js/**/**.js';
const jsOutPath = 'public/assets';

// Functions

function copyCss() {
    return src(cssInPath)
    .pipe(dest(cssOutPath));
}

function copyHtml() {
    return src(htmlInPath)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(htmlOutPath));
}

function copyJs () {
    return src(jsInPath)
    .pipe(sourcemaps.init())
        .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest(jsOutPath))
}

function watchFiles() {
    watch(cssInPath,copyCss);
    watch(htmlInPath,copyHtml);
    watch(jsInPath,copyJs);
}

// Exports

exports.default = parallel(copyCss, copyHtml, copyJs);
exports.watch = watchFiles;
