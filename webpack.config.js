const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});



module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js",
    },
    resolve: {
        extensions: ["js", "jsx", "ts", "tsx", "json"],
        modules: ["node_modules"],
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
    },
    devtool: "inline-source-map",
    plugins: [htmlPlugin]
};
