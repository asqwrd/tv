// tv/js/views/detailListView.js
define( ["parse","underscore","backbone","views/detailView","collections/timeSlot","models/favorite","collections/favoriteCollection","views/favTimeSlot"], function (Parse, _,Backbone,detailView,timeCollection,favModel,favCollection,favTimeListView ) {
var DetailListView = Parse.View.extend({

	//tagName: 'ul',
	attributes : function () {
    return {
      id : "detailResults"
    };
  },
  el:'#detailResults',
  initialize: function(){
		_.bindAll(this, 'render','close','add','remove');
		var self=this;
		this.view = new favTimeListView();
		//this.view.collection = new favCollection();
		//this.view.collection.query = new Parse.Query(favModel);
		//this.view.collection.query.equalTo("user", Parse.User.current());
		//this.view.collection.fetch({reset:true});
		
		this.collection = new timeCollection();
		this.collection.fetch({reset:true});
		
		
		//this.render();
		 
		 this.collection.on('reset',self.render);
		 this.view.collection.on('reset',this.view.update);
		// this.view.collection.on('sync',this.view.render);
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
		'click span[id^="close_"]': 'close',
		'click button[id^="add_"]': 'add',
		'click button[id^="remove_"]': 'remov',
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
					$('[id^="detail_"]').fadeOut(); // hide the other divs
					
				if($('.whichGrid').val()=="#favGrid"){	
					$('[id^="favs_"]').hide(); // hide the other divs
					$('#detailResults').hide();
					$('#showGrid').hide();
					$('#favGrid').fadeIn(800);
					$('[id^="favs_'+id.slice(-7)+'"]').fadeIn();
					$('[id^="favo_'+id.slice(-7)+'"]').addClass('active');
					$('[id^="alls_'+id.slice(-7)+'"]').removeClass('active');
				}
				else{
					$($('.whichGrid').val()).fadeIn(800);
				}
				if($('[id^="favs_'+id.slice(-7)+'"] li').length==0 || $('[id^="favs_'+id.slice(-7)+'"]').length==0) {
					console.log($('[id^="favs_'+id.slice(-7)+'"]'));
					$('.noshow').show();		
					$('.noair').hide();

				}
				else if($('[id^="favs_'+id.slice(-7)+'"] li').children(':visible').length == 0){
					$('.noair').show();
					$('.noshow').hide();
				}
				else{
					$('.noshow').hide();
					$('.noair').hide();
				}
				
	},
	add: function(e){
		e.preventDefault();
		var self=this;
		var id = e.currentTarget.id;
		var formData = {};
		var selector = "#form_"+id.slice(4)+" div";
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
				$('#add_'+id.slice(4)).hide();
				$('#remove_'+id.slice(4)).fadeIn();
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
		$('#add_'+id.slice(4)).hide();
		$('#remove_'+id.slice(4)).fadeIn();
		console.log(formData);
		console.log(selector);	
	 },
	 remov: function(e){
		e.preventDefault();
		var self=this;
		var id = e.currentTarget.id;
		var formData = {};
		var selector = "#form_"+id.slice(7)+" div";
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
								var temp;
								/*if(item.showid === formData['showid'] && item.shownum === formData['shownum'])
									temp=item;*/
							
								 return item.showid !== formData['showid'];
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
			$('#add_'+id.slice(7)).fadeIn();
				$('#remove_'+id.slice(7)).hide();
	 
	 },
    render: function(eventName) {
		var self = this;
        _.each(this.collection.models, function (msg) {
				$(self.el).append(new detailView({model:msg}).render().el).hide();
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
							//console.log($('#show_'+this.id.slice(5)));
							if($('#shows_'+favShowid.slice(6)+':has(#show_'+this.id.slice(5)+')').length==0){
								//$(this).hide();
							}
							else{
								$('#add_'+this.id.slice(5)).hide();
								$('#remove_'+this.id.slice(5)).fadeIn();
							
							}
							
						
						});
					}
				});
				
		
$('#showGrid').children('[id^="shows_"]').each(function(timeSlot){
					//console.log(this.id);
					//if($('#'+this.id+':has(li[id^="show_"])').length>0){
						//console.log($('#'+this.id+':has(li[id^="favi_"])'));
						var Show=$('#'+this.id+':has(li[id^="show_"])');
						var Showid = "#"+this.id;
						//console.log(favShowid);
						//var allShow = $('#showGrid:has(li[id^="show_"'+favShow.])')
						Show.children('li[id^="show_"]').each(function(){
							//console.log('Show SHow #show_'+this.id.slice(5));
							$(".add_"+this.id.slice(5)+":not(:last)").remove();
							$(".remove_"+this.id.slice(5)+":not(:last)").remove();
							$(".close_"+this.id.slice(5)+":not(:first)").remove();
							
						});
					//}
				});
        //return this;
    }

});
return DetailListView;
});

