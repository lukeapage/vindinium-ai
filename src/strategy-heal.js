var common = require("./common");
var nearestDirection = require("./nearest-direction");

module.exports = function (mapData, enemyData, heroPosition, state) {
    var route = nearestDirection(heroPosition, mapData.map, mapData.taverns);
    if (route) {
        return [{score: (100 - state.hero.life) + 20 + Math.min(0, 10 - route.moves), dir: route.initialDir}];
    }
    return [];
};