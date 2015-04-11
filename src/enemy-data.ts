import common = require("./common");
import map = require("./map");

export interface Enemy {
    id: number;
    goldMines: map.EnemyGoldMineData;
    position: VPosition;
    spawnPos: VPosition;
    crashed: boolean;
    life: number;
}

export interface EnemyData {
    list: Enemy[];
    mapped: MappedEnemies;
}

export interface MappedEnemies {
    [enemyId: string]: Enemy;
}

export function parseEnemyData(heroId : number, mapData : map.MapData, heroes : VHero[]) : EnemyData {
    var enemiesMapped : MappedEnemies = {};

    var enemyList = heroes
        .filter(function(hero) {
            if (String(hero.id) === String(heroId)) {
                return false;
            }
            return true;
        })
        .map(function(hero) {
            var enemyId = hero.id;
            var enemyPosition = mapData.enemies[enemyId];

            if (!enemyPosition) {
                throw new Error("Enemy " + enemyId + " is not on the map!");
            }

            var enemy : Enemy = {
                id: enemyId,
                goldMines: mapData.enemyGoldMines[enemyId] || { count: 0, positions: [] },
                position: enemyPosition,
                spawnPos: {x: hero.spawnPos.y, y: hero.spawnPos.x},
                life: hero.life,
                crashed: hero.crashed
            };
            enemiesMapped[enemyId] = enemy;
            return enemy;
        });

    return {list: enemyList, mapped: enemiesMapped};
}

