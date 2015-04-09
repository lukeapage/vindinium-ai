import map = require("./map");
import routeTo = require("./route-to");
import enemyData = require("./enemy-data");

export interface Places {
    taverns: VPosition[];
    freeGoldMines: VPosition[];
    enemyGoldMines: map.EnemyGoldMineDataMap;
};

export interface TurnState {
    map: string[][];
    places: Places;
    hero: VHero;
    enemies: enemyData.MappedEnemies;
    stats: Stats;
};

export interface Stats {
    enemiesSortedByGoldMine: enemyData.Enemy[]
};

export function parse(state : VState) : TurnState {
    var mapData : map.MapData = map.parseMap(state.game.board, state.hero.id),
        heroPosition : VPosition = {x: state.hero.pos.y, y: state.hero.pos.x};

    var parsedEnemyData = enemyData.parseEnemyData(mapData, state.game.heroes);

    return {
        map: mapData.map,
        places: {
            taverns: mapData.taverns,
            freeGoldMines: mapData.freeGoldMines,
            enemyGoldMines: mapData.enemyGoldMines
        },
        hero: {
            id: state.hero.id,
            name: state.hero.name,
            userId: state.hero.userId,
            elo: state.hero.elo,
            pos: heroPosition,
            life: state.hero.life,
            gold: state.hero.gold,
            mineCount: state.hero.mineCount,
            spawnPos: state.hero.spawnPos,
            crashed: state.hero.crashed,
            lastDir: state.hero.lastDir
        },
        enemies: parsedEnemyData.mapped,
        stats: {
            enemiesSortedByGoldMine: parsedEnemyData.list.sort(function(enemyA, enemyB) {
                if (enemyA.goldMines.count < enemyB.goldMines.count) {
                    return -1;
                }
                if (enemyA.goldMines.count > enemyB.goldMines.count) {
                    return 1;
                }
                return 0;
            })
        }
    };
}

