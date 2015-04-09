var expect = require('chai').expect;
var nearestDirection = require("./coverage/lib/nearest-direction");
var variedMap = require("./test-map-varied");
var inacessibleMap = require("./test-map-inaccessible");
var twoWaysMap = require("./test-map-two-ways");

describe('nearest direction', function() {
    it("should work", function () {
        var nearestRoute = nearestDirection({x: 0, y: 0}, variedMap, [{ x: 1, y: 0 }, { x: 3, y: 3 }]);
        expect(nearestRoute.initialDir).to.equal("e");
    });
    it("should not pick the first", function () {
        var nearestRoute = nearestDirection({x: 0, y: 0}, variedMap, [{ x: 3, y: 3 }, { x: 1, y: 0 }]);
        expect(nearestRoute.initialDir).to.equal("e");
    });
    it("should work with places that cannot be reached", function () {
        var nearestRoute = nearestDirection({x: 0, y: 0}, inacessibleMap, [{ x: 2, y: 2 }, { x: 5, y: 0 }]);
        expect(nearestRoute.initialDir).to.equal("e");
        nearestRoute = nearestDirection({x: 0, y: 0}, inacessibleMap, [{ x: 2, y: 2 }, { x: 0, y: 4 }]);
        expect(nearestRoute.initialDir).to.equal("s");
    });
    it("should work if all places cannot be reached", function () {
        var nearestRoute = nearestDirection({x: 0, y: 0}, inacessibleMap, [{ x: 2, y: 2 }, { x: 3, y: 2 }]);
        expect(nearestRoute).to.equal(null);
    });
    it("should pick the nearest actual direction", function () {
        var nearestRoute = nearestDirection({x: 2, y: 2}, twoWaysMap, [{ x: 2, y: 4 }, { x: 0, y: 0 }]);
        expect(nearestRoute.initialDir).to.equal("n");
    });
});