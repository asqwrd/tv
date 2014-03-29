var ResultView = Backbone.View.extend({
	
    
    template:_.template($('#showTemplate').html()),
 
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});