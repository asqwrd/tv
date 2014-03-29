// tv/js/views/show.js
define( ["parse","underscore","backbone","text!templates/guide.html","text!templates/searchform.html"], function ( Parse,_,Backbone,guideTemplate,showTemplate ) {
var ShowView = Parse.View.extend({
	
    tagName:'li',
	attributes : function () {
    return {
      id : "lime_"+this.model.get( 'time' ).replace(" ","_").replace(":","")
    };
  },
	 
    template0:_.template(guideTemplate),
   // template1:_.template(showTemplate),
 
    render:function (eventName) {
        $(this.el).html(this.template0(this.model.toJSON()));
       // $(this.el).append(this.template1());
        return this;
    }
});
return ShowView;
});