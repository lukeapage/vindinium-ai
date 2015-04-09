import strategyType = require("./strategy-type");
import TurnState = require("./turn-state");

function strategyRunner(
    state: VState,
    callback : (error: string, direction: string) => void,
    ...strategies: ((turnState: TurnState.TurnState) => strategyType.StrategyResult[])[]) : void {

    var turnState = TurnState.parse(state);

    var possibilities : strategyType.StrategyResult[] =
        strategies.reduce(function(resultList, strategy) {
            return resultList.concat(strategy(turnState));
        }, [])
        .sort(function(a, b) {
            if (a.score < b.score) {
                return 1;
            } else if (a.score > b.score) {
                return -1;
            }
            return 0;
        });

    if (possibilities.length) {
        callback(null, possibilities[0].dir);
        return;
    }

    callback(null, "n");
}

export = strategyRunner;