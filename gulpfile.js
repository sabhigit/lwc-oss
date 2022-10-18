import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
const sass = gulpSass(dartSass);

const scssSrc = 'src/scss/**/*.scss';
const cssOutput= 'src/assets/css';

let autoprefixerDef = autoprefixer({
    grid: true,
    cascade: false
});

gulp.task('devCss', function(){
    return gulp.src(scssSrc)
    .pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixerDef
    ]))
    .pipe(gulp.dest(cssOutput))
});

//Task Watch
gulp.task('watch', function() {
    gulp.watch(scssSrc, gulp.series('devCss'));
});

gulp.task('prodCss', function () {
	return gulp.src(scssSrc)
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixerDef,
        cssnano()
    ]))
    .pipe(gulp.dest(cssOutput));
});
