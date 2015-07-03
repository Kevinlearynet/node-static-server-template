/**
 * Build Process
 */
'use strict';

var gulp = require( 'gulp' );
var less = require( 'gulp-less' );
var imports = require( 'gulp-imports' );
var uglify = require( 'gulp-uglify' );
var watch = require( 'gulp-watch' );
var minifyCSS = require( 'gulp-minify-css' );

/**
 * LESS => CSS
 */
gulp.task( 'css', function () {
	return gulp.src( 'working/main.less' )
		.pipe( watch( 'working/*.less' ) )
		.pipe( less() )
		.pipe( minifyCSS( {
			compatibility: 'ie8'
		} ) )
		.pipe( gulp.dest( 'public/dist' ) );
} );

/**
 * JS
 */
gulp.task( 'js', function () {
	return gulp.src( 'working/main.js' )
		.pipe( watch( 'working/*.js' ) )
		.pipe( imports() )
		.pipe( uglify() )
		.pipe( gulp.dest( 'public/dist' ) );
} );

/**
 * Default runs on `gulp`
 */
gulp.task( 'default', [ 'css', 'js' ] );