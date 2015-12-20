/* jshint expr: true, strict: false */
/* globals chai, sinon, describe, beforeEach, it, Favourites */

var expect = chai.expect;

describe('Favourites', function() {
    var mockStorage;
    var favourites;

    beforeEach(function() {
        var items = JSON.stringify([
            'link1'
        ]);

        mockStorage = {
            getItem: sinon.stub().returns(items),
            setItem: sinon.stub(),
            removeItem: sinon.stub()
        };
        favourites = new Favourites(mockStorage);
    });

    describe('constructor', function() {
        it('should be defined after construction', function() {
            expect(favourites).to.be.defined;
        });

        it('should get favourites on contruction', function() {
            expect(mockStorage.getItem).to.have.been.called;
        });
    });

    describe('getFavourites', function() {
        it('should get items from storage with the key', function() {
            var output = favourites.getFavourites();
            expect(mockStorage.getItem).to.have.been.calledWith('favourites');
            expect(output).to.be.an.array;
            expect(output[0]).to.equal('link1');
        });

        it('should return an empty array if storage is not set', function() {
            mockStorage.getItem.returns(undefined);
            favourites = new Favourites(mockStorage);

            var output = favourites.getFavourites();
            expect(output).to.be.an.array;
            expect(output).to.be.empty;
        });

        it('should return an empty array if storage is invalid', function() {
            mockStorage.getItem.returns({});
            favourites = new Favourites(mockStorage);

            var output = favourites.getFavourites();
            expect(output).to.be.an.array;
            expect(output).to.be.empty;
        });
    });

    describe('saveFavourites', function() {
        it('should save items to storage with key', function() {
            favourites.saveFavourites();
            expect(mockStorage.setItem).to.have.been.calledWithExactly('favourites', '["link1"]');
        });
    });

    describe('isFavourite', function() {
        it('should return true if an item is a favourite', function() {
            var item = {
                link: 'link1'
            };
            expect(favourites.isFavourite(item)).to.be.true;
        });

        it('should return false if an item is not a favourite', function() {
            var item = {
                link: 'linkA'
            };
            expect(favourites.isFavourite(item)).to.be.false;
        });
    });

    describe('addFavourite', function() {
        it('should set an item as a favourite', function() {
            var item = {
                link: 'link2'
            };
            favourites.addFavourite(item);
            var index = favourites.getFavourites().indexOf('link2');

            expect(favourites.isFavourite(item)).to.be.true;
            expect(index).to.be.above(-1);
        });
    });

    describe('removeFavourite', function() {
        it('should remove an item from favourites', function() {
            var item = {
                link: 'link1'
            };
            favourites.removeFavourite(item);
            var index = favourites.getFavourites().indexOf('link1');

            expect(favourites.isFavourite(item)).to.be.false;
            expect(index).to.equal(-1);
        });
    });
});
