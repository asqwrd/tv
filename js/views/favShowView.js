// tv/js/views/favShowView.js
define( ["parse","underscore","backbone","text!templates/guide.html","text!templates/favorite.html"], function ( Parse,_,Backbone,guideTemplate,favshowTemplate ) {
var favShowView = Parse.View.extend({
	
  tagName:'ul',
	attributes : function () {
    return {
      id : "favs_"+this.model.get( 'time' ).replace(" ","_").replace(":","")
    };
  },
    template1:_.template(favshowTemplate),
 
    render:function (eventName) {
		var self = this;
		this.$el.empty();
       // $(this.el).html(this.template0(this.model.toJSON()));
        self.$el.html(this.template1(this.model.toJSON()));
		      this.delegateEvents();

        return this;
    }

});
return favShowView;
});