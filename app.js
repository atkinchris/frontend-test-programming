'use strict';

// Callback function for JSONP
function cb(data) {
    var module = angular.module('app', []);

    module.value('flickrdata', data);
    module.controller('Controller', Controller);
    module.service('FavouritesService', Service);

    function Controller(flickrdata, FavouritesService) {
        var vm = this;
        vm.data = flickrdata;
        vm.select = FavouritesService.toggleFavourite;

        FavouritesService.mapFavourites(vm.data.items);
    }

    function Service($window) {
        var storage = $window.localStorage;
        var KEY = 'favourites';
        this.toggleFavourite = toggleFavourite;
        this.mapFavourites = mapFavourites;

        function toggleFavourite(image) {
            if (!image || !image.link) return;

            var favourites = getFavourites();
            if (image.isFavourite) {
                image.isFavourite = false;
                var index = favourites.indexOf(image.link);
                if (index > -1) {
                    favourites.splice(index, 1);
                }
            } else {
                image.isFavourite = true;
                favourites.push(image.link);
            }
            saveFavourites(favourites);
        }

        function mapFavourites(images) {
            var favourites = getFavourites();
            images.map(function(image) {
                if (favourites.indexOf(image.link) > -1) {
                    image.isFavourite = true;
                }
            });
        }

        function getFavourites() {
            var favourites = [];
            try {
                favourites = JSON.parse(storage.getItem(KEY));
            } catch (err) {
                saveFavourites(favourites);
                console.log(err);
            }
            return favourites;
        }

        function saveFavourites(favourites) {
            storage.setItem(KEY, JSON.stringify(favourites));
        }
    }

    angular.bootstrap(document, ['app']);
}
