var expect = require('chai').expect;
var testState1 = require("./test-state-1");
var testState2 = require("./test-state-2");
var testState3 = require("./test-state-3");
var testStateRunAwaySouth = require("./test-state-run-away-south");
var testStateKillEnemy1 = require("./test-state-kill-enemy-1");
var testStateKillEnemy2 = require("./test-state-kill-enemy-2");

var strategyKillEnemy = require("./coverage/lib/strategies/kill-enemy");
var strategyHeal = require("./coverage/lib/strategies/heal");
var strategyGetGoldMine = require("./coverage/lib/strategies/get-gold-mine");
var strategyRunAway = require("./coverage/lib/strategies/run-away");
var strategyRunner = require("./coverage/lib/strategy-runner");

function getDirection(state) {
    var finalDir;
    strategyRunner(state, function(err, dir) {finalDir = dir}, strategyKillEnemy, strategyHeal, strategyGetGoldMine, strategyRunAway);
    return finalDir;
}

describe('strategy', function() {
    it("works for test case 1", function() {
        expect(getDirection(testState1)).to.equal("e"); // todo haven't actually checked what it should do
    });
    it("works for test case 2", function() {
        expect(getDirection(testState2)).to.equal("w"); // todo haven't actually checked what it should do
    });
    it("works for test case 3", function() {
        expect(getDirection(testState3)).to.equal("s"); // todo haven't actually checked what it should do
    });
    it("runs away south", function() {
        expect(getDirection(testStateRunAwaySouth)).to.equal("s");
    });
    describe("kill enemy", function() {
        it("goes towards enemy", function() {
            expect(getDirection(testStateKillEnemy1)).to.equal("w");
        });
        it("stays still", function() {
            expect(getDirection(testStateKillEnemy2)).to.equal("");
        });
    });
});