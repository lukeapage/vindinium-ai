function getEnemyData(mapData, heroes) {
    var enemiesWithGoldMines = Object.keys(mapData.enemyGoldMines),
        enemiesMapped = {};

    var sortedByGoldMine = enemiesWithGoldMines.sort(function(a, b) {
        a = mapData.enemyGoldMines[a];
        b = mapData.enemyGoldMines[b];

        if (a.count < b.count) {
            return -1;
        }
        if (a.count > b.count) {
            return 1;
        }
        return 0;
    }).map(function(enemyId) {
        var enemyStats = common.find(heroes, function(hero) {
            if (hero.id === enemyId) {
                return true;
            }
        });
        var enemyData = {
            id: enemyId,
            goldMines: mapData.enemyGoldMines[enemyId],
            position: mapData.enemies[enemyId],
            enemyStats: enemyStats
        };
        enemiesMapped[enemyId] = enemyData;
    });

    return {sortedByGoldMine: sortedByGoldMine, mapped: enemiesMapped};
}

module.exports = getEnemyData;