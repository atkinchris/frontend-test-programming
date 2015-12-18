(function(exports) {
    'use strict';

    var _KEY = 'favourites';
    var _storage;
    var _favourites;

    function Favourites(storage) {
        _storage = storage || window.localStorage;
        _favourites = this.getFavourites();
    }
    exports.Favourites = Favourites;

    Favourites.prototype.getFavourites = function() {
        return JSON.parse(_storage.getItem(_KEY)) || [];
    };

    Favourites.prototype.saveFavourites = function() {
        _storage.setItem(_KEY, JSON.stringify(_favourites));
    };

    Favourites.prototype.clearFavourites = function() {
        _storage.removeItem(_KEY);
    };

    Favourites.prototype.mapFavourites = function(items) {
        for (var i = 0, len = items.length; i < len; i++) {
            items[i].isFavourite = this.isFavourite(items[i]);
        }
    };

    Favourites.prototype.toggleFavourite = function(item) {
        if (this.isFavourite(item)) {
            this.removeFavourite(item);
        } else {
            this.addFavourite(item);
        }
        this.saveFavourites();
    };

    Favourites.prototype.removeFavourite = function(item) {
        item.isFavourite = false;
        _favourites = _favourites.filter( function(i) {
            return i !== item.link;
        });
    };

    Favourites.prototype.addFavourite = function(item) {
        item.isFavourite = true;
        _favourites.push(item.link);
    };

    Favourites.prototype.isFavourite = function(item) {
        return _favourites.indexOf(item.link) > -1;
    };
})(this);
