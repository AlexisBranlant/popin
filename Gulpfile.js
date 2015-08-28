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




gulp.task('server',function() {
  connect.server({
    root: './demo/',
    port: 1337
  });
});


gulp.task('buildNew', function() {
    return gulp.src('./lib/popinNew.es6.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('popinNew.js'))
        .pipe(gulp.dest('./lib'));
});

gulp.task('build', function() {
  return gulp.src('./lib/popin.es6.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('popin.js'))
    .pipe(gulp.dest('./lib'));
})

//Compilation des fichiers .scss
gulp.task('sass', function(){

  return gulp.src('./styles/popin.scss')
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(gulp.dest('./demo/'));
});

gulp.task('demo',['build'], function() {
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
  gulp.watch(['styles/*.scss','lib/*.js','demo/*.js'], ['demo']);
});

gulp.task('default', [ 'demo','server','watch']);
