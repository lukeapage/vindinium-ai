var common = require("./common");
var routeTo = require("./route-to");

module.exports = function (mapData, enemyData, heroPosition, state) {
    if (enemyData.sortedByGoldMine.length > 0 && enemyData.sortedByGoldMine[0].goldMines.count > 1 &&
        enemyData.sortedByGoldMine[0].enemyStats.life < state.hero.life) {
        var enemyPosition = enemyData.sortedByGoldMine[0].position;

        // are they close with low health
        if (common.distance(heroPosition, enemyPosition) < 5) {
            var route = routeTo(heroPosition, enemyPosition, map);
            if (route && route.distance < 6) {
                return [{score: 90, dir: route.initialDir}];
            }
        }
    }
    return [];
};