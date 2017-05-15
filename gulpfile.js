"use strict";
var gulp = require("gulp");
var del = require("del");
var tsc = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var tsProject = tsc.createProject("tsconfig.json");
var tslint = require('gulp-tslint');
var flatten = require('gulp-flatten');
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});
gulp.task('tslint', function () {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
        formatter: 'prose'
    }))
        .pipe(tslint.report());
});
gulp.task("compile", ["tslint"], function () {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", { sourceRoot: '/src' }))
        .pipe(gulp.dest("build"));
});
gulp.task("resources", function () {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"));
});
gulp.task("libs", function () {
    return gulp.src([
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**/*.js',
        'zone.js/dist/**',
        '@angular/**/bundles/**',
        'bootstrap/dist/js/bootstrap.min.js',
        'jquery/dist/jquery.min.js',
        'tether/dist/js/tether.min.js'
    ], { cwd: "node_modules/**" })
        .pipe(gulp.dest("build/lib"));
});
gulp.task("css", function () {
    return gulp.src([
        'bootstrap/dist/css/bootstrap.min.css',
        'font-awesome/css/font-awesome.min.css'
    ], { cwd: "node_modules/**" })
        .pipe(flatten())
        .pipe(gulp.dest("build/css"));
});
gulp.task("font", function () {
    return gulp.src([
        'font-awesome/fonts/fontawesome-webfont.woff',
        'font-awesome/fonts/fontawesome-webfont.woff2'
    ], { cwd: "node_modules/**" })
        .pipe(flatten())
        .pipe(gulp.dest("build/fonts"));
});
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});
gulp.task("build", ['compile', 'resources', 'libs', 'css', 'font'], function () {
    console.log("Building the project ...");
});
