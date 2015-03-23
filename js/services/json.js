define(['./module'], function (services) {
    'use strict';
    services.service('jsonData').factory('jsonData', function($window,$http,$q) {
      return {
        getSchedule: function (){
          return $q.all([
            $http.get('shows_dumb.php'),
            //$http.get('shows_dumb3.php')
          ])
          .then(function(results) {
            var data = [];
            angular.forEach(results, function(result) {
                data = data.concat(result.data);
                console.log(data);

            });


            return data;
          });
        },
        getAllShows: function (){
          return $q.all([
            $http.get('shows_dumb3.php')
          ])
          .then(function(results) {
              var data = [];
              angular.forEach(results, function(result) {
                  data = data.concat(result.data);
                  //console.log(data);

              });


              return data;
            });
          }

      };
    });
});




