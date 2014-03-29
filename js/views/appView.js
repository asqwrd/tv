// tv/js/views/AppView.js
define( ["parse","underscore","backbone","views/favTimeSlot","collections/favoriteCollection","models/favorite"], function (Parse, _,Backbone,favTimeListView,favCollection,favModel ) {
var AppView = Parse.View.extend({

initialize: function(){
	new TimeListView();
			new ShowListView();
			new favTimeListView();
			new DetailListView();
			
			this.render();

},
render:function(){
	this.delegateEvents();



}
});
return AppView;

});