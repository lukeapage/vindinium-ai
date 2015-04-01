import common = require("./common");
import MapData = require("./map-data");

interface EnemyData {
}

function getEnemyData(mapData : MapData, heroes : VHero[]) : EnemyData {
    var enemiesWithGoldMines = Object.keys(mapData.enemyGoldMines),
        enemiesMapped = {};

    var sortedByGoldMine = enemiesWithGoldMines.sort(function(a, b) {
        var enemyGoldMineA = mapData.enemyGoldMines[a];
        var enemyGoldMineB = mapData.enemyGoldMines[b];

        if (enemyGoldMineA.count < enemyGoldMineB.count) {
            return -1;
        }
        if (enemyGoldMineA.count > enemyGoldMineB.count) {
            return 1;
        }
        return 0;
    }).map(function(enemyId) {
        var enemyStats = common.find(heroes, function(hero) {
            if (String(hero.id) === String(enemyId)) {
                return true;
            }
        });
        if (!enemyStats) {
            console.warn("Couldn't find stats for " + enemyId);
            console.dir(heroes);
        }
        var enemyData = {
            id: enemyId,
            goldMines: mapData.enemyGoldMines[enemyId],
            position: mapData.enemies[enemyId],
            enemyStats: enemyStats
        };
        enemiesMapped[enemyId] = enemyData;
        return enemyData;
    });

    return {sortedByGoldMine: sortedByGoldMine, mapped: enemiesMapped};
}

export = getEnemyData;
