/* jshint expr: true, strict: false */
/* globals chai, sinon, describe, beforeEach, it, Favourites */

var expect = chai.expect;
var mockStorage;
var favourites;

beforeEach(function() {
    mockStorage = {
        getItem: sinon.stub(),
        setItem: sinon.stub(),
        removeItem: sinon.stub()
    };

    var items = JSON.stringify([
        'link1'
    ]);
    mockStorage.getItem.returns(items);

    favourites = new Favourites(mockStorage);
});

describe('Favourites', function() {
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
            var output = favourites.getFavourites();
            expect(output).to.be.an.array;
            expect(output).to.be.empty;
        });

        it('should return an empty array if storage is invalid', function() {
            mockStorage.getItem.returns({});
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
});
