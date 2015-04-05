
module.exports = function(gulp, outputDir, basepath, isProduction) {
    var filter = require('gulp-filter');
    return {

        /*
         * Sends the stream to output dir.
         */
        sendDest : function(stream, subdir) {
            return stream.pipe(gulp.dest(outputDir + (subdir ? subdir : "")));
        },

        /*
         * Encapsulation of js processing, returns a stream of processed js files.
         */
        processJavaScript : function (stream, fileName) {
            var uglify = require('gulp-uglify');
            var concat = require('gulp-concat');
            var localStream = stream;
            localStream = localStream.pipe(concat(fileName ? fileName : 'index.js'));
            if (isProduction) {
                localStream = localStream.pipe(uglify());
            }
            return localStream;
        },

        processMedia : function (stream) {
            var localStream = stream;
            return localStream;
        },

        processLess : function(stream) {
            var less = require('gulp-less');
            return stream.pipe(less());
        },

        /*
         * Encapsulation of css processing, returns a stream of processed css files.
         */
        processCss : function (stream, fileName) {
            var minifyCSS = require('gulp-minify-css');
            var concat = require('gulp-concat');
            var localStream = stream;
            localStream = localStream.pipe(concat(fileName ? fileName : 'index.css'));
            if (isProduction) {
                localStream = localStream.pipe(minifyCSS());
            }
            return localStream;
        },

        processPolymer : function(htmlSources, joinJsStream) {
            var self = this;
            var vulcanize = require('gulp-vulcanize');
            var clone = require('gulp-clone');
            var merge = require('gulp-merge');

            var vulcanizeConfig = {
                dest: outputDir,
                abspath: basepath,
                csp: true,
                strip: (isProduction) ? true : false
            };

            var masterStream = gulp.src([]);
            htmlSources.forEach(function(htmlSource) {
                var jsFilter = self.filters.js;
                var stream = gulp.src(basepath + htmlSource.dir + htmlSource.name);
                stream = stream.pipe(vulcanize(vulcanizeConfig));
                stream = merge(joinJsStream.pipe(clone()), stream);
                stream = stream.pipe(jsFilter);
                stream = self.processJavaScript(stream);
                stream = stream.pipe(jsFilter.restore());
                stream = self.sendDest(stream, htmlSource.dir);
                masterStream = merge(masterStream, stream);
            });
            return masterStream;
        },
        deploy : function() {
            if (!isProduction) {
                process.exit(-1);
            }
            var ghPages = require('gulp-gh-pages');
            var stream = gulp.src(outputDir + '**/*');
            return stream
                .pipe(ghPages({branch : "master"}));
        },

        filters : {
            get js () { return filter(['**/*.js'])},
            get html () { return filter(['**/*.html'])},
            get css () { return  filter(['**/*.css'])},
            get less () { return  filter(['**/*.less'])},
            get sass () { return  filter(['**/*.sass'])},
            get txt () { return  filter(['**/*.txt'])}
        }
    }
};