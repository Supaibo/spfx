'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const File = require('vinyl');
const readFiles = require('read-vinyl-file-stream');
const through = require("through2");
const fs = require('fs');

// Output folder
const relativePart = '/lib/elements';

var transformedStyle = () => {
    return readFiles(function (content, file, stream, cb) {
        var transformedContent = `<style>${content}</style>`;
        stream.push(new File({
            contents: new Buffer(transformedContent),
            path: file.path + '.transformed'
        }));

        cb();
    });
};

var generateHtmlTemplateWithStyle = () => {
    return through.obj((file, enc, cb) => {
        var transformedFileCss = `${file.path}`;
        var splittedPath = transformedFileCss.split("\\");

        var filename = splittedPath.pop();
        filename = filename.replace('.css.transformed', '.html');
        var path = splittedPath.join('\\');
        var templatePath = path + '\\' + filename;

        var styleContent = fs.readFileSync(transformedFileCss);
        var templateContent = fs.readFileSync(templatePath);
        var content = styleContent + templateContent;
        fs.writeFileSync(templatePath, content);

        cb();
    });
};

let subtask = build.subTask('pow-custom-elem-style-subtask', function (gulp, buildOptions, done) {
    return gulp.src(`.${relativePart}/**/*.module.css`)
        .pipe(transformedStyle())
        .pipe(gulp.dest('.'))
        .pipe(generateHtmlTemplateWithStyle());
});

let generateTemplateTask = build.task('generate-template', subtask);
build.rig.addPostTypescriptTask(generateTemplateTask);