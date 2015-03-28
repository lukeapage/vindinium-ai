var expect = require('chai').expect;
var parseMap = require("../src/map");

describe('Map parse', function(){
    it('should parse okay', function(){
        var mapData = parseMap({ size: 2, tiles: "##$1  []"}, 1);
        expect(mapData.map).to.deep.equal([["##", "$1"], ["  ", "[]"]]);
    });
    it('should find taverns', function(){
        var mapData = parseMap({ size: 2, tiles: "[][][][]"}, 1);
        expect(mapData.taverns).to.deep.equal([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]);
    });
    it('should find free goldmines', function(){
        var mapData = parseMap({ size: 2, tiles: "$_$1$2$_"}, 1);
        expect(mapData.freeGoldMines).to.deep.equal([{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]);
    });
});