const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    cache: false,
    devtool: "eval-cheap-module-source-map", // inline-source-map is the default
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
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
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "src/index.html",
            hash: true,
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: "TypeScript", excludeWarnings: false }),
        // new BundleAnalyzerPlugin(),
    ],
};
