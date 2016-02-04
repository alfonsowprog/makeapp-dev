var gulp  = require('gulp')

,	watch = require('gulp-watch')

,   _     = require('underscore')

,   modulesMapping = require( '../routes.modules.config.json' )

,   routesConfig = require('../routes.config.json');


gulp.task('modules-mount', function ()
{
	_.each(modulesMapping.RouteFiles, function(paths, folder)
	{
		var dest = routesConfig[folder];
		return gulp.src( paths ).pipe( gulp.dest( dest.path ) );
	});

});