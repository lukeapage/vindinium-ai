/// <reference path='../typings/node/node.d.ts' />
/// <reference path='../typings/vindinium/vindinium.d.ts' />

import strategyRandom = require("./strategy-random");
import strategyRunner = require("./strategy-runner");

function bot(state: VState, callback) : void {

    strategyRunner(state, callback, strategyRandom);
}

export = bot;

if (require.main === module) {
    require('vindinium-client').cli(bot);
}
