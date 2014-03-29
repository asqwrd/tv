// tv/js/views/showGridView.js
define( ["parse","underscore","backbone","text!templates/show.html"], function ( Parse,_,Backbone,showTemplate ) {
var ShowGridView = Parse.View.extend({
	
    tagName:'ul',
	attributes : function () {
    return {
      id : "shows_"+this.model.get( 'time' ).replace(" ","_").replace(":","")
    };
  },
    template1:_.template(showTemplate),
 
    render:function (eventName) {
        $(this.el).html(this.template1(this.model.toJSON()));
		
        return this;
    }

});
return ShowGridView;
});