 /**
 2  * bootstraps angular onto the window.document node
 3  */
define([
     'require',
     'angular',
     'angular-ui-router',
     'angular-resource',
     'angular-moment',
     'angular-route',
     'app',
     'routes'
 ], function (require, ng) {
     'use strict';
      ng.bootstrap(document, ['app']);

});