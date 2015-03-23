define(['./module'], function (directives) {
    'use strict';
    directives.directive('piechart', function () {
		return {
			// Restrict it to be an attribute in this case
			restrict: 'A',
			// responsible for registering DOM listeners as well as updating the DOM
			link: function(scope, element, attrs) {
       setTimeout(function(){
          //Donut chart example
          var myColors = ["#5fafe4", "#bbbbbb", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
          d3.scale.myColors = function() {
            return d3.scale.ordinal().range(myColors);
          };
          nv.addGraph(function() {
            var piechart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLegend(false)
                .showLabels(false)     //Display pie labels
                .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                .donutRatio(0.5)     //Configure how big you want the donut hole size to be.
                .color(d3.scale.myColors().range());
                ;
              var pieData = $.parseJSON(attrs.piedata);
              d3.select('#'+attrs.id +' svg')
                  .datum(pieData)
                  .transition().duration(350)
                  .call(piechart);
                  
              nv.utils.windowResize(function() { piechart.update() });
              scope.$watch('piedata', function(newVal, oldVal) {
               $('#'+attrs.id + ' svg').remove();
               $('#'+attrs.id).append('<svg></svg>'); 
               d3.select('#'+attrs.id +' svg')    //Select the <svg> element you want to render the chart in.   
                  .datum(newVal)         //Populate the <svg> element with chart data...
                  .call(piechart);  
              
            });

            return piechart;
          });
				},200);	
			}
      
		};
	
	
	
	
	});
});