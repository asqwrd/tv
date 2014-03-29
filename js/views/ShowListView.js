// tv/js/views/ShowListView.js
define( ["parse","underscore","backbone","views/showGridView","collections/timeSlot","views/detailListView","views/SearchListView","collections/SearchResults","text!templates/searchform.html","moment"], function (Parse, _,Backbone,ShowGridView,timeCollection,DetailListView,SearchListView,SearchResults,showTemplate,moment ) {
var ShowListView = Parse.View.extend({

	//tagName: 'ul',
	attributes : function () {
    return {
      id : "showGrid"
    };
  },
  el: "#showGrid",
   initialize: function(){
	_.bindAll(this, 'render',"details");
	var self=this;
	
	
	this.collection = new timeCollection();
	this.collection.fetch({reset:true});
	//this.render();
	 
	 this.collection.on('reset',this.render);
	 
	 /*this.collection.bind('add', this.render);
	 this.collection.bind('change', this.render);*/
	//this.collection.on('fetch', this.details);
	
	
  
  
  },

   events: {
		'click li[id^="show_"]': 'details',

	
	
	},
	
  details: function(e){	
	var self = this;
		e.preventDefault();
		var id = e.currentTarget.id;
		$('#showGrid').fadeOut();
		$('#searchGrid').fadeOut();
		$('[id^="detail_"]').hide();
		$('#detailResults').fadeIn(1000);
		 // hide the other divs
		// $('#show_3256_0100_pm_0').attr('id').slice(-9,$('#show_3256_0100_pm_0').attr('id').length-2);
		$('[id^="detail_'+id.slice(5,id.length)+'"]').scrollTop(0);
		$('[id^="detail_'+id.slice(5,id.length)+'"]').fadeIn(1000);	
		
		//console.log('[id^="detail_'+id.slice(-9,id.length)+'"]');
		$('.whichGrid').val("#showGrid");

	},

    render: function(eventName) {
        _.each(this.collection.models, function (msg) {
		var now = moment().startOf('hour');;
		var d = moment(msg.get('time'), 'hh:mm a');
		
		//console.log(now);
			if(d.startOf('hour').isAfter(now)||d.startOf('hour').isSame(now))
            $(this.el).append(new ShowGridView({model:msg}).render().el);
			
        }, this);
		
		$(this.el).children().first().fadeIn();
        //return this;
		
    }

});
return ShowListView;
});

