var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-clean-css'),
    rjs = require('gulp-requirejs-optimize');

gulp.task('handleLess',function(){
	return gulp.src('src/less/index.less')
	    .pipe(less())
	    .pipe(minifyCss())
	    .pipe(gulp.dest('src/css'));
});   

gulp.task('rjs',function(){
	return gulp.src('src/js/app/*.js')
	           .pipe(rjs())
						 .pipe(gulp.dest('build/js/app'));
});


gulp.task('default',['handleLess','rjs']);

gulp.task('watchLess',function(){
	gulp.watch('src/**/*.*',['default']);
});

