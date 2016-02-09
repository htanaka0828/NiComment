var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');


/**
 * jsのビルド
 */
gulp.task('clt_build', function() {
  var files = [
    'closure-library/closure/goog/**.js',
    'src/NicoNicoComment.js'
  ];

  return gulp.src(files)
    .pipe(closureCompiler({
      compilerPath: 'bower_components/closure-compiler/compiler.jar',
      fileName: 'nicoment.min.js',
      compilerFlags: {
        closure_entry_point: 'NicoNicoComment',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        define: [
          "goog.DEBUG=false"
        ],
        only_closure_dependencies: true,
        output_wrapper: '(function(){%output%})();',
        warning_level: 'VERBOSE'
        }
      }))
    .pipe(gulp.dest('dist'));
});


gulp.task('default', ['clt_build']);
