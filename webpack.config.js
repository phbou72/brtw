const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "index.html"
});

module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js",
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
    },
    devtool: "inline-source-map",
    plugins: [htmlPlugin]
};
