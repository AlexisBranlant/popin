var gulp   = require('gulp'),
babelify   = require('babelify'),
source     = require('vinyl-source-stream'),
babel      = require('gulp-babel'),
concat     = require('gulp-concat'),
uglify     = require('gulp-uglify'),
connect    = require('gulp-connect'),
browserify = require('browserify'),
sass       = require('gulp-sass'),
minifyCSS  = require('gulp-minify-css');




gulp.task('server', function() {
  connect.server({
    root: './demo/',
    port: 1337
  });
});

gulp.task('build', ['sass'], function() {
  return browserify({
        entries: './lib/popinInstance.js',
        debug: true
      })
      .transform(babelify)
      .bundle()
      .pipe(source('popin.js'))
      .pipe(gulp.dest('./lib'));
})

//Compilation des fichiers .scss
gulp.task('sass', function(){

  return gulp.src('./styles/popin.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(gulp.dest('./demo/'));
});

gulp.task('demo', function() {
  browserify({
    entries: './demo/app.js',
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./demo'));
})

gulp.task('watch', function() {
  gulp.watch(['styles/*.scss','lib/*.js','demo/*.js'], ['build', 'demo']);
});

gulp.task('default', ['build', 'server', 'demo', 'watch']);