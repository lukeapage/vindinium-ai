var expect = require('chai').expect;
var enemyData = require("./coverage/lib/enemy-data");

describe('enemy data', function() {
    it("should work", function() {
        var parsedData = enemyData.parseEnemyData({
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
                { id: "1" },
                { id: "2" },
                { id: "3" },
                { id: "4" }
            ]);

        var enemy1 = {
                id: "1",
                goldMines: { count: 1, positions: [
                    {x: 1, y: 1}
                ] },
                position: { x: 2, y: 2},
                enemyStats: { id: "1" }
            },
            enemy2 = {
                id: "2",
                goldMines: { count: 0, positions: [] },
                position: { x: 3, y: 3},
                enemyStats: { id: "2" }
            },
            enemy3 = {
                id: "3",
                goldMines: { count: 0, positions: [] },
                position: { x: 4, y: 4},
                enemyStats: { id: "3" }
            },
            enemy4 = {
                id: "4",
                goldMines: { count: 0, positions: [] },
                position: { x: 5, y: 5},
                enemyStats: { id: "4" }
            };

        expect(parsedData).to.deep.equal(
            {
                list: [enemy1, enemy2, enemy3, enemy4],
                mapped: {
                    "1": enemy1,
                    "2": enemy2,
                    "3": enemy3,
                    "4": enemy4
                }
            }
        );
    });
});