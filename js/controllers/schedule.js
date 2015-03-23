define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('Schedule', ['$scope','$stateParams','$http','$window','$state','jsonData',function ($scope, $stateParams,$http,$window,$state,jsonData) {

        //function used to generate and update data for all the charts on this page
        $scope.update = function(){
            //using json service to gather all the data from input file
            jsonData.getSchedule()
                .then(function(data){
                    $scope.shows = data;
                    var date = new Date();
                    if(date.getMinutes() < 30 ){
                        date.setMinutes(0);
                        date.setSeconds(0);
                        var time = moment(date).format("hh:mm a");
                        $scope.time_links = getTimeSlotLinks(moment(date),data);
                        $scope.time_slot = getTimeSlot($scope.time_links[0],data);
                        $scope.time_slot_sidebar = getFeatureSlot(moment(date),data);
                    }else{
                        date.setMinutes(30);
                        date.setSeconds(0);
                        var time = moment(date).format("hh:mm a");
                        $scope.time_links = getTimeSlotLinks(moment(date),data);
                        $scope.time_slot = getTimeSlot($scope.time_links[0],data);
                        $scope.time_slot_sidebar = getFeatureSlot(moment(date),data);
                    }

                    console.log( $scope.time_slot_sidebar);
                   // $scope.time_slot = getTimeSlot(time,data);


                });

        };

        var getTimeSlot = function(time,data){
            var time;
            data.forEach(function(time_slot){
               if(time_slot.time == time) {
                   time = time_slot;
               }
            });
            return time;

        };

        var getFeatureSlot = function(time, data){
            var timeArray = [];
            data.forEach(function(time_slot){
                var date = new Date();
                var time_slot_array = time_slot.time.split(':').join(" ").split(" ");
                if(time_slot_array[2] == 'pm' && parseInt(time_slot_array[0]) < 12)
                    date.setHours(parseInt(time_slot_array[0])+12);
                else if(parseInt(time_slot_array[0]) == 12 && time_slot_array[2] == 'am'){
                    date.setHours(0);
                }
                else
                    date.setHours(parseInt(time_slot_array[0]));
                date.setMinutes(time_slot_array[1]);
                date.setSeconds(0);
                if(moment(date).isAfter(time)) {
                    var timeObj={};
                    timeObj.time =time_slot.time;
                    timeObj.show = time_slot.shows[0];
                    timeArray.push(timeObj);
                }
            });
            return timeArray;
        };

        var getTimeSlotLinks = function(time,data){
            var timeLinks = [];
            data.forEach(function(time_slot){
                var date = new Date();
                var time_slot_array = time_slot.time.split(':').join(" ").split(" ");
                if(time_slot_array[2] == 'pm' && parseInt(time_slot_array[0]) < 12)
                    date.setHours(parseInt(time_slot_array[0])+12);
                else if(parseInt(time_slot_array[0]) == 12 && time_slot_array[2] == 'am'){
                    date.setHours(0);
                }
                else
                    date.setHours(parseInt(time_slot_array[0]));
                date.setMinutes(time_slot_array[1]);
                date.setSeconds(0);
                console.log(moment(date).isAfter(time));
                if(moment(date).isAfter(time)) {
                    timeLinks.push(time_slot.time);
                }
            });
            return timeLinks;
        };

        //executed for initial page load
        $scope.update();

    }]);
});