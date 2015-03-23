require.config({
    baseUrl: "js",    
    paths: {
        'angular-ui-router'		: 'libs/angularui',
        'angular'				: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min',
        'angular-resource'		: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-resource.min',
        'angular-route'		    : '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.min',
        'jquery'				: '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'jqueryui'				: 'libs/jquery-ui',
        'd3'		      		: 'libs/d3.min',
        'nvd3'		      		: 'libs/nvd3/nv.d3.min',
        'nvd3_lineChart'		: 'libs/nvd3/line',
        'nvd3_utils'		    : 'libs/nvd3/utils',
        'nvd3_legend'		    : 'libs/nvd3/legend',
        'moment'				: 'libs/moment',
        'angular-moment'		: 'libs/angular-moment.min'
    },
     shim: {
      'angular': {
        exports: 'angular'     
      },
      'angular-ui-router':{
        deps: ['angular'],
        exports: 'angular-ui-router'
      },
      'angular-resource':{
        deps: ['angular'],
        exports: 'angular-resource'
      },
      'angular-route':{
        deps: ['angular'],
        exports: 'angular-route'
      },
      'jquery':{
        exports:'$'
      },
      'underscore':{
        exports:'_'
      },
      'jqueryui':{
        deps:['jquery']
      },
      'nvd3':{
        deps:['d3'],
        exports: 'nv'  
      },
      'angular-moment':{
        deps:['moment']
      },
		
   },
    deps: ['./bootstrap']
});
