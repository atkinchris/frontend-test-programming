/* jshint expr: true, strict: false */
/* globals chai, sinon, describe, beforeEach, it, Favourites */

var expect = chai.expect;
var mockStorage = {
    getItem: sinon.stub(),
    setItem: sinon.stub(),
    removeItem: sinon.stub()
};
var favourites;
var items;

beforeEach(function() {
    items = JSON.stringify([
        'link1'
    ]);

    favourites = new Favourites(mockStorage);
});

describe('Favourites', function() {
    it('should be defined after construction', function() {
        expect(favourites).to.be.defined;
    });

    describe('getFavourites', function() {
        it('should get items from storage with the key', function() {
            mockStorage.getItem.returns(items);
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
            expect(mockStorage.setItem).to.have.been.calledWithExactly('favourites', '[]');
        });
    });
});
