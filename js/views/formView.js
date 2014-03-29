// tv/js/views/ShowListView.js
define( ["parse","underscore","backbone","views/showGridView","collections/timeSlot","views/detailListSearchView","views/SearchListView","collections/SearchResults","text!templates/searchform.html","classie"], function (Parse, _,Backbone,ShowGridView,timeCollection,DetailListSearchView,SearchListView,SearchResults,showTemplate,classie ) {
var formView = Parse.View.extend({

	
  el: "#searchDiv",
  
   initialize: function(){
	_.bindAll(this, 'render',"details","searching");
	var self=this;
	this.detail = new DetailListSearchView();
	this.search = new SearchListView();
		this.search.collection = new SearchResults();
		this.search.collection.fetch({reset:true});
	/*this.detail = new DetailListView();
	this.detail.collection = new timeCollection();
	this.collection = new timeCollection();
	this.collection.fetch({reset:true});
	this.detail.collection.fetch();
	//this.render();
	 
	 this.collection.on('reset',this.render);
	 
	 /*this.collection.bind('add', this.render);
	 this.collection.bind('change', this.render);*/
	 //this.search.collection.on('reset', this.search.render);
	this.render();
	
  
  
  },
    template1:_.template(showTemplate),

   events: {
	'click button#go': 'searching',

	
	
	},
	searching: function(e){
		var self = this;
		//self.search.collection.fetch({reset:true});
				e.preventDefault();
		$('#searchLoad').show().delay(1000).fadeOut();
		$('#searchResults').empty();
		var id = e.currentTarget.id;
		var input = $('#find').val();
		//console.log(input);
		//console.log(input.length);
		if(input.length==0){
			$('#find').focus();
			$('#seachResults').fadeOut();
			$('#showGrid').fadeIn();
		}
		else{
			var filter = self.search.collection.search(input);
			//console.log(filter);
			self.search.render(filter);
			self.detail.render(filter);
			$('#detailResults').hide();
			$('#showGrid').hide();
			$('#favGrid').hide();
			$('#searchGrid').fadeIn();
		}
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&($("#trigger-overlay").css("display") == "block" )){
			$('#date').html('<h1>'+input+"</h1>");
			this.toggleOverlay();		
		}
	},
  details: function(e){	
	var self = this;
		e.preventDefault();
		var id = e.currentTarget.id;
		self.detail.render(id.slice(5,id.length-10));
		$('#showGrid').fadeOut();
		$('[id^="detail_"]').hide();
		$('#detailResults').fadeIn(1000);
		 // hide the other divs
		// $('#show_3256_0100_pm_0').attr('id').slice(-9,$('#show_3256_0100_pm_0').attr('id').length-2);
		$('[id^="detail_'+id.slice(5,id.length)+'"]').fadeIn(1000);	
		console.log('[id^="detail_'+id.slice(-9,id.length)+'"]');
		$('.whichGrid').val("#showGrid");

	},

    render: function(eventName) {
		$(this.el).append(this.template1());
    },
	toggleOverlay: function() {
	var container = document.querySelector( 'section#grid' ),
		triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'section.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		closeLink = overlay.querySelector('.closes');
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.remove( container, 'overlay-open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
			classie.add( container, 'overlay-open' );
		}
		
	}

});
return formView;
});

