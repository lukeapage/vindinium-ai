var expect = require('chai').expect;
var routing = require("./coverage/lib/routing");
var blankMap = require("./test-map-blank");
var variedMap = require("./test-map-varied");
var mazeMap = require("./test-map-maze");
var twoWaysMap = require("./test-map-two-ways");

describe('Routing', function(){
    describe("in a blank map", function() {
        it('should plot a route to a tile 1 away', function () {
            expect(routing.to({x: 0, y: 0}, {x: 1, y: 0}, blankMap).initialDir).to.equal("e");
            expect(routing.to({x: 0, y: 0}, {x: 0, y: 1}, blankMap).initialDir).to.equal("s");
        });
        it('should plot a route to a tile 4 away', function () {
            expect(routing.to({x: 0, y: 0}, {x: 3, y: 0}, blankMap).initialDir).to.equal("e");
            expect(routing.to({x: 0, y: 0}, {x: 0, y: 3}, blankMap).initialDir).to.equal("s");
        });
    });
    describe("in the varied map", function() {
        it('should plot a route to a tile 1 away', function () {
            expect(routing.to({x: 0, y: 0}, {x: 1, y: 0}, variedMap).initialDir).to.equal("e");
            expect(routing.to({x: 0, y: 0}, {x: 0, y: 1}, variedMap).initialDir).to.equal("s");
        });
        it('should plot a route to a tile 4 away', function () {
            expect(routing.to({x: 0, y: 0}, {x: 0, y: 3}, variedMap).initialDir).to.equal("s");
        });
        it('should plot a route around a simple obstical', function() {
            expect(routing.to({x: 0, y: 0}, {x: 3, y: 0}, variedMap).initialDir).to.equal("s");
        });
    });
    describe("in a maze map", function() {
        it("should find its way", function() {
            expect(routing.to({x: 0, y: 0}, {x: 4, y: 1}, mazeMap).initialDir).to.equal("e");
            expect(routing.to({x: 0, y: 0}, {x: 4, y: 4}, mazeMap).initialDir).to.equal("s");
            expect(routing.to({x: 0, y: 0}, {x: 3, y: 2}, mazeMap).initialDir).to.equal("s");
        });
    });
    describe("in a map with 2 routes", function() {
        it("should find the fastest way", function() {
            expect(routing.to({x: 0, y: 0}, {x: 6, y: 4}, twoWaysMap).initialDir).to.equal("s");
            expect(routing.to({x: 0, y: 0}, {x: 6, y: 1}, twoWaysMap).initialDir).to.equal("e");
        });
    });

});