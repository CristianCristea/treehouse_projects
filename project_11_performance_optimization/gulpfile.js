"use strict";

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    minifyCSS   = require('gulp-clean-css'),
    maps        = require('gulp-sourcemaps'),
    del         = require('del'),
    image       = require('gulp-image');

// concat, minify js
gulp.task("minifyScripts", function() {
    return gulp.src([
        'js/jquery.js',
        'js/foundation.js',
        'js/foundation.equalizer.js',
        'js/foundation.reveal.js',
        'js/fastclick.js'
        ])
    .pipe(maps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

// concat, minify css
gulp.task('minifyCSS', function(){
    gulp.src(["css/normalize.css",
              "css/foundation.css",
              // "css/arvo.css",
              // "css/ubuntu.css",
              "css/basics.css",
              "css/menu.css",
              "css/hero.css",
              "css/photo-grid.css",
              "css/modals.css",
              "css/footer.css"
              ])
        .pipe(maps.init())
        .pipe(concat('styles.css'))
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
});

// gulp.task('image', function () {
//   gulp.src('img/**/*')
//     .pipe(image())
//     .pipe(gulp.dest('./dist/img'));
// });
 

// delete dist before a new build
gulp.task('clean', function() {
  del(['dist', 'css/styles.min.css', 'css/styles.min.css.map', 'js/scripts.min.js', 'js/scripts.min.js']);
});

// run all tasks, copy assets to dist
gulp.task("build", ['clean', 'minifyScripts', 'minifyCSS'], function() {
  return gulp.src(["css/styles.min.css", "js/scripts.min.js", 'index.html', "img/**"], { base: './'})
      .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);
