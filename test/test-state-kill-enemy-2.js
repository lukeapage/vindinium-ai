module.exports = {
    "game": {
        "turn": 60,
        "maxTurns": 1200,
        "heroes": [
            {
                "id": 1
            },
            {
                "id": 2,
                "name": "random",
                "pos": {
                    "x": 9,
                    "y": 3
                },
                "lastDir": "West",
                "life": 70,
                "gold": 7,
                "mineCount": 1,
                "spawnPos": {
                    "x": 0,
                    "y": 9
                },
                "crashed": false
            }
        ],
        "board": {
            "size": 12,
            "tiles":
            "########################" +
            "########        ########" +
            "####$2            $2####" +
            "####                ####" +
            "##    []  $2$2  []    ##" +
            "##    ##  ####  ##    ##" +
            "##    ##  ####  ##    ##" +
            "##    []  $2$2  []    ##" +
            "####  @1            ####" +
            "####$-@2          $-####" +
            "########        ########" +
            "########################"
        },
        "finished": false
    },
    "hero": {
        "id": 1,
        "name": "Destroyer",
        "userId": "eke3r302",
        "elo": 1295,
        "pos": {
            "x": 8,
            "y": 3
        },
        "lastDir": "East",
        "life": 99,
        "gold": 22,
        "mineCount": 2,
        "spawnPos": {
            "x": 3,
            "y": 3
        },
        "crashed": false
    },
    "context": {}
};