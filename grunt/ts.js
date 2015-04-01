module.exports = {
    default : {
        src: ["src/**/*.ts", '!**/.baseDir.ts'],
        outDir: "lib",
        options: {
            comments: true,
            module: "commonjs",
            sourceMap: false
        }
    }
};