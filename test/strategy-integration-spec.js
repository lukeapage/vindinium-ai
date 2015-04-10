var expect = require('chai').expect;
var testState1 = require("./test-state-1");

var strategyKillEnemy = require("./coverage/lib/strategies/kill-enemy");
var strategyHeal = require("./coverage/lib/strategies/heal");
var strategyGetGoldMine = require("./coverage/lib/strategies/get-gold-mine");
var strategyRunner = require("./coverage/lib/strategy-runner");

describe('strategy', function() {
    it("works for test case 1", function() {
        var finalDir;
        strategyRunner(testState1, function(err, dir) {finalDir = dir}, strategyKillEnemy, strategyHeal, strategyGetGoldMine);

        expect(finalDir).to.equal("n");
    });
});