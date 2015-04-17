import strategyType = require("./strategy-type");
import turnState = require("./turn-state");

interface IStrategyResultDirection {
    dir : string;
    highScore : number;
    totalScore : number;
}

interface IStrategyResultDirectionMap {
    [dir : string] : IStrategyResultDirection;
}

function opposite(dir : string) : string {
    switch(dir) {
        case "n":
            return "s";
        case "s":
            return "n";
        case "e":
            return "w";
        case "w":
            return "e";
    }
    return "";
}

var slowTurnfullConfigs = 0;
var currentUrl : string;

function strategyRunner(
    gameState : VState,
    callback : (error : string, direction : string) => void,
    ...strategies : ((state : turnState.ITurnState) => strategyType.IStrategyResult[])[]) : void {

    if (currentUrl !== gameState.viewUrl) {
        currentUrl = gameState.viewUrl;
        try {
            require("copy-paste").copy(currentUrl);
        } catch(e) {
            console.log("failed to copy url");
        }
    }

    var startTime = new Date().getTime();

    try {
        var state = turnState.parse(gameState);

        var directionMap : IStrategyResultDirectionMap = {};
        strategies.reduce(function (resultList : strategyType.IStrategyResult[],
                                    strategy : (state : turnState.ITurnState) => strategyType.IStrategyResult[]) :
                                        strategyType.IStrategyResult[] {
                var result = strategy(state);
                if (!result || typeof result.length !== "number") {
                    console.log("Received bad result from strategy");
                }
                return resultList.concat(result);
            }, [])
            .forEach(function(strategy : strategyType.IStrategyResult) : void {
                if (!directionMap[strategy.dir]) {
                    directionMap[strategy.dir] = { dir: strategy.dir, totalScore: strategy.score, highScore: strategy.score };
                } else {
                    var direction = directionMap[strategy.dir];
                    direction.totalScore += strategy.score;
                    if (strategy.score > direction.highScore) {
                        direction.highScore = strategy.score;
                    }
                }
            });
        var possibilities : IStrategyResultDirection[] = Object.keys(directionMap)
            .map(function(key : string) : IStrategyResultDirection {
                return directionMap[key];
            })
            .sort(function (a : IStrategyResultDirection, b : IStrategyResultDirection) : number {
                if (a.highScore < b.highScore) {
                    return 1;
                } else if (a.highScore > b.highScore) {
                    return -1;
                }
                var aOpposite = a.dir === opposite(state.lastDir),
                    bOpposite = b.dir === opposite(state.lastDir);
                if (aOpposite && ! bOpposite) {
                    return 1;
                }
                if (bOpposite && ! aOpposite) {
                    return -1;
                }
                if (a.totalScore < b.totalScore) {
                    return 1;
                } else if (a.totalScore > b.totalScore) {
                    return -1;
                }
                return 0;
            });

        var endTime = new Date().getTime(),
            diffTime = endTime - startTime;

        if (diffTime > 100) {
            console.log();
            console.log("Over 50ms response time - " + diffTime + "ms");
            if (slowTurnfullConfigs++ < 3) {
                console.log(JSON.stringify(gameState, null, 2));
            }
            console.log();
        }

        if (possibilities.length) {
            callback(null, possibilities[0].dir);
            return;
        }
    }
    catch (e) {
        console.log("Exception occurred during strategy processing");
        console.log(e.stack);
        console.dir(e);
    }

    callback(null, "n");
}

export = strategyRunner;
