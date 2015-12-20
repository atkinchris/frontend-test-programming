(function(exports) {
    'use strict';

    var _KEY = 'favourites';

    function Favourites(storage) {
        this._storage = storage || window.localStorage;
        this._favourites = this.getFavourites();
    }
    exports.Favourites = Favourites;

    Favourites.prototype.getFavourites = function() {
        if (this._favourites) {
            return this._favourites;
        }

        var items = this._storage.getItem(_KEY);
        if (items && typeof items === 'string') {
            return JSON.parse(items);
        }
        return [];
    };

    Favourites.prototype.saveFavourites = function() {
        this._storage.setItem(_KEY, JSON.stringify(this._favourites));
    };

    Favourites.prototype.clearFavourites = function() {
        this._favourites = [];
        this._storage.removeItem(_KEY);
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
        this._favourites = this._favourites.filter(function(i) {
            return i !== item.link;
        });
    };

    Favourites.prototype.addFavourite = function(item) {
        item.isFavourite = true;
        this._favourites.push(item.link);
    };

    Favourites.prototype.isFavourite = function(item) {
        return this._favourites.indexOf(item.link) > -1;
    };
})(this);
