import map = require("./map");
import enemyData = require("./enemy-data");
import routing = require("./routing");
import nearestDirection = require("./nearest-direction");

export interface IPlaces {
    taverns : VPosition[];
    freeGoldMines : VPosition[];
    enemyGoldMines : map.IEnemyGoldMineDataMap;
};

export interface ITurnState {
    map : string[][];
    places : IPlaces;
    hero : VHero;
    enemies : enemyData.IMappedEnemies;
    enemyList : enemyData.IEnemy[];
    stats : IStats;
    routeTo : (positionFrom : VPosition, positionTo : VPosition, routeScorer ? : () => number) => routing.IRoute;
    nearestDirection : (positionFrom : VPosition, positionsTo : VPosition[]) => routing.IRoute;
};

export interface IStats {
};

export function parse(state : VState) : ITurnState {
    var mapData : map.IMapData = map.parseMap(state.game.board, state.hero.id),
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

