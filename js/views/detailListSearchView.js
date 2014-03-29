// tv/js/views/detailListSearchView.js
define( ["parse","underscore","backbone","views/detailSearchView","collections/SearchResults","models/favorite","collections/favoriteCollection","views/favTimeSlot"], function (Parse, _,Backbone,detailSearchView,searchCollection,favModel,favCollection,favTimeListView ) {
var DetailListSearchView = Parse.View.extend({

	//tagName: 'ul',
	attributes : function () {
    return {
      id : "detailSearchResults"
    };
  },
  el:'#detailSearchResults',
  initialize: function(){
		_.bindAll(this, 'render','close','add','remove');
		var self=this;
		this.view = new favTimeListView();
		//this.view.collection = new favCollection();
		//this.view.collection.query = new Parse.Query(favModel);
		//this.view.collection.query.equalTo("user", Parse.User.current());
		//this.view.collection.fetch();
		
		this.collection = new searchCollection();
		this.collection.fetch({reset:true});
		
		
		//this.render();
		 
		 //this.collection.on('reset',self.render);
		 //this.view.collection.on('reset',this.view.render);
		//this.view.collection.on('sync',this.view.render);
		 //this.bind('rendered',self.accordion);
		  
		 /*this.collection.bind('add', this.render);
		 this.collection.bind('change', this.render);*/
		//this.collection.on('fetch', this.details);
		
	// this.view.collection.bind('change',this.view.render);
	// this.view.collection.on('add',this.view.render);
	 //this.view.collection.on('destroy',this.view.render);
	  //this.view.mo.bind('destroy', this.view.remove);
	  
  },
  events: {
		'click span[id^="closeSearch_"]': 'close',
		'click button[id^="addSearch_"]': 'add',
		'click button[id^="removeSearch_"]': 'remov',
		//'click li[id^="lime_"]': 'allshows',
		//'click a[id^="alls_"]': 'allshows',
		//'click a[id^="favo_"]': 'favshows',
		//'click li': 'allshows',
	
	
	},
	close: function(e){
				var self = this;
					e.preventDefault();
					var id = e.currentTarget.id
					console.log(id);
					$('#detailResults').fadeOut();
					$('[id^="detailSearch_"]').fadeOut(); // hide the other divs
					$('.noshow').hide();
					
				//if($('.whichGrid').val()=="#favGrid"){	
					//$('[id^="favs_"]').hide(); // hide the other divs
					$('#detailSearchResults').hide();
					$('#searchGrid').fadeIn(800);
					/*$('[id^="favs_'+id.slice(-7)+'"]').fadeIn();
					$('[id^="favo_'+id.slice(-7)+'"]').addClass('active');
					$('[id^="alls_'+id.slice(-7)+'"]').removeClass('active');*/
			/*	}
				else{
					$($('.whichGrid').val()).fadeIn(800);
				}*/
				
	},
	add: function(e){
		e.preventDefault();
		var self=this;
		var id = e.currentTarget.id;
		var formData = {};
		var selector = "#formSearch_"+id.slice(10)+" div";
		$( selector ).children( 'input' ).each( function( i, el ) {
			if( $( el ).val() != '' )
			{
				formData[ el.id ] = $( el ).val();
			}
		});
		self.view.collection.query.equalTo("time",formData["airtime"]);
		self.view.collection.query.find({
			 success: function(results) {
				console.log(results.length);
				$('#addSearch_'+id.slice(10)).hide();
				$('#removeSearch_'+id.slice(10)).fadeIn();
				if(results.length<=0){
						self.view.collection.create({
						time: 		formData["airtime"],
						shows:   	[formData],
						starred:		true,
						user:    	Parse.User.current(),
						ACL:     	new Parse.ACL(Parse.User.current())
					});
				  }
				  else{
					var showsArray;
					var model_temp;
					
					console.log("collection");
					console.log(self.view.collection.attributes);
					results[0].attributes.shows.push(formData);
					console.log("new results");
					console.log(results);
					self.view.collection.find(function(model) { 
						
						if(model.get('time') == formData['airtime']){
							console.log(model.get('time'));
							model.attributes.shows.push(formData);
							//showsArray = model.get('shows');
							//showsArray.push(formData);
							//console.log(model.attributes.shows);//.attributes//.shows.push(formData); 
							model.save();
							//self.view.collection.remove(model);
							//model.destroy();
							//favView.collection.set(model_temp,{add:true,remove:false});
							//favView.collection.add(model_temp);
							//favView.collection.add(model_temp);
							/*self.view.collection.create({
								time: 		formData["airtime"],
								shows:   	showsArray,
								starred:	true,
								user:    	Parse.User.current(),
								ACL:     	new Parse.ACL(Parse.User.current())
							});*/
						}
					
					});	  
					console.log("new collection");					
					console.log(self.view.collection);				  
				}				
			}	
		});
		$('#addSearch_'+id.slice(10)).hide();
		$('#removeSearch_'+id.slice(10)).fadeIn();
		$('.noshow').hide();
		console.log(formData);
		console.log(selector);	
	 },
	 remov: function(e){
		e.preventDefault();
		var self=this;
		var id = e.currentTarget.id;
		var formData = {};
		var selector = "#formSearch_"+id.slice(13)+" div";
		$( selector ).children( 'input' ).each( function( i, el ) {
			if( $( el ).val() != '' )
			{
				formData[ el.id ] = $( el ).val();
			}
		});
		self.view.collection.query.equalTo("time",formData["airtime"]);
		self.view.collection.query.find({
			 success: function(results) {
				console.log(results);
					var showsArray;
					console.log("collection");
					console.log(self.view.collection.attributes);
					//results[0].attributes.shows.push(formData);
					console.log("new results");
					console.log(results);
					self.view.collection.find(function(model) { 
						if(model.get('time') == formData['airtime']){
							console.log(model.get('time'));
							showsArray = _.filter(model.attributes.shows, function(item) {
							
								 return (item.showid !== formData['showid']);
							});//= model.attributes.shows
							model.attributes.shows = showsArray;
							console.log(model.attributes.shows);//.attributes//.shows.push(formData); 
							//console.log(showsArray);
							model.save();
							/*self.view.collection.remove(model);
							model.destroy();
							//favView.collection.set(model_temp,{add:true,remove:false});
							//favView.collection.add(model_temp);
							self.view.collection.create({
								time: 		formData["airtime"],
								shows:   	showsArray,
								starred:	true,
								user:    	Parse.User.current(),
								ACL:     	new Parse.ACL(Parse.User.current())
							});*/
						}
					});
				}
				
			});
			$('#addSearch_'+id.slice(13)).fadeIn();
				$('#removeSearch_'+id.slice(13)).hide();
				$('.noshow').hide();
	 
	 },
    render: function(eventName) {
		var self = this;
		$(self.el).empty();
        _.each(eventName.models, function (msg) {
				$(self.el).append(new detailSearchView({model:msg}).render().el).hide();
        }, this);
		this.view.$el.children('[id^="favs_"]').each(function(timeSlot){
					//console.log(this.id);
					if($('#'+this.id+':has(li[id^="favi_"])').length>0){
						//console.log($('#'+this.id+':has(li[id^="favi_"])'));
						var favShow=$('#'+this.id+':has(li[id^="favi_"])');
						var favShowid = "#"+this.id;
						//console.log(favShowid);
						//var allShow = $('#showGrid:has(li[id^="show_"'+favShow.])')
						favShow.children('li[id^="favi_"]').each(function(){
							//console.log($('#search_'+this.id.slice(5,-8)));
							if($('#searchResults:has(#search_'+this.id.slice(5,-8)+')')){
								$('#addSearch_'+this.id.slice(5,-8)).hide();
								$('#removeSearch_'+this.id.slice(5,-8)).fadeIn();							
							}
							
						
						});
					}
				});
        return this;
    }

});
return DetailListSearchView;
});

