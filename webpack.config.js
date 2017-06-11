module.exports = {
    entry: "./example/index.tsx",
    output: {
        path     : __dirname + '/example/',
        filename : 'index.js',
    },
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ["awesome-typescript-loader"]
            }
        ]
    },
};

//# sourceMappingURL=webpack.config.js.map