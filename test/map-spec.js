var expect = require('chai').expect;
var map = require("./coverage/lib/map");

describe('Map parse', function(){
    it('should parse okay', function(){
        var mapData = map.parseMap({ size: 2, tiles: "##$1  []"}, 1);
        expect(mapData.map).to.deep.equal([["##", "$1"], ["  ", "[]"]]);
    });
    it('should find taverns', function(){
        var mapData = map.parseMap({ size: 2, tiles: "[][][][]"}, 1);
        expect(mapData.taverns).to.deep.equal([{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]);
    });
    it('should find free goldmines', function(){
        var mapData = map.parseMap({ size: 2, tiles: "$_$1$2$-"}, 1);
        expect(mapData.freeGoldMines).to.deep.equal([{x: 1, y: 1}]);
    });
    it('should find enemy goldmines', function(){
        var mapData = map.parseMap({ size: 3, tiles: "$-$1$2$-$3$1$4$4  "}, 1);
        expect(mapData.enemyGoldMines).to.deep.equal({"2": {count: 1, positions: [{x: 2, y: 0}]}, "3": {count: 1, positions: [{x:1, y:1}]}, "4": {count:2, positions: [{x:0, y:2}, {x:1, y:2}]}});
    });
    it('should find enemies', function(){
        var mapData = map.parseMap({ size: 2, tiles: "@1@2@3@4"}, 1);
        expect(mapData.enemies).to.deep.equal({"2": {x: 1, y: 0}, "3": {x: 0, y: 1}, "4": {x: 1, y: 1}});
    });
});