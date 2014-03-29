// tv/js/views/SearchListView.js
define( ["parse","underscore","backbone","views/searchGridView","collections/SearchResults","views/detailListSearchView"], function (Parse, _,Backbone,SearchGridView,searchCollection,DetailListSearchView ) {
var SearchListView = Parse.View.extend({

	tagName: 'ul',
	attributes : function () {
    return {
      id : "searchResults"
    };
  },
  el: "#searchResults",
   initialize: function(){
	_.bindAll(this, 'render',"details");
	var self=this;
	this.collection = new searchCollection();
	this.collection.fetch({reset:true});
	//this.render();
	 
	 //this.collection.on('reset',this.render);
	 
	 /*this.collection.bind('add', this.render);
	 this.collection.bind('change', this.render);*/
	//this.collection.on('fetch', this.details);
	
	
  
  
  },
   events: {
		'click li[id^="search_"]': 'details',	
	
	},
  details: function(e){	
	var self = this;
		e.preventDefault();
		var id = e.currentTarget.id;
		//console.log(id);
		$('#searchGrid').fadeOut();
		$('[id^="detailSearch_"]').hide();
		$('#detailSearchResults').fadeIn();
		 // hide the other divs
		// $('#show_3256_0100_pm_0').attr('id').slice(-9,$('#show_3256_0100_pm_0').attr('id').length-2);
		$('[id^="detailSearch_'+id.slice(7,id.length)+'"]').fadeIn(100);	
		//console.log('[id^="detailSearch_'+id.slice(-9,id.length)+'"]');
		$('.whichGrid').val("#searchGrid");

	},
	/*search: function(e){
			e.preventDefault();
	var id = e.currentTarget.id;
	console.log(id);
		filter = this.collection.search(id);
		this.collection = filter;
		this.render();
	
	
	
	},*/

    render: function(eventName) {
		$('#searchGrid').append('<h1 class="noshow">No Shows were found</h1>');
		
        _.each(eventName.models, function (msg) {
            $(this.el).append(new SearchGridView({model:msg}).render().el);
			
        }, this);
		//console.log($(this.el));
		if($("#searchResults li").length==0)
			$('.noshow').fadeIn();
		else
			$('.noshow').fadeOut();
		//$(this.el).children().first().fadeIn();
        //return this;
		
    }

});
return SearchListView;
});

