// tv/js/views/searchGridView.js
define( ["parse","underscore","backbone","text!templates/search.html"], function ( Parse,_,Backbone,searchTemplate ) {
var SearchGridView = Parse.View.extend({
	
    tagName:'li',
	attributes : function () {
    return {
      id : "search_"+this.model.get('showid')
    };
  },
    template1:_.template(searchTemplate),
 
    render:function (eventName) {
        $(this.el).html(this.template1(this.model.toJSON()));
		
        return this;
    }

});
return SearchGridView;
});