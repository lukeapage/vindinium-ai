import common = require("./common");
import map = require("./map");

export interface Enemy {
    id: number;
    goldMines: map.EnemyGoldMineData;
    position: VPosition;
    spawnPos: VPosition;
    crashed: boolean;
    life: number;
    isTagTeam: boolean;
}

export interface EnemyData {
    list: Enemy[];
    mapped: MappedEnemies;
}

export interface MappedEnemies {
    [enemyId: string]: Enemy;
}

export function parseEnemyData(hero : VHero, mapData : map.MapData, heroes : VHero[]) : EnemyData {
    var enemiesMapped : MappedEnemies = {};

    var enemyList = heroes
        .filter(function(heroOrEnemy) {
            if (String(heroOrEnemy.id) === String(hero.id)) {
                return false;
            }
            return true;
        })
        .map(function(enemy) {
            var enemyId = enemy.id;
            var enemyPosition = mapData.enemies[enemyId];

            if (!enemyPosition) {
                throw new Error("Enemy " + enemyId + " is not on the map!");
            }

            var parsedEnemy : Enemy = {
                id: enemyId,
                goldMines: mapData.enemyGoldMines[enemyId] || { count: 0, positions: [] },
                position: enemyPosition,
                spawnPos: {x: enemy.spawnPos.y, y: enemy.spawnPos.x},
                life: enemy.life,
                crashed: enemy.crashed,
                isTagTeam: hero.name === enemy.name
            };
            enemiesMapped[enemyId] = parsedEnemy;
            return parsedEnemy;
        });

    return {list: enemyList, mapped: enemiesMapped};
}

