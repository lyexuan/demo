var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-clean-css'),
    rjs = require('gulp-requirejs-optimize'),
    uglyfly = require('gulp-uglyfly');

//编译less压缩css
gulp.task('handleLess',function(){
	return gulp.src('src/less/index.less')
	    .pipe(less())
	    .pipe(minifyCss())
	    .pipe(gulp.dest('src/css'));
});   

//打包requireJs模块
gulp.task('rjs',function(){
	return gulp.src('src/js/app/main.js',{base: 'src/js'})
	           .pipe(rjs({
	           	  baseUrl: 'src/js'
	           }))
						 .pipe(gulp.dest('build/js'));
});

//复制字体文件夹
gulp.task('copyFonts',function(){
	return gulp.src('src/font/**')
	           .pipe(gulp.dest('build/font'));
});

//压缩js
gulp.task('uglyflyJs',function(){
	return gulp.src('src/js/plugins/**/*.js')
	           .pipe(uglyfly())
	           .pipe(gulp.dest('build/js/plugins'));
}); 


gulp.task('default',['handleLess','rjs']);

gulp.task('watchLess',function(){
	gulp.watch('src/**/*.*',['default']);
});

