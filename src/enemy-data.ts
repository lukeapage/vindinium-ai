import common = require("./common");
import map = require("./map");

export interface Enemy {
    id: string;
    goldMines: map.EnemyGoldMineData;
    position: VPosition;
    enemyStats: VHero
}

export interface EnemyData {
    sortedByGoldMine: Enemy[];
    mapped: MappedEnemies;
}

export interface MappedEnemies {
    [enemyId: string]: Enemy;
}

export function parseEnemyData(mapData : map.MapData, heroes : VHero[]) : EnemyData {
    var enemiesWithGoldMines = Object.keys(mapData.enemyGoldMines),
        enemiesMapped : MappedEnemies = {};

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
        var enemy : Enemy = {
            id: enemyId,
            goldMines: mapData.enemyGoldMines[enemyId],
            position: mapData.enemies[enemyId],
            enemyStats: enemyStats
        };
        enemiesMapped[enemyId] = enemy;
        return enemy;
    });

    return {sortedByGoldMine: sortedByGoldMine, mapped: enemiesMapped};
}

