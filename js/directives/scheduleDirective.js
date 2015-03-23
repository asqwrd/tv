define(['./module'], function (directives) {
    'use strict';
    directives.directive('tv.schedule', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'E',
            scope:true,
            templateUrl:'partials/schedule.html',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function($scope, element, attrs) {
                //setTimeout(function(){
               // console.log($scope.shows);

                //},300);
            }
        };




    });
});