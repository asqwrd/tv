define(['./module'], function (directives) {
    'use strict';
    directives.directive('tv.sidebar', function () {
        return {
            // Restrict it to be an attribute in this case
            restrict: 'E',
            scope:true,
            templateUrl:'partials/sideBar.html',
            // responsible for registering DOM listeners as well as updating the DOM
            link: function(scope, element, attrs) {
                //setTimeout(function(){

                //},300);
            }
        };




    });
});