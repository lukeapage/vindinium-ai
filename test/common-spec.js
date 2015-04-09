var expect = require('chai').expect;
var common = require("./coverage/lib/common");
var variedMap = require("./test-map-varied");

describe('common', function() {
    describe("distance", function() {
        it('should work', function() {
            expect(common.distance({x: 0, y: 0}, {x: 0, y: 0})).to.equal(0);
            expect(common.distance({x: 0, y: 0}, {x: 1, y: 1})).to.equal(2);
            expect(common.distance({x: 1, y: 1}, {x: 0, y: 0})).to.equal(2);
        });
    });
    describe("sortPositionsByCrowDistance", function() {
        it("should work", function() {
            expect(common.sortPositionsByCrowDistance({x: 0, y: 0}, [])).to.deep.equal([]);
            expect(common.sortPositionsByCrowDistance({x: 0, y: 0}, [{x: 0, y: 0}])).to.deep.equal([{distance: 0, position: { x: 0, y: 0}}]);
            expect(common.sortPositionsByCrowDistance({x: 0, y: 0}, [{x: 0, y: 0}, {x: 1, y: 1}])).to.deep.equal([{distance: 0, position: {x: 0, y: 0}}, {distance: 2, position: {x: 1, y: 1}}]);
            expect(common.sortPositionsByCrowDistance({x: 0, y: 0}, [{x: 2, y: 1}, {x: 1, y: 1}])).to.deep.equal([{distance: 2, position: {x: 1, y: 1}}, {distance: 3, position: {x: 2, y: 1}}]);
        });
    });
    describe("canMoveToTile", function () {
        it("should hande empty tiles", function() {
            expect(common.canMoveToTile(variedMap, 0, 0, false, false)).to.equal(true);
            expect(common.canMoveToTile(variedMap, 1, 0, false, false)).to.equal(true);
            expect(common.canMoveToTile(variedMap, 0, 2, false, false)).to.equal(true);
        });
        it("should handle out of map", function() {
            expect(common.canMoveToTile(variedMap, -1, 0, false, false)).to.equal(false);
            expect(common.canMoveToTile(variedMap, 0, -1, false, false)).to.equal(false);
            expect(common.canMoveToTile(variedMap, 4, 0, false, false)).to.equal(false);
            expect(common.canMoveToTile(variedMap, 0, 4, false, false)).to.equal(false);
        });
        it("should handle impassible woods", function() {
            expect(common.canMoveToTile(variedMap, 2, 0, false, false)).to.equal(false);
        });
        it("should handle taverns", function() {
            expect(common.canMoveToTile(variedMap, 1, 2, false, false)).to.equal(false);
            expect(common.canMoveToTile(variedMap, 1, 2, true, false)).to.equal(true);
        });
        it("should handle heroes", function() {
            expect(common.canMoveToTile(variedMap, 2, 1, false, false)).to.equal(false);
        });
        it("should handle gold mines", function() {
            expect(common.canMoveToTile(variedMap, 3, 0, false, false)).to.equal(false);
            expect(common.canMoveToTile(variedMap, 2, 2, false, false)).to.equal(false);
            expect(common.canMoveToTile(variedMap, 3, 0, false, true)).to.equal(true);
            expect(common.canMoveToTile(variedMap, 2, 2, false, true)).to.equal(true);
        });
    });
});