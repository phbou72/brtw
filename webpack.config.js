const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const styledComponentsTransformer = createStyledComponentsTransformer();

const htmlPlugin = new HtmlWebPackPlugin({
    template: "src/index.html",
    hash: true,
});

const miniCSSPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css",
});

module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    devtool: "cheap-module-eval-source-map", // inline-source-map default
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        htmlPlugin,
        miniCSSPlugin,
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: "TypeScript", excludeWarnings: false }),
        // new BundleAnalyzerPlugin()
    ],
};
