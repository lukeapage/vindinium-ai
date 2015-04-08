module.exports = {
    test: {
        options: {
            reporter: 'spec',
            //captureFile: 'results.txt', // Optionally capture the reporter output to a file
            quiet: false, // Optionally suppress output to standard out (defaults to false)
            //clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
            reporter: 'spec'
        },
        src: ['test/**/*-spec.js']
    }
};