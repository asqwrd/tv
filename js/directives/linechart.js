define(['./module'], function (directives) {
    'use strict';
    directives.directive('linechart', function () {
		return {
			// Restrict it to be an attribute in this case
			restrict: 'A',
			// responsible for registering DOM listeners as well as updating the DOM
			link: function(scope, element, attrs) {
       setTimeout(function(){
          nv.addGraph(function() {
            var chart = nv.models.lineChart()
                                  .margin({left: 100,right:50})  //Adjust chart margins to give the x-axis some breathing room.
                                  .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                                  .transitionDuration(350)  //how fast do you want the lines to transition?
                                  .showLegend(false)       //Show the legend, allowing users to turn on/off line series.
                                  .showYAxis(true)        //Show the y-axis
                                  .showXAxis(true);        //Show the x-axis
                  
            chart.xAxis     //Chart x-axis settings
                .axisLabel('Date')
                .tickFormat(function(d) { 
                   return d3.time.format("%m/%d/%Y")(new Date(d))
                });

            chart.yAxis     //Chart y-axis settings
                .axisLabel('Ratio')
                .tickFormat(d3.format('.02f'));

            /* Done setting the chart up? Time to render it!*/
            var myData = $.parseJSON(attrs.linedata);   //You need data...
            chart.forceY([0,1]);

            d3.select('#'+attrs.id +' svg')    //Select the <svg> element you want to render the chart in.   
                .datum(myData)         //Populate the <svg> element with chart data...
                .call(chart);          //Finally, render the chart!

            //Update the chart when window resizes.
            nv.utils.windowResize(function() { chart.update() });
            
            scope.$watch('linedata', function(newVal, oldVal) {
             $('#'+attrs.id + ' svg').remove();
             $('#'+attrs.id).append('<svg></svg>'); 
             d3.select('#'+attrs.id +' svg')    //Select the <svg> element you want to render the chart in.   
                .datum(newVal)         //Populate the <svg> element with chart data...
                .call(chart);  
              
            });
            
            return chart;
          });
				},200);	
			}
      
		};
	
	
	
	
	});
});