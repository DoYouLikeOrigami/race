var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug');

var
  paths = {
    style: {
      startFile: './dev/style.sass',
      watch: ['./dev/sass/**/*.sass', './dev/blocks/**/*.sass', './dev/style.sass'],
      convertFolder: './app/static/css'
    },
    pug: {
      pages: './dev/pages/*.pug',
      watch: ['./dev/pages/**/*.pug', './dev/blocks/**/*.pug', './dev/layouts/**/*.pug', './dev/mixins.pug'],
      convertFolder: './app/modules/core/templates'
    }
  };

gulp.task('pug', function() {
	gulp.src(paths.pug.pages)
		.pipe(pug({
			pretty: '\t',
		}))
		.pipe(rename({
      extname: ".jinja2"
    }))
		.pipe(gulp.dest(paths.pug.convertFolder));
});

gulp.task('sass', function() {
  gulp.src(paths.style.startFile)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.style.convertFolder));
});

//.pipe(cssnano())
//.pipe(rename({
//  suffix: '.min'
//}))
//.pipe(gulp.dest(paths.style.convertFolder))

gulp.task('watch', ['sass', 'pug'], function() {
  gulp.watch(paths.style.watch, ['sass']);
  gulp.watch(paths.pug.watch, ['pug']);
});

gulp.task('default', ['sass', 'pug', 'watch']);
