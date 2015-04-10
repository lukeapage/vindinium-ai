import strategyType = require("./strategy-type");
import TurnState = require("./turn-state");

function strategyRunner(
    state: VState,
    callback : (error: string, direction: string) => void,
    ...strategies: ((turnState: TurnState.TurnState) => strategyType.StrategyResult[])[]) : void {

    var startTime = new Date().getTime();

    try {
        var turnState = TurnState.parse(state);

        var possibilities:strategyType.StrategyResult[] =
            strategies.reduce(function (resultList, strategy) {
                var result = strategy(turnState);
                if (!result || typeof result.length !== "number") {
                    console.log("Received bad result from strategy");
                }
                return resultList.concat(result);
            }, [])
                .sort(function (a, b) {
                    if (a.score < b.score) {
                        return 1;
                    } else if (a.score > b.score) {
                        return -1;
                    }
                    return 0;
                });

        var endTime = new Date().getTime(),
            diffTime = endTime - startTime;

        if (diffTime > 50) {
            console.log();
            console.log("Over 50ms response time - " + diffTime + "ms");
            console.log(JSON.stringify(state, null, 2));
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