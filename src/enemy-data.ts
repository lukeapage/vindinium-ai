import map = require("./map");

export interface IEnemy {
    id : number;
    goldMines : map.IEnemyGoldMineData;
    position : VPosition;
    spawnPos : VPosition;
    crashed : boolean;
    life : number;
    isTagTeam : boolean;
}

export interface IEnemyData {
    list : IEnemy[];
    mapped : IMappedEnemies;
}

export interface IMappedEnemies {
    [enemyId : string] : IEnemy;
}

export function parseEnemyData(hero : VHero, mapData : map.IMapData, heroes : VHero[]) : IEnemyData {
    var enemiesMapped : IMappedEnemies = {};

    var enemyList = heroes
        .filter(function(heroOrEnemy : VHero) : boolean {
            if (String(heroOrEnemy.id) === String(hero.id)) {
                return false;
            }
            return true;
        })
        .map(function(enemy : VHero) : IEnemy {
            var enemyId = enemy.id;
            var enemyPosition = mapData.enemies[enemyId];

            if (!enemyPosition) {
                throw new Error("Enemy " + enemyId + " is not on the map!");
            }

            var parsedEnemy : IEnemy = {
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

