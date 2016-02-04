/* File: gulpfile.js */

var dirRequire = require('require-dir');

dirRequire('./ws-config/gulp-tasks', { recurse: true });

// grab our gulp packages
var gulp 	    = require('gulp')
,	gutil	    = require('gulp-util')
,	command     = require('child_process')
,   _           = require('underscore')
,	packagejson = require('./package.json');

// create a default task and just log a message
gulp.task('default', [ ], function(){ /* Action for default task */ });

gulp.task(
	'start-local'
, 	[
	
	// Starting migration local and mount modules.
		'folders-clean'
	,	'modules-mapping'
	,	'modules-mount'

	// Trigger watchers.
	,	'modules:watchers'
	]
, function()
{
	// Set environment mode
	process.env.MODE = 'development';

	//Mount local JS
	command.exec('gulp javascripts-mount');

	// Initialize local server
	command.exec('heroku local web');
});