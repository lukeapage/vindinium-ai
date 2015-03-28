var expect = require('chai').expect;
var routeTo = require("../src/routeTo");
var blankMap = require("./test-map-blank");
var variedMap = require("./test-map-varied");
var mazeMap = require("./test-map-maze");

describe('Routing', function(){
    describe("in a blank map", function() {
        it('should plot a route to a tile 1 away', function () {
            expect(routeTo({x: 0, y: 0}, {x: 1, y: 0}, blankMap)).to.equal("e");
            expect(routeTo({x: 0, y: 0}, {x: 0, y: 1}, blankMap)).to.equal("s");
        });
        it('should plot a route to a tile 4 away', function () {
            expect(routeTo({x: 0, y: 0}, {x: 3, y: 0}, blankMap)).to.equal("e");
            expect(routeTo({x: 0, y: 0}, {x: 0, y: 3}, blankMap)).to.equal("s");
        });
    });
    describe("in the varied map", function() {
        it('should plot a route to a tile 1 away', function () {
            expect(routeTo({x: 0, y: 0}, {x: 1, y: 0}, variedMap)).to.equal("e");
            expect(routeTo({x: 0, y: 0}, {x: 0, y: 1}, variedMap)).to.equal("s");
        });
        it('should plot a route to a tile 4 away', function () {
            expect(routeTo({x: 0, y: 0}, {x: 0, y: 3}, variedMap)).to.equal("s");
        });
        it('should plot a route around a simple obstical', function() {
            expect(routeTo({x: 0, y: 0}, {x: 3, y: 0}, variedMap)).to.equal("s");
        });
    });
    describe("in a maze map", function() {
        it("should find its way", function() {
            expect(routeTo({x: 0, y: 0}, {x: 4, y: 1}, mazeMap)).to.equal("e");
            expect(routeTo({x: 0, y: 0}, {x: 4, y: 4}, mazeMap)).to.equal("s");
            expect(routeTo({x: 0, y: 0}, {x: 3, y: 2}, mazeMap)).to.equal("s");
        });
    });
});