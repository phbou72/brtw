const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    hash: true,
});

module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
    },
    devtool: "cheap-module-eval-source-map", // inline-source-map
    plugins: [
        htmlPlugin,
        // new BundleAnalyzerPlugin()
    ],
};
