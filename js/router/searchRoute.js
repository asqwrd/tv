var searchRouter = Backbone.Router.extend({

    routes: {
        "searching": "displayShows",
		
    },

    displayShows: function() {
	   var messageCollection = new SearchResults();
	   messageCollection.searchTerm=$('#search').val();
		var timeListView = new SearchResultsView({model:messageCollection});
		messageCollection.fetch({
		   success: function () {
			   $('#container').html(timeListView.render().el);
		   }
	   });

    },
	
});