var common = require("./common");
var nearestDirection = require("./nearest-direction");

module.exports = function (mapData, enemyData, heroPosition, state) {
    var route = nearestDirection(heroPosition, mapData.map, mapData.freeGoldMines);
    if (route) {
        var canSurvive = state.hero.life - (20 + route.moves);
        return [{score: canSurvive ? 50 : 0, dir: route.initialDir}];
    }
};