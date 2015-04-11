var expect = require('chai').expect;
var nearestDirection = require("./coverage/lib/nearest-direction");
var routing = require("./coverage/lib/routing");
var variedMap = require("./test-map-varied");
var inacessibleMap = require("./test-map-inaccessible");
var twoWaysMap = require("./test-map-two-ways");

describe('nearest direction', function() {
    it("should work", function () {
        var routeTo = routing.to.bind(null, {}, variedMap);
        var nearestRoute = nearestDirection(routeTo, {x: 0, y: 0}, [{ x: 1, y: 0 }, { x: 3, y: 3 }]);
        expect(nearestRoute.initialDir).to.equal("e");
    });
    it("should not pick the first", function () {
        var routeTo = routing.to.bind(null, {}, variedMap);
        var nearestRoute = nearestDirection(routeTo, {x: 0, y: 0}, [{ x: 3, y: 3 }, { x: 1, y: 0 }]);
        expect(nearestRoute.initialDir).to.equal("e");
    });
    it("should work with places that cannot be reached", function () {
        var routeTo = routing.to.bind(null, {}, inacessibleMap);
        var nearestRoute = nearestDirection(routeTo, {x: 0, y: 0}, [{ x: 2, y: 2 }, { x: 5, y: 0 }]);
        expect(nearestRoute.initialDir).to.equal("e");
        nearestRoute = nearestDirection(routeTo, {x: 0, y: 0}, [{ x: 2, y: 2 }, { x: 0, y: 4 }]);
        expect(nearestRoute.initialDir).to.equal("s");
    });
    it("should work if all places cannot be reached", function () {
        var routeTo = routing.to.bind(null, {}, inacessibleMap);
        var nearestRoute = nearestDirection(routeTo, {x: 0, y: 0}, [{ x: 2, y: 2 }, { x: 3, y: 2 }]);
        expect(nearestRoute).to.equal(null);
    });
    it("should pick the nearest actual direction", function () {
        var routeTo = routing.to.bind(null, {}, twoWaysMap);
        var nearestRoute = nearestDirection(routeTo, {x: 2, y: 2}, [{ x: 2, y: 4 }, { x: 0, y: 0 }]);
        expect(nearestRoute.initialDir).to.equal("n");
    });
});