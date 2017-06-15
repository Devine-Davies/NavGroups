const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass       = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: "./showcase/scripts/index.tsx",
    output: {
        path     : __dirname + '/showcase/min/',
        filename : '[name].js',
    },
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", '.css', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ["awesome-typescript-loader"]
            }, {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass
    ]
};

//# sourceMappingURL=webpack.config.js.map

