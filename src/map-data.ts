interface MapData {
    map: string[][];
    taverns: VPosition[];
    freeGoldMines: VPosition[];
    enemyGoldMines: { [enemy: string]: EnemyGoldMineData};
    enemies: { [enemy: string]: VPosition };
}

interface EnemyGoldMineData {
    count: number;
    positions: VPosition[];
}

export = MapData;