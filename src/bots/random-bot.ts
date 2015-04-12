/// <reference path='../../typings/node/node.d.ts' />
/// <reference path='../../typings/vindinium/vindinium.d.ts' />

import strategyRandom = require("../strategies/random");
import strategyRunner = require("../strategy-runner");

function bot(state : VState, callback : (error : string, direction : string) => void) : void {

    strategyRunner(state, callback, strategyRandom);
}

export = bot;

if (require.main === module) {
    /* tslint:disable:no-var-requires */
    require('vindinium-client').cli(bot);
    /* tslint:enable:no-var-requires */
}
