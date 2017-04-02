module.exports = {
    entry: "./example/index.tsx",
    output: {
        path: __dirname + '/example/',
        filename: 'index.js',
        // publicPath: __dirname + '/example'
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ["awesome-typescript-loader"]
            }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};

//# sourceMappingURL=webpack.config.js.map