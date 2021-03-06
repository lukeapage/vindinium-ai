module.exports = {
    game: {
        board: {
            size: 10,
            tiles: [
                '##', '  ', '  ', '  ', '##', '##', '  ', '  ', '@4', '##',
                '  ', '  ', '  ', '##', '##', '##', '##', '  ', '  ', '  ',
                '  ', '  ', '  ', '  ', '##', '##', '  ', '  ', '  ', '  ',
                '  ', '  ', '[]', '  ', '  ', '  ', '  ', '[]', '  ', '  ',
                '$1', '  ', '  ', '##', '  ', '  ', '##', '@1', '  ', '$1',
                '$1', '  ', '  ', '##', '  ', '  ', '##', '  ', '@3', '$3',
                '  ', '  ', '[]', '  ', '  ', '  ', '@2', '[]', '  ', '  ',
                '  ', '  ', '  ', '  ', '##', '##', '  ', '  ', '  ', '  ',
                '  ', '  ', '  ', '##', '##', '##', '##', '  ', '  ', '  ',
                '##', '  ', '  ', '  ', '##', '##', '  ', '  ', '  ', '##'].join()
        },
        heroes: [
            { id: "1" },
            { id: "2", life: 90, spawnPos: { x: 7, y: 0 } },
            { id: "3", life: 90, spawnPos: { x: 7, y: 7 } },
            { id: "4", life: 90, spawnPos: { x: 0, y: 7 } }
        ]
    },
    hero: {
        id: "1",
        pos: {
            x: 4,
            y: 7
        },
        name: 'Destroyer',
        userId: 'eke3r302',
        elo: 1295,
        life: 99,
        gold: 130,
        mineCount: 3,
        spawnPos: { x: 0, y: 1 },
        crashed: false,
        lastDir: 'North'
    }
};