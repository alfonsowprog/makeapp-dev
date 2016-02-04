// ** Images Section ** //

var gulp    = require('gulp')

,   gUtil   = require('gulp-util')

,   concat = require('gulp-concat')

,   minify = require('gulp-minify')

,   _       = require('underscore')

,   absPath = '../../'

    // Get Routes Mapping to express folders
,   routesConfig = require('../routes.config.json')

    // Get get app-modules.json to mount the modules including on this application.
,   appModules   = require( absPath + 'application/app.modules.json' )

,   master_route = {  }
/*
,   compile_modules = (function()
    {
        var modulesToMount = appModules.includes || {}
        ,   pathCollection = []
        ,   comapreVersion = function(module1, module2)
            {
                modName1    = module1.split('@')[0];
                modVersion1 = module1.split('@')[1];
                modName2    = module2.split('@')[0];
                modVersion2 = module2.split('@')[1];
                return  (   modName1 == modName2 
                            &&
                            parseFloat( modVersion1.replace(/\./ig,'') )
                            <
                            parseFloat( modVersion2.replace(/\./ig,'') )
                        );
            };

        _.each(modulesToMount.core, function(module, name)
        {
            var path      = 'application/'

            ,   ex_Module = _.find(modulesToMount.extends, function(extend, ex_name)
                            {
                                var comaprer = comapreVersion(name, ex_name);

                                if( comaprer )
                                {
                                    path += 'extends/' + ex_name + '/';
                                }

                                return comaprer;
                            });

            if(!ex_Module)
            {
                path += 'core/' + name + '/';
            }

            pathCollection.push(path);

        });

        // Now Route Modules files and generate destination files.
        _.each(pathCollection, function( module )
        {
            var src_module    = absPath + module + 'mount.module.json'
            ,   mount_module  = require(src_module);

            _.each( mount_module.push, function(files, folder)
            {
                var destination  = { files : [] }
                ,   config = routesConfig[folder];

                if( _.isObject( config ) )
                {
                    destination = _.extend( destination, config );
                }
                else
                {
                    destination = _.extend( destination, { src : './' + config } );
                }

                destination = master_route[ destination.src ] || destination;

                _.each(files, function(file)
                {
                    destination.files.push( './' + module + folder + '/' +  file);
                });

                master_route[ destination.src ] = destination;

            });

        });

    })();

*/

gulp.task('build-ws', function ()
{
    _.each(master_route, function( setting )
    {   
        var process = gulp.src( setting.files )

        if( setting.minify  ) process = process.pipe( minify() );
        
        if( setting.combine ) process = process.pipe( concat( setting.name ) );

        process.pipe( gulp.dest( setting.src ) );

    });

});

