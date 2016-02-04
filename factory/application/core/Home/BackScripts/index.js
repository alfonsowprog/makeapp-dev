var express = require('express')
,	router  = express.Router()
,	env     = process.env.mode
,	gutil   = require('gulp-util');

/* GET home page. */
router.get('/', function(req, res, next)
{
	var modulesConfig = require('../ws-config/routes.modules.config.json');

	res.render('index', { 
  		title : 'Express' 
  	,	isDev :  process.env.MODE === 'development'
  	,	localJS : modulesConfig.paths
	});
});

module.exports = router;