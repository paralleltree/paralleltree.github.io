const path = require('path');
const gulp = require('gulp');
const slim = require('gulp-slim');
const sass = require('gulp-sass');

const SLIM_PATH = './src/slim/**/*.slim';
const SASS_PATH = './src/sass/**/*.sass';
const IMG_PATH = './src/img/**/*';
const DEST_PATH = './dist';

gulp.task('slim', () => {
  gulp.src(SLIM_PATH)
    .pipe(slim())
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('sass', () => {
  gulp.src(SASS_PATH)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('image', () => {
  gulp.src(IMG_PATH)
    .pipe(gulp.dest(path.join(DEST_PATH, 'img')));
});

gulp.task('watch', ['build'], (done) => {
  gulp.watch([SLIM_PATH], ['slim']);
  gulp.watch([SASS_PATH], ['sass']);
  gulp.watch([IMG_PATH], ['image']);
  done();
});

gulp.task('build', ['slim', 'sass', 'image']);
