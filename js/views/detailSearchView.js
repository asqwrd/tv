// tv/js/views/detailSearchView.js
define( ["parse","underscore","backbone","text!templates/guide.html","text!templates/detailSearch.html"], function (Parse, _,Backbone,guideTemplate,detailSearchTemplate ) {
var detailSearchView = Parse.View.extend({
	
	/*attributes : function () {
    return {
      id : "detail_"+this.model.get( 'shows' )['name']
    };
  },*/
    template0:_.template(guideTemplate),
    template1:_.template(detailSearchTemplate),
 
    render:function (eventName) {
       // $(this.el).html(this.template0(this.model.toJSON()));
        $(this.el).html(this.template1(this.model.toJSON()));
        return this;
    }

});
return detailSearchView;
});