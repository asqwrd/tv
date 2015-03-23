define(['./app','jquery','jqueryui','nvd3','moment'], function (app) {
     'use strict';
    return app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider,$locationProvider) {
      $urlRouterProvider.otherwise("/home");
      //$locationProvider.hashPrefix('!');

     $stateProvider
         .state('home',{
          url: "/",
          templateUrl: 'partials/home.html',
          controller: 'Home',
          onEnter: function($stateParams,$timeout,$rootScope, $http){

          }
        })
         .state('home.scehdule',{
             url:'^/schedule',
             templateUrl: 'partials/main.html',
             controller: 'Schedule'
         });
  }]);
});