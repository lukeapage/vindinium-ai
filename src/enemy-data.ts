import common = require("./common");
import map = require("./map");

export interface Enemy {
    id: string;
    goldMines: map.EnemyGoldMineData;
    position: VPosition;
    enemyStats: VHero
}

export interface EnemyData {
    list: Enemy[];
    mapped: MappedEnemies;
}

export interface MappedEnemies {
    [enemyId: string]: Enemy;
}

export function parseEnemyData(mapData : map.MapData, heroes : VHero[]) : EnemyData {
    var enemiesMapped : MappedEnemies = {};

    var enemyList = heroes.map(function(hero) {
        var enemyId = hero.id;

        var enemy : Enemy = {
            id: enemyId,
            goldMines: mapData.enemyGoldMines[enemyId] || { count: 0, positions: [] },
            position: mapData.enemies[enemyId],
            enemyStats: hero
        };
        enemiesMapped[enemyId] = enemy;
        return enemy;
    });

    return {list: enemyList, mapped: enemiesMapped};
}

