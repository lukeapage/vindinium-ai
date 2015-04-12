import strategyType = require("./strategy-type");
import turnState = require("./turn-state");

interface Direction {
    dir: string;
    highScore: number;
    totalScore: number;
}

interface DirectionMap {
    [dir: string] : Direction;
}

function strategyRunner(
    gameState: VState,
    callback : (error: string, direction: string) => void,
    ...strategies: ((state: turnState.TurnState) => strategyType.StrategyResult[])[]) : void {

    var startTime = new Date().getTime();

    try {
        var state = turnState.parse(gameState);

        var directionMap : DirectionMap = {};
        strategies.reduce(function (resultList, strategy) {
                var result = strategy(state);
                if (!result || typeof result.length !== "number") {
                    console.log("Received bad result from strategy");
                }
                return resultList.concat(result);
            }, [])
            .forEach(function(strategy : strategyType.StrategyResult) {
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
        var possibilities : Direction[] = Object.keys(directionMap)
            .map(function(key) {
                return directionMap[key];
            })
            .sort(function (a, b) {
                if (a.highScore < b.highScore) {
                    return 1;
                } else if (a.highScore > b.highScore) {
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
            console.log(JSON.stringify(gameState, null, 2));
            console.log();
        }

        if (possibilities.length) {
            callback(null, possibilities[0].dir);
            return;
        }
    }
    catch(e) {
        console.log("Exception occurred during strategy processing");
        console.log(e.stack);
        console.dir(e);
    }

    callback(null, "n");
}

export = strategyRunner;