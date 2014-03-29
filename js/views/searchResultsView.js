var SearchResultsView = Backbone.View.extend({
  
  render: function(){
    _.each(this.model.models, function (msg) {
            $(this.el).append(new ResultView({model:msg}).render().el);
        }, this);
        return this;
  }
});
 
// do the actual search, based on a search
// term that was entered in to the search box
