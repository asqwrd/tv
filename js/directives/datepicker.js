define(['./module'], function (directives) {
    'use strict';
    directives.directive('datepicker', function () {
		return {
			// Restrict it to be an attribute in this case
			restrict: 'A',
			// responsible for registering DOM listeners as well as updating the DOM
			link: function(scope, element, attrs) {
				//setTimeout(function(){
					$(element).datepicker({inline: true,showOtherMonths: true}).datepicker('widget').wrap('<div class="ll-skin-nigran"/>');
				//},300);
			}
		};
	
	
	
	
	});
});