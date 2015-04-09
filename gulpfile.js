
/*
 * Require general modules
 */

var gulp = require('gulp');
var filter = require('gulp-filter');
var argv = require('yargs').argv;
var taskListing = require('gulp-task-listing');

/*
 * Configuration properties
 */

var outputDir = 'dist/';
var basepath = 'src/';
var isProduction = (argv.p) ? true : false;
var port = 8001;

/*
 * Require function library
 */
var lib = require('./gulplib')(gulp, outputDir, basepath, isProduction);

/*
 * Source files declaration
 */

var miscFiles = [
    'src/humans.txt',
    'src/CNAME',
    'src/robots.txt',
    'src/404.html',
    'src/CNAME'
];
var htmlSources = [
    { dir: '', name:'index.html'},
    { dir: 'about/', name:'index.html'},
    { dir: 'contact/', name:'index.html'},
    { dir: 'blog/', name:'index.html'},
    { dir: 'blog/unexpected-gaze/', name:'index.html'},
    { dir: 'experiments/', name:'index.html'},
    { dir: 'friends/', name:'index.html'}
];

/*
 * GULP TASKS
 */
gulp.task('help', taskListing);

gulp.task('build-polymer', ['build-components-vendor','build-components-custom'], function() {
    var jsStream = gulp.src(['src/js/**/*','!src/js/**/*.ie.js']);
    return lib.processPolymer(htmlSources, jsStream);
});

gulp.task('build-components-custom', function() {
    return lib.sendDest(gulp.src(['src/components/**/*']), 'components');
});

gulp.task('build-components-vendor', function() {
    return lib.sendDest(gulp.src(['src/vendor_components/**/*', '!src/vendor_components/**/*.md']), 'vendor_components');
});

gulp.task('build-css', function() {
    var merge = require('gulp-merge');
    var cssStream = gulp.src('src/css/**/*');
    var lessStream = gulp.src('src/less/**/*');
    lessStream = lib.processLess(lessStream);
    var stream = merge(cssStream, lessStream);
    stream = lib.processCss(stream);
    return lib.sendDest(stream, 'css');
});

gulp.task('build-ie-js', function() {
    var stream = gulp.src('src/js/**/*.ie.*');
    stream = lib.processJavaScript(stream, 'index.ie.js');
    return lib.sendDest(stream, 'js');
});

gulp.task('build-media', function() {
    var stream = gulp.src('src/media/**/*');
    stream = lib.processMedia(stream);
    return lib.sendDest(stream, 'media');
});

gulp.task('build-misc', function() {
    var stream = gulp.src(miscFiles);
    stream = lib.processMedia(stream);
    return lib.sendDest(stream);
});

gulp.task('clean', function(cb) {
    var del = require('del'); // rm -rf
    return del(outputDir + "*", cb);
});

gulp.task('build', ['build-ie-js', 'build-media', 'build-css', 'build-misc', 'build-components-vendor', 'build-components-custom', 'build-polymer']);

gulp.task('deploy', function() {
    return lib.deploy();
});

gulp.task('watch', function() {
    gulp.watch('src/css/**/*', ['build-css']);
    gulp.watch(['src/js/**/*', '!src/js/**/*.ie.*'], ['build-polymer']);
    gulp.watch('src/media/**/*', ['build-media']);
    gulp.watch('src/js/**/*.ie.*', ['build-ie-js']);
    gulp.watch(['src/components/**/*'], ['build-polymer']);
    gulp.watch(['src/vendor_components/**/*'], ['build-polymer']);
    gulp.watch(miscFiles, ['build-misc']);
    gulp.watch(['src/**/*.html', '!src/components/**/*','!src/vendor_components/**/*'], ['build-polymer']);
});

gulp.task('webserver', function() {
    var server = require('gulp-server-livereload');
    return gulp.src(outputDir)
        .pipe(server({
            livereload: true,
            open: true,
            port: port
        }));
});
