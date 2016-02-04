var gulp  = require('gulp')

,	gutil  = require('gulp-util')

,   fs_extra = require('fs-extra')

,   _        = require('underscore')

,	packagejson = require('../../package.json')

,	modulesConfig = require('../routes.modules.config.json');

gulp.task('javascripts-mount', function() {

	var folderApp  	    = packagejson.folderapp + '\\public';
	modulesConfig.paths = [];

	gulp
	.src('./public/javascripts/**/*.js')
  	.pipe(
  		gutil.buffer(function(err, files)
  		{
			_.each(files, function(file)
		  	{
		  		modulesConfig.paths.push( file.path.split( folderApp )[1].replace(/\\/ig, '/') );
		  	})

	  	    fs_extra.writeJson(
		            './ws-config/routes.modules.config.json'
		        ,   modulesConfig
		        ,   function(error){ gutil.log( error )}
		    );

  		})
  	);
    
});