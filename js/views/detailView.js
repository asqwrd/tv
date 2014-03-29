// tv/js/views/detailView.js
define( ["parse","underscore","backbone","text!templates/guide.html","text!templates/detail.html"], function (Parse, _,Backbone,guideTemplate,detailTemplate ) {
var detailView = Parse.View.extend({
	
	/*attributes : function () {
    return {
      id : "detail_"+this.model.get( 'shows' )['name']
    };
  },*/
    template0:_.template(guideTemplate),
    template1:_.template(detailTemplate),
 
    render:function (eventName) {
       // $(this.el).html(this.template0(this.model.toJSON()));
        $(this.el).html(this.template1(this.model.toJSON()));
        return this;
    }

});
return detailView;
});