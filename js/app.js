// tv/js/app.js

require.config({
	baseUrl:"../tv/js/",
	paths: {
        'underscore': 'lib/underscore-min',
		'backbone': 'lib/backbone-min',
		'jquery' : 'lib/jquery.min',
		"text": 'lib/text',
		"moment": "lib/moment.min",
		"accordion": "lib/jquery.accordion",
		"easing": "lib/jquery.easing.1.3",
		"parse": "http://www.parsecdn.com/js/parse-1.2.13.min",
		"modernizer": "lib/modernizr.custom",
		"classie": "lib/classie",
		"jScroll":"lib/jquery.nicescroll",

    },
    shim: {
        'underscore': {
          exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
		'accordion':{
			deps:['jquery']
		},
		'easing': {
			deps:['jquery']
		
		},
		'parse': {
			deps:['underscore','jquery'],
			exports: 'Parse'
		},
		'jScroll': {
			deps:['jquery']
		
		}
    }
});

require(["parse",'easing','jScroll','modernizer','classie','accordion','moment','underscore','router/timeRoute','views/loginView',"views/timeSlot","views/ShowListView","views/detailListView","views/favTimeSlot","views/SearchListView","views/formView"], function(Parse,easing,jScroll,Modernizer,classie,accordion,moment,_,timeRouter,loginView,TimeListView,ShowListView,DetailListView,favTimeListView,SearchListView,formView){
Parse.$ = jQuery;
Parse.initialize("ibzZxadpZj1GnDtUgfJG6Gs67QHK4Zx5nX1Y2oDE",
                   "oqDbCuuuz6kKz23bAPAdDiOtF3isbHev3o85i5s3");
	  	   
if (Parse.User.current()) {
   //new timeRouter();
   //Parse.history.start();
   $('.loader').delay(2000).fadeOut();
 	new TimeListView();
	new formView();
	new DetailListView();
	new ShowListView();
	//new SearchListView();
	new favTimeListView();

	
	$(window).resize(function(){	
		if(($("#trigger-overlay").css("display") == "block" )){
			var id = $('a[id^="time_"]:first').attr('id');
			$('#date').html('<h1>'+id.slice(5).substring(0, 2)+":"+id.slice(5).substring(2,id.slice(5).length ).replace("_"," ")+ " "+ moment().format("dddd MM/DD")+"</h1>");
			$('#user-info2').show();
			$('#user-info').hide();
			
			
		}else{
			var date = moment().format("dddd, MMMM Do YYYY");
			$('#date').html('<h1>'+date+"</h1>");
			$('#user-info2').hide();
			$('#user-info').show();
			if($('#grid').hasClass('overlay-open'))
				toggleOverlay();
			
		}
	});


	
} else {
  new loginView();
}



$('#user-info').append(Parse.User.current().get("firstname")+ ' (<a href="#" id="log-out">Log out</a>)');
$('#user-info2').html(Parse.User.current().get("firstname")+ ' (<a href="#" id="log-out2">Log out</a>)');
$('#notify_icon').on('click',function(e){
	$('#notification').fadeIn();


});
$('#clear_icon').on('click',function(e){
	$('#notify').empty();
	$(".icon-info-sign").html("").fadeIn(800);
	$("#empty").fadeIn();


});

$('#find').on('click focusin', function() {
    this.value = '';
});
$('#notification-close').on('click',function(e){
	$('#notification').fadeOut();


});
//var timeRouter = new timeRouter();
//Parse.history.start();

if(($("#trigger-overlay").css("display") == "block" )){
	$('#user-info2').show();
	
		
}else{
	$('#user-info2').hide();

}
	
	$('#log-out').click(function(e) {
      Parse.User.logOut();
      new loginView();
    });
	$('#log-out2').click(function(e) {
      Parse.User.logOut();
      new loginView();
    });
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

	function toggleOverlay() {
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

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );

});

