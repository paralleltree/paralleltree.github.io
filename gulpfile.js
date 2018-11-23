const path = require('path');
const gulp = require('gulp');
const slim = require('gulp-slim');
const sass = require('gulp-sass');

const SLIM_PATH = './src/slim';
const SLIM_FILES = path.join(SLIM_PATH, '**/*.slim');
const SASS_PATH = './src/sass';
const SASS_FILES = path.join(SASS_PATH, '**/*.sass');
const IMG_PATH = './src/img';
const IMG_FILES = path.join(IMG_PATH, '**/*');
const DEST_PATH = './dist';

gulp.task('slim', () => {
  gulp.src(SLIM_FILES)
    .pipe(slim({
      require: 'slim/include',
      options: `include_dirs=["${ path.join(SLIM_PATH, 'includes') }"]`
    }))
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('sass', () => {
  gulp.src(SASS_FILES)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(DEST_PATH));
});

gulp.task('image', () => {
  gulp.src(IMG_FILES)
    .pipe(gulp.dest(path.join(DEST_PATH, 'img')));
});

gulp.task('watch', ['build'], (done) => {
  gulp.watch([SLIM_FILES], ['slim']);
  gulp.watch([SASS_FILES], ['sass']);
  gulp.watch([IMG_FILES], ['image']);
  done();
});

gulp.task('build', ['slim', 'sass', 'image']);
