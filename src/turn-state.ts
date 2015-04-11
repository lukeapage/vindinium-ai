import map = require("./map");
import enemyData = require("./enemy-data");
import routing = require("./routing");
import nearestDirection = require("./nearest-direction");

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
    enemyList: enemyData.Enemy[];
    stats: Stats;
    routeTo: (positionFrom : VPosition, positionTo : VPosition, routeScorer?) => routing.Route;
    nearestDirection: (positionFrom : VPosition, positionsTo: VPosition[]) => routing.Route;
};

export interface Stats {
};

export function parse(state : VState) : TurnState {
    var mapData : map.MapData = map.parseMap(state.game.board, state.hero.id),
        heroPosition : VPosition = {x: state.hero.pos.y, y: state.hero.pos.x};

    var parsedEnemyData = enemyData.parseEnemyData(state.hero, mapData, state.game.heroes);
    var routeTo = routing.to.bind(null, {}, mapData.map);

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
        enemyList: parsedEnemyData.list,
        stats: {
        },
        routeTo: routeTo,
        nearestDirection: nearestDirection.bind(null, routeTo)
    };
}

