module.exports = {
    options: {
    },
    "test-run": {
        command: 'node lib/bots/bot.js -t 1 --map m2 config.json'
    },
    "run": {
        command: 'node lib/bots/bot.js -a 1 config.json'
    }
}