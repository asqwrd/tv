// tv/js/collections/favorite.js
define( ["parse","backbone", "models/favorite"], function ( Parse,Backbone, favModel ) {
var favCollection = Parse.Collection.extend({

    model: favModel,

});

return favCollection;
favCollection.prototype.add = function(fav) {
    // Using isDupe routine from @Bill Eisenhauer's answer
    var isDupe = this.any(function(_fav) { 
        return _fav.get('time') === fav.get('time');
    });

    // Up to you either return false or throw an exception or silently ignore
    // NOTE: DEFAULT functionality of adding duplicate to collection is to IGNORE and RETURN. Returning false here is unexpected. ALSO, this doesn't support the merge: true flag.
    // Return result of prototype.add to ensure default functionality of .add is maintained. 
    return isDupe ? false : Parse.Collection.prototype.add.call(this, fav);
}
});