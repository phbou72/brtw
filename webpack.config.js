module.exports = {
  module: {
    loaders: [
      { exclude: ["node_modules"], loader: "babel", test: /\.[jt]sx?$/ },
    ]
  },
  resolve: {
    extensions: ["js", "jsx", "ts", "tsx"],
    modules: [
      "node_modules",
    ]
  }
};
