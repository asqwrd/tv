define( ['parse',"underscore","jquery","backbone","models/timeSlot","collections/timeSlot","views/timeSlot","views/ShowListView","views/detailListView","views/favTimeSlot","models/favorite","collections/favoriteCollection","views/appView"], function (Parse, _,$, Backbone, timeModel, timeCollection,TimeListView,ShowListView,DetailListView,favTimeListView,favModel,favCollection,AppView ) {
var timeRouter = Parse.Router.extend({

    routes: {
        "": "displayShows",
    },
	
    displayShows: function() {
		var self = this;
		var timeCollec = new timeCollection();
		new TimeListView();
		 new ShowListView();
		var detailListView = new DetailListView({model:timeCollec});
		//new AppView();
		new favTimeListView();
		/*favView.collection.query = new Parse.Query(favModel);
		favView.collection.query.equalTo("user", Parse.User.current());*/
		
		/*timeCollec.fetch({
		   success: function () {
			   $('#st-accordion').html(timeListView.render().el);
			   $('#grid').append(showListView.render().el);
			   $('#grid').append(detailListView.render().el);
			   $('#st-accordion').accordion({
					oneOpenedItem	: true
				});
				$('[id^="shows_"]').hide();
				$('[id^="detail_"]').hide();
				$('#detailResults').hide();
				
				 $('a[id^="time_"],a[id^="alls_"]').click(function(e){
					e.preventDefault();
					$('[id^="shows_"]').hide(); // hide the other divs
					$('#detailResults').hide();
					$('#showGrid').fadeIn();
					$('[id^="shows_'+this.id.slice(5)+'"]').fadeIn();
					$('[id^="alls_'+this.id.slice(5)+'"]').addClass('active');
					$('[id^="favo_'+this.id.slice(5)+'"]').removeClass('active');
					console.log('#shows_'+this.id.slice(5));
				});
				 $('a[id^="favo_"]').click(function(e){
					e.preventDefault();
					$('[id^="favs_"]').hide(); // hide the other divs
					$('#detailResults').hide();
					$('#showGrid').hide();
					$('#favGrid').fadeIn();
					$('[id^="favs_'+this.id.slice(5)+'"]').fadeIn();
					$('[id^="favo_'+this.id.slice(5)+'"]').addClass('active');
					$('[id^="alls_'+this.id.slice(5)+'"]').removeClass('active');
					console.log('#shows_'+this.id.slice(5));
					//$('#shows_'+this.id.slice(5)).show();
				});
				
				$('li[id^="show_"]').click(function(e){
					e.preventDefault();
					$('#showGrid').hide();
					$('#detailResults').fadeIn();
					$('[id^="detail_"]').hide(); // hide the other divs
					$('[id^="detail_'+this.id.slice(5)+'"]').fadeIn();
					//$('[id^="all_'+this.id.slice(5)+'"]').addClass('active');
					console.log('#show_'+this.id.slice(5));
					//$('#detail_'+this.id.slice(5)).show();
				});
				
				
				
				
				$('span[id^="close_"]').click(function(e){
					e.preventDefault();
					$('#detailResults').hide();
					$('[id^="detail_"]').hide(); // hide the other divs
					$('#showGrid').fadeIn();
				});
		   }
	   });
	   
	  /* favView.collection.fetch({
	   
			success: function(){
			console.log(favView.collection.models);
				$('#grid').append(favView.render().el);
				/*$('li[id^="favi_"]').click(function(e){
					e.preventDefault();
					$('#favGrid').hide();
					$('#detailResults').fadeIn();
					$('[id^="detail_"]').hide(); // hide the other divs
					$('[id^="detail_'+this.id.slice(5)+'"]').fadeIn();
					//$('[id^="all_'+this.id.slice(5)+'"]').addClass('active');
					console.log('#show_'+this.id.slice(5));
					console.log(favView.collection);
					//$('#detail_'+this.id.slice(5)).show();
				});
				
				//check if favorites airs on current day
				$('#favGrid').children('[id^="favs_"]').each(function(timeSlot){
					console.log(this.id);
					if($('#'+this.id+':has(li[id^="favi_"])').length>0){
						console.log($('#'+this.id+':has(li[id^="favi_"])'));
						var favShow=$('#'+this.id+':has(li[id^="favi_"])');
						var favShowid = "#"+this.id;
						console.log(favShowid);
						//var allShow = $('#showGrid:has(li[id^="show_"'+favShow.])')
						favShow.children('li[id^="favi_"]').each(function(){
							console.log(this.id);
							if($('#shows_'+favShowid.slice(6)+':has(#show_'+this.id.slice(5)+')').length==0){
								$(this).hide();
							}
							
						
						});
					}
				
				
				});
				//adding shows
				$('button[id^="add_"]').click(function(e){
						e.preventDefault();
						var escapeSpecial = function (expression) {
										return expression.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
						};
						var formData = {};
						var selector = "#form_"+this.id.slice(4)+" div";
						$( selector ).children( 'input' ).each( function( i, el ) {
							if( $( el ).val() != '' )
							{
								formData[ el.id ] = $( el ).val();
							}
						});
						//favView.collection.query =  new Parse.Query(favModel);
						favView.collection.query.equalTo("time",formData["airtime"]);
						favView.collection.query.find({
							 success: function(results) {
								console.log(results);
								if(results.length==0){
									favView.collection.create({
									time: 		formData["airtime"],
									shows:   	[formData],
									//day:	
									user:    	Parse.User.current(),
									ACL:     	new Parse.ACL(Parse.User.current())
								  });
								  }
								  else{
									var showsArray;
									var model_temp;
									console.log("collection");
									console.log(favView.collection.attributes);
									results[0].attributes.shows.push(formData);
									console.log("new results");
									console.log(results);
									favView.collection.find(function(model) { 
															if(model.get('time') == formData['airtime']){
																console.log(model.get('time'));
																model.attributes.shows.push(formData);
																showsArray = model.attributes.shows
																console.log(model.attributes.shows);//.attributes//.shows.push(formData); 
																//model.save();
																//model_temp = model; 
																model.destroy();
																//favView.collection.set(model_temp,{add:true,remove:false});
																
																//favView.collection.add(model_temp);
																//favView.collection.add(model_temp);
																favView.collection.create({
																		time: 		formData["airtime"],
																		shows:   	showsArray,
																		//day:	
																		user:    	Parse.User.current(),
																		ACL:     	new Parse.ACL(Parse.User.current())
																});
															  
																
															}
														
														});
										
										
										  
										
										//favView.collection.reset();
														
									console.log("new collection");					
									console.log(favView.collection);
								  
								  }
								
								
								//console.log(favView.collection.query);
								
							 },
							 error: function(){
								
														 
							 
							 }
							 });
							 console.log(formData);
						console.log(selector);
						
							 
						});
						//console.log(favView.collection.models[0].attributes.shows);
		
			
			}
		
		
		
		});*/

		

    },

	
});

return timeRouter;
});

