var expect = require('chai').expect;
var enemyData = require("./coverage/lib/enemy-data");

describe('enemy data', function() {
    it("should work", function() {
        var parsedData = enemyData.parseEnemyData({ id: "3", name: "Destroyer" }, {
                enemyGoldMines: {
                    "1": {
                        count: 1,
                        positions: [{x: 1, y: 1}]
                    }
                },
                enemies: {
                    "1": {
                        x: 2, y: 2
                    },
                    "2": {
                        x: 3, y: 3
                    },
                    "3": {
                        x: 4, y: 4
                    },
                    "4": {
                        x: 5, y: 5
                    }
                }
            }, [
                { id: "1", spawnPos: { x: 2, y: 1}, crashed: false, life: 99, name: "Massive Mouse" },
                { id: "2", spawnPos: { x: 3, y: 2}, crashed: false, life: 98, name: "Count Dracula" },
                { id: "3", spawnPos: { x: 4, y: 3}, crashed: false, life: 97, name: "Destroyer" },
                { id: "4", spawnPos: { x: 5, y: 4}, crashed: true, life: 96, name: "Destroyer" }
            ]);

        var enemy1 = {
                id: "1",
                goldMines: { count: 1, positions: [
                    {x: 1, y: 1}
                ] },
                position: { x: 2, y: 2},
                crashed: false,
                life: 99,
                spawnPos: { x: 1, y: 2 },
                isTagTeam: false
            },
            enemy2 = {
                id: "2",
                goldMines: { count: 0, positions: [] },
                position: { x: 3, y: 3},
                crashed: false,
                life: 98,
                spawnPos: { x: 2, y: 3 },
                isTagTeam: false
            },
            enemy4 = {
                id: "4",
                goldMines: { count: 0, positions: [] },
                position: { x: 5, y: 5},
                crashed: true,
                life: 96,
                spawnPos: { x: 4, y: 5 },
                isTagTeam: true
            };

        expect(parsedData).to.deep.equal(
            {
                list: [enemy1, enemy2, enemy4],
                mapped: {
                    "1": enemy1,
                    "2": enemy2,
                    "4": enemy4
                }
            }
        );
    });
});