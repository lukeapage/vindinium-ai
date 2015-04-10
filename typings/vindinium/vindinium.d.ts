interface VState {
    game: VGame;
    hero: VHero;
    token: string;
    viewUrl: string;
    playUrl: string;
}

interface VGame {
    id: string;
    turn: number;
    maxTurns: number;
    heroes: VHero[];
    board: VBoard;
    finished: boolean;
}

interface VHero {
    id: number;
    name: string;
    userId: string;
    elo: number;
    pos: VPosition;
    life: number;
    gold: number;
    mineCount: number;
    spawnPos: VPosition;
    crashed: boolean;
    lastDir: string;
}

interface VPosition {
    x: number;
    y: number;
}

interface VBoard {
    size: number;
    tiles: string;
}