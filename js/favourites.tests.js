/* jshint expr: true, strict: false */
/* globals chai, describe, it, Favourites */

var expect = chai.expect;

describe('Favourites', function() {
    it('should pass this test', function() {
        var favourites = new Favourites();
        expect(favourites).to.be.defined;
    });
});
