var gulp    = require('gulp')

,   del     = require('del')

,   _       = require('underscore')

,   absPath = '../../'

    // Get Routes Mapping to express folders
,   routesConfig = require('../routes.config.json');

gulp.task('folders-clean', function () {

    var cleanFolders = [];

    _.each( _.values( routesConfig ), function(folder)
    {
        cleanFolders.push( folder.path + "/**/*" );
    });

    return  del( cleanFolders )
    
});
