(function(exports) {
    'use strict';

    function Gallery(data, favourites, target) {
        this.data = data;
        this.favourites = favourites || new Favourites();
        this.target = target || document.body;

        this.favourites.mapFavourites(this.data.items);

        for (var i = 0; i < this.data.items.length; i++) {
            var element = this.createElement(this.data.items[i]);
            this.target.appendChild(element);
        }
    }

    exports.Gallery = Gallery;

    Gallery.prototype.createElement = function(data) {
        var self = this;

        var container = document.createElement('div');
        container.onclick = onClick;
        container.className = 'gallery-item';

        var image = document.createElement('img');
        image.src = data.media.m;
        container.appendChild(image);
        if (data.isFavourite) {
            image.classList.add('selected');
        }

        var title = document.createElement('h2');
        title.innerHTML = data.title;
        container.appendChild(title);

        return container;

        function onClick() {
            self.favourites.toggleFavourite(data);

            if (data.isFavourite) {
                image.classList.add('selected');
            } else {
                image.classList.remove('selected');
            }
        }
    };
})(this);
