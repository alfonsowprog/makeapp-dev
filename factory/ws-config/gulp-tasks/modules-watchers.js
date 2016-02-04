var gulp   = require('gulp')

,	gUtil  = require('gulp-util')

,	watch = require('gulp-watch')

,   _      = require('underscore')

,   routesConfig   = require( '../routes.config.json' )

,   modulesMapping = require( '../routes.modules.config.json' );

gulp.task('modules:watchers', function ()
{
	var defining = true;
	_.each(modulesMapping.RouteFiles, function(paths, folder)
	{
		var folderConfig = routesConfig[folder];

		gUtil.log(folder);

		_.each(paths, function(path)
		{		

			gUtil.log('start wotching: ' + path)

			var fileWatch = gulp.src(path);

				fileWatch = folderConfig.watch ? 
								fileWatch.pipe( watch( path ) ).on('end', function(){ gUtil.log('change-file: ') } )
							:
								fileWatch;

				//file = folderConfig.sass_compilation ? file.pipe( sass(  path ) ) : file;
			        
			    fileWatch.pipe( gulp.dest( folderConfig.path ) );

		})
		
	});

	defining = !defining;

});