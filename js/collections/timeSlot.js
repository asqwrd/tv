// tv/js/collections/timeSlot.js
define( ["parse","backbone", "models/timeSlot"], function ( Parse,Backbone, timeModel ) {
var timeCollection = Backbone.Collection.extend({

    model: timeModel,
    url: "../../../shows_dumb.php"

});
return timeCollection;
});