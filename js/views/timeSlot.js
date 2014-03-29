// tv/js/views/timeSlot.js
define( ["parse","underscore","jScroll","backbone","views/show","collections/timeSlot","classie","modernizer","moment","views/detailListView","views/SearchListView","collections/SearchResults","text!templates/searchform.html","moment"], function (Parse, _,jScroll,Backbone,ShowView,timeCollection,classie,Modernizer,moment,detailListView,SearchListView,SearchResults,showTemplate,moment ) {
var TimeListView = Parse.View.extend({

	tagName: 'ul',
	el:"#times",
	
	initialize: function(){
		_.bindAll(this, 'render','allshows','favshows','toggleOverlay');
		var self=this;

		this.collection = new timeCollection();
		this.collection.fetch({reset:true});
		//this.render();
		 
		 this.collection.on('reset',self.render);
		 //this.search.collection.on('reset',self.search.render);
		 //this.bind('rendered',self.accordion);
		  
		 /*this.collection.bind('add', this.render);
		 this.collection.bind('change', this.render);*/
		//this.collection.on('fetch', this.details);
		
		
	  
  
  },
  template1:_.template(showTemplate),
  events: {
		'click a[id^="time_"]': 'allshows',
		'click a[id^="alls_"]': 'allshows',
		'click a[id^="favo_"]': 'favshows',
		'click #trigger-overlay': 'toggleOverlay',
		'click button.overlay-close': 'toggleOverlay',

	
	
	},
	
  allshows: function(e){
	 var id = e.currentTarget.id
	 var self=this;
	 e.preventDefault();
	$('[id^="shows_"]').hide(); // hide the other divs
	$('#detailResults').hide();
	$('#favGrid').hide();
	$('#showGrid').fadeIn();
	$('[id^="shows_'+id.slice(5)+'"]').fadeIn();
	$('[id^="alls_'+id.slice(5)+'"]').addClass('active');
	$('[id^="favo_'+id.slice(5)+'"]').removeClass('active');
	console.log(e.currentTarget);
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&($("#trigger-overlay").css("display") == "block" )){
		this.toggleOverlay();
		$('#date').html('<h1>'+id.slice(5).substring(0, 2)+":"+id.slice(5).substring(2,id.slice(5).length ).replace("_"," ")+ " "+ moment().format("dddd MM/DD")+"</h1>");

	}
	//$(this.detail.el).empty();
	$('#find').val("");
	console.log(id);

  },
  favshows: function(e){
	 var id = e.currentTarget.id
	$('[id^="favs_"]').hide(); // hide the other divs
	$('#detailResults').hide();
	$('#showGrid').hide();
	$('#favGrid').fadeIn();
	$('[id^="favs_'+id.slice(5)+'"]').fadeIn();
	$('[id^="favo_'+id.slice(5)+'"]').addClass('active');
	$('[id^="alls_'+id.slice(5)+'"]').removeClass('active');
	if($('[id^="favs_'+id.slice(5)+'"] li').length==0 || $('[id^="favs_'+id.slice(5)+'"]').length==0) {
		console.log($('[id^="favs_'+id.slice(5)+'"]'));
		$('.noshow').show();		
		$('.noair').hide();

	}
	else if($('[id^="favs_'+id.slice(5)+'"] li').children(':visible').length == 0){
		$('.noair').show();
		$('.noshow').hide();
	}
	else{
		$('.noshow').hide();
		$('.noair').hide();
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&($("#trigger-overlay").css("display") == "block" )){
		this.toggleOverlay();
		$('#date').html('<h1>'+id.slice(5).substring(0, 2)+":"+id.slice(5).substring(2,id.slice(5).length ).replace("_"," ")+" "+moment().format("dddd MM/DD")+"</h1>");
		
	}
	//$(this.detail.el).empty();
	$('#find').val("");
  },
    render: function(eventName) {
		var self=this;
		
        _.each(this.collection.models, function (msg) {
		var now = moment().startOf('hour');;
		var d = moment(msg.get('time'), 'hh:mm a');
		
		//console.log(now);
			if(d.startOf('hour').isAfter(now)||d.startOf('hour').isSame(now))
            $(this.el).append(new ShowView({model:msg}).render().el);
        }, this);
		$(this.el).parent().accordion({
					oneOpenedItem	: true,
					open:	0
				});
		//if (!$.browser.webkit) {
            //  $(this.el).parent().jScrollPane();
         // }	
				
		
		var id = $('a[id^="time_"]:first').attr('id');
				//$('[id^="shows_"]').hide(); // hide the other divs
				//$('#detailResults').hide();
				//$('#favGrid').hide();
				//$('#showGrid').show();
				//console.log(id);
				$('[id^="shows_'+id.slice(5)+'"]').css("display","block");
				$('[id^="alls_'+id.slice(5)+'"]').addClass('active');
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&($("#trigger-overlay").css("display") == "block" )){
					$('#date').html('<h1>'+id.slice(5).substring(0, 2)+":"+id.slice(5).substring(2,id.slice(5).length ).replace("_"," ")+ " "+ moment().format("dddd MM/DD")+"</h1>");
		
				}else{
					var date = moment().format("dddd, MMMM Do YYYY");
					$('#date').html('<h1>'+date+"</h1>");
				}
					
			
		this.delegateEvents();
		

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
return TimeListView;
});

