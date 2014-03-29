// tv/js/views/favTimeSlot.js
define( ["parse","underscore","backbone","views/detailListView","views/favShowView","collections/favoriteCollection","models/favorite","collections/timeSlot"], function (Parse, _,Backbone,DetailListView,favShowView,favCollection,favModel,timeCollection ) {
var favTimeListView = Parse.View.extend({

attributes : function () {
    return {
      id : "favGrid"
    };
  },
  el:'#favGrid',
  initialize: function(){
   this.on('all', function(eventName){
			console.log('Name of View: ' + eventName);
		});
	_.bindAll(this, 'render','details','update');
	var self=this;
	this.collection = new favCollection();
	this.timeslot = new timeCollection();
	this.collection.query = new Parse.Query(favModel);
	this.collection.query.equalTo("user", Parse.User.current());
	this.collection.fetch({reset:true});
	this.timeslot.fetch({reset:true});
	//this.render();
	 this.collection.on('reset',self.render);
	 //self.update();
	 this.collection.on('sync',self.render);
	 this.collection.bind('change',self.render);
	 this.collection.bind('add',self.render);
	 this.collection.bind('destroy',self.render);
	
	 /*this.collection.bind('add', this.render);
	 this.collection.bind('change', this.render);*/
	//this.collection.on('fetch', this.details);
	
	
  
  
  },
  events: {
	'click li[id^="favi_"]': "details"
  
  },
    render: function(eventName) {
	var self = this;
	
	this.$el.empty();
	 //this.collection.each(function( msg ){
       _.each(this.collection.models, function (msg) {
            self.$el.append(new favShowView({model:msg}).render().el);
        });
	
		this.$el.hide();
		//check if favorites airs on current day
		$('#favGrid').append('<h1 class="noshow">You are not following any shows in this time slot</h1>');
		$('#favGrid').append('<h1 class="noair">None of the shows you follow air today</h1>');
				this.$el.children('[id^="favs_"]').each(function(timeSlot){
					//console.log(this.id);
					if($('#'+this.id+':has(li[id^="favi_"])').length>0){
						//console.log($('#'+this.id+':has(li[id^="favi_"])'));
						var favShow=$('#'+this.id+':has(li[id^="favi_"])');
						var favShowid = "#"+this.id;
						//console.log(favShowid);
						//var allShow = $('#showGrid:has(li[id^="show_"'+favShow.])')
						favShow.children('li[id^="favi_"]').each(function(){
						//console.log($('#show_'+this.id.slice(5)));
						//console.log($('#shows_'+favShowid.slice(6)+':has(#show_'+this.id.slice(5)+')').length);
						//console.log(this.id.slice(5));
						//console.log("ID: " +this.id.slice(5)+" Length: "+$('#shows_'+favShowid.slice(6)+':has(#show_'+this.id.slice(5)+')').length);
							if($('#shows_'+favShowid.slice(6)+':has(#show_'+this.id.slice(5)+')').length==0){
								$(this).hide();
							}
							else{
								$('#add_'+this.id.slice(5)).hide();
								$('#remove_'+this.id.slice(5)).fadeIn();
							}
							if($('[id^="favs_'+this.id.slice(5)+'"] li').length==0 ) {
								//console.log($('[id^="favs_'+this.id.slice(5)+'"]'));
								$('.noshow').show();
							}
							else{
								$('.noshow').hide();
							}
							
							
						
						});
					}
				});
				//console.log(this);
	   return this;
    },
	details: function(e){
					var self =this;
					e.preventDefault();
					var id = e.currentTarget.id
					$('#favGrid').fadeOut();
					$('#searchGrid').fadeOut();
					$('[id^="detail_"]').hide();
					$('#detailResults').fadeIn();
					 // hide the other divs
					$('[id^="detail_'+id.slice(5,id.length)+'"]').scrollTop(0);
					$('[id^="detail_'+id.slice(5)+'"]').fadeIn(500);
					$('.whichGrid').val("#favGrid");	//console.log(id);
					$('#add_'+this.id.slice(5)).hide();
					$('#remove_'+this.id.slice(5)).fadeIn();
	},
	update: function(e){
		
				var self= this;
				var count=0;
		_.each(this.timeslot.models, function (timeSlot) {
			_.each(self.collection.models, function (favs) {
				if(favs.get('time') == timeSlot.get('time')){
					_.each(timeSlot.get('shows'), function( allshows){
						_.each(favs.get('shows'), function( favshows){
							if((favshows.showid == allshows.showid) && (favshows.image !== allshows.image)){
								favshows.image = allshows.image;
								favs.save();
							
							}
						});
					});
				}
				//console.log(timeSlot.get('shows'));
				_.each(timeSlot.get('shows'), function( allshows){
						_.each(favs.get('shows'), function( favshows){
							//for (var showid in timeSlot.get('shows')) {
								if (allshows.showid == favshows.showid && allshows.classification !=="Sports"){
								  // console.log(favshows.showid);
								   if(favshows.airtime!=timeSlot.get('time')){
										favshows.airtime=timeSlot.get('time');
										favs.save();
										var showsArray = _.filter(favs.get('shows'), function(item) {
								
											return (item.airtime !== favshows.airtime);
										});
										console.log(showsArray);
										self.collection.query.equalTo("time",timeSlot.get('time'));
										self.collection.query.find({
											 success: function(results) {
												console.log(results.length);
												
												if(results.length<=0){
													/*var showsArray = _.filter(favs.get('shows'), function(item) {
							
														 return (item.showid !== favshows.showid);
													});*/
													//favs.set('shows',showsArray);
													//favs.save();
													
													/*var mod = new favModel({time: 		timeSlot.get('time'),
																shows:   	[favshows],
																starred:		true,
																user:    	Parse.User.current(),
																ACL:     	new Parse.ACL(Parse.User.current())});
													
													//console.log(query.first);
													mod.save();
													self.collection.add(mod);*/
													
													//if(self.collection.contains(favs)==true)
														self.collection.create({
																time: 		timeSlot.get('time'),
																shows:   	[favshows],
																starred:		true,
																user:    	Parse.User.current(),
																ACL:     	new Parse.ACL(Parse.User.current())
														},{wait: true})
													if($('#'+favshows.showid).length == 0)
														$('#notify').append('<li id ="'+favshows.showid+'">'+favshows.name +  " airs at a new time - "+favshows.airtime+'</li>');
														count++;
														
														$(".icon-info-sign").html(count);
														$("#empty").hide();
												}
												else {
													//self.collection.find(function(model) { 
														//if(timeSlot.get('time') == favs.get('time')){
															
															//favshows = showsArray;
														//}
														console.log(showsArray.length);
														var hasTag = function(showid) {
														var i = null;
														for (i = 0; favs.get('shows').length > i; i += 1) {
															if (timeSlot.get('time') == favshows.airtime && favs.get('shows')[i].showid === showid) {
																//var temp=favs.get('shows')[i];
																return true;
															}
														}
														 
														return false;
													};
														//var test = hasTag(favshows.showid);
														var temp = favshows;
														//favs.set('shows',showsArray);
														//favs.get('shows').splice("airtime",favshows.airtime);
														//favs.save();
														var test = hasTag(favshows.showid);

														//console.log(test);
														self.collection.find(function(model) { 
															if(timeSlot.get('time') == model.get('time') && test==true){
																//favs.set('shows',showsArray);
																//favs.save();
																console.log(model.attributes.shows);
																if(model.attributes.shows.length>=1){
																	model.attributes.shows[model.attributes.shows.length-1] = temp;
																	count++;
																	count-=1;
																}
																else{
																	model.attributes.shows[model.attributes.shows.length] = temp;
																	count++;
																	//count+=2;
																}
																model.save();
																if($('#'+temp.showid).length == 0)
																	$('#notify').append('<li id ="'+temp.showid+'">'+temp.name+ " airs at a new time - "+temp.airtime+'</li>');
																	if(count>0)
																	$(".icon-info-sign").html(count);
																	$("#empty").hide();
															}
														});
														
													//});
												}
												
												
											}
											
										});

								   
								   }
								  //favshows.splice("showid",favshows.showid);
								 // return;
								  // console.log(favshows);
								}
							});
						});
				//});
			});
		});
		//console.log($(".icon-info-sign"));
		//if($(".icon-info-sign").length <0)
			
	}

});
return favTimeListView;
});

