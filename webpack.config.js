const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = function (env) {
    const isEnvDevelopment = !!env.development;
    const isEnvProduction = !!env.production;

    const paths = {
        publicUrlOrPath: "/",
        entryPath: path.resolve(__dirname, "./src/index.tsx"),
        dist: path.join(__dirname, "./dist"),
    };

    return {
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
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template: "src/index.html",
                hash: true,
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: true,
                useTypescriptIncrementalApi: true,
                checkSyntacticErrors: true,
                silent: true,
            }),
            isEnvProduction &&
                new WorkboxWebpackPlugin.GenerateSW({
                    clientsClaim: true,
                    exclude: [/\.map$/, /asset-manifest\.json$/],
                    navigateFallback: paths.publicUrlOrPath + "index.html",
                    navigateFallbackDenylist: [
                        // Exclude URLs starting with /_, as they're likely an API call
                        new RegExp("^/_"),
                        // Exclude any URLs whose last part seems to be a file extension
                        // as they're likely a resource and not a SPA route.
                        // URLs containing a "?" character won't be blacklisted as they're likely
                        // a route with query params (e.g. auth callbacks).
                        new RegExp("/[^/?]+\\.[^/]+$"),
                    ],
                }),
            new ForkTsCheckerNotifierWebpackPlugin({ title: "TypeScript", excludeWarnings: false }),
            // new BundleAnalyzerPlugin(),
        ].filter(Boolean),
    };
};
