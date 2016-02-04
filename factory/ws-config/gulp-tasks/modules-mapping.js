var gulp     = require('gulp')

,   gUtil    = require('gulp-util')

,   fs_extra = require('fs-extra')

,   _        = require('underscore')

,   absPath  = '../../'

    // Get app-modules.json to mount the modules including on this application.
,   appModules   = require( absPath + 'application/app.modules.json' )

,   routesConfig = require('../routes.config.json')

,   modulesToMount = {         
        RouteFiles   : {}
    };

gulp.task('modules-mapping', function () {

    includeModules = appModules.includes.core; //_.extend( appModules.includes.core, appModules.includes.extends );

    _.each(includeModules, function(module)
    {
        var path = 'application/core/'
        ,   mount_module = null;

        if( _.isObject( module ) )
        {
            path += module.name;
        }
        else
        {
            path += module;
        }

        mount_module = require( absPath + path + '/mount.module.json' );

        _.each( mount_module.Route, function( files, folder )
        {
            //var dest = routesConfig[folder];
            _.each( files, function( file )
            {
                if( !_.isArray( modulesToMount.RouteFiles[ folder ] ) )
                {                    
                    modulesToMount.RouteFiles[ folder ] = [];
                }

                modulesToMount.RouteFiles[ folder ].push(
                    path + '/' + folder + '/' + file
                );

            });

        });

    }); 

    fs_extra.writeJson(
            './ws-config/routes.modules.config.json'
        ,   modulesToMount
        ,   function(error){ gUtil.log( error )}
    );

});