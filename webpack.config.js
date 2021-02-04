const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = function (env) {
    // const isEnvDevelopment = !!env.development;
    // const isEnvProduction = !!env.production;

    const paths = {
        publicUrlOrPath: "/",
        entryPath: path.resolve(__dirname, "./src/index.tsx"),
        dist: path.join(__dirname, "./dist"),
    };

    return {
        context: __dirname, // to automatically find tsconfig.json
        entry: paths.entryPath,
        cache: false,
        devtool: "eval-cheap-module-source-map", // inline-source-map is the default
        devServer: {
            contentBase: paths.dist,
            compress: true,
            port: 8080,
        },
        output: {
            path: paths.dist,
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
                    exclude: /node_modules/,
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
                    type: "asset/resource",
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: "asset/resource",
                },
            ],
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    },
                }),
            ],
            splitChunks: {
                chunks: "all",
                minSize: 30000,
                maxSize: 244000,
                minChunks: 1,
                maxAsyncRequests: 20,
                maxInitialRequests: 5,
                automaticNameDelimiter: "~",
                cacheGroups: {
                    dependencies: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "libs",
                        chunks: "all",
                        priority: -10,
                    },
                },
            },
        },
        plugins: [
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
            new HtmlWebPackPlugin({
                template: "src/index.html",
                hash: true,
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: "./src/**/*.{ts,tsx,js,jsx}", // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
                },
            }),
            new ForkTsCheckerNotifierWebpackPlugin({ title: "TypeScript", excludeWarnings: false }),
            // new BundleAnalyzerPlugin(),
        ].filter(Boolean),
    };
};
