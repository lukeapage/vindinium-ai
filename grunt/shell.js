module.exports = {
    options: {
        execOptions: {
            maxBuffer: Infinity
        }
    },
    "test-run": {
        command: 'node lib/bots/bot.js -t 1 --map m3 config.json'
    },
    "run": {
        command: 'node lib/bots/bot.js -a 100 config.json'
    }
}